define(['jquery', 'tracking', 'registrationuserinfo', 'handlebars', 'personalizationUtils', 'genericErrorDialog', 'mykpmgflyout','helpers', 'jqueryui'],
    function($, Tracking, regUserInfo, Handlebars, personalizationUtils, genericErrorDialog, Mykpmgflyout,Helpers) {
        'use strict';

        var SubscriptionPreferences = function(elem, componentName) {
             // Keep the following lines at the bottom of the SubscriptionPreferences function
            var trck = new Tracking(elem, 'SubscriptionPreferences');
            var links = {},
                logger = personalizationUtils.loggerUtils,
                $subscriptionsOverlay = $('.subscriptions-overlay'),
                subscribeClass = 'subscribe',
                unsubscribeClass = 'unsubscribe',
                registrationFlow = $(elem).data('registration-flow'),
                locale = personalizationUtils.accountUtils.getLocale(),
                currentCommSubscriptions = {},
                accountInfo = {},
                currentSubscription_opt_in = {},
                currentCommunication_opt_in = {},
                currentSubscriptionOptInValue,
                currentCommunicationOptInValue,
                subscriptionsChanged = false,
                defaultSubscriptionValueObj = {},
                allAvailableInterests = [],
                selectedInterests = [],
                allinterestswithID = [],
                allSubscription = {},
                allSubscriptionGroups = {},
                groupListEnabled = false,
                SubscriptionsfinalList = {
                    "subscription": []
                },
                getAbsolutePath = personalizationUtils.pathUtils.getAbsolutePath;

            personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                links = data.links;
                var prevUrl = decodeURIComponent(sessionStorage.getItem("prevUrl"));
                if (registrationFlow &&
                        !(prevUrl.match(links.register.url) || prevUrl.match(links.login.url) || prevUrl.match(links.registrationInterestsLink.url)) &&
                        !window.kpmgPersonalize.misc.isAuthor) {
                    //Not directed from Registration/Registration-interests page.
                    personalizationUtils.pathUtils.gotoPage(personalizationUtils.accountUtils.isLoggedIn() ? ("../../../../" + links.dashboard.url) : ("../../../../" + links.register.url));
                }
            });

            /* Display Finish button for normal Registration flow
             * Display Next button for Subscription on-boarding flow
             */
            if (personalizationUtils.commonUtils.getValue('origin')) {
                $('#nextButton', elem).removeClass('hide');

                // on-boarding registration
                $('.module-registrationpagetitle #counterThird').off().on('click', handleNextScreen);
            } else {
                $('#finishButton', elem).removeClass('hide');

                // normal registration
                $('.module-registrationpagetitle #counterThird').removeClass("cursor-pointer");
                // $('.module-registrationpagetitle #counterThird').on('click', function(event) {
                //     return false;
                // });

                $('.module-registrationpagetitle #counterSecond_a').on('click', function(event) {
                    saveUserSubscribtions('.list-item', subscribeClass, unsubscribeClass).then(function(response) {
                        personalizationUtils.pathUtils.gotoPage("./registration-interests.html");
                    });
                });
            }

            //Attach event Listeners
            if (registrationFlow) {
                $('.list-item', elem).off();
                $(document).on('click', '.list-item', toggleSubscription);
                //$('.list-item', elem).off().on('click', toggleSubscription);
            } else {
                $('.list-item', elem).find('label').off().on('click', toggleSubscription);
                //When User comes to communication preferences page from unsubscribe screen, remove origin flag.
                personalizationUtils.commonUtils.clearValues('origin');
                personalizationUtils.commonUtils.clearValues('subid');
            }

            $('#nextButton', elem).off().on('click', handleNextScreen);
            $('#finishButton', elem).off().on('click', handleFinishScreen);
            $('.save-changes-btn', elem).off().on('click', handleSaveChanges);
            $('.cancel-btn', elem).off().on('click', handleCancelChanges);
            $('.subscription-optin-checkbox', elem).off().on('click', handleSubscriptionOptIn);
            $('.communication-optin-checkbox', elem).off().on('click', handleCommunicationOptIn);
            $(document).on("click", ".save-changes-modal .continue", saveChangesContinue);

            // handle unsaved changes
            //Add all the anchor tag classes in ":not" for which we don't need to show saving changes Popup
            $(document).on('click', 'a:not(#toggle-nav)', function(e) {
                if (!registrationFlow) {
                    var url = $(e.currentTarget).attr('href');
                    if (url.indexOf('kpmglearnmore') > -1) {
                        return false;
                    }
                    e.preventDefault();
                    checkForUnsavedChanges(url);
                }
            });

            $(document).on('logout.click', function() {
                if (!registrationFlow) {
                    checkForUnsavedChanges('logout');
                } else {
                    Mykpmgflyout.logoutUser();
                }
            });

            $(document).on('interestssummary.click', function() {
                if (!registrationFlow) {
                    var url = $('.module-interestssummary').find('.interestssummary-container a').attr('href');
                    checkForUnsavedChanges(url);
                }
            });

            $(document).on('librarysummary.click', function() {
                if (!registrationFlow) {
                    var url = $('.module-librarysummary').find('.librarysummary-container a').attr('href');
                    checkForUnsavedChanges(url);
                }
            });

            // check for search results navigation
            $(document).on('communicationpreference.search', function(e, data) {
                checkForUnsavedChanges(data.searchUrl);
            });

            // This is for global navigation in mobile
            $('.sidr').on('click', 'a', function(e) {
                var temp = $(e.currentTarget).attr('data-target') || '';
                if (temp !== '#kpmgModal' && !registrationFlow) {
                    var url = $(e.currentTarget).attr('href');
                    e.preventDefault();
                    checkForUnsavedChanges(url, true);
                }
            });

            function checkForUnsavedChanges(url, isGlobalNav) {
                try {
                    // || window.kpmgPersonalize.preferenceChange
                    if (!$('.save-changes-btn').hasClass('disable-action')) {
                        if (isGlobalNav) {
                            $('#toggle-nav').trigger('click');
                        }
                        saveChangesDialog(url);
                    } else {
                        window.location = url;
                    }
                } catch (e) {
                    console.log("Error occured in communication preferences page on anchor click!" + e);
                    window.location = url;
                }
            }

            function saveChangesDialog(url) {
                var $saveChangesModal = $('.save-changes-modal');
                if ($saveChangesModal.is(':visible')) {
                    return false;
                }
                $saveChangesModal.data('url', url);
                $("html, body").animate({
                    scrollTop: $(document).height()
                }, "slow", function() {
                    $saveChangesModal.modal({
                        show: true,
                        backdrop: 'static',
                        keyboard: false
                    });
                });
            }

            function saveChangesContinue() {
                var $saveChangesModal = $('.save-changes-modal'),
                    url = $saveChangesModal.data('url');

                $('.save-changes-modal').modal('hide');

                if (url === 'logout') {
                    Mykpmgflyout.logoutUser();
                } else {
                    $(".loader-overlay").appendTo('body').show();
                    window.location = url;
                }
            }

            function showChangesSavedModal(dialogSelector, timeout) {
                timeout = timeout || 3000;
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
                $(dialogSelector).modal({
                    show: true,
                    backdrop: 'static',
                    keyboard: false
                });
                $(".changes-saved .modal-dialog .modal-body .success-msg").trigger('focus').attr("tabindex", "0");
                setTimeout(function() {
                    $(dialogSelector).modal('hide');
                }, timeout);
            }

            function toggleSubscription(e) {
                var $this = registrationFlow ? $(e.currentTarget) : $(e.currentTarget).parents('.list-item'),
                    subscriptionId = $this.data('subscriptionId'),
                    data = $this.data(),
                    addIcon = 'icon-add',
                    minusIcon = 'icon-minus';

                if (!registrationFlow) {
                    // This is to handle toggle button select/unselect state
                    $this.find('input').prop("checked", !$this.find('input').prop("checked"));
                }

                if ($this.hasClass(subscribeClass)) {
                    $this.removeClass(subscribeClass).addClass(unsubscribeClass);
                    $this.find('.selection-icon').removeClass(minusIcon).addClass(addIcon);
                } else {
                    $this.removeClass(unsubscribeClass).addClass(subscribeClass);
                    $this.find('.selection-icon').removeClass(addIcon).addClass(minusIcon);
                }

                // loop through all subscription to check for changes
                checkSubscriptionsChangeValues();

                if( ($(".subscription-optin-checkbox").is(':checked') !== currentSubscriptionOptInValue) ||
                    ($(".communication-optin-checkbox").is(':checked') !== currentCommunicationOptInValue) ||
                    (subscriptionsChanged) ) {
                    enableSaveAndCancelCTAs();
                    window.kpmgPersonalize.preferenceChange = true;
                } else {
                    disableSaveAndCancelCTAs();
                    window.kpmgPersonalize.preferenceChange = false;
                }

            }

            function checkSubscriptionsChangeValues() {
                subscriptionsChanged = false;
                $(".list-item").each(function() {
                    var $this = $(this),
                        subscriptionId = $this.data('subscriptionId');
                    if ($this.find('input').prop('checked') !== defaultSubscriptionValueObj["" + subscriptionId]) {
                        subscriptionsChanged = true;
                        return false;
                    }
                });

            }

            function handleNextScreen() {
                saveUserSubscribtions('.list-item', subscribeClass)
                    .then(function(response) {
                        analyticsStepCounterTracking(true,'2');
                        personalizationUtils.pathUtils.gotoPage("registration-interests.html" + window.location.search);
                    });
            }

            function handleFinishScreen() {
                personalizationUtils.commonUtils.clearValues('industrycheck');
                saveUserSubscribtions('.list-item', subscribeClass)
                    .then(function(response) {
                        if (personalizationUtils.commonUtils.getUrlParamsObj().redirectURL) {

                            var registrationDoneHeader = window.kpmgPersonalize.i18n.gigyaMsgs.kpmg_registration_done_header,
                                redirectURL = personalizationUtils.commonUtils.getUrlParamsObj().redirectURL || '',
                                $loginDoneModal = $('.login-done-modal');

                            regUserInfo.saveArticleToLibrary();

                            $loginDoneModal.find('.heading').html(registrationDoneHeader);
                            $loginDoneModal.find('.description').html(window.kpmgPersonalize.i18n.gigyaMsgs.kpmg_thank_you_text);
                            $loginDoneModal.find('.return-to-article').attr("href", decodeURIComponent(redirectURL) || getAbsolutePath("../../home.html"));
                            $loginDoneModal.find('.go-to-dashboard').attr("href", getAbsolutePath(window.location.origin + links.dashboard.url));

                            $("html, body").animate({
                                scrollTop: 0
                            }, "slow", function() {
                                $loginDoneModal.bs3modal({
                                    show: true,
                                    backdrop: 'static',
                                    keyboard: false
                                });
                            });

                        } else {
                            analyticsStepCounterTracking(false,'3');
                            if (personalizationUtils.commonUtils.getValue('redirectToBlog')) {
                                personalizationUtils.commonUtils.clearValues('redirectToBlog');

                                var blogPostUrl = personalizationUtils.commonUtils.getValue('blogPostUrl');
                                if(blogPostUrl) {
                                    personalizationUtils.commonUtils.clearValues('blogPostUrl');
                                    personalizationUtils.pathUtils.gotoPage(blogPostUrl);
                                } else {
                                    personalizationUtils.pathUtils.gotoPage("../../../../" + window.kpmgPersonalize.blogHomePage);
                                }
                            } else {
                                personalizationUtils.pathUtils.gotoPage("../../../../" + links.dashboard.url);
                            }
                        }
                    });
            }

            // enable save and cancel after some changes
            function enableSaveAndCancelCTAs() {
                $('.cancel-btn').removeClass('disable-action');
                $('.save-changes-btn').removeClass('disable-action');
            }

            // enable save and cancel after some changes
            function disableSaveAndCancelCTAs() {
                $('.cancel-btn').addClass('disable-action');
                $('.save-changes-btn').addClass('disable-action');
            }

            // add subscription opt in value for gigya update
            function handleSubscriptionOptIn(e){
                if( ($(e.currentTarget).is(':checked') !== currentSubscriptionOptInValue) ||
                    ($(".communication-optin-checkbox").is(':checked') !== currentCommunicationOptInValue) ||
                    (subscriptionsChanged) ) {
                    enableSaveAndCancelCTAs();
                    window.kpmgPersonalize.preferenceChange = true;
                } else {
                    disableSaveAndCancelCTAs();
                    window.kpmgPersonalize.preferenceChange = false;
                }

                if (!$(e.currentTarget).is(':checked')) {
                    $('.subscription-list-wraper').addClass('disable-action');
                    // disable each and every subscription
                    $('.list-item').each(function() {
                        $(this).find('label').css("pointer-events", "none");
                        $(this).find('input').prop("disabled", true);
                    });
                } else {
                    $('.subscription-list-wraper').removeClass('disable-action');
                    // enable each and every subscription
                    $('.list-item').each(function() {
                        $(this).find('label').css("pointer-events", "auto");
                        $(this).find('input').prop("disabled", false);
                    });
                }
            }

            // add subscription opt in value for gigya update
            function handleCommunicationOptIn(e){
                if( ($(e.currentTarget).is(':checked') !== currentCommunicationOptInValue) ||
                    ($(".subscription-optin-checkbox").is(':checked')!== currentSubscriptionOptInValue) ||
                    (subscriptionsChanged) ) {
                    enableSaveAndCancelCTAs();
                    window.kpmgPersonalize.preferenceChange = true;
                } else {
                    disableSaveAndCancelCTAs();
                    window.kpmgPersonalize.preferenceChange = false;
                }
            }

            // on cancel update back to initial changes
            function handleCancelChanges() {
                // revert all the changes and stay on page
                updateRegistrationUserInfoDetails();
                updateSubscriptionDetails();
                disableSaveAndCancelCTAs();
                // reset unsaved changes flag to false
                window.kpmgPersonalize.preferenceChange = false;
            }

            // fetching only modified subscriptions
            function updatedCommunicationSubscriptionsList(ele) {
                var commSubscriptions = personalizationUtils.accountUtils.getInfo().subscriptions[locale.countryCode][locale.languageCode];
                $(ele).each(function() {
                    var $this = $(this),
                        subscriptionId = $this.data('subscriptionId'),
                        data = $this.data();
                    if (!$.isEmptyObject(commSubscriptions)) {
                        $.each(commSubscriptions, function(id, value) {
                            if (subscriptionId === id && $this.find('input').is(':checked') !== value.email.isSubscribed) {
                                currentCommSubscriptions[subscriptionId] = {
                                    email: {
                                        isSubscribed: $this.find('input').is(':checked'),
                                        tags: data.externalId + '|' + data.title + '|' + data.frequency + '|' + locale.countryCode + '-' + locale.languageCode
                                    }
                                };
                            } else if (!commSubscriptions.hasOwnProperty(subscriptionId) && $this.hasClass('subscribe')) {
                                currentCommSubscriptions[subscriptionId] = {
                                    email: {
                                        isSubscribed: $this.find('input').is(':checked'),
                                        tags: data.externalId + '|' + data.title + '|' + data.frequency + '|' + locale.countryCode + '-' + locale.languageCode
                                    }
                                };
                            }
                        });
                    }
                });
                // updating subscription opt in value
                if (!$.isEmptyObject(commSubscriptions)) {
                    if (currentSubscriptionOptInValue !== undefined && $('.subscription-optin-checkbox').length && $('.subscription-optin-checkbox').is(':checked') !== currentSubscriptionOptInValue) {
                        currentCommSubscriptions.subscription_opt_in = {
                            email: {
                                isSubscribed: $('.subscription-optin-checkbox').is(':checked')
                            }
                        };
                    }
                    // updating communication opt in value
                    if (currentCommunicationOptInValue !== undefined && $('.communication-optin-checkbox').length && $('.communication-optin-checkbox').is(':checked') !== currentCommunicationOptInValue) {
                        currentCommSubscriptions.communication_opt_in = {
                            email: {
                                isSubscribed: $('.communication-optin-checkbox').is(':checked')
                            }
                        };
                    }
                } else {
                    if ($('.subscription-optin-checkbox').length && $('.subscription-optin-checkbox').is(':checked') !== currentSubscriptionOptInValue) {
                        currentCommSubscriptions.subscription_opt_in = {
                            email: {
                                isSubscribed: $('.subscription-optin-checkbox').is(':checked')
                            }
                        };
                    }
                    if ($('.communication-optin-checkbox').length && $('.communication-optin-checkbox').is(':checked') !== currentCommunicationOptInValue) {
                        currentCommSubscriptions.communication_opt_in = {
                            email: {
                                isSubscribed: $('.communication-optin-checkbox').is(':checked')
                            }
                        };
                    }
                }
            }

            // save changes successfully
            function handleSaveChanges() {
                currentCommSubscriptions = {};
                updatedCommunicationSubscriptionsList('.list-item');
                saveUserSubscribtions('.list-item', subscribeClass, unsubscribeClass);
            }

            function saveUserSubscribtions(ele, subscribe, unsubscribe) {
                $subscriptionsOverlay.show();
                var subscriptions = registrationFlow ? pickUserSubscriptions(ele, subscribe, unsubscribe) : currentCommSubscriptions,
                    deferred = $.Deferred();

                var currentCountryCode = locale.countryCode,
                    currentLanguageCode = locale.languageCode,
                    newSubscriptions = {};

                newSubscriptions[currentCountryCode] = {};
                newSubscriptions[currentCountryCode][currentLanguageCode] = subscriptions;

                if (!$.isEmptyObject(subscriptions)) {
                    window.gigya.accounts.setAccountInfo({
                        subscriptions: newSubscriptions,
                        callback: function(response) {
                            var trackingObj = {};
                            if (response.errorCode === 0) {
                                var getAccountInfoData = personalizationUtils.accountUtils.getInfo();
                                if (getAccountInfoData && getAccountInfoData !== null) {
                                    getAccountInfoData.subscriptions = getAccountInfoData.subscriptions || {};
                                    $.extend(getAccountInfoData.subscriptions[currentCountryCode][currentLanguageCode], subscriptions);
                                    personalizationUtils.accountUtils.setInfo(getAccountInfoData);
                                }

                                if (!registrationFlow) {
                                    showChangesSavedModal('.changes-saved');
                                    if (subscriptions.subscription_opt_in && subscriptions.subscription_opt_in.email) {
                                        currentSubscriptionOptInValue = subscriptions.subscription_opt_in.email.isSubscribed;
                                    }
                                    if (subscriptions.communication_opt_in && subscriptions.communication_opt_in.email) {
                                        currentCommunicationOptInValue = subscriptions.communication_opt_in.email.isSubscribed;
                                    }
                                    disableSaveAndCancelCTAs();
                                    // reset unsaved changes flag to false
                                    window.kpmgPersonalize.preferenceChange = false;
                                    trackingObj = getTrackingObject('profile', subscriptions);

                                    trck.satelliteTracking(trackingObj, 'profileManagement', false);
                                    trck.track('profileManagement', '');
                                } else {
                                    trackingObj = getTrackingObject('registration', subscriptions);
                                    trck.satelliteTracking(trackingObj, 'RegistrationComplete', false);
                                    trck.track('RegistrationComplete', '');
                                }
                                deferred.resolve();
                            } else {

                                genericErrorDialog.showDialog();
                                logger.error("Error in storing preferences.\n\tMSG:", response.errorMessage);
                                deferred.reject();
                            }
                            $subscriptionsOverlay.hide();
                        }
                    });
                } else if (registrationFlow) {
                    deferred.resolve();
                    $subscriptionsOverlay.hide();
                } else {
                    disableSaveAndCancelCTAs();
                    $subscriptionsOverlay.hide();
                }
                return deferred;
            }

            function pickUserSubscriptions(ele, subscribe, unsubscribe) {
                var subscriptions = {};
                $(ele).each(function() {
                    var $this = $(this),
                        subscriptionId = $this.data('subscriptionId'),
                        data = $this.data();
                    if (subscriptionId) {
                        if (subscribe && $this.hasClass(subscribe)) {
                            subscriptions[subscriptionId] = {
                                email: {
                                    isSubscribed: true,
                                    tags: data.externalId + '|' + data.title + '|' + data.frequency + '|' + locale.countryCode + '-' + locale.languageCode
                                }
                            };
                        } else if (unsubscribe && $this.hasClass(unsubscribe)) {
                            subscriptions[subscriptionId] = {
                                email: {
                                    isSubscribed: false,
                                    tags: data.externalId + '|' + data.title + '|' + data.frequency + '|' + locale.countryCode + '-' + locale.languageCode
                                }
                            };
                        }
                    }
                });
                return subscriptions;
            }

            function updateRegistrationUserInfoDetails() {
                var subscriptionOptIn = $('.module-subscription-preferences').find('.subscription-optin-checkbox'),
                    communicationOptIn = $('.module-subscription-preferences').find('.communication-optin-checkbox'),
                    subscriptionObj = personalizationUtils.accountUtils.getInfo().subscriptions[locale.countryCode][locale.languageCode];

                if (!$.isEmptyObject(subscriptionObj) && currentCommunicationOptInValue) {
                    communicationOptIn.prop("checked", true);
                } else {
                    communicationOptIn.prop("checked", false);
                }

                if (!$.isEmptyObject(subscriptionObj) && currentSubscriptionOptInValue) {
                    subscriptionOptIn.prop("checked", true);
                    $('.list-item').each(function() {
                        $(this).find('label').css("pointer-events", "auto");
                        $(this).find('input').prop("disabled", false);
                    });
                    $('.subscription-list-wraper').removeClass('disable-action');
                } else {
                    subscriptionOptIn.prop("checked", false);
                    $('.list-item').each(function() {
                        $(this).find('label').css("pointer-events", "none");
                        $(this).find('input').prop("disabled", true);
                    });
                    $('.subscription-list-wraper').addClass('disable-action');
                }
            }

            function updateSubscriptionDetails() {
                var currentCountryCode = locale.countryCode,
                    currentLanguageCode = locale.languageCode,
                    subscriptionObj = personalizationUtils.accountUtils.getInfo().subscriptions[currentCountryCode][currentLanguageCode];
                if (!$.isEmptyObject(subscriptionObj)) {
                    $(".list-item").each(function() {
                        var $this = $(this),
                            subscriptionId = $this.data('subscriptionId'),
                            data = $this.data();
                        defaultSubscriptionValueObj["" + subscriptionId] = false;
                        $.each(subscriptionObj, function(id, value) {
                            if (subscriptionId === id && value.email.isSubscribed) {
                                $this.find('input').prop('checked', true);
                                $this.addClass('subscribe');
                                defaultSubscriptionValueObj["" + subscriptionId] = value.email.isSubscribed;
                            } else if (subscriptionId === id && !value.email.isSubscribed) {
                                $this.find('input').prop('checked', false);
                                $this.addClass('unsubscribe');
                                if($this.hasClass('private')){
                                    $this.remove();
                                }
                            } else if (!subscriptionObj.hasOwnProperty(subscriptionId)) {
                                $this.find('input').prop('checked', false);
                                $this.addClass('unsubscribe');
                                if($this.hasClass('private')){
                                    $this.remove();
                                }
                            }
                        });
                    });
                }                
            }

            function getTrackingObject(flow, subscriptions) {

                var trackingObj = {
                        Register: {
                            Preferences: []
                        }
                    },
                    trackStr = '';

                for (var i in subscriptions) {
                    if (flow === 'registration') {
                        if (subscriptions[i] && subscriptions[i].email && subscriptions[i].email.isSubscribed === true) {
                            trackStr = locale.countryCode + '_' + locale.languageCode + '_' + i + ':selected';
                            if($('[data-subscription-id="'+i+'"]' ).closest('#selectedSubscriptionList').length) {
                                trackStr += ':rec';
                            } else {
                                trackStr += ':gen';
                            }
                            trackingObj.Register.Preferences.push(trackStr);
                        }
                    } else {
                        if (subscriptions[i] && subscriptions[i].email && subscriptions[i].email.isSubscribed === true) {
                            if (i === 'subscription_opt_in') {
                                trackStr = locale.countryCode + '_' + locale.languageCode + '_' + 'SubscriptionOptIn:selected';
                            } else if (i === 'communication_opt_in') {
                                trackStr = locale.countryCode + '_' + locale.languageCode + '_' + 'CommunicationOptIn:selected';
                            } else {
                                trackStr = locale.countryCode + '_' + locale.languageCode + '_' + i + ':selected';
                            }

                            trackingObj.Register.Preferences.push(trackStr);
                        } else if (subscriptions[i] && subscriptions[i].email && subscriptions[i].email.isSubscribed === false) {
                            if (i === 'subscription_opt_in') {
                                trackStr = locale.countryCode + '_' + locale.languageCode + '_' + 'SubscriptionOptIn:unselected';
                            } else if (i === 'communication_opt_in') {
                                trackStr = locale.countryCode + '_' + locale.languageCode + '_' + 'CommunicationOptIn:unselected';
                            } else {
                                trackStr = locale.countryCode + '_' + locale.languageCode + '_' + i + ':unselected';
                            }

                            trackingObj.Register.Preferences.push(trackStr);
                        }
                    }
                }
                trackingObj.Register.Preferences.push('country:' + locale.countryCode + ':selected');
                trackingObj.Register.Preferences.push('country:' + locale.countryCode + ':' + locale.languageCode);

                return trackingObj;
            }

            function getAccountInfo() {
                var deferred = $.Deferred();
                window.gigya.accounts.getAccountInfo({
                    include: personalizationUtils.constants.UserAccountIncludes.join(','),
                    callback: function(response) {
                        if (response.errorCode === 0) {
                            deferred.resolve(response);
                        } else {
                            deferred.resolve();
                        }
                    }
                });

                return deferred;
            }

            function initializeComponent(response) {
                var currentCountryCode = locale.countryCode,
                    currentLanguageCode = locale.languageCode;

                accountInfo = personalizationUtils.accountUtils.getInfo();
                if (response && response.subscriptions) {
                    $.extend(accountInfo.subscriptions, response.subscriptions);
                    personalizationUtils.accountUtils.setInfo(accountInfo);
                }

                currentSubscription_opt_in = accountInfo &&
                    accountInfo.subscriptions &&
                    accountInfo.subscriptions[currentCountryCode] &&
                    accountInfo.subscriptions[currentCountryCode][currentLanguageCode] &&
                    accountInfo.subscriptions[currentCountryCode][currentLanguageCode];
                currentCommunication_opt_in = accountInfo &&
                    accountInfo.subscriptions &&
                    accountInfo.subscriptions[currentCountryCode] &&
                    accountInfo.subscriptions[currentCountryCode][currentLanguageCode] &&
                    accountInfo.subscriptions[currentCountryCode][currentLanguageCode];
                currentSubscriptionOptInValue = currentSubscription_opt_in.subscription_opt_in &&
                    currentSubscription_opt_in.subscription_opt_in.email &&
                    currentSubscription_opt_in.subscription_opt_in.email.isSubscribed;
                currentCommunicationOptInValue = currentCommunication_opt_in.communication_opt_in &&
                    currentCommunication_opt_in.communication_opt_in.email &&
                    currentCommunication_opt_in.communication_opt_in.email.isSubscribed;

                // populate communication and subscription opt in values on page load
                updateRegistrationUserInfoDetails();

                // populate individual subscriptions values on page load
                updateSubscriptionDetails();
            }

            $(".list-item, .btn", elem).on("keyup", function(e) {
                if (registrationFlow) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).addClass('focusOutline');
                    } else if (e.which === 13) {
                        $(this).trigger("click");
                    }
                }
            });
            $(".list-item, .btn", elem).on("blur", function() {
                $(this).removeClass('focusOutline');
            });

            // accessibility
            $(".subscription-optin", elem).on("keyup", function(e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).find('label').addClass('focusOutline');
                } else if (e.which === 13) {
                    $(this).find('input').trigger("click");
                }
            });

            $(".subscription-optin", elem).on("blur", function() {
                $(this).find('label').removeClass('focusOutline');
            });

            $(".communication-optin", elem).on("keyup", function(e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).find('label').addClass('focusOutline');
                } else if (e.which === 13) {
                    $(this).find('input').trigger("click");
                }
            });

            $(".communication-optin", elem).on("blur", function() {
                $(this).find('label').removeClass('focusOutline');
            });

            $(".list-item", elem).on("keyup", function(e) {
                if ($('.subscription-optin-checkbox').prop('checked')) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).find('.communication-subscriptions-row').addClass('focusOutline');
                    } else if (e.which === 13) {
                        $(this).find('input').trigger("click");
                    }
                }
            });
            $(".list-item", elem).on("blur", function() {
                if ($('.subscription-optin-checkbox').prop('checked')) {
                    $(this).find('.communication-subscriptions-row').removeClass('focusOutline');
                }
            });

            $(".cancel-btn", elem).on("keyup", function(e) {
                if (!$('.cancel-btn').hasClass('disable-action')) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).addClass('focusOutline');
                    } else if (e.which === 13) {
                        $(this).trigger("click");
                    }
                }
            });

            $(".cancel-btn", elem).on("blur", function() {
                if (!$('.cancel-btn').hasClass('disable-action')) {
                    $(this).removeClass('focusOutline');
                }
            });

            $(".save-changes-btn", elem).on("keyup", function(e) {
                if (!$('.save-changes-btn').hasClass('disable-action')) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).addClass('focusOutline');
                    } else if (e.which === 13) {
                        $(this).trigger("click");
                    }
                }
            });

            $(".save-changes-btn", elem).on("blur", function() {
                if (!$('.save-changes-btn').hasClass('disable-action')) {
                    $(this).removeClass('focusOutline');
                }
            });

            function registrationSubscriptionSearch() {
                var url = personalizationUtils.constants.interestsServiceURL
                    .replace(/<countryCode>/g, window.kpmgPersonalize.snp.params.countryCode)
                    .replace(/<languageCode>/g, window.kpmgPersonalize.snp.params.languageCode)
                    .replace(/<boolean>/g, "false");

                $.ajax({
                    url: url,
                    success: function(response) {
                        $.each(response.tags, function(index, val) {
                            for (var i = 0; i < val.tags.length; i++) {
                                allAvailableInterests.push(val.tags[i].name);
                                allinterestswithID.push({
                                    zthesID: val.tags[i]["zthes-id"],
                                    name: val.tags[i].name
                                });
                            }
                        });
                        // sort the array data once all record is loaded.
                        if(allAvailableInterests.length >0){
                            allAvailableInterests.sort();
                        }
                    }
                });
                var urlSubscriptions = '/bin/kpmg/subscriptions.' + window.kpmgPersonalize.snp.params.countryCode + "." + window.kpmgPersonalize.snp.params.languageCode + '.json';
                $.ajax({
                    url: urlSubscriptions,
                    success: function(response) {
                        $.map(response.data, function(value, key) {
                            if (key === "groupList") {
                                groupListEnabled = true;
                            }
                        });
                        if (groupListEnabled) {
                            allSubscriptionGroups.groupList = response.data.groupList;
                        } else {
                            for(var i = 0; i < response.data.subscription.length; i++){
                                response.data.subscription[i].gigyamapping = response.data.subscription[i].gigyaMapping;
                                delete response.data.subscription[i].gigyaMapping;
                            }
                            allSubscription.subscription = response.data.subscription;
                        }
                        onboardingAssociatedSubscriptions();
                    },
                    error: function(response) {
                        console.log("error");
                    }
                });
            }

            function interestSelectedOnFirststep() {
                var firststepInterestsList = personalizationUtils.accountUtils.getInfo().data.preferences,
                    firstStepInterestSelected = [];

                var level1Interest = JSON.parse(firststepInterestsList);
                for (var key in level1Interest) {
                    if (level1Interest.hasOwnProperty(key)) {
                        var level2Interest = level1Interest[key];

                        for (var keyTwo in level2Interest) {
                            if (level2Interest.hasOwnProperty(keyTwo)) {
                                firstStepInterestSelected.push(keyTwo);
                            }
                        }

                    }
                }
                if (firstStepInterestSelected.length > 0) {
                    $.each(allinterestswithID, function(name, value) {
                        for (var i = 0; i < firstStepInterestSelected.length; i++) {
                            if (firstStepInterestSelected[i] === value.zthesID) {
                                selectedInterests.push(value);
                            }
                        }
                    });
                    selectedInterestTags();
                }
            }

            function selectedInterestTags() {
                $('.subscription-preferences-tags').empty();
                $.each(uniqueArray(selectedInterests), function(index, item) {
                    $('.subscription-preferences-tags').append('<span>' + item.name + '<button id="' + item.zthesID + '">x</button></span>');

                });
                if (selectedInterests.length === 0) {
                    $(".subscription-preferences-tags").hide();
                    $(".selected-interests-header-text").removeClass('showHide');
                } else {
                    $(".subscription-preferences-tags").show();
                    $(".selected-interests-header-text").addClass('showHide');
                }
                associatedSubscriptions(uniqueArray(selectedInterests));
            }

            
            function uniqueArray(arrayVal){
                var uniqueArrayVal = [];
                $.each(arrayVal, function(i, el){
                    if($.inArray(el, uniqueArrayVal) === -1){ uniqueArrayVal.push(el); }
                });
                return uniqueArrayVal;
            }

            function onboardingAssociatedSubscriptions() {
                var onboardingSubscriptionsList,
                origin = personalizationUtils.commonUtils.getUrlParamsObj().origin || '';
                if(origin) {
                    if(origin==="external"){
                        // subscription ID to get all the subscriptions during on-boarding flow
                        onboardingSubscriptionsList = personalizationUtils.commonUtils.getUrlParamsObj().subid || '';
                    }

                    var onboardingSubscriptions, allSubscriptions = [];
                    if (onboardingSubscriptionsList !== undefined &&
                        onboardingSubscriptionsList !== null &&
                        onboardingSubscriptionsList !== '') {
                        $('.interests-based-subscription-text').hide();
                        $('.interests-based-subscription-text.onboarding').show();
                        onboardingSubscriptions = onboardingSubscriptionsList.split("|");
                        onboardingSubscriptions = uniqueArray(onboardingSubscriptions);
                        if (groupListEnabled) {
                            $.each(allSubscriptionGroups.groupList, function(i, eachgroup) {
                                $.each(eachgroup.subscriptions, function(j, eachsubscription) {
                                    $.each(onboardingSubscriptions, function(indx, onboard) {
                                        if (eachsubscription.externalid === onboard) {
                                            allSubscriptions.push(eachsubscription);
                                        }
                                    });
                                });
                            });
                        } else {
                            $.each(onboardingSubscriptions, function(indx, onboard) {
                                $.each(allSubscription.subscription, function(j, eachsubscription) {
                                    if (eachsubscription.externalid === onboard) {
                                        allSubscriptions.push(eachsubscription);
                                    }
                                });
                            });
                        }
                        SubscriptionsfinalList.subscription = allSubscriptions;
                        reloadSubscriptionListFunction(onboardingSubscriptions);
                        subscriptionsPrint(SubscriptionsfinalList, updateSubscriptionDetails);
                    }
                }
                else {
                    interestSelectedOnFirststep();
                }

            }

            function associatedSubscriptions(value) {
                var selectedeSubscriptionID = [],
                    preLoadedSubscriptionsList = {},
                    subscriptionsFinalList = {},
                    selectedsubscriptions = [],
                    remainingsubscriptions = [];
                if (groupListEnabled) {
                    $.each(allSubscriptionGroups.groupList, function(i, eachgroup) {
                        $.each(eachgroup.subscriptions, function(i, eachsubscription) {
                            if ((Array.isArray(eachsubscription.interests)) && (eachsubscription.interests.length > 0)) {
                                $.each(eachsubscription.interests, function(index, interest) {
                                    $.each(value, function(key, val) {
                                        if (interest === val.zthesID) {
                                            selectedsubscriptions.push(eachsubscription);
                                            selectedeSubscriptionID.push(eachsubscription.externalid);
                                        }
                                    });
                                });
                            }
                        });
                    });
                } else {
                    $.each(allSubscription.subscription, function(i, eachsubscription) {
                        if ((Array.isArray(eachsubscription.interests)) && (eachsubscription.interests.length > 0)) {
                            $.each(eachsubscription.interests, function(index, interest) {
                                $.each(value, function(key, val) {
                                    if (interest === val.zthesID) {
                                        selectedsubscriptions.push(eachsubscription);
                                        selectedeSubscriptionID.push(eachsubscription.externalid);
                                    }
                                });
                            });
                        }
                    });
                }
                personalizationUtils.commonUtils.setValue('associatedSubscriptions', true);
                subscriptionsFinalList.subscription = uniqueArray(selectedsubscriptions);
                reloadSubscriptionListFunction(uniqueArray(selectedeSubscriptionID));
                subscriptionsPrint(subscriptionsFinalList, updateSubscriptionDetails);
                personalizationUtils.commonUtils.clearValues('associatedSubscriptions'); 
                // remove the associatedSubscriptions flag after updateSubscriptionDetails
            }
            function reloadSubscriptionListFunction(subsId) {
                var includeSubs = [],
                    reloadSubscriptionList = {},
                    groupArray = [],
                    groupedSubs = {};
                if (groupListEnabled) {
                    $.each(allSubscriptionGroups.groupList, function(i, eachgroup) {
                        var eachGroup = {};
                        eachGroup.groupname = eachgroup.groupname;
                        var groupSubs = $.grep(eachgroup.subscriptions, function(e) {
                            return subsId.indexOf(e.externalid) === -1;
                        });
                        eachGroup.subscriptions = groupSubs;
                        groupArray.push(eachGroup);
                    });
                    groupedSubs.groupList = groupArray;
                    registerationGroupPrint(groupedSubs, updateSubscriptionDetails);
                } else {
                    includeSubs = $.grep(allSubscription.subscription, function(e) {
                        return subsId.indexOf(e.externalid) === -1;
                    });
                    reloadSubscriptionList.subscription = includeSubs;
                    communicationSubscriptionsPrint(reloadSubscriptionList, updateSubscriptionDetails);
                }
            }
            function subscriptionsPrint(obj,callback) {
                if(obj === undefined || obj.subscription.length===0) {
                    $('.subscription-preferences-subscribedList').hide();
                } else{
                    $('.subscription-preferences-subscribedList').show();
                }
                $('#selectedSubscriptionList').empty();
                var theTemplateScript = '';
                if(personalizationUtils.commonUtils.getValue('associatedSubscriptions')){
                    theTemplateScript = '{{#if subscription}}<ul class="col-md-12 row subscription-list">{{#each subscription}}<li class="list-item {{#if privateFlag}}private{{/if}}" data-subscription-id="{{gigyamapping}}" data-external-id="{{externalid}}" data-frequency="{{frequency}}" data-title="{{title}}" tabindex="0"><div class="table-wraper"><div class="col-1"><div class="title">{{title}}</div><p class="description">{{description}}</p></div><div class="col-2"><div class="icon-wraper"><span class="selection-icon icon-add"></span></div><div class="frequency">{{frequencytext}}</div></div></li>{{/each}}</ul>{{/if}}';                
                }else{
                    theTemplateScript = '{{#if subscription}}<ul class="col-md-12 row subscription-list">{{#each subscription}}<li class="list-item" data-subscription-id="{{gigyamapping}}" data-external-id="{{externalid}}" data-frequency="{{frequency}}" data-title="{{title}}" tabindex="0"><div class="table-wraper"><div class="col-1"><div class="title">{{title}}</div><p class="description">{{description}}</p></div><div class="col-2"><div class="icon-wraper"><span class="selection-icon icon-add"></span></div><div class="frequency">{{frequencytext}}</div></div></li>{{/each}}</ul>{{/if}}';                
                }
                var theTemplate = Handlebars.compile(theTemplateScript);
                var theCompiledHtml = theTemplate(obj);
                $('#selectedSubscriptionList').append(theCompiledHtml);
                callback();
            }
            function communicationSubscriptionsPrint(reloadsub,callback) {
                $('.subscription-list-search-wraper .subscription-list').empty();
                var theTemplateScript = '{{#if subscription}}{{#each subscription}}<li class="list-item {{#if privateFlag}}private{{/if}}" data-subscription-id="{{gigyamapping}}" data-external-id="{{externalid}}" data-frequency="{{frequency}}" data-title="{{title}}" tabindex="0"><div class="table-wraper"><div class="col-1"><div class="title">{{title}}</div><p class="description">{{description}}</p></div><div class="col-2"><div class="icon-wraper"><span class="selection-icon icon-add"></span></div><div class="frequency">{{frequencytext}}</div></div></li>{{/each}}{{/if}}';
                var theTemplate = Handlebars.compile(theTemplateScript);
                var theCompiledHtml = theTemplate(reloadsub);
                $('.subscription-list-search-wraper .subscription-list').append(theCompiledHtml);
                scriptonsLengthZero(callback);
            }
            function registerationGroupPrint(reloadgroup,callback) {
                $('.subscription-list-search-wraper .subscriptionGroupList').empty();
                var theTemplateScriptGroup ='{{#each groupList}}<ul class="col-md-12 row subscription-list eachGroupList"><li class="groupHeader">{{groupname}}</li>{{#if subscriptions}}{{#each subscriptions}}<li class="list-item {{#if privateFlag}}private{{/if}}" data-subscription-id="{{gigyamapping}}" data-external-id="{{externalid}}" data-frequency="{{frequency}}" data-title="{{title}}" tabindex="0"><div class="table-wraper"><div class="col-1"><div class="title">{{title}}</div><p class="description">{{description}}</p></div><div class="col-2"><div class="icon-wraper"><span class="selection-icon icon-add"></span></div><div class="frequency">{{frequencytext}}</div></div></li>{{/each}}{{/if}}</ul>{{/each}}';
                var theTemplateGroup = Handlebars.compile(theTemplateScriptGroup);
                var theCompiledGroupHtml = theTemplateGroup(reloadgroup);
                $('.subscription-list-search-wraper .subscriptionGroupList').append(theCompiledGroupHtml);
                $(".eachGroupList").each(function(){
                    var liLength=$(this).find("li.list-item").length;
                    if(liLength===0){
                        $(this).hide();
                    }
                });
                scriptonsLengthZero(callback);
            }
            function scriptonsLengthZero(callback) {
                if(($('.subscription-list-search-wraper li.list-item').length)===0){
                    $('.subscription-list-search-wraper').hide();
                } else {
                    $('.subscription-list-search-wraper').show();
                    callback();
                }
            }

            function analyticsStepCounterTracking(onboardingReg,StepValue){
                var trackingObj={
                    "linkLocationID1": "Step:"+StepValue,
                    "linkLocationID2": "Step:"+StepValue,
                    'linkLocation1': onboardingReg ? "Onboarding Registration":"Registration",
                    'linkLocation2': onboardingReg ? "Onboarding Registration":"Registration",
                    'events': 'event11'
                };
                Helpers.triggerTracking(trackingObj,'Internal Link');
            }

            function analyticsSubscriptionSearch(tagName){
                var wordCount = tagName.split(' ').length;
                if (wordCount>1){
                    tagName = tagName.split(' ').join('+');
                }
                if(window.digitalData){
                    window.digitalData.page.searchInfo ={
                        termList : tagName
                    };
                    trck.track('subscriptionSearchResultsLoad','');
                }
            }
            $(function() {
                registrationSubscriptionSearch();
                $(document).on("click", ".subscription-preferences-tags button", function() {
                    var id = $(this).attr('id');
                    for (var i = 0; i < selectedInterests.length; i++) {
                        if (selectedInterests[i].zthesID === id) {
                            selectedInterests.splice(i, 1);
                            break;
                        }
                    }
                    $(this).remove();
                    selectedInterestTags();
                });
                $(document).on('keypress touchstart', '.subscription-preferences-searchbar input', function(e) {
                    var inputSearchValue = $(this).val(),lowerCase= new RegExp('[a-z]');
                    if (e.keyCode === 13) {
                        if($(this).val().length>0) {
                            $.map(allinterestswithID, function (value, key) {
                                if(inputSearchValue===value.name.toLowerCase()) {
                                    selectedInterests.push(value);
                                    selectedInterestTags();
                                }
                            });
                            $(".ui-autocomplete").hide();
                            $(this).val("");
                        }
                    }
                    $(this).autocomplete({
                        source: function(request, response) {
                            var term = $.ui.autocomplete.escapeRegex(request.term),
                            startsWithMatcher = new RegExp("^" + term, "i"),
                            startsWith = $.grep(allAvailableInterests, function(value) {
                                return startsWithMatcher.test(value.label || value.value || value);
                            }),
                            containsMatcher = new RegExp(term, "i"),
                            contains = $.grep(allAvailableInterests, function (value) {
                                return $.inArray(value, startsWith) < 0 &&
                                containsMatcher.test(value.label || value.value || value);
                            });
                            response(startsWith.concat(contains).slice(0, 5));
                        },
                        minLength: 3,
                        select: function(event, ui) {
                            $.map(allinterestswithID, function(value, key) {
                                if (ui.item.label === value.name) {
                                    selectedInterests.push(value);
                                    analyticsSubscriptionSearch(value.name);
                                }
                            });
                            selectedInterestTags();
                            ui.item.value = "";
                        },
                        open: function (result) {
                            $(this).autocomplete("widget").appendTo(".subscription-preferences-searchbar");
                            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                                $('.ui-autocomplete').off('menufocus hover mouseover');
                            }
                        }
                    });
                });
            });
            getAccountInfo().then(initializeComponent);


            $(document).trigger('template.loaded');
        };

        return SubscriptionPreferences;
    }
);

define(['jquery', 'tracking', 'registrationuserinfo', 'handlebars', 'precompile', 'personalizationUtils', 'genericErrorDialog', 'mykpmgflyout', 'jqueryui', 'underscore', 'personalization'],
    function($, Tracking, regUserInfo, Handlebars, PrecompiledHandlebars, personalizationUtils, genericErrorDialog, Mykpmgflyout, personalization) {
        'use strict';

        var CommunicationPreferences = function(elem, componentName) {
            var links = {},
                logger = personalizationUtils.loggerUtils,
                $subscriptionsOverlay = $('.subscriptions-overlay'),
                subscribeClass = 'subscribe',
                unsubscribeClass = 'unsubscribe',
                locale = personalizationUtils.accountUtils.getLocale(),
                currentCommSubscriptions = {},
                accountInfo = {},
                currentSubscription_opt_in = {},
                currentCommunication_opt_in = {},
                currentSubscriptionOptInValue,
                currentCommunicationOptInValue,
                preferencesWrapperDom = $('.preferences-wrapper'),
                subscriptionsCompName = 'subscriptions',
                tabsCompName = 'tabs',
                subscriptionsTemplate = PrecompiledHandlebars[subscriptionsCompName],
                tabsTemplate = PrecompiledHandlebars[tabsCompName],
                totalCountryList = [],
                emailCheckboxStatus,
                allAvailableInterests = [],
                selectedInterests = [],
                allinterestswithID = [],
                allSubscription = {},
                allLocalSubscription = {},
                allSubscriptionGroups = {},
                groupListEnabled = false,
                SubscriptionsfinalList = {
                    "subscription": []
                };

            personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                links = data.links;
            });

            $(elem).on('click', '.list-item label', toggleSubscription);
            $(elem).on('click', '.subscription-site-heading', handleSiteTabClick);

            $(elem).on('click', '.save-changes-btn', handleSaveChanges);
            $(elem).on('click', '.cancel-btn', handleCancelChanges);
            $(elem).on('click', '.subscription-optin-checkbox', handleSubscriptionOptIn);
            $(elem).on('click', '.communication-optin-checkbox', handleCommunicationOptIn);
            $(document).on("click", ".save-changes-modal .continue", saveChangesContinue);

            // handle unsaved changes
            //Add all the anchor tag classes in ":not" for which we don't need to show saving changes Popup
            $(document).on('click', 'a:not(#toggle-nav, .add-board, .remove-board1, #download-csv-data-link, #delete-account-link, #download-data-link)', function(e) {
                var url = $(e.currentTarget).attr('href');
                if (url.indexOf('kpmglearnmore') > -1) {
                    return false;
                }
                e.preventDefault();
                checkForUnsavedChanges(url);
            });

            $(document).on('logout.click', function() {
                checkForUnsavedChanges('logout');
            });

            $(document).on('interestssummary.click', function() {
                var url = $('.module-interestssummary').find('.interestssummary-container a').attr('href');
                checkForUnsavedChanges(url);
            });

            $(document).on('librarysummary.click', function() {
                var url = $('.module-librarysummary').find('.librarysummary-container a').attr('href');
                checkForUnsavedChanges(url);
            });

            // check for search results navigation
            $(document).on('communicationpreference.search', function(e, data) {
                checkForUnsavedChanges(data.searchUrl);
            });

            // This is for global navigation in mobile
            $('.sidr').on('click', 'a', function(e) {
                var temp = $(e.currentTarget).attr('data-target') || '';
                if (temp !== '#kpmgModal') {
                    var url = $(e.currentTarget).attr('href');
                    e.preventDefault();
                    checkForUnsavedChanges(url, true);
                }
            });

            // check for accordion
            // $(document).on('click', '.card-header', function(e) {
            //     if ($('.save-changes-btn:visible').length && !$('.save-changes-btn:visible').hasClass('disable-action') && !$(this).next().data('open')) {
            //         saveChangesDialog($(this));
            //     }
            // });

            function checkForUnsavedChanges(url, isGlobalNav) {
                try {
                    if ($('.save-changes-btn:visible').length && !$('.save-changes-btn:visible').hasClass('disable-action')) {
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
                    scrollTop: 0
                }, "slow", function() {
                    $saveChangesModal.bs3modal({
                        show: true,
                        backdrop: 'static',
                        keyboard: false
                    });
                });
            }

            function saveChangesContinue() {
                var $saveChangesModal = $('.save-changes-modal'),
                    url = $saveChangesModal.data('url');

                $('.save-changes-modal').bs3modal('hide');
                if (url === 'logout') {
                    Mykpmgflyout.logoutUser();
                }
                // else if(typeof url === 'object'){
                //     $(url).next().data('open', true);
                //     $(url).trigger('click');
                // }
                else {
                    $(".loader-overlay").appendTo('body').show();
                    window.location = url;
                }
            }

            function showChangesSavedModal(dialogSelector, timeout) {
                timeout = timeout || 3000;
                $("html, body").animate({
                    scrollTop: 0
                }, "slow", function() {
                    $(dialogSelector).bs3modal({
                        show: true,
                        backdrop: 'static',
                        keyboard: false
                    });
                });

                $(".changes-saved .modal-dialog .modal-body .success-msg").trigger('focus').attr("tabindex", "0");
                setTimeout(function() {
                    $(dialogSelector).bs3modal('hide');
                }, timeout);
            }

            function toggleSubscription(e) {
                var $this = $(e.currentTarget).parents('.list-item'),
                    site = $this.closest('.card').data('site'),
                    subscriptionId = $this.data('subscriptionId'),
                    data = $this.data(),
                    addIcon = 'icon-add',
                    minusIcon = 'icon-minus';

                // This is to handle toggle button select/unselect state
                $this.find('input').prop("checked", !$this.find('input').prop("checked"));

                if ($this.hasClass(subscribeClass)) {
                    $this.removeClass(subscribeClass).addClass(unsubscribeClass);
                    $this.find('.selection-icon').removeClass(minusIcon).addClass(addIcon);
                } else {
                    $this.removeClass(unsubscribeClass).addClass(subscribeClass);
                    $this.find('.selection-icon').removeClass(addIcon).addClass(minusIcon);
                }
                window.kpmgPersonalize.preferenceChange = true;
                enableSaveAndCancelCTAs(site);
                enableOrDisableEmailContainer(site);
            }


            // enable save and cancel after some changes
            function enableSaveAndCancelCTAs(site) {
                $('#' + site).find('.cancel-btn').removeClass('disable-action');
                $('#' + site).find('.save-changes-btn').removeClass('disable-action');
            }

            function enableOrDisableEmailContainer(site) {
                var siteArray = site.split('_'),
                    accDetails = personalizationUtils.accountUtils.getInfo(),
                    userSubscriptions = (accDetails && accDetails.subscriptions) ? accDetails.subscriptions[siteArray[0]][siteArray[1]] : {},
                    $ele = $('#' + site).find('.list-item'),
                    currSubscriptions = {};

                $ele.each(function() {
                    var $this = $(this),
                        subscriptionId = $this.data('subscriptionId'),
                        data = $this.data();
                    if (!$.isEmptyObject(userSubscriptions)) {
                        $.each(userSubscriptions, function(id, value) {
                            if (subscriptionId === id && $this.find('input').is(':checked') !== value.email.isSubscribed) {
                                currSubscriptions[subscriptionId] = {
                                    email: {
                                        isSubscribed: $this.find('input').is(':checked'),
                                        tags: data.externalId + '|' + data.title + '|' + data.frequency + '|' + siteArray[0] + '-' + siteArray[1]
                                    }
                                };
                            } else if (!userSubscriptions.hasOwnProperty(subscriptionId) && $this.hasClass('subscribe')) {
                                currSubscriptions[subscriptionId] = {
                                    email: {
                                        isSubscribed: $this.find('input').is(':checked'),
                                        tags: data.externalId + '|' + data.title + '|' + data.frequency + '|' + siteArray[0] + '-' + siteArray[1]
                                    }
                                };
                            }
                        });
                    }
                });

                if (!$.isEmptyObject(currSubscriptions)) {
                    $('#' + site).find('.email-checkbox-container').removeClass('disable-action').css("pointer-events", "auto");
                } else {
                    $('#' + site).find('.email-checkbox-container').addClass('disable-action').css("pointer-events", "none");
                    $('#' + site).find('.email-checkbox').prop('checked', false);
                }
            }
            // enable save and cancel after some changes
            function disableSaveAndCancelCTAs(site) {
                $('#' + site).find('.cancel-btn').addClass('disable-action');
                $('#' + site).find('.save-changes-btn').addClass('disable-action');
                $('#' + site).find('.email-checkbox-container').addClass('disable-action').css("pointer-events", "none");
                $('#' + site).find('.email-checkbox').prop('checked', false);
            }

            // add subscription opt in value for gigya update
            function handleSubscriptionOptIn(e) {
                var site = $(e.currentTarget).closest('.card').data('site'),
                    optInCheckbox = getCurrentOptIn(site);
                if ($(e.currentTarget).is(':checked') !== optInCheckbox.currentSubscriptionOptInValue) {
                    enableSaveAndCancelCTAs(site);
                    window.kpmgPersonalize.preferenceChange = true;
                } else {
                    disableSaveAndCancelCTAs(site);
                    window.kpmgPersonalize.preferenceChange = false;
                }
                if (!$(e.currentTarget).is(':checked')) {
                    $('#' + site).find('.subscription-list-wraper').addClass('disable-action');
                    // disable each and every subscription
                    $('#' + site).find('.list-item').each(function() {
                        $(this).find('label').css("pointer-events", "none");
                        $(this).find('input').prop("disabled", true);
                    });
                } else {
                    $('#' + site).find('.subscription-list-wraper').removeClass('disable-action');
                    // enable each and every subscription
                    $('#' + site).find('.list-item').each(function() {
                        $(this).find('label').css("pointer-events", "auto");
                        $(this).find('input').prop("disabled", false);
                    });
                }
            }

            // add subscription opt in value for gigya update
            function handleCommunicationOptIn(e) {
                var site = $(e.currentTarget).closest('.card').data('site'),
                    optInCheckbox = getCurrentOptIn(site);
                if ($(e.currentTarget).is(':checked') !== optInCheckbox.currentCommunicationOptInValue) {
                    enableSaveAndCancelCTAs(site);
                    window.kpmgPersonalize.preferenceChange = true;
                } else {
                    disableSaveAndCancelCTAs(site);
                    window.kpmgPersonalize.preferenceChange = false;
                }
            }

            // on cancel update back to initial changes
            function handleCancelChanges(e) {
                var $this = $(e.currentTarget),
                    site = $this.closest('.card').data('site');
                // revert all the changes and stay on page
                updateRegistrationUserInfoDetails(site);
                updateSubscriptionDetails(site);
                disableSaveAndCancelCTAs(site);
                // reset unsaved changes flag to false
                window.kpmgPersonalize.preferenceChange = false;
            }

            // fetching only modified subscriptions
            function updatedCommunicationSubscriptionsList(site) {
                var optInCheckbox = getCurrentOptIn(site),
                    siteArray = site.split('_'),
                    accDetails = personalizationUtils.accountUtils.getInfo(),
                    commSubscriptions = (accDetails && accDetails.subscriptions && accDetails.subscriptions[siteArray[0]] && accDetails.subscriptions[siteArray[0]][siteArray[1]]) ? accDetails.subscriptions[siteArray[0]][siteArray[1]] : {},
                    $ele = $('#' + site).find('.list-item');

                $ele.each(function() {
                    var $this = $(this),
                        subscriptionId = $this.data('subscriptionId'),
                        data = $this.data();
                    if (!$.isEmptyObject(commSubscriptions)) {
                        $.each(commSubscriptions, function(id, value) {
                            if (subscriptionId === id && $this.find('input').is(':checked') !== value.email.isSubscribed) {
                                currentCommSubscriptions[subscriptionId] = {
                                    email: {
                                        isSubscribed: $this.find('input').is(':checked'),
                                        tags: data.externalId + '|' + data.title + '|' + data.frequency + '|' + siteArray[0] + '-' + siteArray[1]
                                    }
                                };                               

                            } else if (!commSubscriptions.hasOwnProperty(subscriptionId) && $this.hasClass('subscribe')) {
                                currentCommSubscriptions[subscriptionId] = {
                                    email: {
                                        isSubscribed: $this.find('input').is(':checked'),
                                        tags: data.externalId + '|' + data.title + '|' + data.frequency + '|' + siteArray[0] + '-' + siteArray[1]
                                    }
                                };
                            }else{
                                if(data.private && $this.hasClass('unsubscribe')){
                                    $this.remove();
                                }
                            }
                        });
                    }
                });
                // updating subscription opt in value
                if (!$.isEmptyObject(commSubscriptions)) {
                    if (optInCheckbox.currentSubscriptionOptInValue !== undefined && $('#' + site).find('.subscription-optin-checkbox').length && $('#' + site).find('.subscription-optin-checkbox').is(':checked') !== optInCheckbox.currentSubscriptionOptInValue) {
                        currentCommSubscriptions.subscription_opt_in = {
                            email: {
                                isSubscribed: $('#' + site).find('.subscription-optin-checkbox').is(':checked')
                            }
                        };
                    } else if (optInCheckbox.currentSubscriptionOptInValue === undefined) {
                        currentCommSubscriptions.subscription_opt_in = {
                            email: {
                                isSubscribed: $('#' + site).find('.subscription-optin-checkbox').is(':checked')
                            }
                        };
                    }
                    // updating communication opt in value
                    if (optInCheckbox.currentCommunicationOptInValue !== undefined && $('#' + site).find('.communication-optin-checkbox').length && $('#' + site).find('.communication-optin-checkbox').is(':checked') !== optInCheckbox.currentCommunicationOptInValue) {
                        currentCommSubscriptions.communication_opt_in = {
                            email: {
                                isSubscribed: $('#' + site).find('.communication-optin-checkbox').is(':checked')
                            }
                        };
                    } else if (optInCheckbox.currentCommunicationOptInValue === undefined) {
                        currentCommSubscriptions.communication_opt_in = {
                            email: {
                                isSubscribed: $('#' + site).find('.communication-optin-checkbox').is(':checked')
                            }
                        };
                    }
                } else {
                    if ($('#' + site).find('.subscription-optin-checkbox').length && $('#' + site).find('.subscription-optin-checkbox').is(':checked') !== optInCheckbox.currentSubscriptionOptInValue) {
                        currentCommSubscriptions.subscription_opt_in = {
                            email: {
                                isSubscribed: $('#' + site).find('.subscription-optin-checkbox').is(':checked')
                            }
                        };
                    }
                    if ($('#' + site).find('.communication-optin-checkbox').length && $('#' + site).find('.communication-optin-checkbox').is(':checked') !== optInCheckbox.currentCommunicationOptInValue) {
                        currentCommSubscriptions.communication_opt_in = {
                            email: {
                                isSubscribed: $('#' + site).find('.communication-optin-checkbox').is(':checked')
                            }
                        };
                    }
                }
            }

            // save changes successfully
            function handleSaveChanges(e) {
                var $this = $(e.currentTarget),
                    site = $this.closest('.card').data('site'),
                    triggerEmail = false;

                if ($this.closest('.card').find('.email-checkbox').prop('checked') === true) {
                    triggerEmail = true;
                }

                currentCommSubscriptions = {};
                updatedCommunicationSubscriptionsList(site);
                saveUserSubscribtions(site, subscribeClass, unsubscribeClass, triggerEmail);
                // for tracking
                emailCheckboxStatus = triggerEmail;
            }

            function saveUserSubscribtions(site, subscribe, unsubscribe, isTriggerEmail) {
                if ($('#' + site).find('.save-changes-btn').hasClass('disable-action')) {
                    return false;
                }
                $subscriptionsOverlay.show();
                var subscriptions = currentCommSubscriptions,
                    deferred = $.Deferred(),
                    newSubscriptions = {},
                    siteArray = site.split('_');

                newSubscriptions[siteArray[0]] = {};
                newSubscriptions[siteArray[0]][siteArray[1]] = subscriptions;

                if (!$.isEmptyObject(subscriptions)) {
                    window.gigya.accounts.setAccountInfo({
                        subscriptions: newSubscriptions,
                        callback: function(response) {
                            var trackingObj = {};
                            if (response.errorCode === 0) {
                                var getAccountInfoData = personalizationUtils.accountUtils.getInfo();
                                if (getAccountInfoData && getAccountInfoData !== null) {
                                    getAccountInfoData.subscriptions = getAccountInfoData.subscriptions || {};
                                    getAccountInfoData.subscriptions[siteArray[0]] = getAccountInfoData.subscriptions[siteArray[0]] || {};
                                    getAccountInfoData.subscriptions[siteArray[0]][siteArray[1]] = getAccountInfoData.subscriptions[siteArray[0]][siteArray[1]] || {};

                                    $.extend(getAccountInfoData.subscriptions[siteArray[0]][siteArray[1]], subscriptions);
                                    personalizationUtils.accountUtils.setInfo(getAccountInfoData);
                                }

                                if (isTriggerEmail) {
                                    triggerEmail(subscriptions, site);
                                }

                                // reset unsaved changes flag to false
                                window.kpmgPersonalize.preferenceChange = false;
                                trackingObj = getTrackingObject('profile', subscriptions, site);
                                trck.satelliteTracking(trackingObj, 'profileManagement', false);
                                trck.track('profileManagement', '');
                                showChangesSavedModal('.changes-saved');
                                disableSaveAndCancelCTAs(site);
                                deferred.resolve();
                            } else {
                                genericErrorDialog.showDialog();
                                logger.error("Error in storing preferences.\n\tMSG:", response.errorMessage);
                                deferred.reject();
                            }
                            $subscriptionsOverlay.hide();
                        }
                    });
                } else {
                    disableSaveAndCancelCTAs(site);
                    $subscriptionsOverlay.hide();
                }
                return deferred;
            }

            function updateRegistrationUserInfoDetails(site) {
                var subscriptionOptIn = $('#' + site).find('.subscription-optin-checkbox'),
                    communicationOptIn = $('#' + site).find('.communication-optin-checkbox'),
                    optInCheckbox = getCurrentOptIn(site),
                    siteArray = site.split('_'),
                    accDetails = personalizationUtils.accountUtils.getInfo(),
                    subscriptionObj = (accDetails && accDetails.subscriptions) ? accDetails.subscriptions[siteArray[0]][siteArray[1]] : {};

                if (!$.isEmptyObject(subscriptionObj) && optInCheckbox.currentCommunicationOptInValue) {
                    communicationOptIn.prop("checked", true);
                } else {
                    communicationOptIn.prop("checked", false);
                }

                if (!$.isEmptyObject(subscriptionObj) && optInCheckbox.currentSubscriptionOptInValue) {
                    subscriptionOptIn.prop("checked", true);
                    $('#' + site).find('.list-item').each(function() {
                        $(this).find('label').css("pointer-events", "auto");
                        $(this).find('input').prop("disabled", false);
                    });
                    $('#' + site).find('.subscription-list-wraper').removeClass('disable-action');
                } else {
                    subscriptionOptIn.prop("checked", false);
                    $('#' + site).find('.list-item').each(function() {
                        $(this).find('label').css("pointer-events", "none");
                        $(this).find('input').prop("disabled", true);
                    });
                    $('#' + site).find('.subscription-list-wraper').addClass('disable-action');
                }
            }

            function updateSubscriptionDetails(site) {
                var currentCountryCode = site.split('_')[0],
                    currentLanguageCode = site.split('_')[1],
                    accDetails = personalizationUtils.accountUtils.getInfo(),
                    subscriptionObj = (accDetails && accDetails.subscriptions) ? accDetails.subscriptions[currentCountryCode][currentLanguageCode] : {};
                if (!$.isEmptyObject(subscriptionObj)) {
                    $('#' + site).find(".list-item").each(function() {
                        var $this = $(this),
                            subscriptionId = $this.data('subscriptionId'),
                            data = $this.data();
                        $.each(subscriptionObj, function(id, value) { //modify here to make the subscription on and off
                            if (subscriptionId === id && value.email.isSubscribed) {
                                $this.find('input').prop('checked', true);
                                $this.addClass('subscribe');
                                $this.removeClass('unsubscribe');
                            } else if (subscriptionId === id && !value.email.isSubscribed) {
                                $this.find('input').prop('checked', false);
                                $this.addClass('unsubscribe');
                                $this.removeClass('subscribe');
                                if($this.hasClass('private')){
                                    $this.remove();
                                }
                            } else if (!subscriptionObj.hasOwnProperty(subscriptionId)) {
                                $this.find('input').prop('checked', false);
                                $this.addClass('unsubscribe');
                                $this.removeClass('subscribe');
                                if($this.hasClass('private')){
                                    $this.remove();
                                }
                            }
                        });
                    });
                }
            }

            function triggerEmail(subscriptions, site) {
                var subscribedArray = [],
                    unsubscribedArray = [],
                    currentLocaleArray = site.split('_'),
                    subscribedStr = '',
                    unsubscribedStr = '',
                    updatedAccountInfo = personalizationUtils.accountUtils.getInfo();

                for (var key in subscriptions) {
                    if (key !== 'subscription_opt_in' && key !== 'communication_opt_in') {
                        if (subscriptions[key] && subscriptions[key].email && subscriptions[key].email.isSubscribed === true) {
                            subscribedArray.push(subscriptions[key].email.tags.split("|")[1]);
                        } else {
                            unsubscribedArray.push(subscriptions[key].email.tags.split("|")[1]);
                        }
                    }
                }

                subscribedStr = subscribedArray.join('||');
                unsubscribedStr = unsubscribedArray.join('||');

                $.ajax({
                    method: "POST",
                    data: {
                        'subscribedTo': subscribedStr,
                        'unsubscribedFrom': unsubscribedStr,
                        'firstName': updatedAccountInfo.profile.firstName,
                        'lastName': updatedAccountInfo.profile.lastName,
                        'toaddress': updatedAccountInfo.profile.email,
                        'uid': updatedAccountInfo.UID,
                        'UIDSignature': updatedAccountInfo.UIDSignature,
                        'signatureTimestamp': updatedAccountInfo.signatureTimestamp,
                        'locale': '/' + currentLocaleArray[0] + '/' + currentLocaleArray[1]
                    },
                    url: '/bin/kpmg/subscriptionemailservice',
                    success: function(response) {
                        if (response !== null) {
                            var status = response.status;
                            if (status !== 200) {
                                showGenericErrorDialog();
                            }
                        }
                    },
                    error: function(response) {
                        showGenericErrorDialog();
                    }
                });
            }

            function getTrackingObject(flow, subscriptions, site) {
                var trackingObj = {
                        Register: {
                            Preferences: []
                        }
                    },
                    trackStr = '',
                    siteArray = site.split('_');

                for (var i in subscriptions) {
                    if (subscriptions[i] && subscriptions[i].email && subscriptions[i].email.isSubscribed === true) {
                        if (i === 'subscription_opt_in') {
                            trackStr = siteArray[0] + '_' + siteArray[1] + '_' + 'SubscriptionOptIn:selected';
                        } else if (i === 'communication_opt_in') {
                            trackStr = siteArray[0] + '_' + siteArray[1] + '_' + 'CommunicationOptIn:selected';
                        } else {
                            trackStr = siteArray[0] + '_' + siteArray[1] + '_' + i + ':selected';
                        }
                        trackingObj.Register.Preferences.push(trackStr);
                    } else if (subscriptions[i] && subscriptions[i].email && subscriptions[i].email.isSubscribed === false) {
                        if (i === 'subscription_opt_in') {
                            trackStr = siteArray[0] + '_' + siteArray[1] + '_' + 'SubscriptionOptIn:unselected';
                        } else if (i === 'communication_opt_in') {
                            trackStr = siteArray[0] + '_' + siteArray[1] + '_' + 'CommunicationOptIn:unselected';
                        } else {
                            trackStr = siteArray[0] + '_' + siteArray[1] + '_' + i + ':unselected';
                        }
                        trackingObj.Register.Preferences.push(trackStr);
                    }
                }
                // adding email status & if email checkbox is disabled do not populate the value
                if (!$('#' + site).find('.email-checkbox-container').hasClass('disable-action')) {
                    if (emailCheckboxStatus) {
                        trackingObj.Register.Preferences.push(siteArray[0] + '_' + siteArray[1] + '_' + 'EmailCommunicationOptIn:selected');
                    } else {
                        trackingObj.Register.Preferences.push(siteArray[0] + '_' + siteArray[1] + '_' + 'EmailCommunicationOptIn:unselected');
                    }
                }

                trackingObj.Register.Preferences.push('country:' + siteArray[0] + ':selected');
                trackingObj.Register.Preferences.push('country:' + siteArray[0] + ':' + siteArray[1]);
                return trackingObj;
            }

            function getTabsData(site, countryList, isWarning) {
                var subscriptionTabs = {
                        'hbs': {
                            'tabs': {
                                'heading': site.split('_').join('/'),
                                'wrapperId': site + '_wrapper',
                                'headingId': site + '_id',
                                'siteId': site + '_site',
                                'site': site,
                                'warning': isWarning
                            }
                        }
                    },
                    countryObj = {},
                    countryArray = [],
                    heading = [],
                    siteLocale = site.split('_').join('/');

                function copyCategoryToTags(countryData) {
                    if (countryData.category) {
                        countryData.tags = countryData.category;
                        if (Array.isArray(countryData.tags)) {
                            countryData.tags.forEach(copyCategoryToTags);
                        }
                    }
                }

                if (Array.isArray(countryList.category) && countryList.category.length) {
                    countryObj = countryList.category[0];
                    copyCategoryToTags(countryObj);

                    if (Array.isArray(countryObj.category) && countryObj.category.length) {
                        for (var i = 0; i < countryObj.category.length; i++) {
                            if (countryObj.category[i].category && countryObj.category[i].category.length) {
                                Array.prototype.push.apply(countryArray, countryObj.category[i].category);
                            }
                        }
                    }

                    heading = countryArray.filter(function(country) {
                        return country.id === siteLocale;
                    });

                    subscriptionTabs.hbs.tabs.heading = heading[0].name;
                }

                return subscriptionTabs;
            }

            function getSubscriptionSitesList() {
                var listArray = [],
                    sites = [],
                    isWarning = false;

                if (accountInfo) {
                    accountInfo.subscriptions = accountInfo.subscriptions || {};

                    for (var key in accountInfo.subscriptions) {
                        if (key.length === 2 && accountInfo.subscriptions.hasOwnProperty(key)) {
                            isWarning = false;
                            sites = Object.keys(accountInfo.subscriptions[key]);
                            if (accountInfo.subscriptions[key] &&
                                accountInfo.subscriptions[key][sites[0]] &&
                                accountInfo.subscriptions[key][sites[0]].terms &&
                                accountInfo.subscriptions[key][sites[0]].terms.email &&
                                accountInfo.subscriptions[key][sites[0]].terms.email.isSubscribed === false) {
                                isWarning = true;
                            }
                            listArray.push({
                                'key': key.concat('_', sites[0]),
                                'isWarning': isWarning
                            });
                        }
                    }
                }

                return listArray;
            }

            function renderSubscriptionSitesTabs(site, countryList, isWarning) {
                var subscriptionSites = getSubscriptionSitesList(),
                    subscriptionTabs = {};

                subscriptionSites = subscriptionSites.filter(function(item) {
                    return item.key !== site;
                });

                subscriptionTabs = getTabsData(site, countryList, isWarning);
                preferencesWrapperDom.append(tabsTemplate(subscriptionTabs));

                for (var i = 0; i < subscriptionSites.length; i++) {
                    subscriptionTabs = getTabsData(subscriptionSites[i].key, countryList, subscriptionSites[i].isWarning);
                    preferencesWrapperDom.append(tabsTemplate(subscriptionTabs));
                }
            }

            function renderCommunicationPreferences(preferences, site) {
                var sitePreferencesDom = $('#' + site + '_site'),
                    siteHeadingDom = $('#' + site);

                if (preferences && preferences.data && preferences.status === 200) {
                    if (preferences.data.subscriptionPreference.includeInSite || preferences.data.communicationPreference.includeInSite) {
                        preferences.data.isContentExist = true;
                    } else {
                        preferences.data.isContentExist = false;
                    }
                    if(groupListEnabled &&
                        preferences.data.groupList.length > 0 &&
                        preferences.data.groupList[0].subscriptions &&
                        preferences.data.groupList[0].subscriptions.length > 0 ){
                        preferences.data.isSubscriptionExist = true;
                    }else if (preferences.data.subscription && preferences.data.subscription.length > 0) {
                        preferences.data.isSubscriptionExist = true;
                    }
                    else {
                        preferences.data.isSubscriptionExist = false;
                    }
                    preferences.data.groupEnabled = groupListEnabled;
                    preferences.data.placeholdertextforfiltersubscriptions = window.kpmgPersonalize.i18n.customMsgs.placeholdertextforfiltersubscriptions;
                    preferences.data.selectedinterestslist = window.kpmgPersonalize.i18n.customMsgs.selectedinterestslist;
                    preferences.data.onboardingbasedsubscriptiontitle = window.kpmgPersonalize.i18n.customMsgs.onboardingbasedsubscriptiontitle;
                    preferences.data.interestsbasedsubscriptiontitle = window.kpmgPersonalize.i18n.customMsgs.interestsbasedsubscriptiontitle;
                    preferences.data.subscriptionsinterestedintitle = window.kpmgPersonalize.i18n.customMsgs.subscriptionsinterestedintitle;



                    sitePreferencesDom.html(subscriptionsTemplate(preferences.data));
                    siteHeadingDom.addClass('subscriptions-loaded');

                    //TODO: Handle logic for unsaved changes modal in case of accordion click
                    // $('.preferences-accordion').on('hide.bs.collapse', function (e) {
                    //     if ($('.save-changes-btn:visible').length && !$('.save-changes-btn:visible').hasClass('disable-action') && !$(this).data('open')) {
                    //         e.preventDefault();
                    //     } else {
                    //         $(this).data('open', false);
                    //     }
                    // });
                    //
                    // $('.account-accordion').on('hide.bs.collapse', function (e) {
                    //     if ($('.save-changes-btn:visible').length && !$('.save-changes-btn:visible').hasClass('disable-action') && !$(this).data('open')) {
                    //         e.preventDefault();
                    //     } else {
                    //         $(this).data('open', false);
                    //     }
                    // });

                    $('.preferences-accordion').on('hidden.bs.collapse', function() {
                        $(this).closest('.card').find('.card-header').removeClass('active');
                        $(this).closest('.card').find('.accordion-icon').removeClass('icon-chevron-up').addClass('icon-chevron-down');
                    });

                    $('.preferences-accordion').on('shown.bs.collapse', function() {
                        $(this).closest('.card').find('.card-header').addClass('active');
                        $(this).closest('.card').find('.accordion-icon').removeClass('icon-chevron-down').addClass('icon-chevron-up');
                    });
                }
            }

            function handleSiteTabClick(e) {
                var $this = $(e.currentTarget),
                    site = $this.closest('.card').data('site');

                if (!$this.closest('.card').hasClass('subscriptions-loaded')) {
                    fetchCommunicationPreferences(site.split('_').join('.'))
                        .done(function(preferences) {
                            var ssOppUpdated = checkForSSOppUpdate($this.closest('.card').data('site'));

                            if (ssOppUpdated) {
                                handleSSOppModal(preferences, site, false);
                            } else {
                                renderCommunicationPreferences(preferences, site);
                                // populate communication and subscription opt in values on page load
                                updateRegistrationUserInfoDetails(site);
                                // populate individual subscriptions values on page load
                                updateSubscriptionDetails(site);
                            }
                        })
                        .fail(showGenericErrorDialog);
                }
                allSubscriptionGroups={};
                selectedInterests =[];
                allSubscription={};
                allSubscriptionGroups.groupList=allLocalSubscription[site.split('_').join('.')];
                allSubscription.subscription=allLocalSubscription[site.split('_').join('.')];
            }

            function checkForSSOppUpdate(site) {
                var isUpdated = false,
                    siteArray = (typeof site === 'string') ? site.split('_') : [];

                if (accountInfo && accountInfo.subscriptions &&
                    accountInfo.subscriptions[siteArray[0]] &&
                    accountInfo.subscriptions[siteArray[0]][siteArray[1]] &&
                    accountInfo.subscriptions[siteArray[0]][siteArray[1]].terms &&
                    accountInfo.subscriptions[siteArray[0]][siteArray[1]].terms.email &&
                    accountInfo.subscriptions[siteArray[0]][siteArray[1]].terms.email.isSubscribed === false) {
                    isUpdated = true;
                }

                return isUpdated;
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

            function fetchCommunicationPreferences(site) {
                groupListEnabled = false;
                var deferred = $.Deferred(),
                    subscriptionsSite = site ? site : locale.countryCode + '.' + locale.languageCode,
                    url = '/bin/kpmg/subscriptions.' + subscriptionsSite + '.json';
                $.ajax({
                    url: url,
                    success: function(response) {
                        $.map(response.data, function(value, key) {
                            if (key === "groupList") {
                                groupListEnabled = true;
                            }
                        });

                        allSubscriptionGroups={};
                        selectedInterests =[];
                        allSubscription={};
                        if (groupListEnabled) {
                            allSubscriptionGroups.groupList = response.data.groupList;
                            allLocalSubscription[subscriptionsSite]=response.data.groupList;
                        } else {
                            // check if data and corresponding subscription is available.
                            if( response.data && response.data.subscription ){
                                for(var i = 0; i < response.data.subscription.length; i++){
                                    response.data.subscription[i].gigyamapping = response.data.subscription[i].gigyaMapping;
                                    delete response.data.subscription[i].gigyaMapping;
                                }
                                allSubscription.subscription = response.data.subscription;
                                allLocalSubscription[subscriptionsSite]=response.data.subscription;
                            }else{
                                allSubscription.subscription = {};
                                allLocalSubscription[subscriptionsSite]={};
                            }
                        }
                        deferred.resolve(response);
                    },
                    error: function(response) {
                        deferred.reject();
                    }
                });

                return deferred;
            }

            function fetchCountryJson() {
                var deferred = $.Deferred(),
                    url = personalizationUtils.constants.interestsServiceURL
                    .replace(/<countryCode>/g, window.kpmgPersonalize.snp.params.countryCode)
                    .replace(/<languageCode>/g, window.kpmgPersonalize.snp.params.languageCode)
                    .replace(/<boolean>/g, "false");

                $.ajax({
                    url: url,
                    success: function(response) {
                        personalizationUtils.commonUtils.processCountriesJson(response);
                        deferred.resolve(response);
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
                    },
                    error: function(response) {
                        deferred.reject();
                    }
                });
                return deferred;
            }

            function initializeComponent(userInfo, preferences, countryList) {
                var site = locale.countryCode + '_' + locale.languageCode,
                    isWarning = false,
                    // Need to improve on this as document.createEvent("CustomEvent") is depricated.
                    evt = document.createEvent("CustomEvent");

                totalCountryList = countryList;

                accountInfo = personalizationUtils.accountUtils.getInfo();
                if (userInfo && userInfo.subscriptions && accountInfo) {
                    $.extend(accountInfo.subscriptions, userInfo.subscriptions);
                    $.extend(accountInfo.data, userInfo.data);
                    personalizationUtils.accountUtils.setInfo(accountInfo);
                    window.kpmgPersonalize = window.kpmgPersonalize || {};
                    window.kpmgPersonalize.updatedUserData = true;

                    evt.initCustomEvent('updatedUserData', false, false, {});
                    document.dispatchEvent(evt);
                }

                if (accountInfo && accountInfo.subscriptions &&
                    accountInfo.subscriptions[locale.countryCode] &&
                    accountInfo.subscriptions[locale.countryCode][locale.languageCode] &&
                    accountInfo.subscriptions[locale.countryCode][locale.languageCode].terms &&
                    accountInfo.subscriptions[locale.countryCode][locale.languageCode].terms.email &&
                    accountInfo.subscriptions[locale.countryCode][locale.languageCode].terms.email.isSubscribed === false) {
                    isWarning = true;
                }

                // Render Subscription sites tabs
                renderSubscriptionSitesTabs(site, countryList, isWarning);

                // Paint Communication Preferences of registered site
                renderCommunicationPreferences(preferences, site);

                // populate communication and subscription opt in values on page load
                updateRegistrationUserInfoDetails(site);

                // populate individual subscriptions values on page load
                updateSubscriptionDetails(site);

                $('.preferences-wrapper').find('.card-header').eq(0).addClass('active');
                $('.preferences-accordion').eq(0).addClass('show');
                $('.accordion-icon').eq(0).removeClass('icon-chevron-down').addClass('icon-chevron-up');

                //Check for cross site flow
                handleCrossSiteFlow();
            }

            function handleCrossSiteFlow() {
                var crossSite = personalizationUtils.commonUtils.getValue('cross_site_name');
                var onboardingSite;
                if (personalizationUtils.commonUtils.getValue('origin')) {
                    personalizationUtils.commonUtils.clearValues('origin');
                    //Open the communication preferences tab when page loads
                    $('#communication-preferences .accordian-btn').trigger('click');

                    if (personalizationUtils.commonUtils.getValue('cross_site')) {
                        onboardingSite = crossSite;
                        personalizationUtils.commonUtils.clearValues('cross_site');
                        personalizationUtils.commonUtils.clearValues('cross_site_name');
                        fetchCommunicationPreferences(crossSite.split('_').join('.'))
                            .done(function(preferences) {
                                var ssOppUpdated = checkForSSOppUpdate(crossSite);
                                if (!checkIfUserSubscribed(crossSite)) {
                                    handleSSOppModal(preferences, crossSite, true);
                                } else {
                                    if (ssOppUpdated) {
                                        handleSSOppModal(preferences, crossSite, false);
                                    } else {
                                        renderCommunicationPreferences(preferences, crossSite);
                                        // populate communication and subscription opt in values on page load
                                        updateRegistrationUserInfoDetails(crossSite);

                                        // populate individual subscriptions values on page load
                                        updateSubscriptionDetails(crossSite);

                                        personalizationUtils.commonUtils.clearValues('cross_site_referrer');

                                        $('.preferences-accordion').removeClass('show');
                                        $('.accordion-icon').removeClass('icon-chevron-up').addClass('icon-chevron-down');
                                        $('.preferences-wrapper').find('.card-header').removeClass('active');
                                        $('#' + crossSite + '_wrapper').addClass('active');
                                        $('#' + crossSite + '_wrapper').next().addClass('show');
                                        $('#' + crossSite + '_wrapper').find('.accordion-icon').removeClass('icon-chevron-down').addClass('icon-chevron-up');
                                        onboardingAssociatedSubscriptions(onboardingSite);
                                    }

                                }
                            })
                            .fail(showGenericErrorDialog);
                    }else{
                        onboardingSite = locale.countryCode + '_' + locale.languageCode;
                        onboardingAssociatedSubscriptions(onboardingSite);
                    }

                }
            }

            function handleSSOppModal(preferences, site, isNew) {
                var $ssOppModal = $('.ssOppModal'),
                    oppModalData = (preferences && preferences.data) ? preferences.data.oppmodel : {},
                    onlinePrivacyData = (preferences && preferences.data) ? preferences.data.onlinePrivacy : {},
                    internalReferrer = personalizationUtils.commonUtils.getValue('cross_site_referrer');

                personalizationUtils.commonUtils.clearValues('cross_site_referrer');

                $ssOppModal.find('.salutation .salutation-title').html(oppModalData.salutation);
                $ssOppModal.find('.oppchange-text.text1').html(oppModalData.text1);
                $ssOppModal.find('.oppchange-text.text2').html(oppModalData.text2);
                $ssOppModal.find('.ss-opp').html(onlinePrivacyData.description);
                $ssOppModal.find('.close-text').html(oppModalData.closelabel);
                $ssOppModal.find('.continue-text').html(oppModalData.continuelabel);

                if (onlinePrivacyData.includeInSite) {
                    $ssOppModal.find('.terms').show();
                } else {
                    $ssOppModal.find('.terms').hide();
                }

                if (onlinePrivacyData.checkVisible) {
                    $ssOppModal.find('#terms2').show();
                    $ssOppModal.find('.checkmark').show();
                    $ssOppModal.find('.opp-checkbox').removeClass('checkbox-hide');
                } else {
                    $ssOppModal.find('#terms2').hide();
                    $ssOppModal.find('.checkmark').hide();
                    $ssOppModal.find('.opp-checkbox').addClass('checkbox-hide');
                }

                $("html, body").animate({
                    scrollTop: 0
                }, "slow", function() {
                    $ssOppModal.bs3modal({
                        show: true,
                        backdrop: 'static',
                        keyboard: false
                    });
                });

                $('.ssOppModal').on('click', 'a', function(e) {
                    var newTab;
                    e.preventDefault();
                    e.stopPropagation();
                    newTab = window.open($(this).attr('href'), '_blank');
                    newTab.trigger('focus');
                });

                $('#terms2').off().on('click', function() {
                    $ssOppModal.find('.terms').removeClass('error-border');
                });

                $('.ssOppModal .continueButton').off().on('click', function(e) {
                    if ($('#terms2:visible').length > 0) {
                        if ($('#terms2').prop('checked') !== true) {
                            $ssOppModal.find('.terms').addClass('error-border');
                            e.preventDefault();
                            return false;
                        } else {
                            $ssOppModal.find('.terms').removeClass('error-border');
                        }
                    }

                    $('.loading-spinner').show();
                    //Update the terms.email.isSubscribed flag to true in gigya for site
                    updateSubscriptionSiteOppInGigya(site)
                        .then(function() {
                            $('.loading-spinner').hide();
                            personalization.showAsterisk();
                            if (isNew) {
                                //Add subscription site tab in Communication Preferences Accordion
                                renderSubscriptionSiteTab(site);
                            }

                            //Render the communication preferences for site
                            renderCommunicationPreferences(preferences, site);

                            //Remove warning icon from the subscription site tab
                            $('#' + site + '_wrapper').find('.warning-icon').remove();

                            // populate communication and subscription opt in values on page load
                            updateRegistrationUserInfoDetails(site);

                            // populate individual subscriptions values on page load
                            updateSubscriptionDetails(site);

                            if (isNew) {
                                $('#' + site + '_wrapper').find('.subscription-site-heading').trigger('click');
                            }
                            onboardingAssociatedSubscriptions(site);

                            // tracking SS OPP acceptance
                            window.digitalData.page.pageInfo.modalType = "SS OPP Modal";
                            trck.track('PrivacyAccept_Subscriptions', '');
                        });
                });

                $('.ssOppModal .closeButton').off().on('click', function() {
                    if (internalReferrer && isNew) {
                        window.location = internalReferrer;
                    } else {
                        $('.subscription-site-heading').eq(0).trigger('click');
                    }
                });
            }

            function renderSubscriptionSiteTab(site) {
                var subscriptionTabs = getTabsData(site, totalCountryList, false);
                preferencesWrapperDom.append(tabsTemplate(subscriptionTabs));
            }

            function updateSubscriptionSiteOppInGigya(site) {
                var ssOpp = {},
                    siteArray = site.split('_'),
                    deferred = $.Deferred();

                ssOpp[siteArray[0]] = {};
                ssOpp[siteArray[0]][siteArray[1]] = {
                    terms: {
                        email: {
                            isSubscribed: true
                        }
                    }
                };

                window.gigya.accounts.setAccountInfo({
                    subscriptions: ssOpp,
                    callback: function(response) {
                        if (response.errorCode === 0) {
                            window.gigya.accounts.getAccountInfo({
                                include: personalizationUtils.constants.UserAccountIncludes.join(','),
                                callback: function(data) {
                                    $.extend(accountInfo.subscriptions, data.subscriptions);
                                    $.extend(accountInfo.data, data.data);
                                    personalizationUtils.accountUtils.setInfo(accountInfo);
                                    deferred.resolve();
                                }
                            });
                        } else {
                            showGenericErrorDialog();
                            logger.error("Error in storing preferences.\n\tMSG:", response.errorMessage);
                            deferred.resolve();
                        }
                    }
                });

                return deferred;
            }

            function checkIfUserSubscribed(site) {
                var subscriptionSites = getSubscriptionSitesList(),
                    isSubscribed = false,
                    index = -1;

                index = subscriptionSites.map(function(item) {
                        return item.key;
                    })
                    .indexOf(site);

                if (index > -1) {
                    isSubscribed = true;
                }

                return isSubscribed;
            }

            function getCurrentOptIn(site) {
                var optInCheckbox = {},
                    currentCountryCode = site.split('_')[0],
                    currentLanguageCode = site.split('_')[1],
                    accountInfo = personalizationUtils.accountUtils.getInfo();

                currentSubscription_opt_in = accountInfo &&
                    accountInfo.subscriptions &&
                    accountInfo.subscriptions[currentCountryCode] &&
                    accountInfo.subscriptions[currentCountryCode][currentLanguageCode];
                currentCommunication_opt_in = accountInfo &&
                    accountInfo.subscriptions &&
                    accountInfo.subscriptions[currentCountryCode] &&
                    accountInfo.subscriptions[currentCountryCode][currentLanguageCode];
                optInCheckbox.currentSubscriptionOptInValue = currentSubscription_opt_in && currentSubscription_opt_in.subscription_opt_in &&
                    currentSubscription_opt_in.subscription_opt_in.email &&
                    currentSubscription_opt_in.subscription_opt_in.email.isSubscribed;
                optInCheckbox.currentCommunicationOptInValue = currentCommunication_opt_in && currentCommunication_opt_in.communication_opt_in &&
                    currentCommunication_opt_in.communication_opt_in.email &&
                    currentCommunication_opt_in.communication_opt_in.email.isSubscribed;

                return optInCheckbox;
            }

            function showGenericErrorDialog() {
                genericErrorDialog.showDialog();
            }

            // accessibility
            $("#communication-preferences-container").on("keyup", ".subscription-optin", function(e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).find('label').addClass('focusOutline');
                } else if (e.which === 13) {
                    $(this).find('input').trigger("click");
                }
            });

            $("#communication-preferences-container").on("blur", ".subscription-optin", function() {
                $(this).find('label').removeClass('focusOutline');
            });

            $("#communication-preferences-container").on("keyup", ".communication-optin", function(e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).find('label').addClass('focusOutline');
                } else if (e.which === 13) {
                    $(this).find('input').trigger("click");
                }
            });

            $("#communication-preferences-container").on("blur", ".communication-optin", function() {
                $(this).find('label').removeClass('focusOutline');
            });

            $("#communication-preferences-container").on("keyup", ".communication-subscriptions-row", function(e) {
                if ($(this).closest('.card').find('.subscription-optin-checkbox').prop('checked')) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).addClass('focusOutline');
                    } else if (e.which === 13) {
                        $(this).parent().find('label').trigger("click");
                    }
                }
            });
            $("#communication-preferences-container").on("blur", ".communication-subscriptions-row", function() {
                if ($(this).closest('.card').find('.subscription-optin-checkbox').prop('checked')) {
                    $(this).removeClass('focusOutline');
                }
            });

            $(".cancel-btn", elem).on("keyup", function(e) {
                if (!$(this).hasClass('disable-action')) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).addClass('focusOutline');
                    } else if (e.which === 13) {
                        $(this).trigger("click");
                    }
                }
            });

            $(".cancel-btn", elem).on("blur", function() {
                if (!$(this).hasClass('disable-action')) {
                    $(this).removeClass('focusOutline');
                }
            });

            $(".save-changes-btn", elem).on("keyup", function(e) {
                if (!$(this).hasClass('disable-action')) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).addClass('focusOutline');
                    } else if (e.which === 13) {
                        $(this).trigger("click");
                    }
                }
            });

            $(".save-changes-btn", elem).on("blur", function() {
                if (!$(this).hasClass('disable-action')) {
                    $(this).removeClass('focusOutline');
                }
            });

            $("#communication-preferences-container").on("keyup", ".email-checkbox-container", function(e) {
                if (!$(this).hasClass('disable-action')) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).addClass('focusOutline');
                    } else if (e.which === 13) {
                        $(this).trigger("click");
                    }
                }
            });

            $("#communication-preferences-container").on("blur", ".email-checkbox-container", function() {
                if (!$(this).hasClass('disable-action')) {
                    $(this).removeClass('focusOutline');
                }
            });

            $.when(getAccountInfo(), fetchCommunicationPreferences(), fetchCountryJson())
                .done(initializeComponent)
                .fail(showGenericErrorDialog);

            function selectedInterestTags(site) {
                $('#' + site).find('.communication-preferences-tags').empty();
                $.each(uniqueArray(selectedInterests), function(index, item) {
                    $('#' + site).find('.communication-preferences-tags').append('<span>' + item.name + '<button id="' + item.zthesID + '">x</button></span>');
                });
                if (selectedInterests.length === 0) {
                    $('#' + site).find(".communication-preferences-tags").hide();
                    $('#' + site).find(".selected-interests-header-text").removeClass('showHide');
                } else {
                    $('#' + site).find(".communication-preferences-tags").show();
                    $('#' + site).find(".selected-interests-header-text").addClass('showHide');
                }
                associatedSubscriptions(site,uniqueArray(selectedInterests));
            }

            function uniqueArray(arrayVal){
                var uniqueArrayVal = [];
                $.each(arrayVal, function(i, el){
                    if($.inArray(el, uniqueArrayVal) === -1){ uniqueArrayVal.push(el); }
                });
                return uniqueArrayVal;
            }

            function onboardingAssociatedSubscriptions(site) {
                var onboardingSubscriptionsList = personalizationUtils.commonUtils.getValue('subid'),
                    onboardingSubscriptions,
                    allSubscriptions = [];
                if (onboardingSubscriptionsList !== undefined && onboardingSubscriptionsList !== null) {
                    $('#' + site).find('.interests-based-subscription-text').hide();
                    $('#' + site).find('.interests-based-subscription-text.onboarding').show();
                    onboardingSubscriptions = onboardingSubscriptionsList.split("|");
                    onboardingSubscriptions = uniqueArray(onboardingSubscriptions);                    

                    personalizationUtils.commonUtils.clearValues('subid');
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
                    reloadSubscriptionListFunction(site,onboardingSubscriptions); 
                    subscriptionsPrint(site,SubscriptionsfinalList,updateSubscriptionDetails);
                }
            }

            function associatedSubscriptions(site,value) {
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
                reloadSubscriptionListFunction(site,uniqueArray(selectedeSubscriptionID));
                subscriptionsPrint(site,subscriptionsFinalList, updateSubscriptionDetails);
                personalizationUtils.commonUtils.clearValues('associatedSubscriptions'); 
                // remove the associatedSubscriptions flag after updateSubscriptionDetails              
            }

            function reloadSubscriptionListFunction(site,subsId) {
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
                    communicationGroupPrint(site,groupedSubs, updateSubscriptionDetails);

                } else {
                    includeSubs = $.grep(allSubscription.subscription, function(e) {
                        return subsId.indexOf(e.externalid) === -1;
                    });
                    reloadSubscriptionList.subscription = includeSubs;
                    communicationSubscriptionsPrint(site,reloadSubscriptionList, updateSubscriptionDetails);
                }
            }

            function subscriptionsPrint(site,obj, callback) {
                if(obj === undefined || obj.subscription.length===0) {
                    $('#' + site).find('.communication-preferences-subscribedList').hide();
                } else {
                    $('#' + site).find('.communication-preferences-subscribedList').show();
                }
                //top section when using filters
                $('#' + site).find('#selectedSubscriptionList').empty();                
                var theTemplateScriptID = '';                
                if(personalizationUtils.commonUtils.getValue('associatedSubscriptions')){
                    theTemplateScriptID = '{{#if subscription}}<div class="subscription-list-wraper"><ul class="col-md-12 px-0 subscription-list">{{#each subscription}}<li class="list-item {{#if privateFlag}}private{{/if}}" data-subscription-id="{{gigyamapping}}" data-external-id="{{externalid}}"  data-frequency="{{frequency}}" data-title="{{title}}" data-private="{{privateFlag}}"><div class="communication-subscriptions-row" tabindex="0"><div class="row mx-0 title-wrapper" aria-label="enable or disable {{title}}"><div class="title col-md-6" aria-label="enable or disable {{title}}">{{title}}</div><div class="frequency-wrapper col-md-6" aria-label="enable or disable {{title}}"><label for="subscription switch" class="subscription-switch mb-0" aria-label="enable or disable {{title}}" tabindex="-1"><input type="checkbox" tabindex="-1"><span class="slider"></span></label><div class="frequency hidden-xs">{{frequencytext}}</div></div></div><div class="row mx-0"><p class="description col-md-12 mb-0">{{description}}</p><p class="frequency visible-xs">{{frequencytext}}</p></div></div></li>{{/each}}</ul></div>{{/if}}';                
                }else{
                    theTemplateScriptID = '{{#if subscription}}<div class="subscription-list-wraper"><ul class="col-md-12 px-0 subscription-list">{{#each subscription}}<li class="list-item" data-subscription-id="{{gigyamapping}}" data-external-id="{{externalid}}"  data-frequency="{{frequency}}" data-title="{{title}}" data-private="{{privateFlag}}"><div class="communication-subscriptions-row" tabindex="0"><div class="row mx-0 title-wrapper" aria-label="enable or disable {{title}}"><div class="title col-md-6" aria-label="enable or disable {{title}}">{{title}}</div><div class="frequency-wrapper col-md-6" aria-label="enable or disable {{title}}"><label for="subscription switch" class="subscription-switch mb-0" aria-label="enable or disable {{title}}" tabindex="-1"><input type="checkbox" tabindex="-1"><span class="slider"></span></label><div class="frequency hidden-xs">{{frequencytext}}</div></div></div><div class="row mx-0"><p class="description col-md-12 mb-0">{{description}}</p><p class="frequency visible-xs">{{frequencytext}}</p></div></div></li>{{/each}}</ul></div>{{/if}}';                
                }                
                var theTemplate = Handlebars.compile(theTemplateScriptID);
                var theCompiledHtml = theTemplate(obj);
                $('#' + site).find('#selectedSubscriptionList').append(theCompiledHtml);
                if($('#' + site).find('.subscription-optin-checkbox').length && !($('#' + site).find('.subscription-optin-checkbox').is(':checked'))){
                    $('#' + site).find('.communication-preferences-subscribedList .subscription-list-wraper').addClass('disable-action');
                }
                callback(site);
            }

            function communicationSubscriptionsPrint(site,reloadsub, callback) {
                //bottom section when subscriptions are non-grouped
                $('#' + site).find('.subscription-list-wraper .subscription-list').empty();
                var theTemplateScript = '{{#if subscription}}{{#each subscription}}<li class="list-item {{#if privateFlag}}private{{/if}}" data-subscription-id="{{gigyamapping}}" data-external-id="{{externalid}}"          data-frequency="{{frequency}}" data-title="{{title}}"><div class="communication-subscriptions-row" tabindex="0"><div class="row mx-0 title-wrapper" aria-label="enable or disable {{title}}"><div class="title col-md-6" aria-label="enable or disable {{title}}">{{title}}</div><div class="frequency-wrapper col-md-6" aria-label="enable or disable {{title}}"><label for="subscription switch" class="subscription-switch mb-0" aria-label="enable or disable {{title}}" tabindex="-1"><input type="checkbox" tabindex="-1"><span class="slider"></span></label><div class="frequency hidden-xs">{{frequencytext}}</div></div></div><div class="row mx-0"><p class="description col-md-12 mb-0">{{description}}</p><p class="frequency visible-xs">{{frequencytext}}</p></div></div></li>{{/each}}{{/if}}';
                var theTemplate = Handlebars.compile(theTemplateScript);
                var theCompiledHtml = theTemplate(reloadsub);
                $('#' + site).find('.subscription-list-wraper .subscription-list').append(theCompiledHtml);
                scriptonsLengthZero(site,callback);
            }

            function communicationGroupPrint(site,reloadgroup, callback) {
                //bottom section when subscriptions are grouped
                $('#' + site).find('.groupListing').empty();
                var theTemplateScriptGroup = '{{#each groupList}}<ul class="col-md-12 subscription-list eachGroupList"><li class="groupHeader">{{groupname}}</li>{{#each subscriptions}}<li class="list-item {{#if privateFlag}}private{{/if}}" data-subscription-id="{{gigyamapping}}" data-external-id="{{externalid}}" data-frequency="{{frequency}}" data-title="{{title}}"> <div class="communication-subscriptions-row" tabindex="0"><div class="row mx-0 title-wrapper" aria-label="enable or disable {{title}}"><div class="title col-md-6" aria-label="enable or disable {{title}}">{{title}}</div><div class="frequency-wrapper col-md-6" aria-label="enable or disable {{title}}"><label for="subscription switch" class="subscription-switch mb-0" aria-label="enable or disable {{title}}" tabindex="-1"><input type="checkbox" tabindex="-1"><span class="slider"></span></label><div class="frequency hidden-xs">{{frequencytext}}</div></div></div><div class="row mx-0"><p class="description col-md-12 mb-0">{{description}}</p><p class="frequency visible-xs">{{frequencytext}}</p></div></div></li>{{/each}}</ul>{{/each}}';
                var theTemplateGroup = Handlebars.compile(theTemplateScriptGroup);
                var theCompiledGroupHtml = theTemplateGroup(reloadgroup);
                $('#' + site).find('.groupListing').append(theCompiledGroupHtml);
                $('#' + site).find('.eachGroupList').each(function(){
                    var liLength=$(this).find("li.list-item").length;
                    if(liLength===0){
                        $(this).hide();
                    }
                });
                scriptonsLengthZero(site,callback);
            }
            function scriptonsLengthZero(site,callback) {
                if(($('#' + site).find('.subscription-list-search-wraper li.list-item').length)===0){
                    $('#' + site).find('.subscription-list-search-wraper').hide();
                } else {
                    $('#' + site).find('.subscription-list-search-wraper').show();
                    callback();
                }
            }
            $(function() {
                $(document).on("click", ".communication-preferences-tags button", function(e) {
                    var id = $(this).attr('id'),
                    site = $(e.currentTarget).closest('.card').data('site');
                    for (var i = 0; i < selectedInterests.length; i++) {
                        if (selectedInterests[i].zthesID === id) {
                            selectedInterests.splice(i, 1);
                            break;
                        }
                    }
                    $(this).remove();
                    selectedInterestTags(site);
                });
                $(document).on('keypress touchstart', '.communication-preferences-searchbar input', function(e) {
                    var site = $(e.currentTarget).closest('.card').data('site'),
                    inputSearchValue = $(this).val(),lowerCase= new RegExp('[a-z]');
                    if (e.keyCode === 13) {
                        if($(this).val().length>0) {
                            $.map(allinterestswithID, function (value, key) {
                                if(inputSearchValue===value.name.toLowerCase()) {
                                    selectedInterests.push(value);
                                    selectedInterestTags(site);
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
                            $('.card').removeClass('searchActive');
                            $(this).closest('.card').addClass('searchActive');
                            selectedInterestTags(site);
                            ui.item.value = "";
                        },
                        open: function (result) {
                            $(this).autocomplete("widget").appendTo(".communication-preferences-searchbar");
                            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                                $('.ui-autocomplete').off('menufocus hover mouseover');
                            }
                        }
                    });
                });
            });
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
            // Keep the following lines at the bottom of the CommunicationPreferences function
            var trck = new Tracking(elem, 'CommunicationPreferences');
            $(document).trigger('template.loaded');
        };
        return CommunicationPreferences;
    }
);

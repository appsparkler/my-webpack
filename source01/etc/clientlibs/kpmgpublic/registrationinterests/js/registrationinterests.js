define(['jquery', 'tracking', 'registrationuserinfo', 'handlebars', 'underscore', 'personalizationUtils', 'genericErrorDialog','helpers'],
    function ($, Tracking, regUserInfo, Handlebars, _, personalizationUtils, genericErrorDialog,Helpers) {
        'use strict';
        var logger = personalizationUtils.loggerUtils;

        var Registrationinterests = function (elem, componentName) {

            // Keep the following lines at the bottom of the Registrationinterests function
            var tracking = new Tracking(elem, 'Registrationinterests'),
                links,
                pControlFlow = "",
                getAbsolutePath = personalizationUtils.pathUtils.getAbsolutePath;

            personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                links = data.links;
                var prevUrl = decodeURIComponent(sessionStorage.getItem("prevUrl"));
                if ( !(prevUrl.match(links.register.url) || prevUrl.match(links.login.url) || prevUrl.match(links.subscriptionsLink.url)) && !window.kpmgPersonalize.misc.isAuthor ) {
                    //Not directed from Registration page.
                    //If user is already logged in, redirect to dashboard.html else registration.html
                    personalizationUtils.pathUtils.gotoPage(personalizationUtils.accountUtils.isLoggedIn() ? ("../../../../" + links.dashboard.url) :  ("../../../../" + links.register.url));
                }
            });

            $(".module-tmpl-registration .reg-section .reg-container .reg-title").attr("tabindex","1");

            function RemoveFocus(){
                $(".module-tmpl-registration .reg-section .reg-container .reg-title").removeAttr("tabindex");
            }

            function ActivateTab(event) {
                var index = $(this).data("index");

                //Deactivate previously selected tab
                $(".content-container .tab-title.active", elem).removeClass("active");
                //Activate selected tab
                $(this).addClass("active");

                //Hide all tag holders
                $(".content-container .tags-holder", elem).each(function () {
                    $(this).addClass("no-display");
                });
                //Show only selected tag holder
                $(".content-container .tags-holder[data-index='" + index + "']", elem).removeClass("no-display");
            }

            function ToggleAccordion(event) {
                var tabTitleAccordion = $(this),
                    index = tabTitleAccordion.data("index");

                tabTitleAccordion.toggleClass("active");
                $(".content-container .tab-title-accordion").each(function () {
                    if (this !== tabTitleAccordion[0]) {
                        $(this).removeClass("active");
                    }
                });

                //Hide all tag holders
                $(".content-container .tags-holder", elem).each(function () {
                    $(this).addClass("no-display");
                });

                //If accordion is active, show the tag holder
                if (tabTitleAccordion.hasClass("active")) {
                    $(".content-container .tags-holder[data-index='" + index + "']", elem).removeClass("no-display");
                }
            }

            function ToggleTagSelection(event) {
                $(this).toggleClass("add");
            }

            function cacheProcessedJsonResponse(data) {
                cachedData = window.kpmgPersonalize.interestsDataSet = data;
            }

            function createDomFromData() {
                var noOfCols = 4,
                    newDom = Handlebars.compile($(".content-template", elem)
                        .html()
                        .replace(/\+\+/g, "{{")
                        .replace(/\-\-/g, "}}"))(cachedData);

                //Hide content while processing
                $(".content-container", elem).addClass("no-display");
                $(".content-container", elem).html(newDom);

                if (verticalArrangement) {
                    $(".content-container .tags-holder", elem).each(function () {
                        var M = Math,
                            lists = $(this).addClass("column-arrangement").find("li.tag-holder"),
                            noOfRows = lists.length / noOfCols,
                            totalRows = M.ceil(noOfRows),
                            completeRows = M.floor(noOfRows) || 1,
                            offset = lists.length % noOfCols;

                        lists.each(function (index) {
                            index = index + 1;
                            var computedColNo = M.ceil(index / totalRows);
                            if (computedColNo > offset) {
                                computedColNo = M.ceil((index - offset) / completeRows);
                            }
                            $(this).addClass("column" + computedColNo);
                        });

                        for (var index = 1; index <= noOfCols; index++) {
                            $(".tag-holder.column" + index, this).wrapAll("<div class='tag-holder-wrapper'></div>");
                        }
                    });
                }
            }

            function attachEvents() {
                //Tab selection
                $(".content-container .tab-title", elem).each(function () {
                    $(this).on('click', ActivateTab);
                });

                //Expand/close accordion
                $(".content-container .tab-title-accordion", elem).each(function () {
                    $(this).on('click', ToggleAccordion);
                });

                //Tag selection
                $(".content-container .tag-holder", elem).each(function () {
                    $(this).on('click', ToggleTagSelection);
                });

                //Save preferences, demandBase industry zthesID
                $(".done-button").on('click', function (event) {
                    if( $(this).find('.finish-btn').attr('class').indexOf('hide') === -1 ){
                        personalizationUtils.commonUtils.clearValues('industrycheck');
                    }

                    RemoveFocus();
                    var preferences = {};
                    $(".content-container .tag-holder.add").each(function () {
                        var level3TagArr = [],
                            data = $(this).data(),
                            tagCategoryEnglishName = $(".content-container .tab-title[data-index=" + data.parentIndex + "]").data("englishName"),
                            level2TagArr = _.find(cachedData.tags, function (level1TagObj) {
                                return level1TagObj['english-name'] === tagCategoryEnglishName;
                            }).tags;

                        preferences[tagCategoryEnglishName] = preferences[tagCategoryEnglishName] || {};
                        preferences[tagCategoryEnglishName][data.zthesId] = {};
                        preferences[tagCategoryEnglishName][data.zthesId].selected = true; //Only categories are selectable, implying full selection

                        //Populate level3 ids
                        level3TagArr = _.find(level2TagArr, function (level2TagObj) {
                            return level2TagObj['zthes-id'] === data.zthesId;
                        }).tags || [];
                        level3TagArr.forEach(function (level3TagObj) {
                            preferences[tagCategoryEnglishName][data.zthesId][level3TagObj['zthes-id']] = {};
                        });
                    });

                    _storePreferencesAndFinalizeRegistration(JSON.stringify(preferences),event.currentTarget.text);
                });
            }

            var retval = [];

            function registrationCompleteTracking(accountData,btnText) {
                if(accountData.length>0){
                    var parsedAccData = JSON.parse(accountData);
                    var level1keys = Object.keys(parsedAccData);

                    for (var i = 0; i < level1keys.length; i++) {
                        var level1key = level1keys[i],
                            level2keys = Object.keys(parsedAccData[level1key]);
                        for (var j = 0; j < level2keys.length; j++) {
                            var level2key = level2keys[j];
                            retval.push(level1key + ":" + level2key);
                        }
                    }
                }
                tracking.satelliteTracking({
                    'Register': {
                        Preferences: retval,
                        memberID:window.kpmgPersonalize.personalizationUtils.accountUtils.getInfo().UID
                    }
                }, 'RegistrationComplete',false);
                tracking.track('RegistrationComplete', btnText);
            }

            function _storePreferencesAndFinalizeRegistration(preferencesStr,btnText) {
                var params = window.kpmgPersonalize.snp.params,
                    accountData = {
                        implicit: {
                            industry: implicitZthesIds.join(',')
                        },
                        kpmg: {
                            registeredLocale: params.countryCode + "/" + params.languageCode
                        },
                        preferences: preferencesStr || ""
                    };
                logger.log("Saving account data: ", accountData);

                window.gigya.accounts.setAccountInfo({
                    data: accountData,
                    callback: function (response) {
                        if (response.errorCode === 0) {
                            registrationCompleteTracking(accountData.preferences,btnText);
                            var cachedPreferences = personalizationUtils.accountUtils.getInfo();
                            $.extend(cachedPreferences.data, accountData);
                            personalizationUtils.accountUtils.setInfo(cachedPreferences);
                            personalizationUtils.storeUtils.setUserLibrary({
                                namedLists : {}
                            });

                            /* For Subscription on-boarding flow, registration-interests screen comes after registration-subscriptions screen.
                             * So User will go to either dashboard or registration done screen from here in this flow
                             */
                            if ( window.kpmgPersonalize.isPPC &&
                                cachedPreferences.subscriptions &&
                                cachedPreferences.subscriptions !== null &&
                                cachedPreferences.subscriptions.subscription_opt_in &&
                                cachedPreferences.subscriptions.subscription_opt_in.email &&
                                cachedPreferences.subscriptions.subscription_opt_in.email.isSubscribed &&
                                !personalizationUtils.commonUtils.getValue('origin') ) {
                                analyticsStepCounterTracking(false,'2');
                                personalizationUtils.pathUtils.gotoPage("registration-subscriptions.html" + window.location.search);
                            } else {
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
                                    if( pControlFlow && (pControlFlow === "counterSecond_a")){
                                        var origin =  personalizationUtils.commonUtils.getValue('origin') || '',
                                        subid = personalizationUtils.commonUtils.getValue('subid'),
                                        pExtraParam = '';

                                        if(origin !== ""){
                                            pExtraParam += "origin="+origin;
                                        }
                                        if(subid !== ""){
                                            pExtraParam += "&subid="+subid;
                                        }
                                        if(window.kpmgPersonalize.isPPC &&
                                        cachedPreferences.subscriptions &&
                                        cachedPreferences.subscriptions !== null &&
                                        cachedPreferences.subscriptions.subscription_opt_in &&
                                        cachedPreferences.subscriptions.subscription_opt_in.email &&
                                        cachedPreferences.subscriptions.subscription_opt_in.email.isSubscribed &&
                                        personalizationUtils.commonUtils.getValue('origin')){
                                            analyticsStepCounterTracking(true,'3');
                                        }else{
                                            analyticsStepCounterTracking(true,'2');
                                        }
                                        personalizationUtils.pathUtils.gotoPage("./registration-subscriptions.html?"+pExtraParam);
                                    } else {
                                        personalizationUtils.commonUtils.clearValues('origin');
                                        personalizationUtils.commonUtils.clearValues('subid');

                                        if(window.kpmgPersonalize.isPPC &&
                                            cachedPreferences.subscriptions &&
                                            cachedPreferences.subscriptions !== null &&
                                            cachedPreferences.subscriptions.subscription_opt_in &&
                                            cachedPreferences.subscriptions.subscription_opt_in.email &&
                                            cachedPreferences.subscriptions.subscription_opt_in.email.isSubscribed &&
                                            personalizationUtils.commonUtils.getValue('origin')){
                                            analyticsStepCounterTracking(true,'2');
                                        }else{
                                            analyticsStepCounterTracking(true,'3');
                                        }

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
                                }
                            }
                        } else {
                            genericErrorDialog.showDialog();
                            logger.error("Error in storing preferences.\n\tMSG:", response.errorMessage);
                        }
                    }
                });

                // setting industrycheck to true, before page submit.
                personalizationUtils.commonUtils.setValue('industrycheck', true);
            }

            function handleDesktopBreakpoint() {
                //Select first tab
                $(".content-container .tab-title[data-index=0]", elem).trigger("click");
            }

            function handleMobileBreakpoint() {
                //Close all accordions
                $(".content-container .tab-title-accordion").addClass("active");
                $(".content-container .tab-title-accordion[data-index=0] span.expand-status", elem).trigger("click");
            }

            function initializeDom() {
                var accountInfo = personalizationUtils.accountUtils.getInfo();
                if (personalizationUtils.commonUtils.isMobile()) {
                    handleMobileBreakpoint();
                } else {
                    handleDesktopBreakpoint();
                }

                //Auto-select implicit personalization's zthesIDs
                //i.e. zthesIDs belong to demandbase Industry and Sub-industry
                //check for industry : for first time - returns false if first time

                if(!personalizationUtils.commonUtils.getValue('industrycheck')){
                    implicitZthesIds.forEach(function (zthesId) {
                        $(".content-container .tag-holder[data-zthes-id='" + zthesId + "']").trigger("click");
                    });
                }

                //Remove loader container
                $("#loader-container", elem).remove();

                /* Display Next button for normal Registration flow when PPC is turned on and user opted for subscriptions
                 * Display Finish button for Subscription on-boarding flow or when PPC is turned off or user has not opted in for subscriptions
                 */
                if ( window.kpmgPersonalize.isPPC &&
                    accountInfo.subscriptions &&
                    accountInfo.subscriptions !== null &&
                    accountInfo.subscriptions.subscription_opt_in &&
                    accountInfo.subscriptions.subscription_opt_in.email &&
                    accountInfo.subscriptions.subscription_opt_in.email.isSubscribed &&
                    !personalizationUtils.commonUtils.getValue('origin') ) {

                    $('.next-btn', elem).removeClass('hide');

                    $(".module-registrationpagetitle #counterThird").on('click', function (event) {
                        pControlFlow = "counterThird";
                        $(".done-button").trigger('click');
                    });

                } else {
                    $('.finish-btn', elem).removeClass('hide');

                    // // attached click event for Finish button while using Step-Counter
                    $('.module-registrationpagetitle #counterSecond_a').on('click', function (event) {
                        pControlFlow = "counterSecond_a";
                        $(".done-button").trigger('click');
                    });

                    $('.module-registrationpagetitle #counterThird').removeClass("cursor-pointer");
                    // $('.module-registrationpagetitle #counterThird').on('click', function (event) {
                    //     return false;
                    // });

                    $('.module-registrationpagetitle #counterSecond_b').removeClass("cursor-pointer");
                    // $(".module-registrationpagetitle #counterSecond_b").on('click', function (event) {
                    //     return false;
                    // });
                }

                //Show hidden Skip preferences link and I'm done button
                $(".done-button.no-display", elem).removeClass("no-display");
                $(".content-container.no-display", elem).removeClass("no-display");

                //Show content
                $(".content-container", elem).removeClass("no-display");
                initializeSelection();
            }

            function handleError(err) {
                logger.error("Error occured in populating data.\n\tMSG: ", err);
            }
            function setRegisteredLocaleObj(implicitZthesIds){
                var registeredLocaleObj = {
                        implicit: {
                            industry: implicitZthesIds.join(',')
                        }
                    };

                function setAccountInfo() {
                    window.gigya.accounts.setAccountInfo({
                        data: registeredLocaleObj,
                        callback: function (response) {
                            if (response.errorCode === 0) {
                                var getAccountInfoData = personalizationUtils.accountUtils.getInfo();
                                $.extend(getAccountInfoData.data, registeredLocaleObj);
                                personalizationUtils.accountUtils.setInfo(getAccountInfoData);
                                personalizationUtils.storeUtils.setUserLibrary({
                                    namedLists : {}
                                });
                            } else {
                                genericErrorDialog.showDialog();
                                logger.error("Error in storing preferences.\n\tMSG:", response.errorMessage);
                            }
                        }
                    });
                }

                personalizationUtils.commonUtils.checkForGigyaObject(setAccountInfo);
            }

            function initializeSelection() {
                var preferencesObj,
                    locale = personalizationUtils.accountUtils.getLocale(),
                    preferences = personalizationUtils.accountUtils.getInfo().data.preferences;

                preferencesObj = preferences ? JSON.parse(preferences) : {};

                Object.keys(preferencesObj).forEach(function(tabKey) {
                    var tabObj = preferencesObj[tabKey];
                    Object.keys(tabObj).forEach(function(level2key) {
                        var level2Obj = tabObj[level2key];
                        var level2Selector = personalizationUtils.commonUtils.getCssAttrSelectors('data-zthes-id', level2key);
                        if(level2Obj.selected) {
                            $(level2Selector.selector).addClass("add");
                            return;
                        }
                    });
                });

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

            $(document).on("mobileBreakpoint", handleMobileBreakpoint);

            $(document).on("desktopBreakpoint", handleDesktopBreakpoint);

            var cachedData, verticalArrangement = true,
                dmdbaseCookie = $.cookie(personalizationUtils.constants.dmdbaseCookieKey),
                implicitZthesIdsStr = JSON.parse(dmdbaseCookie || "{}").zthesIDs || "",
                implicitZthesIds = implicitZthesIdsStr ? implicitZthesIdsStr.split(',') : [];

            /*Set the getInfo data into localstorage on successful registration to fix the
            cross site personalization issue*/
            if(!window.kpmgPersonalize.misc.isAuthor){
                setRegisteredLocaleObj(implicitZthesIds);
            }

            $.ajax({
                    url: personalizationUtils.constants.interestsServiceURL
                        .replace(/<countryCode>/g, window.kpmgPersonalize.snp.params.countryCode)
                        .replace(/<languageCode>/g, window.kpmgPersonalize.snp.params.languageCode)
                        .replace(/<boolean>/g, "false")
                })
                .then(personalizationUtils.commonUtils.processInterestsJson)
                .then(cacheProcessedJsonResponse)
                .then(createDomFromData)
                .then(attachEvents)
                .then(initializeDom)
                .fail(handleError);

            $(document).trigger('template.loaded');
        };

        return Registrationinterests;
    }
);

define(['jquery', 'tracking', 'underscore', 'handlebars', 'precompile', 'personalizationUtils', 'genericErrorDialog', 'mykpmgflyout'],
    function($, Tracking, _, Handlebars, PrecompiledHandlebars, personalizationUtils, genericErrorDialog, Mykpmgflyout) {
        'use strict';
        var logger = personalizationUtils.loggerUtils;

        var Interests = function(elem, componentName) {
            var links;
            personalizationUtils.myKpmgFlyoutUtils.getLinksJson().then(function(data) {
                links = data.links;
                if (window.location.pathname.match(links.interests.url)) {
                    $(document).on('myinterestspage.search', function(e, data) {
                        checkForUnsavedChanges(data.searchUrl);
                    });

                    $(document).on('logout.click', function() {
                        checkForUnsavedChanges('logout');
                    });

                    //Add all the anchor tag classes in ":not" for which we don't need to show saving changes Popup
                    $(document).on('click', 'a:not(.tab-title, .interests-link, .btn-close, #toggle-nav)', function(e) {
                        var url = $(e.currentTarget).attr('href');
                        if (url.indexOf('kpmglearnmore') > -1) {
                            return false;
                        }
                        e.preventDefault();
                        checkForUnsavedChanges(url);
                    });

                    $(document).on('interestssummary.click', function() {
                        var url = $('.module-interestssummary').find('.interestssummary-container a').attr('href');
                        checkForUnsavedChanges(url);
                    });

                    $(document).on('librarysummary.click', function() {
                        var url = $('.module-librarysummary').find('.librarysummary-container a').attr('href');
                        checkForUnsavedChanges(url);
                    });


                    //This is for global navigation in mobile

                    $('.sidr').on('click', 'a', function(e) {

                        var temp = $(e.currentTarget).attr('data-target') || '';
                        if (temp !==  '#kpmgModal') {
                            var  url  =  $(e.currentTarget).attr('href');                        
                            e.preventDefault();                        
                            checkForUnsavedChanges(url,  true);
                        }
                    });
                }
            });




            function checkForUnsavedChanges(url, isGlobalNav) {
                try {
                    if (!$('.save-changes-link a').hasClass('disable-action')) {
                        if (isGlobalNav) {
                            $('#toggle-nav').trigger('click');
                        }
                        saveChangesDialog(url);
                    } else {
                        window.location = url;
                    }
                } catch (e) {
                    console.log("Error occured in Interests page on anchor click!" + e);
                    window.location = url;
                }
            }

            function getIndustriesAndCountriesJson() {
                return $.ajax({
                    url: personalizationUtils.constants.interestsServiceURL
                        .replace(/<countryCode>/g, window.kpmgPersonalize.snp.params.countryCode)
                        .replace(/<languageCode>/g, window.kpmgPersonalize.snp.params.languageCode)
                        .replace(/<boolean>/g, "false")
                });
            }

            function cacheJsonResponse(response) {
                data = response;
                return response;
            }

            function processJsonResponse(response) {
                //Order industry tags
                personalizationUtils.commonUtils.processInterestsJson(response);

                /**
                 * Copy id to zthes-id
                 * Copy category to tags
                 */
                function copyCategoryToTags(countryData) {
                    countryData['zthes-id'] = countryData.id;
                    if (countryData.category) {
                        countryData.tags = countryData.category;
                        if (Array.isArray(countryData.tags)) {
                            countryData.tags.forEach(copyCategoryToTags);
                        }
                    }
                }

                //Process countries info
                personalizationUtils.commonUtils.processCountriesJson(response);
                if (Array.isArray(response.category) && response.category.length) {
                    var globalSiteIndex, countryObj = response.category[0];

                    //Move 'global' section in country tab to top
                    globalSiteIndex = _.findIndex(countryObj.category, function(site) {
                        return site.id === 'global';
                    });
                    if (globalSiteIndex > -1) {
                        countryObj.category.unshift(countryObj.category.splice(globalSiteIndex, 1)[0]);
                    }

                    copyCategoryToTags(countryObj);
                    countryObj['zthes-id'] = 'country-identifier';
                    countryObj['english-name'] = 'country';
                    response.tags.push(countryObj);
                }

                return response;
            }

            function createDomFromData() {
                var compName = 'interestspartialtmpl',
                    template = PrecompiledHandlebars[compName],
                    dom = template(data);

                $(".interests-container", elem).html("");
                $(".interests-container", elem).append(dom);

                $('input.search-input', elem).attr('placeholder', window.kpmgPersonalize.i18n.customMsgs.search);
            }

            function _isValidAction(event) {
                return (event.type === "click" ||
                    (event.type === "keyup" && (event.key === "Enter" || event.key === " ")));
            }

            function ActivateTab(event) {
                var selectors = personalizationUtils.commonUtils.getCssAttrSelectors('data-id',
                    $(this).data("id"));

                if (!_isValidAction(event)) {
                    return;
                }

                //Highlight selected tab
                $(".tab-title" + selectors.selector, elem).addClass('active');
                $(".tab-title" + selectors.notSelector, elem).removeClass('active');

                //Hide all tabs content
                $(".subtitles-content-container", elem).addClass('no-display');

                //Show selected title content and collapse subtitle accordions
                $(".subtitles-content-container" + selectors.selector, elem)
                    .removeClass('no-display')
                    .find('.subtitle-content-container.active')
                    .removeClass('active');
            }

            function ActivateTitleAccordion(event) {
                var openTitle,
                    selectors = personalizationUtils.commonUtils.getCssAttrSelectors('data-id',
                        $(this).data('id'));

                if (!_isValidAction(event)) {
                    return;
                }

                //Collapse all other title accordion
                $(".accordion-title" + selectors.notSelector, elem).removeClass('active');

                //Toggle active status to selected title accordion
                openTitle = $(".accordion-title" + selectors.selector, elem).toggleClass('active').hasClass('active');

                //Hide all tabs content
                $(".subtitles-content-container", elem).addClass('no-display');

                if (openTitle) {
                    //Show selected title content and collapse subtitle accordions
                    $(".subtitles-content-container" + selectors.selector, elem)
                        .removeClass("no-display")
                        .find('.subtitle-content-container.active')
                        .removeClass('active');
                }
            }

            function ActivateSubTitleAccordion(event) {
                var level2identifierVal = $(this).parent().data('id'),
                    selectors = personalizationUtils.commonUtils.getCssAttrSelectors('data-id', level2identifierVal);

                if (!_isValidAction(event)) {
                    return;
                }

                //Toggle currently selected subtitle accordion
                $(".subtitle-content-container" + selectors.selector, elem).toggleClass("active");

                //Collapse previously opened subtitle accordions
                // $(".subtitle-content-container" + selectors.notSelector).removeClass("active");
            }

            function ToggleTagSelection(event) {
                var selectionCount,
                    jqWrap = $(this),
                    parent = jqWrap.parent().parent(),
                    accordion = parent.find(".accordion-subtitle"),
                    totalCount = parent.find(".tag-holder").length;

                if (!_isValidAction(event)) {
                    return;
                }

                if ($(jqWrap).attr("aria-checked") === "true") {
                    $(jqWrap).attr("aria-checked", "false");
                } else {
                    $(jqWrap).attr("aria-checked", "true");
                }

                jqWrap.toggleClass("add");
                selectionCount = parent.find(".tag-holder.add").length;
                jqWrap.parent().parent().find(".selection-count").html(selectionCount);

                accordion.removeClass("full-selection").removeClass("partial-selection").attr("aria-checked", "false");
                if (selectionCount) {
                    if (selectionCount === totalCount) {
                        accordion.addClass("full-selection").attr("aria-checked", "true");
                    } else {
                        accordion.addClass("partial-selection").attr("aria-checked", "mixed");
                    }
                }

                //Enable revert and save links
                $("a.disable-action").removeClass("disable-action");
                window.kpmgPersonalize.interestsChange = true;
            }

            function ToggleGroupTagSelection(event) {
                var newCount,
                    jqWrap = $(this),
                    selectAll = jqWrap.parent().hasClass("full-selection"),
                    tagHolders = jqWrap.parent().parent().find(".tag-holder");

                if (!_isValidAction(event)) {
                    return;
                }

                //Stop the propagation to avoid accordion toggling
                event.stopPropagation();

                jqWrap.parent().removeClass("full-selection").removeClass("partial-selection").attr("aria-checked", "false");
                if (selectAll) {
                    newCount = 0;
                    tagHolders.removeClass("add").attr("aria-checked", "false");
                } else {
                    newCount = tagHolders.length;
                    tagHolders.addClass("add").attr("aria-checked", "true");
                    jqWrap.parent().addClass("full-selection").attr("aria-checked", "true");
                }
                jqWrap.parent().find(".selection-count").html(newCount);

                //Enable revert and save links
                $("a.disable-action").removeClass("disable-action");
                window.kpmgPersonalize.interestsChange = true;
            }

            function FilterData() {
                var regEx,
                    jqWrap = $(this),
                    searchText = jqWrap.val().toLowerCase().trim(),
                    identifierVal = jqWrap.parent().parent().data('id'),
                    selectors = personalizationUtils.commonUtils.getCssAttrSelectors('data-id', identifierVal),
                    subtitlesContentContainer = $(".subtitles-content-container" + selectors.selector, elem),
                    allTagHolders = subtitlesContentContainer.find(".tag-holder"),
                    allSubtitleContentContainer = subtitlesContentContainer.find(".subtitle-content-container");

                if (searchText.length < 2) {
                    searchText = '';
                    //Close all accordions if search text is not valid
                    allSubtitleContentContainer.removeClass("active");
                    jqWrap.parent().parent().removeClass("search-mode");
                } else {
                    //Open all accordions if valid search text is typed
                    allSubtitleContentContainer.addClass("active");
                    jqWrap.parent().parent().addClass("search-mode");
                }

                regEx = new RegExp('(' + searchText + ')', 'gi');

                //Show tag holders that match the search text
                allTagHolders.each(function() {
                    var jqWrap = $(this),
                        textJqWrap = $(".text-data", this),
                        originalText = jqWrap.data('originalText'),
                        newHTML = searchText ? originalText.replace(regEx, "<b>$1</b>") : originalText;

                    textJqWrap.html(newHTML);
                    if (searchText && (originalText === newHTML)) {
                        //Valid search text and no match found
                        jqWrap.addClass("no-display");
                    } else {
                        jqWrap.removeClass("no-display");
                    }
                });

                //Show Subtitle accordion and container if it has filtered tag holder(s)
                allSubtitleContentContainer.each(function() {
                    var jqWrap = $(this),
                        originalText = jqWrap.find(".accordion-subtitle").data('originalText'),
                        newHTML = searchText ? originalText.replace(regEx, "<b>$1</b>") : originalText,
                        hasFilteredTags = jqWrap.find(".tag-holder:not(.no-display)").length;

                    jqWrap.find(".accordion-subtitle span.text-data").html(newHTML);
                    if (!searchText || hasFilteredTags || (newHTML !== originalText)) {
                        jqWrap.removeClass("no-display");
                    } else {
                        jqWrap.addClass("no-display");
                    }
                });
            }

            function RevertSelection() {
                if ($(this).hasClass('disable-action')) {
                    return;
                }

                //Deselect all tags
                $(".tag-holder", elem).removeClass("add").attr("aria-checked", "false");
                $(".accordion-subtitle", elem).removeClass("full-selection").removeClass("partial-selection").attr("aria-checked", "false");
                $(".selection-count", elem).html(0);

                initializeSelection();

                //Disable revert and save links
                $("div.action-button a.component-link").addClass("disable-action");
                window.kpmgPersonalize.interestsChange = false;
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
                        var level2Selector = personalizationUtils.commonUtils.getCssAttrSelectors('data-id', level2key);
                        if(level2Obj.selected) {
                            $(".subtitle-content-container" + level2Selector.selector +" .accordion-subtitle span.action-icon" ).addClass("full-selection").attr("aria-checked", "true").trigger("click");
                            return;
                        }
                        Object.keys(level2Obj).forEach(function(level3key) {
                            var level3Selector = personalizationUtils.commonUtils.getCssAttrSelectors('data-id', level3key);
                            if (!level3key || level3key === 'selected') {
                                //level2Obj contains 'selected' property when user selects whole category
                                return;
                            }
                            $(".subtitle-content-container" + level2Selector.selector + " .tag-holder" + level3Selector.selector).trigger("click");
                        });
                    });
                });

                //If this is the first time user visits myinterests page, auto-select registered locale in country
                if (!preferencesObj.country) {
                    var selectors = personalizationUtils.commonUtils.getCssAttrSelectors('data-id', locale.countryCode + "/" + locale.languageCode);
                    $(".tag-holder" + selectors.selector).trigger("click");
                }
            }

            function getUserPreferences() {
                var preferences = {};

                //Collect all user selected preferences
                $("a.tab-title").each(function() {
                    var identifierVal = $(this).data('id'),
                        englishName = $(this).data('englishName'),
                        selectors = personalizationUtils.commonUtils.getCssAttrSelectors('data-id', identifierVal),
                        containerSelector = ".subtitles-content-container" + selectors.selector;

                    //Collecting level1
                    preferences[englishName] = {};

                    //Collect all level3 selections
                    $(containerSelector + " .accordion-subtitle.partial-selection, " + containerSelector + " .accordion-subtitle.full-selection")
                        .each(function _collectLevel3() {
                            var parentJqWrap = $(this).parent(),
                                id = parentJqWrap.data('id');

                            preferences[englishName][id] = {};
                            preferences[englishName][id].selected = $(this).hasClass('full-selection') ? true : false;

                            parentJqWrap.find(".tag-holder.add").each(function() {
                                preferences[englishName][id][$(this).data('id')] = {};
                            });
                        });
                });


                return preferences;
            }

            function SaveChanges() {
                var preferences = getUserPreferences(),
                    linkName = $(this).text();

                if ($(this).hasClass('disable-action')) {
                    return;
                }

                var accountData = {
                    preferences: JSON.stringify(preferences)
                };
                myInterestsSaveBtnTracking(accountData.preferences, linkName);
                window.gigya.accounts.setAccountInfo({
                    data: accountData,
                    callback: function(response) {
                        var cachedPreferences = personalizationUtils.accountUtils.getInfo();
                        if ((response.errorCode === 0) && cachedPreferences && cachedPreferences.data) {
                            $.when(getAccountInfo())
                                .done(function(response) {
                                    $.extend(response.data, accountData);
                                    personalizationUtils.accountUtils.setInfo(response);
                                })
                                .fail(function() {
                                    $.extend(cachedPreferences.data, accountData);
                                    personalizationUtils.accountUtils.setInfo(cachedPreferences);
                                })
                                .always(function() {
                                    personalizationUtils.accountUtils.clearExplicitSessionInfo();
                                    showModalDialog(".changes-saved");
                                    $("div.action-button a.component-link").addClass("disable-action"); //Disable revert and save links
                                    window.kpmgPersonalize.interestsChange = false;
                                    logger.info("Successfully saved preferences...");
                                    tracking.satelliteTracking({
                                        'Profile': {
                                            ProfileManagement: 'Update Interests'
                                        }
                                    }, 'profileManagement', false);
                                    tracking.track('profileManagement');
                                });
                        } else {
                            // showModalDialog(".save-failed");
                            genericErrorDialog.showDialog();
                            logger.error("Error in storing preferences.\n\tMSG:", response.errorMessage);
                        }
                    }
                });
            }

            function myInterestsSaveBtnTracking(accountData, linkName) {
                var parsedAccData = JSON.parse(accountData);
                var retval = [];
                var level1keys = Object.keys(parsedAccData);

                for (var i = 0; i < level1keys.length; i++) {
                    var level1key = level1keys[i],
                        level2keys = Object.keys(parsedAccData[level1key]);

                    for (var j = 0; j < level2keys.length; j++) {
                        var level2key = level2keys[j],
                            level3keys = Object.keys(parsedAccData[level1key][level2key]);

                        for (var k = 0; k < level3keys.length; k++) {
                            var level3key = level3keys[k];

                            retval.push(level1key + ":" + level2key + ":" + level3key);
                        }
                    }
                }
                retval.join(";");


                tracking.satelliteTracking({
                    'link': {
                        internalLink: 'Button',
                        internalLinkcategory: componentName,
                        ProfileManagement: "Save Preferences",
                        LinkName: linkName,
                        FindingMethod: componentName
                    },
                    'Register': {
                        Preferences: retval
                    }
                }, 'ProfileManagementStart');

            }

            function getAccountInfo() {
                var deferred = $.Deferred();
                if (personalizationUtils.accountUtils.isLoggedIn()) {
                    window.gigya.accounts.getAccountInfo({                        
                        include: personalizationUtils.constants.UserAccountIncludes.join(','),
                        callback: function(response) {
                            if (response.errorCode === 0) {
                                deferred.resolve(response);
                            } else {
                                deferred.reject("Error in getting account info");
                            }
                        }
                    });
                } else {
                    deferred.reject("User is not logged in");
                }

                return deferred.promise();
            }

            function showModalDialog(dialogSelector, timeout) {
                timeout = timeout || 3000;
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
                $(dialogSelector).bs3modal({
                    show: true,
                    backdrop: 'static',
                    keyboard: false
                });
                $(".changes-saved .modal-dialog .modal-body .success-msg").trigger('focus').attr("tabindex", "0");
                setTimeout(function() {
                    $(dialogSelector).bs3modal('hide');
                }, timeout);
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
                    $saveChangesModal.bs3modal({
                        show: true,
                        backdrop: 'static',
                        keyboard: false
                    });
                });

                tracking.satelliteTracking({
                    'user': {
                        gigyaID: personalizationUtils.accountUtils.getInfo().UID
                    }
                }, 'unsavedChangesPopup', false);
                tracking.track('unsavedChangesPopup');
            }

            function saveChangesContinue() {
                var $saveChangesModal = $('.save-changes-modal'),
                    url = $saveChangesModal.data('url');

                $('.save-changes-modal').bs3modal('hide');
                window.kpmgPersonalize.interestsChange = false;

                if (url === 'logout') {
                    Mykpmgflyout.logoutUser();
                } else {
                    $(".loader-overlay").appendTo('body').show();
                    window.location = url;
                }
            }

            function attachEvents() {
                //Attach Title tab selection event
                $(".tab-title", elem).on('click', ActivateTab).on('keyup', ActivateTab);

                //Attach Title accordion expand/collapse event
                $(".accordion-title", elem).on('click', ActivateTitleAccordion).on('keyup', ActivateTitleAccordion);

                //Attach Sub-title accordion expand/collapse event
                $(".accordion-subtitle.has-tags", elem).on('click', ActivateSubTitleAccordion).on('keyup', ActivateSubTitleAccordion);

                //Attach level3 tags group selection
                $(".accordion-subtitle span.action-icon", elem).on('click', ToggleGroupTagSelection).on('keyup', ToggleGroupTagSelection);

                //Toggle tag selection
                $(".tag-holder").on('click', ToggleTagSelection).on('keyup', ToggleTagSelection);

                //Attach search event
                $(".search-input", elem).on('keyup', FilterData);

                //Revert selection
                $(".revert-link a", elem).on('click', RevertSelection);

                //Save changes
                $(".save-changes-link a", elem).on('click', SaveChanges);

                //Save changes continue
                $(document).on("click", ".save-changes-modal .continue", saveChangesContinue);
            }

            function initializeCreatedDom() {
                //Pre-select user preferences
                initializeSelection();

                //Disable revert and save links
                $("div.action-button a.component-link").addClass("disable-action");
                window.kpmgPersonalize.interestsChange = false;

                //Show action buttons
                $("div.no-display").removeClass("no-display");
                
                
                if (personalizationUtils.commonUtils.isMobile()) {
                    handleMobileBreakpoint();
                } else {
                    handleDesktopBreakpoint();
                }
                $(document).ready(function(){
                    selectCountriesTab();
                    // private functions
                    function selectCountriesTab() {
                        if(window.location.hash && window.location.hash.split('#').indexOf('countries') > -1) {
                            $('#tab3').trigger('click');
                        }
                    }
                });

            }

            function handleError(error) {
                logger.error("Error in Interests processing flow.\n\tMSG: ", error);
            }

            function handleMobileBreakpoint() {
                //Collapse all title accordion
                $(".interests-container .accordion-title:first")
                    .addClass('active')
                    .find('span.expand-status')
                    .trigger('click');
            }

            function handleDesktopBreakpoint() {
                //Select first tab
                $(".tab-menu .tab-title:first").trigger('click');
            }

            $(document).on("mobileBreakpoint", handleMobileBreakpoint);

            $(document).on("desktopBreakpoint", handleDesktopBreakpoint);

            var data = {};

            getIndustriesAndCountriesJson()
                .then(cacheJsonResponse)
                .then(processJsonResponse)
                .then(createDomFromData)
                .then(attachEvents)
                .then(initializeCreatedDom)
                .fail(handleError);

            $('.save-changes-modal .return-to-page').on('click', function() {
                tracking.satelliteTracking({
                    'user': {
                        gigyaID: personalizationUtils.accountUtils.getInfo().UID
                    }
                }, 'unsavedChangesReturnToPage', false);
                tracking.track('unsavedChangesReturnToPage', "Return to the page");
            });

            // Keep the following lines at the bottom of the Interests function
            var tracking = new Tracking(elem, 'Interests');
            $(document).trigger('template.loaded');
        };

        return Interests;
    }
);

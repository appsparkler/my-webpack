define(['jquery', 'underscore', 'handlebars', 'tracking', 'personalizationUtils', 'common-utils', 'helpers'],
    function($, _, Handlebars, Tracking, PersonalizationUtils, CommonUtils, Helpers) {
        'use strict';

        var RegistrationPromoOverlay = function(elem) {
            var element = $(elem),
                links = {},
                showPromo = window.kpmgPersonalize.isSitePersonalize && !PersonalizationUtils.accountUtils.isLoggedIn() && PersonalizationUtils.privacyUtils.isAccepted(),
                settings = {
                    count: window.kpmgPersonalize && parseInt(window.kpmgPersonalize.registrationPromoOverlay.revisitCounter),
                    mins: window.kpmgPersonalize && parseInt(window.kpmgPersonalize.registrationPromoOverlay.returnWindowInMinutes),
                    days: window.kpmgPersonalize && parseInt(window.kpmgPersonalize.registrationPromoOverlay.returnWindowInDays)
                },
                revisitCookieName = "visit_count",
                settingsCookieName = "visit_settings",
                displayedCookieName = "promo_shown";

            if(showPromo) {
                initialize();
            }

            function initialize() {
                PersonalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                    links = data.links;
                });

                handlePromoOverlay();

                $('.registration-promo-overlay').find('.register-btn').on('click', function() {
                    Helpers.triggerSatteliteTracking("registerNowCTA");
                    PersonalizationUtils.pathUtils.gotoPage(CommonUtils.CONSTANTS.DOMAIN + links.register.url);
                });

                $('.registration-promo-overlay').find('.login-btn').on('click', function() {
                    Helpers.triggerSatteliteTracking("loginCTA");
                    PersonalizationUtils.pathUtils.gotoPage(CommonUtils.CONSTANTS.DOMAIN + links.login.url);
                });
            }

            function handlePromoOverlay() {
                if(hasSiteSettingsChanged()) {
                    updateRevisitCookie('reset');
                } else if(isCookieAvailable()) {
                    checkToDisplayPromoOverlay();
                    updateRevisitCookie('update');
                } else {
                    updateRevisitCookie('new');
                }
            }

            function hasSiteSettingsChanged() {
                var settingsCookie = $.cookie(settingsCookieName);

                if(settingsCookie) {
                    settingsCookie = JSON.parse(settingsCookie);

                    if( (settingsCookie.count && parseInt(settingsCookie.count) !== settings.count) ||
                        (settingsCookie.mins && parseInt(settingsCookie.mins) !== settings.mins) ||
                        (settingsCookie.days && parseInt(settingsCookie.days) !== settings.days)
                    ) {
                        $.cookie(settingsCookieName, JSON.stringify(settings), {path: '/'});
                        return true;
                    }
                } else {
                    $.cookie(settingsCookieName, JSON.stringify(settings), {path: '/'});
                }

                return false;
            }

            function isCookieAvailable() {
                if($.cookie(revisitCookieName)) {
                    return true;
                }

                return false;
            }

            function updateRevisitCookie(action) {
                var oldCookie = $.cookie(revisitCookieName),
                    dateObj = new Date(),
                    exdate = new Date(),
                    newCookie = dateObj.getTime() + '-' + 1,
                    oldCookieArray = [],
                    daysToExpire = settings.days || 14,
                    oldDateObj;

                if(action === "new" || action === "reset") {
                    exdate.setDate(exdate.getDate() + daysToExpire);
                    newCookie += "-" + exdate.getTime();
                    $.cookie(revisitCookieName, newCookie, {path: '/', expires: exdate});
                } else if(action === "update" && oldCookie) {
                    oldCookieArray = oldCookie.split('-').map(function (x) {
                        return parseInt(x);
                    });
                    exdate = new Date(oldCookieArray[2]);

                    oldDateObj = new Date(oldCookieArray[0]);

                    if( (dateObj.getTime() - oldDateObj.getTime()) / (1000 * 60) > settings.mins ) {
                        newCookie = dateObj.getTime() + '-' + (oldCookieArray[1] + 1) + '-' + exdate.getTime();
                    } else {
                        newCookie = dateObj.getTime() + '-' + oldCookieArray[1] + '-' + exdate.getTime();
                    }

                    $.cookie(revisitCookieName, newCookie, {path: '/', expires: exdate});
                }
            }

            function checkToDisplayPromoOverlay() {
                var revisitCookie =  $.cookie(revisitCookieName),
                    revisitCookieArray = revisitCookie.split('-').map(function (x) {
                        return parseInt(x);
                    }),
                    dateObj = new Date(),
                    oldDateObj = new Date(revisitCookieArray[0]),
                    timeDiffInMins = (dateObj.getTime() - oldDateObj.getTime()) / (1000 * 60);

                if( (timeDiffInMins > settings.mins) &&
                    (timeDiffInMins / (60 * 24) <= settings.days) &&
                    revisitCookieArray[1] === (settings.count - 1) &&
                    !$.cookie(displayedCookieName)
                ) {

                    Helpers.triggerSatteliteTracking("modalCTA");
                    $.cookie(displayedCookieName, true, {path: '/'});
                    $("html, body").animate({
                        scrollTop: 0
                    }, "slow", function() {
                        $(".registration-promo-overlay").bs3modal({
                            show: true,
                            backdrop: 'static',
                            keyboard: false
                        });
                    });

                }
            }

			// Keep the following lines at the bottom of the RegistrationPromoOverlay function
            var tracking = new Tracking(elem, 'RegistrationPromoOverlay');
			$(document).trigger('template.loaded');
        };

        return RegistrationPromoOverlay;
    }
);

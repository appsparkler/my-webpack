define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'personalizationUtils'],
    function ($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer, personalizationUtils) {
        'use strict';

        var TmplLogin = function (elem) {
            var nav = new Navigation(),
                footer = new Footer(),
                navflyouta = new NavFlyoutA(),
                navflyoutb = new NavFlyoutB(),
                navflyoutc = new NavFlyoutC(),
                $components = $('.component'),
                links,
                ACTIVATION_LINK_EXPIRED_ERRORCODE = 403002,
                ACTIVATION_CODE_REDIRECT_DISABLED = 0,
                ACTIVATION_CODE_REDIRECT_ENABLED = 206005,
                processedPath,
                localeObj = personalizationUtils.accountUtils.getLocale(),
                localeStr = '/' + localeObj.countryCode + '/' + localeObj.languageCode + '/',
                currentSite = window.kpmgPersonalize.snp.params.countryCode + '_' + window.kpmgPersonalize.snp.params.languageCode;
            if (window.kpmgPersonalize.misc.isAuthor) {
                processedPath = window.location.pathname.replace(/^\/(\w+)\/(\w+)\/(\w+)\/(\w+)\//, "/$1/$2" + localeStr);
            } else {
                processedPath = window.location.pathname.replace(/^\/(\w+)\/(\w+)\//, localeStr);
            }

            function redirectFromEmailVerification() {
                return (document.referrer.match(encodeURI(window.location.hostname)) && document.referrer !== "" && (encodeURI(window.location.search).match("errorCode=" + ACTIVATION_CODE_REDIRECT_DISABLED) || encodeURI(window.location.search).match("errorCode=" + ACTIVATION_CODE_REDIRECT_ENABLED)) && !encodeURI(window.location).match("errorCode=" + ACTIVATION_LINK_EXPIRED_ERRORCODE)) || false;
            }

            if (redirectFromEmailVerification()) {
                if (localStorage && !localStorage.getItem("showCongratsPopUp")) {
                    localStorage.setItem("showCongratsPopUp", "true");
                }
            }
            if (personalizationUtils.accountUtils.isLoggedIn() && !window.kpmgPersonalize.misc.isAuthor) {
                personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                    links = data.links;
                    var registeredSiteDashboardUrl = links.dashboard.url.replace(/^\/(\w+)\/(\w+)\//, localeStr),
                        registeredSiteProfileUrl = links.profile.url.replace(/^\/(\w+)\/(\w+)\//, localeStr),
                        accountInfo = personalizationUtils.accountUtils.getInfo();

                    if ( window.kpmgPersonalize.isPPC && personalizationUtils.commonUtils.getUrlParamsObj().origin ) {
                        personalizationUtils.commonUtils.setValue('origin', personalizationUtils.commonUtils.getUrlParamsObj().origin);
                        if (personalizationUtils.commonUtils.getUrlParamsObj().origin === 'internal') {
                            personalizationUtils.commonUtils.setValue('cross_site_referrer', document.referrer);
                        }
                        if (processedPath !== window.location.pathname) {
                            personalizationUtils.commonUtils.setValue('cross_site', true);
                            personalizationUtils.commonUtils.setValue('cross_site_name', currentSite);
                        }

                        if (accountInfo &&
                                accountInfo.subscriptions &&
                                accountInfo.subscriptions[localeObj.countryCode] &&
                                accountInfo.subscriptions[localeObj.countryCode][localeObj.languageCode] &&
                                accountInfo.subscriptions[localeObj.countryCode][localeObj.languageCode].terms.email &&
                                accountInfo.subscriptions[localeObj.countryCode][localeObj.languageCode].terms.email.isSubscribed === false) {

                            personalizationUtils.pathUtils.gotoPage("../../../../" + registeredSiteDashboardUrl);
                        } else {
                            personalizationUtils.pathUtils.gotoPage("../../../../" + registeredSiteProfileUrl);
                        }

                        return;
                    } else {
                        personalizationUtils.commonUtils.clearValues('origin');
                        personalizationUtils.commonUtils.clearValues('subid');                        
                        personalizationUtils.commonUtils.clearValues('cross_site');
                        personalizationUtils.commonUtils.clearValues('cross_site_name');
                        personalizationUtils.pathUtils.gotoPage("../../../../" + registeredSiteDashboardUrl);

                        return;
                    }
                });
            }

            $.each($components, function (index, val) {
                var name = $(val).attr('class'),
                    module = name.substring(7, name.indexOf(' '));

                require([module], function (mod) {
                    mod(val, module);
                });
            });

            $(document).trigger('template.loaded');
        };

        $(function () {
            var tmpl = new TmplLogin();
        });
    }
);

define(['jquery', 'tracking', 'personalizationUtils', 'genericErrorDialog'],
    function($, Tracking, personalizationUtils, genericErrorDialog) {
        'use strict';

        var Unsubscribe = function(elem) {
            var links,
                processedPath,
                localeObj = personalizationUtils.accountUtils.getLocale(),
                localeStr = '/' + localeObj.countryCode + '/' + localeObj.languageCode + '/',
                currentSite = window.kpmgPersonalize.snp.params.countryCode + '_' + window.kpmgPersonalize.snp.params.languageCode;

            if (window.kpmgPersonalize.misc.isAuthor) {
                processedPath = window.location.pathname.replace(/^\/(\w+)\/(\w+)\/(\w+)\/(\w+)\//, "/$1/$2" + localeStr);
            } else {
                processedPath = window.location.pathname.replace(/^\/(\w+)\/(\w+)\//, localeStr);
            }

            if (personalizationUtils.accountUtils.isLoggedIn() && !window.kpmgPersonalize.misc.isAuthor) {
                personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                    links = data.links;

                    if (window.kpmgPersonalize.isPPC && processedPath !== window.location.pathname) {
                        personalizationUtils.commonUtils.setValue('origin', 'internal');
                        personalizationUtils.commonUtils.setValue('cross_site_referrer', location.href);
                        personalizationUtils.commonUtils.setValue('cross_site', true);
                        personalizationUtils.commonUtils.setValue('cross_site_name', currentSite);
                    }
                });
            }

            $(".optout-all").on('click', optoutSubscriptions);
            $(".optout-cancel").on('click', redirectToHome);
            $('#unsubscribeSuccessModal').on('hidden.bs3.modal', redirectToHome);

            function optoutSubscriptions() {
                var uid = personalizationUtils.commonUtils.getUrlParamsObj().uid || '',
                    url = '/bin/kpmg/unsubscribe?uid=' + uid + '&locale=' + window.kpmgPath.substr(0, 6);

                if (uid) {
                    $.ajax({
                        method: "POST",
                        url: url
                    }).done(function(data) {
                        if (data.responseCode === 200) {
                            $("html, body").animate({
                                scrollTop: 0
                            }, "slow", function() {
                                $("#unsubscribeSuccessModal").bs3modal({
                                    show: true,
                                    backdrop: 'static',
                                    keyboard: false
                                });
                            });
                        } else {
                            genericErrorDialog.showDialog();
                        }
                    }).fail(function(err) {
                        console.log(err);
                        genericErrorDialog.showDialog();
                    });
                }
            }

            function redirectToHome() {
                personalizationUtils.pathUtils.gotoPage("../../home.html");
            }

            $("a, .btn", elem).on("keyup", function(e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).addClass('focusOutline');
                } else if (e.which === 13) {
                    $(this).trigger("click");
                }
            });
            $("a, .btn", elem).on("blur", function() {
                $(this).removeClass('focusOutline');
            });

            $('.module-tmpl-unsubscribe .module-bodytext a').each(function() {
                var ariaLabel = $(this).closest('.bodytext-data').text();
                $(this).attr('aria-label', ariaLabel);
            });

            // Keep the following lines at the bottom of the Unsubscribe function
            var trck = new Tracking(elem, 'Unsubscribe');
            $(document).trigger('template.loaded');
        };

        return Unsubscribe;
    }
);

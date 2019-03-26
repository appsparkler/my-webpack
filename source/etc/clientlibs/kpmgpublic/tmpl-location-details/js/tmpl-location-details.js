define(['common-utils','jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer','jquerymobilereflow'],
        function (CommonUtils, $, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer) {
            'use strict';
            var TmplLocationDetails = function () {
                var nav = new Navigation(),
                    footer = new Footer(),
                    navflyouta = new NavFlyoutA(),
                    navflyoutb = new NavFlyoutB(),
                    navflyoutc = new NavFlyoutC(),
                    $components = $('.component');
                //
                CommonUtils.initializeAllComponents($components, allComponentsInitializedCb);
                //
                function allComponentsInitializedCb() {
                    CommonUtils.fixChromeIssueForAuthor('.module-tmpl-location-details');
                    //
                    $(document).trigger('template.loaded');
                    // Loads the reflow script for mobile component reflow
                    require(['jquerymobilereflow']);
                    if(!window.kpmgPersonalize.misc.isAuthor) {
                        //Hide empty bodytext components
                        $('.module-tmpl-location-details .module-bodytext').each(function() {
                            if (!$(this).text().trim()) {
                                $(this).hide();
                            }
                        });
                    }
                }
            };
            $(function () {
                var tmpl = new TmplLocationDetails();
            });
        }
);

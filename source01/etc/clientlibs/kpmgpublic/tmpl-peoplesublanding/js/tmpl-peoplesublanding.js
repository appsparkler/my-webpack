define(['common-utils', 'jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer'],
        function (CommonUtils, $, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer) {
            'use strict';
            var TmplPeoplesublanding = function () {
                var nav = new Navigation(),
                    footer = new Footer(),
                    navflyouta = new NavFlyoutA(),
                    navflyoutb = new NavFlyoutB(),
                    navflyoutc = new NavFlyoutC(),
                    $components = $('.component');
                //
                CommonUtils.initializeAllComponents($components, initialize);
                //
                function initialize(){
                    CommonUtils.fixChromeIssueForAuthor('.module-tmpl-peoplesublanding');
                }
                $(document).trigger('template.loaded');
                // Loads the reflow script for mobile component reflow
                //require(['jquerymobilereflow']);
            };
            $(function () {
                var tmpl = new TmplPeoplesublanding();
            });
        }
);
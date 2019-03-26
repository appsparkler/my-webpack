define(['common-utils', 'jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'jquerymobilereflow'],
        function (CommonUtils, $, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer) {
            'use strict';
            var TmplGenericabout = function () {
                var nav = new Navigation(),
                    footer = new Footer(),
                    navflyouta = new NavFlyoutA(),
                    navflyoutb = new NavFlyoutB(),
                    navflyoutc = new NavFlyoutC(),
                    $componentElems = $('.component');
                //
                CommonUtils.initializeAllComponents($componentElems, allComponentsInitializedCb);
                //
                function allComponentsInitializedCb() {
                    CommonUtils.fixChromeIssueForAuthor('.module-tmpl-genericabout');
                }
                //
                $(document).trigger('template.loaded');

                // Loads the reflow script for mobile component reflow
                require(['jquerymobilereflow']);
            };
            $(function () {
                var tmpl = new TmplGenericabout();
            });
        }
);
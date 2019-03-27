define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer'],
        function ($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer) {
            'use strict';
            var TmplCampaigntopic = function () {
                var nav = new Navigation(),
                    footer = new Footer(),
                    navflyouta = new NavFlyoutA(),
                    navflyoutb = new NavFlyoutB(),
                    navflyoutc = new NavFlyoutC(),
                    $components = $('.component');
                $.each($components, function (index, val) {
                    var name = $(val).attr('class'),
                        module = name.substring(7, name.indexOf(' '));
                    require([module], function (mod) {
                        mod(val);
                    });
                });
                $(document).trigger('template.loaded');
                // Loads the reflow script for mobile component reflow
                require(['jquerymobilereflow']);
            };
            $(function () {
                var tmpl = new TmplCampaigntopic();
            });
        }
);
define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'common-utils'],
        function ($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer, CommonUtils) {
            'use strict';
            var TmplEventsLanding = function () {
                var nav = new Navigation(),
                    footer = new Footer(),
                    navflyouta = new NavFlyoutA(),
                    navflyoutb = new NavFlyoutB(),
                    navflyoutc = new NavFlyoutC(),
                    $components = $('.component');
                //
                CommonUtils.redirectForInvalidQueryParams();
                //
                $.each($components, function (index, val) {
                    var name = $(val).attr('class'),
                        module = name.substring(7, name.indexOf(' '));
                    require([module], function (mod) {
                        mod(val);
                    });
                });
                $(document).trigger('template.loaded');
            };
            $(function () {
                var tmpl = new TmplEventsLanding();
            });
        }
);
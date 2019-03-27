define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'personalizationUtils'],
    function ($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer, personalizationUtils) {
        'use strict';

        var TmplRegistration = function (elem) {
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
                    mod(val, module);
                });
            });

            $(document).trigger('template.loaded');
        };

        $(function () {
            var tmpl = new TmplRegistration();
        });
    }
);
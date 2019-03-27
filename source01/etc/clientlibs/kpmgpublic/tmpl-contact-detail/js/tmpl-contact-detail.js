/*global handleModalLoaded*/
define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer','jquerymobilereflow'],
        function ($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer) {
            'use strict';
            var ContactDetail = function () {
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

                if($('.module-connectwithme')) {
                    var contentHeight = parseInt($('.module-connectwithme').innerHeight()) + 'px';
                    if($('.module-contactcredentials .contactcredentials-listingGroup') &&  !(window.kpmg.isMobile)) {
                        $('.module-contactcredentials .contactcredentials-listingGroup').css('min-height', contentHeight);
                    }
                }

                $(document).trigger('template.loaded');
                // Loads the reflow script for mobile component reflow
                require(['jquerymobilereflow']);
            };
            $(function () {
                var tmpl = new ContactDetail();
            });
        }
);
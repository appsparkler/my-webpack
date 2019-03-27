define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'underscore', 'ddt-landing-utils'],
    function($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer, _, DDT_Utils) {
        'use strict';
        var DdtLanding = function(elem) {
            init();
            setupImagePlaceholders();

            function init() {
                var nav = new Navigation(),
                    footer = new Footer(),
                    navflyouta = new NavFlyoutA(),
                    navflyoutb = new NavFlyoutB(),
                    navflyoutc = new NavFlyoutC(),
                    $components = $('.component');

                $.each($components, function(index, val) {
                    var name = $(val).attr('class'),
                        module = name.substring(7, name.indexOf(' '));

                    require([module], function(mod) {
                        mod(val);
                    });
                });
            }

            function setupImagePlaceholders() {

                $(window).on('resize', function() {
                    setTimeout(DDT_Utils.resizeImagePlaceholders, 500);
                });
            }


            $(document).trigger('template.loaded');
        };

        $(function() {
            var tmpl = new DdtLanding();
        });
    });
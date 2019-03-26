define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer'],
    function ($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer) {
        'use strict';
        var TmplTool = function () {
            var nav = new Navigation(),
                footer = new Footer(),
                navflyouta = new NavFlyoutA(),
                navflyoutb = new NavFlyoutB(),
                navflyoutc = new NavFlyoutC();

            this.mountComponents = function (cName) {
                var component = cName || '.component';
                var $components = $(component);
                $.each($components, function (index, val) {
                    var name = $(val).attr('class'),
                        module = name.substring(7, name.indexOf(' '));
                    require([module], function (mod) {
                        mod(val, module);
                    });
                });
            };

            this.mountComponents();
            $(document).trigger('template.loaded');
        };
        $(function () {
            window.kpmg = window.kpmg || {};
            window.kpmg.template = window.kpmg.template || {};
            var tmpl = window.kpmg.template.tools = new TmplTool();
        });
    }
);
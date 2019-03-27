define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'personalizationUtils', 'resendVerificationEmail'],
    function($, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer, personalizationUtils, resendVerificationEmail) {
        'use strict';

        var TmplMyaccount = function(elem) {
            var nav = new Navigation(),
                footer = new Footer(),
                navflyouta = new NavFlyoutA(),
                navflyoutb = new NavFlyoutB(),
                navflyoutc = new NavFlyoutC(),
                $components = $('.component');

            if (!personalizationUtils.accountUtils.isLoggedIn() && !window.kpmgPersonalize.misc.isAuthor) {
                personalizationUtils.pathUtils.gotoPage("./login.html");
                return;
            }

            $.each($components, function(index, val) {
                var name = $(val).attr('class'),
                    module = name.substring(7, name.indexOf(' '));

                require([module], function(mod) {
                    mod(val, module);
                });
            });

            //Supress verify email modal when RS OPP/Generic or SS OPP modal is shown - KPMGS-14867
            if (!personalizationUtils.commonUtils.getValue('cross_site') && !window.kpmgPersonalize.rsOppShown && !window.kpmgPersonalize.rsGenericShown) {
                resendVerificationEmail.validate();
            }

            $(document).trigger('template.loaded');
        };

        $(function() {
            var tmpl = new TmplMyaccount();
        });
    }
);

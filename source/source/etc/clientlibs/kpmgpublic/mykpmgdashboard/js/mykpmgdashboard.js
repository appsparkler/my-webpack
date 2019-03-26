define(['jquery', 'tracking', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer'],
    function($, Tracking, Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC, Footer) {
        'use strict';

        var Mykpmgdashboard = function(elem) {
            var nav             = new Navigation(),
                footer          = new Footer(),
                navflyouta       = new NavFlyoutA(),
                navflyoutb       = new NavFlyoutB(),
                navflyoutc       = new NavFlyoutC(),
                $components     = $('.component');

            $.each($components, function(index, val) {
                var name = $(val).attr('class'),
                    module = name.substring(7, name.indexOf(' '));

                require([module], function(mod) {
                    mod(val);
                });
            });

            // populating based on personalization and logged in status
            if (window.kpmgPersonalize.personalizationUtils.accountUtils.isLoggedIn() || window.kpmgPersonalize.isSitePersonalize) {
                var tracking = new Tracking(elem, 'ProfileManagement');
                tracking.satelliteTracking({
                    'login': {
                        loginStatus: 'Logged-In'
                    }
                }, 'profileManagement', false);
            }

            // adding gigya id for analytics tracking
            window.digitalData.user.gigyaID = window.kpmgPersonalize.personalizationUtils.accountUtils.getInfo().UID;

            $(document).trigger('template.loaded');
        };

        $(function(){
            var tmpl = new Mykpmgdashboard();
        });
    }
);

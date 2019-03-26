define(['jquery', 'footer'],
    function($, Footer) {
        'use strict';
		
		checkForNavigationV1();

        var Home;

		Home = function(elem) {
			var footer          = new Footer(),
                $components     = $('.component');

            $.each($components, function(index, val) {
                var name = $(val).attr('class'),
                    module = name.substring(7, name.indexOf(' '));

                require([module], function(mod) {
					mod(val);
                });
            });
            $(document).trigger('template.loaded', [true]);
			// Loads the reflow script for mobile component reflow
			require(['jquerymobilereflow']);
        };
		
        $(function(){
            var home = new Home();
        });
		// private functions
		function checkForNavigationV1() {
			var isNavigationV1;
			//
			isNavigationV1 = $('.global-nav').length;
			//
			if(isNavigationV1) {
				require(['navigation', 'navflyouta', 'navflyoutb', 'navflyoutc'], 
				function(Navigation, NavFlyoutA, NavFlyoutB, NavFlyoutC) {
					new Navigation();
					new NavFlyoutA();
					new NavFlyoutB();
					new NavFlyoutC();
				});
			}
		}
    }
);
define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchLanguageToggle = function(elem) {
            
            $(elem).on('click', '.module-touch-language-toggle .toggle-list a', function() {
                var language = $(this).text();
                window.digitalData.page.languageSelect = language;
                trck.track("articleLanguageChange");
            });

			// keep the following lines at the bottom of the TouchLanguageToggle function
            var trck = new Tracking(elem, 'TouchLanguageToggle');
			$(document).trigger('template.loaded');
        };

        return TouchLanguageToggle;
    }
);

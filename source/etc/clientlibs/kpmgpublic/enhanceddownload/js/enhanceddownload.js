define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var Enhanceddownload = function(elem) {
			// Keep the following lines at the bottom of the Enhanceddownload function
            var trck = new Tracking(elem, 'Enhanceddownload'),
            isMobileDevice = window.matchMedia("all and (max-width: 641px)").matches;
            if(isMobileDevice){
                $(elem).find('.componentTitle').removeClass('line-clamp-1').addClass('line-clamp-2');
                $(elem).find('.reportTitle').removeClass('line-clamp-1').addClass('line-clamp-2');
                $(elem).find('.reportDesc').removeClass('line-clamp-1').addClass('line-clamp-2');
                
            }
			$(document).trigger('template.loaded');
        };

        return Enhanceddownload;
    }
);
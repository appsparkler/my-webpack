define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var FooterV2 = function(elem) {
			// Keep the following lines at the bottom of the FooterV2 function
            var trck = new Tracking(elem, 'FooterV2');
            
            //To apply flex pattern by wrapping every li for mobile only
            var li = $('.module-footer-v2 ul.mobile-only li');
            for(var i = 0; i < li.length; i+=2) {
                li.slice(i, i+2).wrapAll("<div class='li-wrapper'></div>");
            }
			$(document).trigger('template.loaded');
        };

        return FooterV2;
    }
);
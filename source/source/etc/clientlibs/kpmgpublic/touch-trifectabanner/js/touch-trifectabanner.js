define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchTrifectabanner = function(elem) {
            $('a', elem).on('keyup', function (e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).trigger('focus').addClass("focusOutline");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });
            $('a', elem).on('keydown', function(e) {
                if( e.which === 9 ) {
                    $(this).removeClass("focusOutline");
                }
                if (e.which === 13) {
                    $(this).trigger("click");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });

            // $('.dashboard-banner-cta', elem).on('click', function(){
            //     trck.track('componentLink', $(this).find('.banner-text:visible').text());
            // });
			// Keep the following lines at the bottom of the TouchTrifectabanner function
            var trck = new Tracking(elem, 'TouchTrifectabanner');
			$(document).trigger('template.loaded');
        };

        return TouchTrifectabanner;
    }
);

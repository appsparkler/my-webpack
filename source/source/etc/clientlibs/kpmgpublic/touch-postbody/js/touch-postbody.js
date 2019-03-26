define(['jquery', 'tracking', 'helpers', 'personalizationUtils'],
    function($, Tracking, Helpers,personalizationUtils) {
        'use strict';

        var TouchPostBody = function(elem) {
    
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

			// Keep the following lines at the bottom of the TouchPostBody function
            var trck = new Tracking(elem, 'TouchPostBody');
			$(document).trigger('template.loaded');
        };

        return TouchPostBody;
    }
);

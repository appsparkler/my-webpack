define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchInlinelist = function(elem) {
            $(".inlinelist-listingGroup", elem).mCustomScrollbar({
                theme: "dark-thick",
                mouseWheelPixels: 500
            });

            if($(".mCustomScrollBox")) {
                $(".mCustomScrollBox").attr("tabindex","-1");
            }

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
            
			// Keep the following lines at the bottom of the TouchInlinelist function
            var trck = new Tracking(elem, 'TouchInlinelist');
			$(document).trigger('template.loaded');
        };

        return TouchInlinelist;
    }
);

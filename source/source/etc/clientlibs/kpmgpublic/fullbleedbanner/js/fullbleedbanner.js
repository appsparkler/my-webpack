define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var fullbleedbanner = function(elem) {

            if(window.kpmgPersonalize.misc.isAuthor){
                $("img", elem).each(function(){
                    var image = $(this);
                    if (image.prop('naturalWidth') === 0 || image.readyState === 'uninitialized') {
                        $(elem).hide();
                    }
                });
            }
            //To unset the box shadow for header if full bleed banner 
            $('header.global-nav').css('box-shadow', 'none');
			// Keep the following lines at the bottom of the Fullbleedbanner function
            var trck = new Tracking(elem, 'fullbleedbanner');
			$(document).trigger('template.loaded');
        };

        return fullbleedbanner;
    }
);

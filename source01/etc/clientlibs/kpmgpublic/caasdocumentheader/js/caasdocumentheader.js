define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var CaaSDocumentHeader = function(elem) {

            // open slider on click of navbar on mobile
            $('#caas-toggle-nav').on("click", function(event) {
                event.preventDefault();
                if( $('.inner-container').find('.caas-sub-nav').hasClass('show-sub-nav')) {
                    $('.inner-container').find('.caas-sub-nav').removeClass("show-sub-nav");
                    $('.inner-container').find('.caas-body-text').removeClass("hide-caas-body-text");
                    $('body').removeClass('hide-overflow');
                    $('.module-tmpl-caas-documentation').find('.module-caasdocumentfooter').removeClass("hide-caas-footer");
                }
                else {
                    $('.inner-container').find('.caas-sub-nav').addClass("show-sub-nav");
                    $('body').addClass("hide-overflow");
                    $('.inner-container').find('.caas-body-text').addClass("hide-caas-body-text");
                    $('.module-tmpl-caas-documentation').find('.module-caasdocumentfooter').addClass("hide-caas-footer");
                }
            });

			// Keep the following lines at the bottom of the Caasdocumentheader function
            var trck = new Tracking(elem, 'CaaSDocumentHeader');
			$(document).trigger('template.loaded');
        };

        return CaaSDocumentHeader;
    }
);

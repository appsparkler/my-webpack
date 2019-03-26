define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchAuthorSpotlight = function(elem) {
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

            $('.author-details', elem).on('click', '.social-link', function(e) {
                var linkName = $('.author-name', elem).text() + $('.author-role', elem).text();
                trck.track('componentLink', linkName, false, $(this).text());
            });

            $('.module-touch-author-spotlight').on('click', function(e) {
                var isCellNotClicked = $(e.target).parent().hasClass('social-link');
                if(!isCellNotClicked) {
					var authorUrl = $('.author-anchor', elem).attr('href');
                    trck.track('componentLink', $('.author-name', elem).text());
					window.location.href = authorUrl;
                }
            });

			// Keep the following lines at the bottom of the TouchAuthorSpotlight function
            var trck = new Tracking(elem, 'TouchAuthorSpotlight');
			$(document).trigger('template.loaded');
        };

        return TouchAuthorSpotlight;
    }
);

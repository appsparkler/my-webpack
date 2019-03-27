define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchFeaturedauthors = function(elem) {
            var snpParams = window.kpmgPersonalize.snp.params;
            $('.author').each(function(){
                var $this = $(this),
                    query = $this.data('countquery'),
                    queryUrl = '/solr' +'/'+ snpParams.countryCode + "_" + snpParams.languageCode + '/' + 'select?' + query;

                $.ajax({
                    url: queryUrl
                })
                .done(function(response){
                    var count = (response.featuredAuthor && response.featuredAuthor.totalRecords) || 0;
                    $this.find('.count').html(count);
                })
                .fail(function(){
                    $this.find('.count').html(0);
                });
            });

            $('a', elem).on('keyup', function (e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).find('.author-image').trigger('focus').addClass("focusOutline");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });
            $('a', elem).on('keydown', function(e) {
                if( e.which === 9 ) {
                    $(this).find('.author-image').removeClass("focusOutline");
                }
                if (e.which === 13) {
                    $(this).trigger("click");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });

            $('.author', elem).on('click', function(event) {
                trck.track('componentLink', $(this).find('.author-name').text());
                if( 'ontouchstart' in document.documentElement || navigator.userAgent.match(/Tablet|iPad/i) ) {
                    if( $(this).hasClass('hover_effect') ) {
                        return true;
                    }
                    else {
                        $(this).addClass('hover_effect');
                        event.preventDefault();
                        return false;
                    }
                }
            });

			// Keep the following lines at the bottom of the TouchFeaturedauthors function
            var trck = new Tracking(elem, 'TouchFeaturedauthors');
			$(document).trigger('template.loaded');
        };

        return TouchFeaturedauthors;
    }
);

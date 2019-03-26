define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchPostStats = function(elem) {
            var snpParams = window.kpmgPersonalize.snp.params;

            // need to cunstruct url and redirect to it on click of tag
            $('.post-stats-list > .list-item > a').on('click', function handleTagSearch(e) {
                // Cancel the default action
                var $this = $(this),
                    url = e.target.href + '?all_sites=false&facets=false&language=' + snpParams.languageCode + '&site=' + snpParams.countryCode + "_" + snpParams.languageCode + '&x1=KPMG_Tab_Type&q1=Blogs';

                e.preventDefault();
                trck.track('componentLink', $(this).text(), false, $(this).text());
                var searchText=$this.data('search');
                if( $this.data('search').indexOf('TOPICS_') === 0 ) {
                    url += '&x2=KPMG_Blog_Topics&q2='+ searchText.slice(7);
                } else {
                    url += '&x2=KPMG_SL_Local_Id&q2='+ searchText;
                }

                window.location.href = url;
            });

            $('.list-item', elem).on('keyup', function (e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).trigger('focus').addClass("focusOutline");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });
            $('.list-item', elem).on('keydown', function(e) {
                if( e.which === 9 ) {
                    $(this).removeClass("focusOutline");
                }
                if (e.which === 13) {
                    $(this).trigger("click");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });

			// Keep the following lines at the bottom of the TouchPostStats function
            var trck = new Tracking(elem, 'TouchPostStats');
			$(document).trigger('template.loaded');
        };

        return TouchPostStats;
    }
);

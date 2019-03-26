/* global s */
define(['jquery', 'cqservice', 'handlebars', 'precompile', 'tracking'],
    function($, Service, Handlebars, PrecompiledHandlebars, Tracking) {
        'use strict';
        var Trendinglist = function(elem) {
            var moduleTrendinglist = $(elem);

            moduleTrendinglist.each(function() {
                var _this = $(this),
                compName = 'trendingtopic',
                    tplConfig = {
                        template: PrecompiledHandlebars[compName],
                        container: $('.trendinglist-listingGroupLinks', _this)
                    },
                    trendingListService = new Service("trendinglist", {
                        baseUrl: _this.data('queryUrl')
                    });
                trendingListService.searchFetch(function(data) {
                    if (data) {
                        tplConfig.container.html(tplConfig.template(data));
                    }
                }, '');
            });

            // on orientation change the function will trigger to adjust the component as per the device width and height.
            $(window).one("orientationchange", function(event) {
                Trendinglist();
            });
            //Accessibility
            moduleTrendinglist.on('keyup', 'a', function(e) {
                $(this).addClass("focusOutline");
            });
            moduleTrendinglist.on('blur', 'a', function(e) {
                $(this).removeClass("focusOutline");
            });

            var trck = new Tracking(elem, 'Trendinglist');
            $(document).trigger('template.loaded');

        };
        return Trendinglist;
    }
);

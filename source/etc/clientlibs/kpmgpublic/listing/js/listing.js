/* global s */
define(['jquery','cqservice', 'handlebars', 'precompile', 'tracking'],
        function ($, Service, Handlebars, PrecompiledHandlebars, Tracking) {
            'use strict';
            var Listing = function (elem) {

                var modulelisting = $(elem),
                isAuto = modulelisting.length && modulelisting.data('contenttype') === "auto" ?  true : false,
                scrollSelector;

                if(isAuto){
                    modulelisting.each(function() {
                        var url = $(this).data('query-url'),
                            _this = $(this),
                            compName = 'listings',
                            tplConfig = {
                                template: PrecompiledHandlebars[compName],
                                container: $('.listing-listingLinksAuto',$(this))
                            },
                            listingService = new Service("listing", {
                                baseUrl: url
                            });
                        listingService.searchFetch(function(data) {
                            if (data) {
                                tplConfig.container.html(tplConfig.template(data));
                                
                                $(".listing-listingGroups", elem).mCustomScrollbar({
                                    theme: "dark-thick",
                                    mouseWheelPixels: 500
                                });
                            }
                        }, '');
                    });                  
                    
                }else{
                    // Keep the following line at the bottom of the Listing function
                    $(".listing-listingGroups", elem).mCustomScrollbar({
                        theme: "dark-thick",
                        mouseWheelPixels: 500
                    });
                }
              

                if($(".mCustomScrollBox")) {
                    $(".mCustomScrollBox").attr("tabindex","-1");
                }
                var trck = new Tracking(elem, 'Listing');
                $(document).trigger('template.loaded');
              
            };
            return Listing;
        }
);

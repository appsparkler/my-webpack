/* global s */
define(['jquery',
    'handlebars',
    'precompile',
    'cqservice',
    'tracking'
],
        function ($, Handlebars, PrecompiledHandlebars, Service, Tracking) {
            'use strict';
            var Publicationserieslist = function (elem) {
                var compName = 'publicationserieslist';
                var _this = $(elem),
                    tplConfig = {
                        template: PrecompiledHandlebars[compName],
                        container: $('.Publicationserieslist-listingGroupLinks'),
                        i18nLabel: _this.attr('data-i18nLabel')
                    },
                    publicationListService = new Service("modulepublicationlist", {
                        baseUrl: _this.data('path')
                    });
                publicationListService.SOLRFetch(function (data) {
                    if (data) {
                        var dataSOLR = {"results": data};
                        dataSOLR = $.extend(true, dataSOLR, {"label": tplConfig.i18nLabel});
                        tplConfig.container.html(tplConfig.template(dataSOLR));
                    }
                    accessibility();
                }, 'results', _this.data("items"), 0);

                //Accessibility
                function accessibility () {
                    $("a", elem).on("keyup", function(e) {
                        if (e.which === 9) {
                            $(this).removeAttr("tabindex").addClass("focusOutline");
                        }
                    });
                    $("a", elem).on("blur", function() {
                        $(this).removeClass("focusOutline");
                    });
                }   
                var trck = new Tracking(elem, 'Publicationserieslist');
                $(document).trigger('template.loaded');
            };
            return Publicationserieslist;
        }
);
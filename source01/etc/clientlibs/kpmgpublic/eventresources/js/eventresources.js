/* global s */
/* global kpmgAssetDomain */
define(['jquery',
        'handlebars',
        'precompile',
        'cqservice',
        'tracking'
    ],
    function($, Handlebars, PrecompiledHandlebars, Service, Tracking) {
        'use strict';
        var Eventresources = function(elem) {
            var eventResourcePanel = $(".module-eventresources-content", elem),
                btnMorePanel = $(".module-eventresources-loadMoreBtn", elem),
                eventResourcePartial = $('#eResources-partial'),
                compName = 'eResources',
                btnMore = $(".btn-more", elem),
                options = {
                    baseUrl: btnMorePanel.attr("data-url")
                },
                eventResourceService = new Service('eventresources', options),
                loadMoreTemplate = PrecompiledHandlebars[compName],
                totalRecords = parseInt(btnMore.attr("data-totalRecords")),
                currentPage = parseInt(btnMore.attr("data-page")),
                recordSize = parseInt(btnMore.attr("data-recordSize")),
                totalPages = (parseInt(totalRecords / recordSize) + (((totalRecords % recordSize) === 0) ? 0 : 1)),
                downloadLabel = eventResourcePanel.attr("data-download-label"),
                isFirstLoad = true;
            eventResourceService.fetch(handleServiceResultForPub, 'results', currentPage, recordSize);
            if (totalRecords <= recordSize) {
                btnMorePanel.remove();
            } else {
                btnMore.on('click', handleLoadMoreClick);
            }

            function handleLoadMoreClick(evt) {
                evt.preventDefault();
                if (currentPage < totalPages) {
                    ++currentPage;
                    if (currentPage === totalPages) {
                        btnMorePanel.remove();
                    }
                }
                isFirstLoad = false;
                eventResourceService.fetch(handleServiceResultForPub, 'results', currentPage, recordSize);
            }

            function handleServiceResultForPub(data) {
                var resources_html = "";
                if (kpmgAssetDomain) {
                    data = $.extend(true, data, {
                        "assetDomainName": kpmgAssetDomain
                    });
                }
                $.each(data, function(index, val) {
                    val = $.extend(true, val, {
                        "downloadButtonLabel": downloadLabel
                    });
                    resources_html += loadMoreTemplate(val);
                    setTimeout(function() {
                        $('img.lazy').unveil();
                    }, 100);
                });
                eventResourcePanel.append(resources_html);
                accessibility();
            }

            function accessibility() {
                //Accessibility
               /* if (!isFirstLoad) {
                    $("a:first", elem).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                }*/
                $("a", elem).on("keyup", function(e) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    }
                });
                $("a", elem).on("blur", function() {
                    $(this).removeAttr("tabindex").removeClass("focusOutline");
                });
            }
            
            // Keep the following line at the bottom of the Eventresources function
            var trck = new Tracking(elem, 'Eventresources');
            $(document).trigger('template.loaded');
        };
        return Eventresources;
    });
/* global s */
/* global showShareUI*/
/* global shareProperties */
/* global kpmgAssetDomain */
define(['jquery', 'clamp', 'handlebars', 'precompile', 'cqservice', 'tracking'],
    function($, $clamp, Handlebars, PrecompiledHandlebars, Service, Tracking) {
        'use strict';
        var galleryMeta = {
                galleryIndex: 0,
                records: []
            },
            isMobileDevice = window.matchMedia("all and (max-width: 641px)").matches;
        var Tombstonegallery = function(elem) {

            // Keep the following lines at the bottom of the Tombstonegallery function
            //var trck = new Tracking(elem, 'Tombstonegallery');
            if(isMobileDevice){
                $(elem).find('.tertiary-head').removeClass('line-clamp-1').addClass('line-clamp-2');
                // $(elem).find('.description').removeClass('line-clamp-3').addClass('line-clamp-4');
            }
            var slideCurrentIndex = 0,
                moduleGallery = $(elem),
                isFirstLoad = true;

            var loadMore = $('.row.load-more', elem),
                loadMoreBtn = $('.row.load-more .btn-more', elem),
                gallery = $('.gallery', elem),
                compName = 'tombstonegallery',
                galleryObject = {
                    service: new Service('tombstonegallery', {
                        baseUrl: gallery.attr('data-baseUrl')
                    }),
                    template: PrecompiledHandlebars[compName],
                    totalRecords: parseInt(gallery.data("totalRecords")),
                    currentPage: 1,
                    recordsPerPage: isMobileDevice ? 1 : gallery.data('recordsperpage')
                },
                totalPages = (parseInt(galleryObject.totalRecords / galleryObject.recordsPerPage) + (((galleryObject.totalRecords % galleryObject.recordsPerPage) === 0) ? 0 : 1));

            initGallery();

            function initGallery() {

                isMobileDevice = window.matchMedia("all and (max-width: 641px)").matches;

                galleryObject.currentPage = 1;
                galleryObject.recordsPerPage = isMobileDevice ? 1 : gallery.data('recordsperpage');
                totalPages = (parseInt(galleryObject.totalRecords / galleryObject.recordsPerPage) + (((galleryObject.totalRecords % galleryObject.recordsPerPage) === 0) ? 0 : 1));
                gallery.html("");

                galleryObject.service.fetch(handleServiceResultForEvent, false, galleryObject.currentPage, galleryObject.recordsPerPage);
                if (galleryObject.totalRecords <= galleryObject.recordsPerPage) {
                    loadMore.hide();
                } else {
                    loadMore.show();
                    loadMoreBtn.off('click');
                    loadMoreBtn.on('click', handleLoadMoreClick);
                }

                if (isNaN(galleryObject.totalRecords)) {
                    loadMore.hide();
                }
            }

            function handleServiceResultForEvent(data) {

                var recordCt = data.allRecords ? data.allRecords.length : 0,
                    columnLeft = parseInt(galleryObject.recordsPerPage) - parseInt(recordCt);
                if (kpmgAssetDomain) {
                    data = $.extend(true, data, {
                        "assetDomainName": kpmgAssetDomain
                    });
                }

                gallery.append(galleryObject.template(data));
                //Accessibilty
                /*if(!isFirstLoad) {
                    $("a:first", elem).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    $("a", elem).on("keyup", function(e) {
                        if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                            $(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                        }       
                    });
                    $("a", elem).on("blur", function() {
                        $(this).removeAttr("tabindex").removeClass("focusOutline");
                    });
                }*/

                var galleryImages = $(".gallery-image", elem);
                $('.download-label').text(moduleGallery.data('downloadLabel'));
                $(elem).attr("data-gallery-index", galleryMeta.galleryIndex);
                /*if (!$('#image-quick-view').length) {
                    modalHtml().appendTo('body');
                }*/
                galleryMeta.records.push(data);
                $('.download-label').text(moduleGallery.data('downloadLabel'));
                setTimeout(function() {
                    $('img.lazy').unveil();
                }, 200);

                /*if (galleryObject.recordsPerPage === 4) {
                    $('.image-gallery-column', elem).addClass('col-md-3');
                } else if (galleryObject.recordsPerPage === 2) {
                    $('.image-gallery-column', elem).addClass('col-md-6');
                }*/

                //handleModalData();
                galleryMeta.galleryIndex++;
                //Accessibility
                /*$("a", elem).on("keyup", function(e) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    }       
                });
                $("a", elem).on("blur", function() {
                    $(this).removeAttr("tabindex").removeClass("focusOutline");
                });*/
            }

            function handleLoadMoreClick(evt) {
                evt.preventDefault();

                if (galleryObject.currentPage < totalPages) {
                    ++galleryObject.currentPage;
                    if (galleryObject.currentPage === totalPages) {
                        loadMore.hide();
                    }
                }
                isFirstLoad = false;
                galleryObject.service.fetch(handleServiceResultForEvent, false, galleryObject.currentPage, galleryObject.recordsPerPage);
            }
            $(document).trigger('template.loaded');
        };
        return Tombstonegallery;
    }
);
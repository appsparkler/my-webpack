/* global s */
/* global showShareUI*/
/* global shareProperties */
/* global kpmgAssetDomain */
define(['jquery', 'clamp', 'handlebars', 'precompile', 'cqservice', 'tracking', 'jquerysly', 'jqueryeasing'],
    function($, $clamp, Handlebars, PrecompiledHandlebars, Service, Tracking) {

        'use strict';
        var galleryMeta = {
                galleryIndex: 0,
                records: []
            },
            isMobileDevice = window.matchMedia("all and (max-width: 641px)").matches;
        var Imagegallery = function(elem) {
           
            var slideCurrentIndex = 0,
                moduleGallery = $(elem),
                isFirstLoad = true;
				/*isiPad = (/iPad/i).test(navigator.userAgent),
				isiPhone = (/iPhone/i).test(navigator.userAgent);*/
            // Sets the images based on mobile or desktop device. For mobile the carousel will need to be the main image, for the desktop, thumbnails are available.
            var setImages = function(device) {
                var $carouselImage = $('#overlay-gallery ul li img');
                if (device === 'mobile') {
                    $carouselImage.each(function() {
                        var $image = $(this).data('image');
                        $(this).attr('src', $image);
                    });
                } else {
                    $carouselImage.each(function() {
                        var $image = $(this).data('thumbnail');
                        $(this).attr('src', $image);

                    });
                }
            };
            // Sets the carousel image width, as it is laid out different in mobile as it is on a desktop.
            var setMobileItemWidth = function() {

                //Set item width 
                var $items = $('.module-imageoverlay .carousel-container .frame ul li',elem);
                var $itemWidth = $('.carousel-container').width();
                
                $items.each(function() {
                    $(this).css('width', $itemWidth + 'px');
                });
            };
            $('.download-label').text(moduleGallery.data('downloadLabel'));
            function ImageOverlayHandler() {
                    var self = this,
                        options = {},
                        optionsMobile = {};

                    self.config = function() {
                        var $frame = $('#overlay-gallery'),
                            $wrap = $frame.parent();
                        options = {
                            horizontal: true,
                            itemNav: 'basic',
                            smart: true,
                            activateOn: 'click',
                            mouseDragging: true,
                            touchDragging: true,
                            releaseSwing: true,
                            scrollBar: $wrap.find('.scrollbar'),
                            scrollBy: 1,
                            pagesBar: $wrap.find('.pages'),
                            activatePageOn: 'click',
                            speed: 300,
                            elasticBounds: true,
                            easing: 'easeOutExpo',
                            dragHandle: true,
                            dynamicHandle: true,
                            clickBar: true,
                            // Buttons
                            forward: $wrap.find('.forward'),
                            backward: $wrap.find('.backward'),
                            prev: $wrap.find('.prev'),
                            next: $wrap.find('.next'),
                            prevPage: $wrap.find('.prevPage'),
                            nextPage: $wrap.find('.nextPage'),
                            keyboardNavBy: 'pages'
                        };
                        optionsMobile = {
                            horizontal: true,
                            itemNav: 'forceCentered',
                            activateMiddle: true,
                            smart: true,
                            mouseDragging: true,
                            touchDragging: true,
                            releaseSwing: true,
                            scrollBar: $wrap.find('.scrollbar'),
                            scrollBy: 1,
                            pagesBar: $wrap.find('.pages'),
                            activatePageOn: 'click',
                            speed: 300,
                            elasticBounds: true,
                            easing: 'easeOutExpo',
                            dragHandle: true,
                            dynamicHandle: true,
                            clickBar: true,
                            // Buttons
                            forward: $wrap.find('.forward'),
                            backward: $wrap.find('.backward'),
                            prev: $wrap.find('.prev'),
                            next: $wrap.find('.next'),
                            prevPage: $wrap.find('.prevPage'),
                            nextPage: $wrap.find('.nextPage')
                        };
                    };
                    self.init = function() {
                        self.config();
                        // Initializes everything for mobile
                        $(document).on('mobileBreakpoint', function() {
                            self.setMobileBreakpoint();
                        });
                        // Initializes everything for desktop
                        $(document).on('desktopBreakpoint', function() {
                            self.setDesktopBreakpoint();
                        });
                        $(window).on('resize', function() {
                            self.config();
                            self.handleResize();
                        });
                        
                    };
                    self.updateGallery = function(device) {
                        var $activeSlide = $('#overlay-gallery li.active'),
                            $activeImgElem = $activeSlide.find('img'),
                            $activeImg = $activeImgElem.data('overlay-img'),
                            $activeDownload = $activeImgElem.data('image')+$activeImgElem.data('originalPath'),
                            $activeHeader = $activeSlide.find('.hidden-data .item-header').html(),
                            $copyRight = $activeSlide.find('.hidden-data .copyright-new').length ? $activeSlide.find('.hidden-data .copyright-new').html() : '',
                            $activeDescription = $activeSlide.find('.hidden-data .item-description').html(),
                            $activeDownloadCopy = $activeSlide.find('.hidden-data .item-download-copy').html();


                        // Updates the share button URL, title and description based on the hidden fields.
                        // Updates the shown data in the gallery.
                        $('.carousel-copy-text').html(moduleGallery.data('moreFromGallery'));
                        if (device === 'mobile') {
                            $('.module-imageoverlay .shown-data-mobile .item-header').html($activeHeader);
                            $('.module-imageoverlay .shown-data-mobile .item-description').html($activeDescription);
                            $('.module-imageoverlay .shown-data-mobile .item-download').attr('href', $activeDownload);
                            $('.module-imageoverlay .shown-data-mobile .item-download').html($activeDownloadCopy);
                            $('.module-imageoverlay .copyright').html($copyRight);
                        } else {
                            $('.module-imageoverlay img.item-image').attr('src', $activeImg);
                            $('.module-imageoverlay .shown-data .item-header').html($activeHeader);
                            $('.module-imageoverlay .shown-data .item-description').html($activeDescription);
                            $('.module-imageoverlay .shown-data .item-download').attr('href', $activeDownload);
                            $('.module-imageoverlay .shown-data .item-download').html($activeDownloadCopy);
                            $('.module-imageoverlay .copyright').html($copyRight);
                            
                        }

                        $('.module-imageoverlay').each(function(){
                            if($(this).find('li').length <=3) {
                                $(this).find('.controls').hide();
                                $(this).find('.scrollbar').hide();
                            } else {
                                $(this).find('.controls').show();
                                $(this).find('.scrollbar').show();
                            }
                        });


                    };

                    function slyActiveMobile() {
                        self.updateGallery('mobile');
                    }

                    function slyActiveDesktop() {
                        self.updateGallery('desktop');
                    }
                    self.handleResize = function() {
                        var $frame = $('#overlay-gallery');
                        options.startAt = slideCurrentIndex;
                        $frame.sly(false);
                        if (isMobileDevice) {
                            setImages('mobile');
                            setMobileItemWidth();
                            $frame.sly(optionsMobile, {
                                active: slyActiveMobile
                            });
                        } else {
                            setImages('desktop');
                            $('.module-imageoverlay .carousel-container .frame ul li').css('width', '90px');
                            $('.module-imageoverlay .carousel-container .frame ul li:last-child').css('width', '100px');
                            $frame.sly(options, {
                                active: slyActiveDesktop
                            });
                        }
                    };
                    self.setMobileBreakpoint = function() {
                        setImages('mobile');
                        setMobileItemWidth();
                        var $frame = $('#overlay-gallery');
                        $frame.sly(optionsMobile, {
                            active: slyActiveMobile
                        });
                    };
                    self.setDesktopBreakpoint = function() {
                        setImages('desktop');
                        var $frame = $('#overlay-gallery');
                        $frame.sly(options, {
                            active: slyActiveDesktop
                        });
                    };
                }
                // Keep the following lines at the bottom of the Imagegalleryoverlay function
                // var trck = new Tracking(elem, 'Imagegalleryoverlay'),
            var loadMore = $('.row.load-more', elem),
                loadMoreBtn = $('.row.load-more .btn-more', elem),
                gallery = $('.gallery', elem),
                gallerycompName = 'imagegallery',
                overlaycompName = 'imageoverlay',
                galleryObject = {
                    service: new Service('imagegallery', {
                        baseUrl: gallery.attr('data-baseUrl')
                    }),
                    template: PrecompiledHandlebars[gallerycompName],
                    totalRecords: parseInt(gallery.data("totalRecords")),
                    currentPage: 1,
                    recordsPerPage: isMobileDevice ? 1 : gallery.data('recordsperpage')
                },
                overlayObject = {
                    template: PrecompiledHandlebars[overlaycompName],
                    modal: $('#image-quick-view')
                },
                totalPages = (parseInt(galleryObject.totalRecords / galleryObject.recordsPerPage) + (((galleryObject.totalRecords % galleryObject.recordsPerPage) === 0) ? 0 : 1)),
                overlayOb = new ImageOverlayHandler();

            overlayOb.init();
            initGallery();
            function initGallery(){
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
                    $.each(data.results,function(index,value) {
                        value = $.extend(true,value, {
                            "downloadLabel" : moduleGallery.data('downloadLabel')
                        });
                    });  
                }

                gallery.append(galleryObject.template(data));
                //Accessibilty
                if(!isFirstLoad) {
                    $("a:first", elem).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    $("a", elem).on("keyup", function(e) {
                        if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                            $(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                        }       
                    });
                    $("a", elem).on("blur", function() {
                        $(this).removeAttr("tabindex").removeClass("focusOutline");
                    });
                }

                var galleryImages = $(".gallery-image", elem);
                $('.download-label').text(moduleGallery.data('downloadLabel'));
                $(elem).attr("data-gallery-index", galleryMeta.galleryIndex);
                if (!$('#image-quick-view').length) {
                    modalHtml().appendTo('body');
                }
                galleryMeta.records.push(data);
                $('.download-label').text(moduleGallery.data('downloadLabel'));
                setTimeout(function() {
                    $('img.lazy').unveil();
                }, 200);

                if (galleryObject.recordsPerPage === 4) {
                    $('.image-gallery-column', elem).addClass('col-md-3');
                } else if (galleryObject.recordsPerPage === 2) {
                    $('.image-gallery-column', elem).addClass('col-md-6');
                }

                handleModalData();
                galleryMeta.galleryIndex++;


                //Accessibility
                $("a", elem).on("keyup", function(e) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                    }       
                });
                $("a", elem).on("blur", function() {
                    $(this).removeAttr("tabindex").removeClass("focusOutline");
                });
            }               
            
           /* $(window).resize(function() {
                initGallery();
            }); */
            function fillModalGalley(data) {
                $('#image-quick-view .modal-content-panel').html(overlayObject.template(data));

                $('.gallery-header').text(moduleGallery.data('galleryTitle'));

                $('.download-label').text(moduleGallery.data('downloadLabel'));
                $('.share-label').text(moduleGallery.data('shareLabel'));
                $('.more-from-gallery').text(moduleGallery.data('moreFromGallery'));
            }

            function modalHtml() {
                var _html = '<div class="modal fade modalDialog modal-container-image-quick-view"   id="image-quick-view" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
                _html += '<div class="modal-dialog">';
                _html += '<div class="modal-content">';
                _html += '<a href="#" class="btn-close" data-dismiss="modal"><span class="icon-close"><span class="sr-only">close</span></span></a>';
                _html += '<div class="modal-content-panel"></div>';
                _html += '</div></div></div>';
                return _html;
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

            function handleModalData() {
                $('#image-quick-view').on('show.bs3.modal', function(e) {
                    var _this = $(this),
                        $activeLi = "",
                        $invoker = $(e.relatedTarget),
                        $active = $invoker.find('img'),
                        $testactive = $invoker.find('title'),
                        relatedGallery = $invoker.closest('.module-imagegallery'),
                        currentGalleryIndex = relatedGallery.data('galleryIndex');
                    fillModalGalley(galleryMeta.records[currentGalleryIndex]);

                    if (isMobileDevice) {
                        e.preventDefault();
                    }
                    var overlayImageWraper = $("#overlay-gallery"),
                        $activeInOverlay = overlayImageWraper.find("img[data-image='" + $active.data('image') + "']");


                    setTimeout(function() {
                        overlayImageWraper.find('li').removeClass('active');
                        $activeInOverlay.closest('li').addClass('active');
                        $activeLi = $activeInOverlay.closest('li');
                        slideCurrentIndex = $activeLi.index();
                        $(window).trigger('resize');
                    }, 200);
                    $('.share-image-in-gallery', _this).on('click', function(e) {
                        e.preventDefault();
                        var shareTitle = $('.item-header', _this).text(),
                            shareUrl = $('.item-image', _this).attr('src'),
                            shareImage = $('.item-image', _this).attr('src'),
                            shareDescription = $('.item-description', _this).text(),
                            quickShareProperties = {
                                "shareTitle": shareTitle,
                                "shareUrl": shareUrl,
                                "shareSiteName": "",
                                "shareLanguage": "",
                                "shareImage": shareImage,
                                "shareDescription": shareDescription,
                                "shareOperationMode": "simpleShare",
                                "shareTarget": "image-sharetooltip",
                                "twitterDefaultText": "",
                                "shareEnabledProviders": ""
                            };
                        if (shareProperties && typeof shareProperties === 'object') {
                            quickShareProperties = $.extend(true, quickShareProperties, shareProperties);
                        }
                        showShareUI(quickShareProperties);
                    });

                    //Accessibility
                    $("a", _this).on("keyup", function(e) {
                        if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                            $(this).attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                        }       
                    });
                    $("a", _this).on("blur", function() {
                        $(this).removeAttr("tabindex").removeClass("focusOutline");
                    });
                    $("li>a:last", $(this)).on("keydown", function(e){
                        e.preventDefault();
                        if (e.shiftKey && e.which === 9) {
                            $(this).removeAttr("tabindex").removeClass("focusOutline").before().attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                        } else if (e.which === 9) {
                            $("a.btn-close", '#image-quick-view').last().attr("tabindex", "-1").trigger('focus').addClass("focusOutline");
                        }
                    });
                });
            }

                // Keep the following line at the bottom of the ImageGallery function
            var trck = new Tracking(elem, 'Imagegallery');
            $(document).trigger('template.loaded');
        };
        return Imagegallery;
    }
);
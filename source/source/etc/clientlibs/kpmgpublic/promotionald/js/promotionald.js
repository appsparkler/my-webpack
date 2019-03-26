/* global s */
define(['jquery', 'tracking', 'helpers','addtolibrary'],
    function ($, Tracking, Helpers, AddToLibrary) {
            'use strict';
            var PromotionalD = function (elem) {
                $('a.btn-cta', elem).on('click', function (evt) {
                    Helpers.triggerTracking({
                        'linkLocationID1': 'promotionald_' + $(this).text(),
                        'linkLocationID2': 'promotionald_' + $(this).text(),
                        'linkLocation1': 'promotionald',
                        'linkLocation2': 'promotionald',
                        'events': 'event11'
                    },
                    'Internal Link');
                });

                if(!window.kpmgPersonalize.misc.isAuthor) { // to make not to hover on white space on author
                    if( $('.inner-container').find('.module-promotionald').length ) {
                        $('.inner-container .module-promotionald').each( function(i, element) {
                            var closestCell = $(this).closest('[class^="col"]').length === 1 ? $(this).closest('[class^="col"]') : $(this).closest('[data-desktop-cell]');
                            if( closestCell.length && closestCell.children().length === 1 ) {
                                closestCell.addClass('promotional-cell-hover');
                            }
                            else {
                                $(this).parent().addClass('promotional-cell-hover');
                            }
                        });
                    }
                } else { // to make flexible height on author
                    if( $('.inner-container').find('.module-promotionald').length ) {
                        $('.inner-container .module-promotionald').each( function(i, element) {
                            $(this).closest('.col-transparent').removeClass('col-transparent');
                        });
                    }
                }

                $(elem).closest('.promotional-cell-hover').on('click', function(e) {
					if($(e.target).hasClass('promotional-cell-hover')) {
						if($(this).find('.module-promotionald .promotionald-relative a').attr('id') === 'rfp-process-modal') {
							$(this).find('.module-promotionald .promotionald-relative a#rfp-process-modal').trigger('click');
						} else if($(this).find('.module-promotionald .promotionald-relative a').attr('id') === 'contact-form-modal') {
							$(this).find('.module-promotionald .promotionald-relative a#contact-form-modal').trigger('click');
						} else {
							var href = $(this).find('.module-promotionald .promotionald-container a').attr('href');
							if($(e.target).is("div") && href){
								e.stopImmediatePropagation();
								window.location.href = href;
							}
						}
					}
                });
                // Keep the following line at the bottom of the PromotionalD function
                var trck = new Tracking(elem, 'PromotionalD');
                $(document).trigger('template.loaded');

                // initialize the add to library funtionality
                AddToLibrary($('.module-addtolibrary', elem));

                $('.rfp-loading',elem).addClass('hide').removeClass('show');
                $('.rfp-cursor',elem).removeClass('hide');
                $("a.promotionald-btn-cta-primary", elem).on("keyup", function(e) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).trigger('focus').addClass("focusOutline");
                    }
                });
                $("a.promotionald-btn-cta-primary", elem).on("blur", function() {
                    $(this).removeClass("focusOutline");
                });
            };
            PromotionalD.templateId = 'template-promotionald';

            PromotionalD.renderPersonalizedData = function (handleBarTemplateFn, snpDataArr, authoredComp) {
                console.info("Rendering personalized DOM for PromotionalD component...");

                function dataFormatConvertor(snpData) {
                    var isBlog = (snpData.KPMG_Template_Type.indexOf('touch-blog-post-template') > -1) ? true : false;
                    return {
                        'hbs': {
                            'promotionalD': {
                                'title': snpData.KPMG_Title,
                                'shortTitle': snpData.KPMG_Title,
                                'longDescription': snpData.KPMG_Description,
                                'shortDescription': snpData.KPMG_Short_Desc,
                                'imageFileReference': snpData.KPMG_Image,
                                'primaryUrl': snpData.KPMG_URL,
                                'altText': snpData.KPMG_Title,
                                'primaryLabel':$($(authoredComp).find('.btn-copy')[0]).text(),
                                'personalized': true,
								'externalLink':true,
                                'articleType': snpData.KPMG_Article_Type,
                                'isBlog': isBlog
                            }
                        }
                    };
                }

                var supportedDataArr = snpDataArr.map(dataFormatConvertor);

                return $(handleBarTemplateFn(supportedDataArr[0]));
            };
            return PromotionalD;
        }
);

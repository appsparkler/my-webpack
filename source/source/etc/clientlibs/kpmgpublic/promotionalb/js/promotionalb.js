/* global s */
define(['jquery', 'tracking', 'helpers', 'addtolibrary'],
    function ($, Tracking, Helpers, AddToLibrary) {
            'use strict';
            var PromotionalB = function (elem) {
                $('a.btn-cta', elem).on('click', function (evt) {
                    var location = ($(evt.currentTarget).hasClass('promotionalb-btn-cta-primary')) ? 'primary-cta' : 'secondary-cta';
                    Helpers.triggerTracking({
                        'linkLocationID1': location + '_' + $(this).text(),
                        'linkLocationID2': location + '_' + $(this).text(),
                        'linkLocation1': location,
                        'linkLocation2': location,
                        'events': 'event11'
                    },
                    'Internal Link');
                });

                if(!window.kpmgPersonalize.misc.isAuthor) { // to make not to hover on white space on author
                    if( $('.inner-container').find('.module-promotionalb').length ) {
                        $('.inner-container .module-promotionalb').each( function(i, element) {
                            var closestCell = $(this).closest('[class^="col"]').length === 1 ? $(this).closest('[class^="col"]') : $(this).closest('[data-desktop-cell]');
                            if( closestCell.length && closestCell.children().length === 1 ) {
                                closestCell.addClass('promotional-cell-hover');
                            }
                            else {
                                $(this).parent().addClass('promotional-cell-hover');
                            }
                        });
                    }
                }  else { // to make flexible height on author
                    if( $('.inner-container').find('.module-promotionalb').length ) {
                        $('.inner-container .module-promotionalb').each( function(i, element) {
                            $(this).closest('.col-transparent').removeClass('col-transparent');
                        });
                    }
                }

                $(elem).closest('.promotional-cell-hover').on('click', function(e) {
					if($(e.target).hasClass('promotional-cell-hover')) {
						if($(this).find('.module-promotionalb .promotionalb-relative a').attr('id') === 'rfp-process-modal') {
							$(this).find('.module-promotionalb .promotionalb-relative a#rfp-process-modal').trigger('click');
						} else if($(this).find('.module-promotionalb .promotionalb-relative a').attr('id') === 'contact-form-modal') {
							$(this).find('.module-promotionalb .promotionalb-relative a#contact-form-modal').trigger('click');
						} else {
							var href = $(this).find('.module-promotionalb .promotionalb-relative a').attr('href');
							if($(e.target).is("div") && href){
								e.stopImmediatePropagation();
								window.location.href = href;
							}
						}
					}
                });
                // Accessibility
                $(".promotional_focus", elem).on('keydown', function(e) {
                    if (e.which === 13) {
                        $(this).parent('promotional_focus').find("span").trigger("click");
                    }
                });
                $(".promotional_focus", elem).on('contextmenu', function() {
                    return false;
                });
                // Keep the following line at the bottom of the PromotionalB function
                var trck = new Tracking(elem, 'PromotionalB');
                $(document).trigger('template.loaded');

                // initialize the add to library funtionality
                AddToLibrary($('.module-addtolibrary', elem));

                $('.rfp-loading').addClass('hide').removeClass('show');
                $('.rfp-cursor').removeClass('hide');
                $(".promotionalb-container a", elem).on("keyup", function(e) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).trigger('focus').addClass("focusOutline");
                    }
                });
                $(".promotionalb-container a", elem).on("blur", function() {
                    $(this).removeClass("focusOutline");
                });
            };
            PromotionalB.templateId = 'template-promotionalb';

            PromotionalB.renderPersonalizedData = function (handleBarTemplateFn, snpDataArr, authoredComp) {
                console.info("Rendering personalized DOM for PromotionalB component...");

                $(authoredComp).addClass('hide-secondary-cta');

                function dataFormatConvertor(snpData) {
                    var isBlog = (snpData.KPMG_Template_Type.indexOf('touch-blog-post-template') > -1) ? true : false;
                    return {
                        'hbs': {
                            'promotionalB': {
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
                            },
                            'globalValues': {
                                'assetDomainName': window.kpmgAssetDomain
                            }
                        }
                    };
                }

                var supportedDataArr = snpDataArr.map(dataFormatConvertor);

                return $(handleBarTemplateFn(supportedDataArr[0]));
            };
            return PromotionalB;
        }
);

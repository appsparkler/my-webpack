/* global s */
define(['jquery', 'tracking', 'helpers', 'addtolibrary'],
    function ($, Tracking, Helpers, AddToLibrary) {
        'use strict';
        var PromotionalA = function (elem) {

            $('a.btn-cta', elem).on('click', function (evt) {
                var location = ($(evt.currentTarget).hasClass('promotionala-btn-cta-primary')) ? 'primary-cta' : 'secondary-cta';
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
                if( $('.inner-container').find('.module-promotionala').length ) {
                    $('.inner-container .module-promotionala').each( function(i, element) {
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
                if( $('.inner-container').find('.module-promotionala').length ) {
                    $('.inner-container .module-promotionala').each( function(i, element) {
                        $(this).closest('.col-transparent').removeClass('col-transparent');
                    });
                }
            }

            $(elem).closest('.promotional-cell-hover').on('click', function(e) {
                if($(e.target).hasClass('promotional-cell-hover')) {
					if($(this).find('.module-promotionala .promotionala-relative a').attr('id') === 'rfp-process-modal') {
                        e.preventDefault();
                        var lastvisitedURL = window.location.href,
                        redirectURL,rfpPageUrl = $(e.relatedTarget).data('remote');
                        localStorage.setItem("lastvisitedURL", lastvisitedURL);
                        redirectURL = window.location.origin + rfpPageUrl;
                        window.location.href=encodeURI(redirectURL);
                        //$(this).find('.module-promotionala .promotionala-relative a#rfp-process-modal').trigger('click');
					} else if($(this).find('.module-promotionala .promotionala-relative a').attr('id') === 'contact-form-modal') {
						$(this).find('.module-promotionala .promotionala-relative a#contact-form-modal').trigger('click');
					} else {
						var href = $(this).find('.module-promotionala .promotionala-relative a').attr('href');
						if($(e.target).is("div") && href) {
							e.stopImmediatePropagation();
							window.location.href = href;
						}
					}
				}
            });

            // Keep the following line at the bottom of the PromotionalA function
            var trck = new Tracking(elem, 'PromotionalA');
            $(document).trigger('template.loaded');

            // initialize the add to library funtionality
            AddToLibrary($('.module-addtolibrary', elem));

            $('.rfp-loading', elem).addClass('hide').removeClass('show');
            $('.rfp-cursor', elem).removeClass('hide');
            $(".promotionala-container  a", elem).on("keyup", function(e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).trigger('focus').addClass("focusOutline");
                }
            });
            $(".promotionala-container a", elem).on("blur", function() {
                $(this).removeClass("focusOutline");
            });
        };

        PromotionalA.templateId = 'template-promotionala';

        PromotionalA.renderPersonalizedData = function (handleBarTemplateFn, snpDataArr, authoredComp) {
            console.info("Rendering personalized DOM for PromotionalA component...");

            $(authoredComp).addClass('hide-secondary-cta');

            function dataFormatConvertor(snpData) {
                var isBlog = (snpData.KPMG_Template_Type.indexOf('touch-blog-post-template') > -1) ? true : false;
                return {
                    'hbs': {
                        'promotionalA': {
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

        return PromotionalA;
    }
);

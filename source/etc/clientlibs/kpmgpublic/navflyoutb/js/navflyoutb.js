/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            // No javascript for this component. Show/hide functionality handled by navigation js.
            var NavFlyoutB = function (elem) {
                var trck = new Tracking($('.module-navflyoutb'), 'NavFlyoutB');
                $(document).trigger('template.loaded');
                $(".module-navflyoutb a.pull-right", elem).on("keyup", function(e) {
                    if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                        $(this).trigger('focus').addClass("focusOutline");
                    }
                });
                $(".module-navflyoutb a.pull-right", elem).on("blur", function() {
                    $(this).removeClass("focusOutline");
                });
            };
            NavFlyoutB.templateId = 'template-navflyoutb';

            NavFlyoutB.renderPersonalizedData = function (handleBarTemplateFn, snpDataArr, authoredComp) {
                console.info("Rendering personalized DOM for NavFlyoutB component...");

                function dataFormatConvertor(snpData) {
                    return {
                        'hbs': {
                            'flyoutnavigation': {
                                'cellThreeFeaturedItemHeading': snpData.KPMG_Title,
                                'cellThreeFeaturedItemDescription': snpData.KPMG_Description,
                                'cellThreeFeaturedItemImage': snpData.KPMG_Image,
                                'cellThreeFeaturedItemUrl': snpData.KPMG_URL,
                                'cellThreeFeaturedItemAltText': snpData.KPMG_Title,
                                'readMoreLabel':$($(authoredComp[0]).find('.navflyoutb-uppercase')[1]).text(),
                                'personalized': true
                            },
                            'global': {
                                'assetDomainName': window.kpmgAssetDomain
                            }
                        }
                    };
                }

                var supportedDataArr = snpDataArr.map(dataFormatConvertor),
                    personalizedFlyout = $(handleBarTemplateFn(supportedDataArr[0]));

                $(authoredComp.find('.col-md-4')[2]).after(personalizedFlyout.find('.col-md-4')[2]);
                $(authoredComp.find('.col-md-4')[2]).remove();

                return authoredComp;
            };
            return NavFlyoutB;
        }
);
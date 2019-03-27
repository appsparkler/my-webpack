/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            // No javascript for this component. Show/hide functionality handled by navigation js.
            var NavFlyoutC = function (elem) {
                var trck = new Tracking($('.module-navflyoutc'), 'NavFlyoutC');
                $(document).trigger('template.loaded');
            };
            NavFlyoutC.templateId = 'template-navflyoutc';

            NavFlyoutC.renderPersonalizedData = function (handleBarTemplateFn, snpDataArr, authoredComp) {
                console.info("Rendering personalized DOM for NavFlyoutC component...");

                function dataFormatConvertor(snpData) {
                    return {
                        'hbs': {
                            'flyoutnavigation': {
                                'cellThreeFeaturedItemHeading': snpData.KPMG_Title,
                                'cellThreeFeaturedItemDescription': snpData.KPMG_Description,
                                'cellThreeFeaturedItemImage': snpData.KPMG_Image,
                                'cellThreeFeaturedItemUrl': snpData.KPMG_URL,
                                'cellThreeFeaturedItemAltText': snpData.KPMG_Title,
                                'readMoreLabel':$($(authoredComp[0]).find('.navflyoutc-uppercase')[1]).text(),
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
            return NavFlyoutC;
        }
);
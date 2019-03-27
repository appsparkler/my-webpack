/* global s */
/* global showShareUI*/
/* global shareProperties */
define(['jquery', 'tracking', 'helpers'],
        function ($, Tracking, Helpers) {
            'use strict';
            var EventPageTitle = function (elem) {
                $('a.btn-cta').on('click', function () {
                    Helpers.triggerTracking({
                        "bannerImpression": $(this).text()
                    }, "Banner Impression");
                });
                var dateField = $('.event-date > li', elem)[0], dateSegments, dateSegmentOne = '', dateSegmentTwo = '';
                if (dateField !== undefined) {
                    dateSegments = dateField.innerHTML;
                    for (var count = 0; count <= dateSegments.length - 1; count++) {
                        dateSegmentOne = dateSegmentOne.concat(dateSegments[count]);
                    }
                    dateField.innerHTML = dateSegmentOne;
                    dateSegmentTwo = dateSegments[dateSegments.length - 1];
                //  $(dateField).append('<li>' + dateSegmentTwo + '</li>');
                }

                $('.share-mobile-in-eventpagetitle', elem).on('click', function(e) {
                    e.preventDefault();
                    var shareTitle = $('.item-header', elem).text(),
                        shareUrl = $('.item-image', elem).attr('src'),
                        shareImage = $('.item-image', elem).attr('src'),
                        shareDescription = $('.item-description', elem).text(),
                        quickShareProperties = {
                            "shareTitle": shareTitle,
                            "shareUrl": shareUrl,
                            "shareSiteName": "",
                            "shareLanguage": "",
                            "shareImage": shareImage,
                            "shareDescription": shareDescription,
                            "shareOperationMode": "simpleShare",
                            "shareTarget": "share-mobile-sharetooltip",
                            "twitterDefaultText": "",
                            "shareEnabledProviders": ""
                        };
                    if (shareProperties && typeof shareProperties === 'object') {
                        quickShareProperties = $.extend(true, quickShareProperties, shareProperties);
                    }
                    showShareUI(quickShareProperties);
                });

                // Keep the following line at the bottom of the EventPageTitle function
                var trck = new Tracking(elem, 'EventPageTitle');
                $(document).trigger('template.loaded');
            };
            return EventPageTitle;
        }
);
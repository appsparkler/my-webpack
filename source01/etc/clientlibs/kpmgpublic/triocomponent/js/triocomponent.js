define(['jquery', 'tracking', 'helpers', 'personalization', 'personalizationUtils'],
    function($, Tracking, Helpers, personalization, personalizationUtils) {
        'use strict';

        var trioFeature = function(elem) {
            $(document).on('click', 'div.trio article.trio-card a.cta', function() {
                var analyticsData, trackingObj;
                //
                analyticsData = "Learn More: " + $(this).data('title');
                trackingObj = {
                    "linkLocationID1": analyticsData,
                    "linkLocationID2": analyticsData,
                    'events': 'event11'
                };
                Helpers.triggerTracking(trackingObj, 'Internal Link');

            });

            var trck = new Tracking(elem, 'trioFeature');
            $(document).trigger('template.loaded');
        };

        return trioFeature;
    }
);
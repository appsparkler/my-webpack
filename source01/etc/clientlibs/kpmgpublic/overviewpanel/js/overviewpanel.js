define(['jquery', 'clamp', 'helpers', 'tracking'],
    function($, $clamp, Helpers, Tracking) {
        'use strict';

        var overviewpanel = function(elem) {
            $(elem).on('click', 'a', function() {
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

            var tracking = new Tracking(elem, 'overviewpanel');

            $(document).trigger('template.loaded');
        };
        return overviewpanel;
    }
);
/* global s */
define(['jquery', 'tracking'],
        function ($, Tracking) {
            'use strict';
            var SocialWidgetBuild = function (elem) {
                // Keep the following line at the bottom of the SocialWidgetBuild function
                var trck = new Tracking(elem, 'SocialWidgetBuild');
                $(document).trigger('template.loaded');
            };
            return SocialWidgetBuild;
        }
);
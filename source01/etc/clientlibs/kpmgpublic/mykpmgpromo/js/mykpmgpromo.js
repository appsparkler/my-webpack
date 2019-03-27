/* global s */
define(['jquery', 'tracking','jquerymobilereflow'],
        function ($, Tracking, mobileReflow) {
            'use strict';
            var MyKpmgPromo = function (elem) {
                // Keep the following line at the bottom of the MyKpmgPromo function
                var trck = new Tracking(elem, 'MyKpmgPromo');
                $(document).trigger('template.loaded');
            
            };
            return MyKpmgPromo;
        }
);
/* global s */
define(['jquery', 'tracking', 'common-utils'],
        function ($, Tracking, CommonUtils) {
            'use strict';
            var Image = function (elem) {
                var trck = new Tracking(elem, 'Image');
                if (window.KPMG.isAuthor) {
                    CommonUtils.fixChromeIssueForAuthor('.module-image');
                }
                $(document).trigger('template.loaded');
                if(!!$('div[data-picture] img').length)
                {
                    $('div[data-picture] img').addClass('img-responsive lazy');
                }
            };
            return Image;
        }
);
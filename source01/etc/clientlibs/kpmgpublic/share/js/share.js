/*global gigyaPageProperties*/
var gigyaProperties = null;
define([
    'jquery', 'tracking'
],
        function ($, Tracking) {
            'use strict';
            var Share = function (elem) {
                var arr = window.location.href.split("/"),
                    gigyaShareUrl = gigyaPageProperties.shareUrl,
                    gigyaShareImage = gigyaPageProperties.shareImage;
                if (gigyaShareUrl.substr(0, 1) !== "h") {
                    gigyaPageProperties.shareUrl = arr[0] + "//" + arr[2] + "" + gigyaPageProperties.shareUrl;
                }
                if (gigyaShareImage.substr(0, 1) !== "h") {
                    gigyaPageProperties.shareImage = arr[0] + "//" + arr[2] + "" + gigyaPageProperties.shareImage + "/jcr:content/renditions/cq5dam.thumbnail.140.100.png";
                }
                var trck = new Tracking(elem, 'Share');
                $(document).trigger('template.loaded');
            };
            return Share;
        }
);

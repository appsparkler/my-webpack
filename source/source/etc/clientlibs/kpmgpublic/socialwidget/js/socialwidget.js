/* global s */
/* global Modernizr */
define(['jquery', 'tracking', 'detectresize'],
    function($, Tracking) {
        'use strict';
        var SocialWidget = function(elem) {
            function bindEvent(ele, event, callback) {
                if (ele.addEventListener) {
                    ele.addEventListener(event, callback, false);
                } else {
                    ele.attachEvent(event, callback);
                }
            }
            var _this = $(elem),
                socialIframe = $("#socialiframe", _this),
                socialChannelPanel = $(".socialwidget-link-container", elem),
                socialHeader = $(".component-head", elem),
                headerH = (socialHeader.height() + 10) / 2,
                channelH = socialChannelPanel.height(),
                _root = _this.parents(".col-md-height"),
                _iframeParent = socialIframe.parent(),
                socialURL = _this.data('social-url'),
                _rootRow = _root.parents(".row-same-height"),
                container_offsetY = (channelH || 28) + 47,
                iframe_offset = 5,
                containerMinHeight = 525;

            function handleContainerResize() {
                if (Modernizr.mq('only screen and (min-width: 641px)') && _root[0]) {
                    _iframeParent.css('height', 0);
                    var _parentH = _root.height(),
                        _containerH = _parentH - container_offsetY,
                        _rootChildren = _root.children(),
                        _rootChildrenH = 0;

                    if (_containerH < 50) {
                        _parentH = containerMinHeight;
                        //_root.removeResize(handleContainerResize);
                    }
                    if (_rootChildren.length > 1) {
                        for (var i=0; i<_rootChildren.length; i++) {
                            if (!$(_rootChildren[i]).find('.module-socialwidget').length) {
                                _rootChildrenH += $(_rootChildren[i]).outerHeight();
                            }
                        }
                    }
                    _iframeParent.css('height', _parentH - (container_offsetY + headerH + _rootChildrenH));
                    socialIframe.css('height', _parentH - (container_offsetY + headerH + _rootChildrenH) + iframe_offset).attr('src', socialURL);
                }
            }


            setTimeout(function() {
                socialWidgetResize();
            }, 2000);


            function socialWidgetResize() {
                if (Modernizr.mq('only screen and (min-width: 641px)') && _root[0]) {
                    if (_rootRow[0]) {
                        _rootRow.on('resize', handleContainerResize);
                    } else {
                        _root.on('resize', handleContainerResize);
                    }
                } else {
                    document.getElementById('socialiframe').src = socialURL;
                }
            }

            var trck = new Tracking(elem, 'SocialWidget');
            $(document).trigger('template.loaded');
        };
        return SocialWidget;
    }
);

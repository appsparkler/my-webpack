/* global s, videojs, digitalData */
define(['jquery', 'tracking', 'helpers'],
    function($, Tracking, Helpers) {
        'use strict';

        var TouchVideoPost = function(elem) {
            if(!window.kpmgPersonalize.misc.isAuthor){
                var brightCovePlayer = '',
                element = $(elem),
                mediaId = element.attr("data-mediaId"),
                elementID = "video_" + mediaId,
                player = $("#" + elementID, element),
                playerAccountID = player.data("account"),
                playerEmbedID = player.data("embed"),
                playerID = player.data("player"),
                videoName = '',
                videoDescription = '',
                videoType = '',
                cuePoints = [],
                time = 0,
                started = false,
                hasFired = false,
                reachedEnd = false,
                brightCoveUrl = '//players.brightcove.net/' + playerAccountID + '/' + playerID + '_' + playerEmbedID + '/index.min.js';

                videojs(elementID).ready(function() {
                    brightCovePlayer = this;
                    populateMediaInfo(brightCovePlayer.mediainfo);
                    brightCovePlayer.on("ended", onMediaEvent);
                    brightCovePlayer.on("play", onMediaEventPlay);
                    brightCovePlayer.on("timeupdate", onMediaEventProgress);
                    brightCovePlayer.on("pause", onMediaEventStop);
                    brightCovePlayer.one("loadedmetadata", onMediaEventCue);
                });
            }

            function populateMediaInfo(mediainfo) {
                videoName = mediainfo.name;
                videoDescription = mediainfo.description;
                videoType = (mediainfo.sources)[0].type;
                cuePoints = mediainfo.cue_points;
                brightCovePlayer.language(player.data("language"));
                if (videoName) {
                    $('.video-post-title', element).text(videoName);
                } else {
                    $('.video-post-title', element).remove();
                }
                if (videoDescription) {
                    $('.video-post-description', element).text(videoDescription);
                } else {
                    $('.video-post-description', element).remove();
                }
            }

            function onMediaEvent() {}

            function onMediaEventPlay() {
                if (!started) {
                    try {
                        Helpers.triggerTracking({
                            "videoClick": digitalData.page.pageInfo.pageName + ":" + videoName,
                            "events": "event16",
                            "videoTitle": videoName,
                            "videoType": videoType
                        }, "Play");
                        started = true;
                    } catch (err) {
                        //console.log('Tracking error : ', err);
                    }
                } else {
                    started = !started;
                }
            }

            function onMediaEventProgress(evt) {
                var percent = Math.round(brightCovePlayer.currentTime() / brightCovePlayer.duration() * 100);
                if (percent === 25 && !hasFired) {
                    Helpers.triggerTracking({
                        "videoTitle": videoName,
                        "events": "event19"
                    }, "Video 25");
                    hasFired = true;
                } else if (percent === 50 && !hasFired) {
                    Helpers.triggerTracking({
                        "videoTitle": videoName,
                        "events": "event20"
                    }, "Video 50");
                    hasFired = true;
                } else if (percent === 75 && !hasFired) {
                    Helpers.triggerTracking({
                        "videoTitle": videoName,
                        "events": "event21"
                    }, "Video 75");
                    hasFired = true;
                } else if (percent === 100 && !reachedEnd) {
                    Helpers.triggerTracking({
                        "videoTitle": videoName,
                        "events": "event17"
                    }, "Video 100");
                    hasFired = true;
                    reachedEnd = true;
                }
                if (percent % 4 === 0) {
                    hasFired = false;
                }
            }

            function onMediaEventStop() {
                Helpers.triggerTracking({
                    "videoTitle": videoName,
                    "videoTime": time,
                    "events": "event15"
                }, "Video Time");
            }

            function onMediaEventCue() {
                var tt = brightCovePlayer.textTracks()[0];
                tt.oncuechange = function() {
                    if (tt.activeCues[0] !== undefined) {
                        Helpers.triggerTracking({
                            "videoTitle": videoName,
                            "videoSegment": tt.activeCues[0].text + '_' + tt.activeCues[0].startTime,
                            "events": "event18"
                        }, "Video Segment");
                    }
                };
            }

            // Keep the following lines at the bottom of the TouchVideoPost function
            var trck = new Tracking(elem, 'TouchVideoPost');
			$(document).trigger('template.loaded');
        };

        return TouchVideoPost;
    }
);

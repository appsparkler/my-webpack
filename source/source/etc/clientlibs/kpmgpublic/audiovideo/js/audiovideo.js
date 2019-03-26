/* global s, videojs, digitalData */
define(['jquery', 'helpers'],
    function($, Helpers) {
        'use strict';
        var AudioVideo = function(elem) {
            //if(!window.kpmgPersonalize.misc.isAuthor){
            var brightCovePlayer = '',
            element = $(elem),
            mediaId = element.attr("data-mediaId"),
            elementID = "audiovideo_" + mediaId,
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
            brightCoveUrl = '//players.brightcove.net/' + playerAccountID + '/' + playerID + '_' + playerEmbedID + '/index.min';
            //
            require.config({
                'paths': {
                    'bcAudioVideo': brightCoveUrl
                }
            });
            //
            require(['bcAudioVideo'], function(){
                videojs(elementID).ready(function(){
                    brightCovePlayer = this;
                    //mediainfo available only after loadstart event
                    brightCovePlayer.on('loadstart', function() {
                        populateMediaInfo(brightCovePlayer.mediainfo);
                    });
                    //
                    if(!window.kpmgPersonalize.misc.isAuthor){
                        brightCovePlayer.on("ended", onMediaEvent);
                        brightCovePlayer.on("play", onMediaEventPlay);
                        brightCovePlayer.on("timeupdate", onMediaEventProgress);
                        brightCovePlayer.on("pause", onMediaEventStop);
                        brightCovePlayer.one("loadedmetadata", onMediaEventCue);
                    }
                    //
                });
            });
            //}

            function populateMediaInfo(mediainfo) {
                videoName = mediainfo.name;
                videoDescription = mediainfo.description;
                videoType = mediainfo.sources && (mediainfo.sources)[0].type;
                cuePoints = mediainfo.cue_points && mediainfo.cue_points;
                brightCovePlayer.language(player.data("language"));
                if (videoName === null || videoName === undefined || videoName === '') {
                    $('.audiovideo-title', element).remove();
                } else {
                    $('.audiovideo-title', element).text(videoName);
                }
                if (videoDescription === null || videoDescription === undefined || videoDescription === '') {
                    $('.audiovideo-description', element).remove();
                } else {
                    $('.audiovideo-description', element).text(videoDescription);
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
                        "events": "event19"
                    }, "Video 25");
                    hasFired = true;
                } else if (percent === 50 && !hasFired) {
                    Helpers.triggerTracking({
                        "events": "event20"
                    }, "Video 50");
                    hasFired = true;
                } else if (percent === 75 && !hasFired) {
                    Helpers.triggerTracking({
                        "events": "event21"
                    }, "Video 75");
                    hasFired = true;
                } else if (percent === 100 && !reachedEnd) {
                    Helpers.triggerTracking({
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
                    "videoTime": time,
                    "events": "event15"
                }, "Video Time");
            }

            function onMediaEventCue() {
                var tt = brightCovePlayer.textTracks()[0];
                tt.oncuechange = function() {
                    if (tt.activeCues[0] !== undefined) {
                        Helpers.triggerTracking({
                            "videoSegment": tt.activeCues[0].text + '_' + tt.activeCues[0].startTime,
                            "events": "event18"
                        }, "Video Segment");
                    }
                };
            }
        };
        return AudioVideo;
    }
);

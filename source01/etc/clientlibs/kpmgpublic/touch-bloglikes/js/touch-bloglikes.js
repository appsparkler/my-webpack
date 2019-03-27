define(['jquery', 'tracking', 'personalizationUtils'],
    function($, Tracking, personalizationUtils) {
        'use strict';

        var TouchBloglikes = function(elem) {
            var initial_url = window.kpmgAssetDomain === ""? window.location.origin : window.kpmgAssetDomain,
                likeIcon = '/etc/designs/kpmgpublic/images/like-icon.png',
                likeIconDown = '/etc/designs/kpmgpublic/images/thumb-up.png',
                likeIconUrl = initial_url + likeIcon,
                likeIconUrlDown = initial_url + likeIconDown,
                accountInfo = personalizationUtils.accountUtils.getInfo(),
                pagePath = window.escape(window.location.pathname),
                interestingLabel = document.getElementById("userReaction").getAttribute("data-interesting"),
                textReactions = [{
                    text: interestingLabel,
                    ID: 'Interesting',
                    iconImgUp: likeIconUrl,
                    iconImgDown: likeIconUrlDown
                }],
                defaultUserAction = new window.gigya.socialize.UserAction(),
                uniqueID = document.getElementById("userReaction").getAttribute("data-bar-id"),
                reactionParams = {
                    barID: uniqueID, //  Identifier of the content to which this reaction refers
                    containerID: 'userReaction', // Reactions add-on DIV Container
                    reactions: textReactions,
                    userAction: defaultUserAction,
                    buttonImages: { }, //ToDo Add the image path
                    promptShare: 'false',
                    cid: '',
                    onReactionClicked: userLike,
                    onReactionUnclicked: userUnlike
                },
                data = {
                    title: $('.module-touch-fullbleed .banner-header:visible').text(),
                    url: pagePath,
                    pageid: uniqueID || ''
                },
                postInfo = {
                    updateBehavior: 'arrayPush',
                    callback: userActionCb
                };

            function userLike() {
                var userData = {},
                    pageData = {};
                if(personalizationUtils.accountUtils.isLoggedIn()) {
                    userData = $.extend({}, data, {
                        userlikeddate: (new Date()).toISOString(),
                        lastaction: 'like'
                    });
                    pageData = $.extend({}, postInfo, {
                        oid: accountInfo.UID + uniqueID,
                        uid: accountInfo.UID,
                        type: "likedpages",
                        data: userData
                    });
                    updateUserAction(pageData);
                }
            }

            function userUnlike() {
                var userData = {},
                    pageData = {};
                if(personalizationUtils.accountUtils.isLoggedIn()) {
                    userData = $.extend({}, data, {
                        userunlikeddate: (new Date()).toISOString(),
                        lastaction: 'unlike'
                    });
                    pageData = $.extend({}, postInfo, {
                        oid: accountInfo.UID + uniqueID,
                        uid: accountInfo.UID,
                        type: "likedpages",
                        data: userData
                    });
                    updateUserAction(pageData);
                }
            }

            function updateUserAction(pageData){
                personalizationUtils.loggerUtils.info("updating likedpages gigya store", pageData);
                window.gigya.ds.store(pageData);
            }

            function userActionCb(response) {
                personalizationUtils.loggerUtils.info("Updated likedpages gigya store", response);
            }

            window.gigya.socialize.showReactionsBarUI(reactionParams);

            var trck = new Tracking(elem, 'TouchBloglikes');
            $(document).trigger('template.loaded');
        };

        return TouchBloglikes;
    }
);

define(['jquery', 'tracking', 'handlebars', 'helpers', 'personalizationUtils'],
    function($, Tracking, Handlebars, helpers, personalizationUtils) {
        'use strict';

        var BlogsComment = function(elem, componentName) {

            var commentsContainer = document.getElementById("userComments"),
                categoryIDVal = commentsContainer.getAttribute("data-categoryID"),
                streamIDVal = commentsContainer.getAttribute("data-streamID"),
                writeACommentVal = commentsContainer.getAttribute("data-writeAComment"),
                commentVal = commentsContainer.getAttribute("data-comment"),
                replyVal = commentsContainer.getAttribute("data-reply"),
                moderationVal = commentsContainer.getAttribute("data-moderation"),
                daysAgoVal = commentsContainer.getAttribute("data-daysAgo"),
                hoursAgoVal = commentsContainer.getAttribute("data-hoursAgo"),
                minutesAgoVal = commentsContainer.getAttribute("data-minutesAgo"),
                oneDayAgoVal = commentsContainer.getAttribute("data-oneDayAgo"),
                oneHourAgoVal = commentsContainer.getAttribute("data-oneHourAgo"),
                oneMinuteAgoVal = commentsContainer.getAttribute("data-oneMinuteAgo"),
                requiredFieldVal = commentsContainer.getAttribute("data-requiredField"),
                errorMessageVal = commentsContainer.getAttribute("data-errorMessage"),
                device = personalizationUtils.commonUtils.isMobile() ? 'mobile' : 'desktop';

            var params = {
                categoryID: categoryIDVal,
                streamID: streamIDVal,
                version: 2,
                containerID: 'userComments',
                cid: '',
                hideShareButtons: true,
                showLoginBar: false,
                disabledShareProviders: 'facebook, twitter, linkedin, qq, renren, sina, vkontakte',
                deviceType: device,
                useSiteLogin: true,
                onSiteLoginClicked: onSiteLoginHandler,
                onLoad: updateUserComment,
                onCommentSubmitted: commentSubmitted,
                onError: hideComponent
            };
            params.customLang = {
                post: commentVal,
                write_a_comment: writeACommentVal,
                reply: replyVal,
                please_fill_required_fields: requiredFieldVal,
                your_comment_is_awaiting_moderation: moderationVal,
                an_error_has_occurred_please_try_again_later: '%errorCode ' + errorMessageVal,
                one_day_ago: oneDayAgoVal,
                one_hour_ago: oneHourAgoVal,
                one_minute_ago: oneMinuteAgoVal,
                less_than_a_minute_ago: oneMinuteAgoVal,
                num_days_ago: '%num ' + daysAgoVal,
                num_hours_ago : '%num ' + hoursAgoVal,
                num_minutes_ago: '%num ' + minutesAgoVal
            };

            function onSiteLoginHandler(e) {
                //Check user login
                if (!personalizationUtils.accountUtils.isLoggedIn()) {
                    $("html, body").animate({
                        scrollTop: 0
                    }, "slow", function() {
                        $("#loginModal").bs3modal({
                            show: true,
                            backdrop: 'static',
                            keyboard: false
                        });
                    });
                }
            }

            function updateUserComment() {
                var userComment = personalizationUtils.commonUtils.getValue('userComment');

                if(userComment) {
                    $('#userComments').find('.gig-comments-composebox .gig-composebox-textarea').text(userComment);
                    $('#userComments').find('.gig-comments-composebox .gig-composebox-textarea').trigger('focus');
                    personalizationUtils.commonUtils.clearValues('userComment');
                }
            }

            function commentSubmitted() {
                var commentCount = parseInt($('.module-blogs-comment').find('.gig-comments-count').text());
                window.digitalData.component = window.digitalData.component || {};
                window.digitalData.component.commentCount = commentCount;
            }

            function hideComponent(e) {
                console.log(e);
                //$(elem).addClass('hidden');
            }

            if(window.kpmgPersonalize.isSitePersonalize) {
                $(elem).removeClass('hidden');
                if(personalizationUtils.commonUtils.isMobile()) {
                    if($('body').hasClass('contents-reflowed') && componentName) {
                        window.gigya.comments.showCommentsUI(params);
                    }
                } else {
                    window.gigya.comments.showCommentsUI(params);
                }
            }

            var tracking = new Tracking(elem, 'BlogsComment'),
                links;

            personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                links = data.links;
            });

            $(".user-login #continueButton").on('click', function() {
                var userComment = $('#userComments').find('.gig-comments-composebox .gig-composebox-textarea').text().trim();
                if (links.login.url.length > 0) {
                    if(userComment) {
                        personalizationUtils.commonUtils.setValue('userComment', userComment);
                    }

                    personalizationUtils.commonUtils.setValue('blogPostUrl', window.location.href);
                    personalizationUtils.pathUtils.gotoPage((window.location.origin + links.login.url + '?ref=blogs'));
                }
            });

            $(document).trigger('template.loaded');
        };

        return BlogsComment;
    }
);

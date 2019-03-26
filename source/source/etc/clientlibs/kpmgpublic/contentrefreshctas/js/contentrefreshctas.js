define(['jquery', 'tracking', 'personalization', 'personalizationUtils'],
    function($, Tracking, personalization, personalizationUtils) {
        'use strict';

        var Contentrefreshctas = function(elem, componentName) {
            //Component should be initialized from Dashboardarticle or Widedashboardarticle
            if (componentName) {
                return;
            }

            var countToDisableCTAs = window.kpmgPersonalize.misc.cellLevelCombinedHideRefresh,
                $kpmgModal = $('#kpmgModal'),
                accountInfo = personalizationUtils.accountUtils.getInfo(),
                rejectListLimit = window.kpmgPersonalize.misc.rejectedListLimit,
                countForRefreshFeedback = window.kpmgPersonalize.misc.triggerRefreshFeedback,
                countForHideFeedback = window.kpmgPersonalize.misc.triggerHideFeedback;

            $('.ellipsis-cta', elem)
                .on('click', function() {
                    $(elem).addClass('slide-down');
                });

            $(elem).on('click', '.refresh-article.active', function() {
                personalization.personalizeArticle($(elem).closest('[personalize="true"]'))
                    .then(function(context) {
                        updateDisableCounter(context);
                    });
                updateRefreshArticleCounter();

                tracking.satelliteTracking({
                    'user': {
                        gigyaID: accountInfo.UID
                    }
                }, 'showAnotherArticle', false);
                tracking.track('showAnotherArticle', "Show me another article");
            });

            $(elem).on('click', '.hide-article.active', function() {
                personalization.personalizeArticle($(elem).closest('[personalize="true"]'))
                    .then(function(context) {
                        updateDisableCounter(context);
                    });
                updateOnHideArticle();

                tracking.satelliteTracking({
                    'user': {
                        gigyaID: accountInfo.UID
                    }
                }, 'dontShowArticleAgain', false);
                tracking.track('dontShowArticleAgain', "Don't show this article again");
            });

            $(elem).on('click', '.interests-link.active', function() {
                tracking.satelliteTracking({
                    'user': {
                        gigyaID: accountInfo.UID
                    }
                }, 'updatePreferences', false);
                tracking.track('updatePreferences', "Update my preferences");
            });

            function updateDisableCounter(context) {
                var $context = $(context),
                    data = $context.closest('.col-full-height').attr('data-clickcount'),
                    clickcount = (data && parseInt(data) + 1) || 1;

                if (clickcount >= countToDisableCTAs) {
                    disableRefreshHideCTAs(context);
                }
                $($context.closest('.col-full-height')).attr('data-clickcount', clickcount);
            }

            function updateRefreshArticleCounter() {
                var accountInfo = personalizationUtils.accountUtils.getInfo(),
                    counter = accountInfo.data.refreshArticleClickCount || 0,
                    accountData = {},
                    hideFeedback = accountInfo.data.feedbackOptOut || false;

                counter += 1;
                accountData.refreshArticleClickCount = counter;

                Contentrefreshctas.updateAccountInfo(accountData);

                if (!hideFeedback && counter === countForRefreshFeedback) {
                    //Trigger refresh feedback form
                    triggerFeedback('refresh');
                }
            }

            function updateOnHideArticle() {
                var accountInfo = personalizationUtils.accountUtils.getInfo(),
                    counter = accountInfo.data.hideArticleClickCount || 0,
                    rejectedList = (accountInfo && accountInfo.data.rejectedArticlesList) ? JSON.parse(accountInfo.data.rejectedArticlesList) : [],
                    accountData = {},
                    articleUrl = $(elem).attr('data-url'),
                    hideFeedback = accountInfo.data.feedbackOptOut || false;

                //Increment counter and update
                counter += 1;
                accountData.hideArticleClickCount = counter;

                //update rejected articles list
                if (articleUrl) {
                    rejectedList.unshift(articleUrl);
                    if (rejectedList.length > rejectListLimit) {
                        rejectedList.length = rejectListLimit;
                    }
                    accountData.rejectedArticlesList = JSON.stringify(rejectedList);
                }

                Contentrefreshctas.updateAccountInfo(accountData);

                if (!hideFeedback && counter === countForHideFeedback) {
                    //Trigger hide feedback form
                    triggerFeedback('hide');
                }
            }

            Contentrefreshctas.updateAccountInfo = function(accountData) {
                var accountInfo = personalizationUtils.accountUtils.getInfo();
                accountInfo.data = $.extend({}, accountInfo.data, accountData);
                personalizationUtils.accountUtils.setInfo(accountInfo);

                window.gigya.accounts.setAccountInfo({
                    data: accountData
                });
            };

            function disableRefreshHideCTAs(context) {
                $('.refresh-article', context).removeClass('active');
                $('.hide-article', context).removeClass('active');
            }

            function triggerFeedback(form) {
                var url = window.kpmgPersonalize.urlmapping.feedback;
                url = (window.kpmgPersonalize.misc.isAuthor) ? url : url.replace('/content/kpmgpublic', '');
                window.kpmg.modalOpenerUrl = url;

                $kpmgModal.data('form', form);
                $kpmgModal.bs3modal({
                    backdrop: 'static',
                    keyboard: false,
                    remote: url,
                    modalUrl: url
                });

                tracking.satelliteTracking({
                    'user': {
                        gigyaID: accountInfo.UID
                    }
                }, 'feedbackFormStart', false);
                tracking.track('feedbackFormStart');
            }

			// Keep the following lines at the bottom of the Contentrefreshctas function
            var tracking = new Tracking(elem, 'Contentrefreshctas');
			$(document).trigger('template.loaded');
        };

        return Contentrefreshctas;
    }
);

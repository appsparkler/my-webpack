define(['jquery', 'tracking', 'personalizationUtils', 'contentrefreshctas'],
    function($, Tracking, personalizationUtils, Contentrefreshctas) {
        'use strict';

        var Contentrefreshfeedback = function(elem) {
            var $kpmgmodal = $('#kpmgModal'),
                feedbackForm = $kpmgmodal.data('form'),
                accountInfo = personalizationUtils.accountUtils.getInfo(),
                $feedbackHeading = $('.heading', elem),
                $feedbackHeadingSuccess = $('.feedback-heading'),
                $optout = $('#optOut');

            $feedbackHeading.html($feedbackHeading.data('hey') + ' ' + accountInfo.profile.firstName + ' ' + accountInfo.profile.lastName + '!');
            $feedbackHeadingSuccess.html($feedbackHeadingSuccess.data('hey') + ' ' + accountInfo.profile.firstName + ' ' + accountInfo.profile.lastName + '!');

            if (accountInfo && accountInfo.data.feedbackOptOut) {
                $optout.prop( 'checked', true );
            }

            //accessibility
            $(".content-feedback-tab-entry").on("keyup", function(e) {
                var keyCode = e.which || e.keyCode;
                if (keyCode === 32 || keyCode === 13) {
                    $('#optOut').trigger("click");
                }
            });

            $(".question-wrapper").on("keyup", function(e) {
                var keyCode = e.which || e.keyCode;
                if (keyCode === 32 || keyCode === 13) {
                    $(this).find('.question-heading').trigger("click");
                }
            });

            $(".feedback-answer-entry").on("keyup", function(e) {
                var keyCode = e.which || e.keyCode;
                if (keyCode === 32 || keyCode === 13) {
                    $(this).delay(1000).closest('.answer').find('input[type="radio"]').trigger("click");
                }
            });

            $(elem).on('click', '#optOut', function() {
                var accountData = {
                    feedbackOptOut: $('#optOut').is(':checked')
                };
                Contentrefreshctas.updateAccountInfo(accountData);
            });

            $('#feedbackSubmit', elem).on('click', function() {
                //Show message based on options selected by the user
                var isAnswered = $('.answer input', elem).is(':checked'),
                    isOptout = $('#optOut').is(':checked'),
                    successClass = '.msg1';

                if (isOptout && !isAnswered) {
                    successClass = '.msg2';
                } else if (isOptout && isAnswered) {
                    successClass = '.msg3';
                }

                var contentRefresh = {};
                $('.feedback-content').find('div.question-heading').each(function(i) {
                    var idFor = $('input[name=question' + i + ']:checked').attr('id');
                    contentRefresh['answer' + parseInt(i + 1)] = $('label[for="' + idFor + '"]').text();
                });
                contentRefresh.donotprovidefeedback = isOptout;

                tracking.satelliteTracking({
                    'user': {
                        gigyaID: personalizationUtils.accountUtils.getInfo().UID
                    },
                    'contentRefresh': contentRefresh
                }, 'feedbackFormSubmit', false);
                tracking.track('feedbackFormSubmit');

                $kpmgmodal.bs3modal('hide');
                if (isOptout || isAnswered) {
                    showSuccessModal(successClass);
                }
            });

            $('.question-heading', elem).on('click', function() {
                var $this = $(this);
                //Remove class open from the accordion set and then set the chevron icons.
                $('.question-heading', elem).removeClass('open');
                $('.question-heading', elem).find('span').removeClass('icon-chevron-up').addClass('icon-chevron-down');
                
                $this.toggleClass('open');
                if ($this.hasClass('open')) {
                    $this.find('span').removeClass('icon-chevron-down').addClass('icon-chevron-up');
                } else {
                    $this.find('span').removeClass('icon-chevron-up').addClass('icon-chevron-down');
                }
            });

            $('.answer label', elem).on('click', function() {
                var $this = $(this),
                    $questionWrapper = $this.closest('.question-wrapper');

                // Close all accordions
                setTimeout(function() {
                    $('.question-heading', elem).removeClass('open');
                    $('.question-heading', elem).find('span').removeClass('icon-chevron-up').addClass('icon-chevron-down');

                    if ($questionWrapper.next().find('.question-heading').length) {
                        $questionWrapper.next().find('.question-heading').trigger('click');
                    } else {
                        $questionWrapper.find('.question-heading').trigger('click'); // To keep last question open
                    }
                }, 1000);
            });

            function showSuccessModal(successClass) {
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
                $('.feedback-success').find(successClass).removeClass('hide');
                $('.feedback-success').bs3modal('show');
            }

            if (feedbackForm === 'refresh') {
                $('.modal-box-container.refresh-feedback').css("display", "block");
                $('.modal-box-container.hide-feedback').remove();
            } else {
                $('.modal-box-container.refresh-feedback').remove();
                $('.modal-box-container.hide-feedback').css("display", "block");
            }

            // Keep the following lines at the bottom of the Contentrefreshfeedback function
            var tracking = new Tracking(elem, 'Contentrefreshfeedback');
            $(document).trigger('template.loaded');
        };
        return Contentrefreshfeedback;
    }
);
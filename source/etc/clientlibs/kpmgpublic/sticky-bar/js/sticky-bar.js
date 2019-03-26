
/**
 * Sticky bar component will be displayed when user is loggedin and his email is not verified.
 * After clicking the component the email notification will be sent if the fresh email is not sent in some timer window else the message will be shown as email already sent.
*/
define(['jquery', 'tracking', 'personalizationUtils', 'sticky-bar-service', 'genericErrorDialog', 'resendVerificationEmail', 'helpers'],
	function ($, Tracking, personalizationUtils, stickyBarService, genericErrorDialog, resendVerificationEmail, Helpers) {
		'use strict';
		var StickyBar = function (elem) {
			// var stickyBarService = new stickyBarService();
			var _$emailVerifyStickyBar, _$contentBlock, _$stickyBarModule;
			var windowPath = window.location.pathname;
			//Initializing the component only for publisher
			if (!window.kpmgPersonalize.misc.isAuthor && !windowPath.match("registration-interests") && !windowPath.match("registration-subscriptions")) {
				initialize();
			}
			//
			function _showHideStickyBar() {
				if (!stickyBarService.isAccountVerified() && stickyBarService.isUserLoggedIn()) {
					_$stickyBarModule.addClass('showStickyBar');
					_$emailVerifyStickyBar.addClass('show');
					_$contentBlock.addClass('stickyNotificationOpened');
					if(stickyBarService.isRequestEmailTimerWindowExpired() && $(document).width() >= 1100){
						Helpers.triggerSatteliteTracking("unverifiedStickyNav");
					}
				} else {
					_$emailVerifyStickyBar.removeClass('show');
					_$contentBlock.removeClass('stickyNotificationOpened');
					_$stickyBarModule.removeClass('showStickyBar');
				}

				if (stickyBarService.getEmailRequestedTime() > 0 && !stickyBarService.isRequestEmailTimerWindowExpired()) {
					_$emailVerifyStickyBar.removeClass('show');
					_$contentBlock.removeClass('stickyNotificationOpened');
					_$stickyBarModule.removeClass('showStickyBar');
				}
			}

			/**
			 * Adding the event listeners related to sticky bar
			 */
			function _addEventListeners() {
				_$emailVerifyStickyBar.on("click", function () {
					Helpers.triggerSatteliteTracking("unverifiedStickyNavClick");
					$(".loading-spinner").show();
					if (stickyBarService.isRequestEmailTimerWindowExpired()) {
						sendEmailNotification();
					} else {
						showErrModal();
					}
				});
				//register custom event show:hide
				_$emailVerifyStickyBar.on("show:hide", function () {
					_showHideStickyBar();
				});
			}
			/**
			 * Initializing the sticky bar component which checks the conditions and show/hide the component
			 */
			function initialize() {
				_$emailVerifyStickyBar = $("#emailVerifyStickyBar");
				_$contentBlock = $('body.navigation-v2 .template > .container');
				_$stickyBarModule = $('.module-sticky-bar');
				_addEventListeners();
				_showHideStickyBar();
			}

			function invalidate() {

			}

			function sendEmailNotification() {
				resendVerificationEmail.verify();
			}

			function showErrModal() {
				resendVerificationEmail.error();
			}

			function destroy() {

			}

			// Keep the following lines at the bottom of the StickyBar function
			var trck = new Tracking(elem, 'StickyBar');
			$(document).trigger('template.loaded');
			//
		};
		return StickyBar;
	}
);

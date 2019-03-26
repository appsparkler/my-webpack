define(['jquery', 'tracking', 'personalizationUtils', 'genericErrorDialog'],
    function ($, Tracking, personalizationUtils, genericErrorDialog) {
        'use strict';

        var Deleteaccountlink = function (elem, componentName) {
            var tracking = new Tracking(elem, 'Deleteaccountlink');

            $('.deleteAccount', elem).on('click', function(evt){
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
                $("#deleteModal").bs3modal({
                    show: true,
                    backdrop: 'static',
                    keyboard: false
                });
            });

            //fetch UID and pagePath URL
            $(".deleteSuccess").on('click', function () {
                var personObj = personalizationUtils.accountUtils.getInfo(),
                    uid = encodeURIComponent(personObj.UID),
                    UIDSignature = encodeURIComponent(personObj.UIDSignature),
                    signatureTimestamp = personObj.signatureTimestamp,
                    locale = window.kpmgPath.substring(0, 6);

                $.ajax({
                    method: "POST",
                    data: {
                        uid: uid,
                        UIDSignature : UIDSignature,
                        signatureTimestamp : signatureTimestamp,
                        locale: locale
                    },
                    url: '../../' + "home.deleteaccount.json"
                }).done(function () {
                    $("html, body").animate({
                        scrollTop: 0
                    }, "slow");
                    $("#deleteSuccessModal").bs3modal({
                        show: true,
                        backdrop: 'static',
                        keyboard: false
                    });
                    // tracking successfull account delete
                    tracking.satelliteTracking({
                        'Profile': {
                            ProfileManagement: 'Delete Account'
                        }
                    }, 'profileManagement', false);
                    tracking.track('profileManagement');
                    window.gigya.accounts.logout();
                }).fail(function (err) {
                    console.log(err);
                    genericErrorDialog.showDialog();
                });
            });

            $(".delete-close").on('click', function () {
                personalizationUtils.pathUtils.gotoPage("../../home.html");
            });

            // Keep the following lines at the bottom of the Deleteaccountlink function
            $(document).trigger('template.loaded');
        };

        return Deleteaccountlink;
    }
);

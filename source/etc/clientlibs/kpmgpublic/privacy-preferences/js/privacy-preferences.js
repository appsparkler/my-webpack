define(['jquery', 'tracking', 'personalizationUtils', 'genericErrorDialog', 'jsonviewer'],
    function($, Tracking, personalizationUtils, genericErrorDialog, jsonviewer) {
        'use strict';

        var PrivacyPreferences = function(elem) {
            var links = {},
                $downloadDataLink = $("#download-data-link", elem),
                $downloadMessage = $(".download-message", elem),
                $downloadDataReady = $(".download-data-ready", elem);

            personalizationUtils.myKpmgFlyoutUtils.getLinksJson().done(function(data) {
                links = data.links;
                if( !personalizationUtils.accountUtils.isLoggedIn() && !window.kpmgPersonalize.misc.isAuthor ) {
                    personalizationUtils.pathUtils.gotoPage( "../../../../../" + links.login.url );
                }
            });

            function initializeComponent() {
                if($(elem).data('version2') === true) {
                    if (window.kpmgPersonalize.updatedUserData) {
                        handleDownloadLinks();
                    } else {
                        //To handle when S&P call is taking time
                        document.addEventListener("updatedUserData", function() {
                            handleDownloadLinks();
                        });
                    }

                    // request data on click
                    $(".download-data").on('click', function () {
                        requestData();
                    });

                    $(".download-data-ready").on('click', function() {
                        downloadDataFile();
                    });
                } else {
                    // download data on click
                    $(".download-data").on('click', function () {
                        downloadDataV1('account');
                    });
                }
            }

            $('.delete-account', elem).on('click', function(evt){
                $("#deleteModal").bs3modal();
            });

            //fetch UID and pagePath URL
            $(".deleteSuccess").on('click', function () {
                var personObj = personalizationUtils.accountUtils.getInfo(),
                    uid = encodeURIComponent(personObj.UID),
                    UIDSignature = encodeURIComponent(personObj.UIDSignature),
                    signatureTimestamp = personObj.signatureTimestamp,
                    localeObj = personalizationUtils.accountUtils.getLocale(),
                    locale = '/' + localeObj.countryCode + '/' + localeObj.languageCode;

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
                    $("#deleteSuccessModal").bs3modal();
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

            $('.return-to-btn', elem).on('click', function(evt) {
                personalizationUtils.pathUtils.gotoPage("../../../../../" + links.profile.url);
            });

             // converting to csv from Gigya
            function convertJSONtoCSV(response) {
                var headers = "", value = "",
                content = "";
                [
                    "time:Created",
                    "data.terms:Terms",
                    "data.kpmg:KPMG",
                    "data.preferences:Data Preferences",
                    "subscriptions:Subscriptions",
                    "isActive:Is Active",
                    "isRegistered:Is Registered",
                    "isVerified:Is Verified",
                    "lastLogin:Last Login",
                    "profile.firstName:First Name",
                    "profile.lastName:Last Name",
                    "profile.email:Email",
                    "registered:Registered",
                    "regSource:Registration Source",
                    "socialProviders:Social Providers"
                ].forEach(function(element) {
                    var a = element.split(':');
                    headers += a[a.length > 1 ? 1 : 0] + ",";
                    value = a[0].split(".").reduce(function(a,b) { return a && (a[b] || a[b] === false) ? a[b] : "";}, response);
                    if( typeof value === "object" ) {
                        value = JSON.stringify(value);
                    }
                    if( Date.parse(value) && !window.navigator.msSaveBlob) {
                        value = new Date(value).toLocaleString(Date.parse(value));
                    }

                    if( value.toString().indexOf(',') >= 0 || value.toString().indexOf('"') >= 0 ) {
                        value = '"' + value.replace(/\"/g, '""') + '"';
                    }

                    content += value + ",";
                });
                return headers + "\n" + content;
            }

            function outputAccountData(response) {
                var textToSave = '',
                filename = '',
                blob = {},
                hiddenElement = document.createElement('a');
                if (response.context === 'account') {
                    textToSave = convertJSONtoCSV(response);
                    filename = 'accountData.csv';
                }
                else if (response.context === 'consent') {
                    filename = 'preferenceData.json';
                    if (typeof (response.data.consent) !== 'undefined') {
                        textToSave = JSON.stringify(response.preferences, null, '\t');
                    }
                    else {
                        textToSave = JSON.stringify('', null, '\t');
                    }
                }

                if (window.navigator.msSaveBlob) {
                    blob = new Blob([textToSave], {type:  "text/html;charset=utf-8;"});
                    window.navigator.msSaveOrOpenBlob(blob, filename);
                } else {
                    hiddenElement.href = 'data:text/csv,' + encodeURI(textToSave);
                    hiddenElement.target = '_blank';
                    hiddenElement.setAttribute('id', 'download-csv-data-link');
                    hiddenElement.download = filename;
                    document.body.appendChild(hiddenElement);
                    hiddenElement.trigger('click');
                    document.body.removeChild(hiddenElement);
                }
            }

            // download data function from gigya
            function downloadDataV1(type) {
                window.gigya.accounts.getAccountInfo({
                    callback: outputAccountData,
                    context: type,
                    include: 'identities-active,identities-all,identities-global,loginIDs,emails,profile,data,regSource,irank,lastLoginLocation,rba,subscriptions,preferences',
                    extraProfileFields: 'languages,address,phones,education,honors,publications,patents,certifications,likes,professionalHeadline,bio,industry,specialties,work,skills,religion,politicalView,interestedIn,relationshipStatus,hometown,favorites,followersCount,followingCount,username,locale,verified,timezone,samlData'
                });
            }

            function handleDownloadLinks() {
                var accountInfo = personalizationUtils.accountUtils.getInfo(),
                    requestTime = (accountInfo.data && accountInfo.data.downloadData && accountInfo.data.downloadData.requestTime) || '',
                    timeDifferenceInSeconds = (new Date().getTime() - new Date(requestTime).getTime()) / 1000,
                    expiryInSeconds = (window.kpmgPersonalize && window.kpmgPersonalize.downloadDataExpiryWindow && window.kpmgPersonalize.downloadDataExpiryWindow * 60 * 60) || 24 * 60 * 60,
                    accountData = {
                        downloadData: {
                            status: "EXPIRED",
                            filename: ''
                        }
                    };

                if(accountInfo && accountInfo.data.downloadData && accountInfo.data.downloadData.status === "REQUESTED") {
                    $downloadDataLink.removeClass("active");
                    $downloadDataLink.attr('tabindex', '-1');
                    $downloadMessage.removeClass("hidden");
                } else if(accountInfo && accountInfo.data.downloadData && accountInfo.data.downloadData.status === "COMPLETED" && timeDifferenceInSeconds <= expiryInSeconds) {
                    $downloadDataLink.removeClass("active");
                    $downloadDataLink.attr('tabindex', '-1');
                    $downloadDataReady.removeClass("hidden");

                    // updating content for download-data-link
                    $('.download-label-content1').addClass("hidden");
                    $('.download-label-content2').removeClass("hidden");
                    $('#download-data-link').attr('aria-label', $('.download-label-content2').text() );
                } else if(accountInfo && accountInfo.data.downloadData && accountInfo.data.downloadData.status === "COMPLETED" && timeDifferenceInSeconds > expiryInSeconds) {
                    setAccountInfo(accountData)
                        .fail(function() {
                            setAccountInfo(accountData);
                        });
                }
            }

            function requestData() {
                var accountInfo = personalizationUtils.accountUtils.getInfo(),
                    accountData = {
                        downloadData: {
                            status: "REQUESTED",
                            requestTime: new Date().toISOString()
                        }

                    };

                if(accountInfo && accountInfo.data.downloadData && (accountInfo.data.downloadData.status === "REQUESTED" || accountInfo.data.downloadData.status === "COMPLETED")) {
                    return false;
                }

                $downloadDataLink.removeClass("active");
                $downloadMessage.removeClass("hidden");

                $.when(setAccountInfo(accountData), downloadDataV2(true))
                    .done(function(info, response) {
                        if(response.statusCode !== 200) {
                            resetData();
                        }
                    })
                    .fail(function() {
                        resetData();
                    });
            }

            function resetData() {
                var accountData = {
                        downloadData: {
                            status: "EXPIRED",
                            requestTime: new Date().toISOString()
                        }
                    };
                setAccountInfo(accountData);
            }

            function downloadDataV2(request) {
                var personObj = personalizationUtils.accountUtils.getInfo(),
                    uid = encodeURIComponent(personObj.UID),
                    UIDSignature = encodeURIComponent(personObj.UIDSignature),
                    signatureTimestamp = personObj.signatureTimestamp,
                    localeObj = personalizationUtils.accountUtils.getLocale(),
                    locale = localeObj.countryCode + '/' + localeObj.languageCode,
                    url = "../../../../userdata/userdataService/request?",
                    deferred = $.Deferred(),
                    params = "uid=" + uid + "&uidSignature=" + UIDSignature + "&signatureTimestamp=" + signatureTimestamp + "&locale=" + locale;

                url += params;

                $.ajax({
                    url: url
                }).done(function (response) {
                    deferred.resolve(response);
                }).fail(function (err) {
                    deferred.reject();
                });

                return deferred;
            }

            function downloadDataFile() {
                var personObj = personalizationUtils.accountUtils.getInfo(),
                    uid = encodeURIComponent(personObj.UID),
                    UIDSignature = encodeURIComponent(personObj.UIDSignature),
                    signatureTimestamp = personObj.signatureTimestamp,
                    localeObj = personalizationUtils.accountUtils.getLocale(),
                    locale = localeObj.countryCode + '/' + localeObj.languageCode,
                    url = "../../../../userdata/userdataService/download?",
                    downloadLink = document.getElementById('downloadLink'),
                    filename = personObj.data.downloadData && personObj.data.downloadData.filename,
                    params = "uid=" + uid + "&uidSignature=" + UIDSignature + "&signatureTimestamp=" + signatureTimestamp + "&locale=" + locale + "&fileName=" + filename;

                url += params;

                downloadLink.setAttribute("href", url);
                downloadLink.setAttribute("download", filename);
                downloadLink.trigger('click');
            }

            function setAccountInfo(data) {
                var deferred = $.Deferred(),
                    accountInfo = personalizationUtils.accountUtils.getInfo();

                window.gigya.accounts.setAccountInfo({
                    data: data,
                    callback: function(response) {
                        if (response.errorCode === 0) {
                            $.extend(accountInfo.data, data);
                            personalizationUtils.accountUtils.setInfo(accountInfo);
                            deferred.resolve();
                        } else {
                            deferred.reject(response);
                        }
                    }
                });

                return deferred;
            }

            initializeComponent();

            //hiding view data overlay on click of escape
            $(document).on('keydown', function(event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if ( keycode === 27 ) {
                    $("#deleteModal").bs3modal('hide');
                }
            });


            $(".download-data", elem).on("keyup", function(e) {
                if ( e.which === 13 ) {
                    $(this).trigger("click");
                }
            });

            $(".delete-account", elem).on("keyup", function(e) {
                if ( e.which === 13 ) {
                    $(this).trigger("click");
                }
            });

            $(".return-to-btn", elem).on("keyup", function(e) {
                if ( e.which === 13 ) {
                    $(this).trigger("click");
                }
            });

            $(elem).on('keyup', '#download-data-ready-link', function (e) {
                if (e.which === 9 || (e.which === 9 && e.shiftKey)) {
                    $(this).find('.download-label').addClass("focusOutline");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });
            $(elem).on('keydown', '#download-data-ready-link', function(e) {
                if( e.which === 9 ) {
                    $(this).find('.download-label').removeClass("focusOutline");
                }
                if (e.which === 13) {
                    $(this).trigger("click");
                    e.stopImmediatePropagation();
                    e.preventDefault();
                }
            });

            // privacy preferences link tracking
            $(document).on("click", '.module-privacy-preferences .privacy-container-row a', function(){
                var linkType = $(this).attr('id'),
                    profMan = (linkType === "download-data-link") ? "Download User Data" : "Delete Account";
                window.digitalData.Profile = window.digitalData.Profile || {};
                window.digitalData.Profile.ProfileManagement = profMan;
                tracking.track('profileManagement');
            });

			// Keep the following lines at the bottom of the PrivacyPreferences function
            var tracking = new Tracking(elem, 'PrivacyPreferences');
			$(document).trigger('template.loaded');
        };

        return PrivacyPreferences;
    }
);

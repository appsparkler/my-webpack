define(['jquery', 'tracking'],
    function($, Tracking) {
        'use strict';

        var TouchBlogshare = function(elem) {

            var ua = new window.gigya.socialize.UserAction(),
                shareButtonContainer = document.getElementById("shareButton");

            ua.setLinkBack(shareButtonContainer.getAttribute("data-blogpostUrl"));
            ua.setTitle(shareButtonContainer.getAttribute("data-blogpostTitle"));
            ua.setDescription(shareButtonContainer.getAttribute("data-blogpostDescription"));
            var socialMediaArray = (shareButtonContainer.getAttribute("data-socialshare")).split(',');

            var shareBtnArray = [];

            var initial_url = window.kpmgAssetDomain || window.location.origin,
                twitterIcon = '/etc/designs/kpmgpublic/images/twitter-icon.png',
                googleIcon = '/etc/designs/kpmgpublic/images/google-icon.png',
                facebookIcon = '/etc/designs/kpmgpublic/images/facebook-icon.png',
                linkdinIcon = '/etc/designs/kpmgpublic/images/linkedln-icon.png';


            var twitterIconUrl = initial_url + twitterIcon,
                googleIconUrl = initial_url + googleIcon,
                facebookIconUrl = initial_url + facebookIcon,
                linkdinIconUrl = initial_url + linkdinIcon;

            for(var i=0; i<socialMediaArray.length; i++) {
                if(socialMediaArray[i] === 'facebook') {
                    shareBtnArray.push({
                        provider:'facebook',
                        tooltip:'Recommend this on facebook',
                        iconImgUp:facebookIconUrl
                    });
                } else if(socialMediaArray[i] === 'googleplus') {
                    shareBtnArray.push({
                        provider:'googleplus',
                        tooltip:'Recommend this on Google Plus',
                        iconImgUp:googleIconUrl
                    });
                } else if(socialMediaArray[i] === 'twitter') {
                    shareBtnArray.push({
                        provider:'twitter',
                        tooltip:'Recommend this on twitter',
                        iconImgUp:twitterIconUrl
                    });
                } else if(socialMediaArray[i] === 'linkedin') {
                    shareBtnArray.push({
                        provider:'linkedin',
                        tooltip:'Recommend this on linkedin ',
                        iconImgUp:linkdinIconUrl
                    });
                }
            }

            var params = {
                userAction: ua,
                shareButtons: shareBtnArray,
                containerID: 'shareButton', // ID of the container
                shortURLs: 'never',
                cid: '',
                showCounts: 'none',
                noButtonBorders:'true',
                onShareButtonClicked: shareButtonClicked
            };

            function shareButtonClicked(e) {
                trck.track('componentLink', e.shareItem.provider, false, e.shareItem.provider);
            }

            window.gigya.socialize.showShareBarUI(params);

            var trck = new Tracking(elem, 'TouchBlogshare');
            $(document).trigger('template.loaded');
        };

        return TouchBlogshare;
    }
);

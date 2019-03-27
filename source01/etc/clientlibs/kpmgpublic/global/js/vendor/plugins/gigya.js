/* global s */
/* global gigya */
// Create and Publish User's Action
// This method is associated with the "btnPublishAction" click

var popper,
  popperCloseBtn;
popper = $('#gig_showSimpleShareUI');
popperCloseBtn = $('.icon-gig-simpleShareUI-closeButton');
//
setShowShareContainerCloseButtonEvent();
setAutoCloseOptionsForShowShareContainer();
// private functions
function hidePopper() {
  popper.hide();
}

function setAutoCloseOptionsForShowShareContainer() {
  $(document).on('click', function(e) {
    var target = $(e.target);
      $('.icon-user,.icon-site-selector').on("click",function(){
          popper.hide()
      });
    // ne need to reshow and recreate poper when click over popup so return;
    if(!popper.is(target) && popper.has(target).length === 0) hidePopper();
    else return
  });
}

function setShowShareContainerCloseButtonEvent() {
  popperCloseBtn.on('click', hidePopper);
}
//
function showShareUI(options, tracking) {
  var act;
  //
  setupUserAction();
  //
  require(['global/js/vendor/popper'], function(Popper) {
    var reference;
    reference = $('#' + options.shareTarget);
    callGigyaShowShareAPI();
    // private functions
    function setupPopper() {
      var placement;
      var desktopPlacement;

      desktopPlacement = (options.hasOwnProperty('placement')) ? options.placement : 'bottom-end' ;
      placement =  ($(window).innerWidth() < 640) ? 'right' : desktopPlacement;

      popper.show();
      new Popper(reference, popper, {placement: placement});
    }
    // private functionalities
    function callGigyaShowShareAPI() {
      var params;
      //
      params = {
        containerID: 'show-share-bar-container',
        onSendDone: options.onSendDone || onSendDone
      }
      //
      gigya.socialize.showShareBarUI({ 
        shareButtons: "Twitter,LinkedIn,Facebook,googleplus",
        buttonTemplate: '<a role="button" class="social-share-button-override"style="background: url($iconImg) no-repeat;" onclick="$onClick">$text</a>',
        userAction: act,
        containerID: params.containerID,
        operationMode: options.shareOperationMode || "simpleShare",
        wrap: true,
        shortURLs: "never",
        showMoreButton: true,
        showEmailButton: false,
        showCounts:"none",
        // events
        onLoad: function(){
            setupPopper();
            options.onLoad();
        },
        onError: options.onError || onError,
        onShareButtonClicked: options.onShareButtonClicked || onShareButtonClicked,
        onSendDone: function(event) {
          params.onSendDone.call(this, event, tracking, options.shareTitle);
      }
      });
    }
  })
  // private functions
  function setupUserAction() {
    act = new gigya.socialize.UserAction();
    //
    act.setTitle(options.shareTitle);
    act.setDescription(options.shareDescription);
    act.addMediaItem({type: 'image', src: options.shareImage, href: options.shareUrl});
    act.setLinkBack(options.shareUrl);
    act.addActionLink(options.shareSiteName, options.shareUrl);
  }
}
// onError event handler
function onError(event) {
  alert('An error has occured' + ': ' + event.errorCode + '; ' + event.errorMessage);
}

function onShareButtonClicked(event) {
  // body...
}

function onLoad(event) {
  // body...
}
// onSendDone event handler.
// Displays in the status field, the list of providers to which the newsfeed has been
// successfully published.
function onSendDone(event, tracking, title) {
  tracking.satelliteTracking({
    'social': {
      SocialAction: "Share",
      SocialMedium: event.providers
    },
    'article': {
      ArticleName: title
    }
  }, 'SocialShare', false);
  tracking.track('SocialShare', event.providers);

  document.getElementById('status').style.color = "green";
  switch (event.context) {
    case 'multiSelect':
      document.getElementById('status').innerHTML = 'The newsfeed has been posted to: ' + event.providers;
      break;
    case 'simpleShare':
      document.getElementById('status').innerHTML = 'Clicked ' + event.providers;
      try {
        s.trackEvent({
          "socialAction1": "share",
          "socialAction2": "share",
          "socialNetwork1": event.providers,
          "socialNetwork2": event.providers,
          "events": "event22"
        }, "Social Link");
      } catch (err) {
        //console.log('Tracking disabled hence "S" object is undefined...');
      }
      break;
    default:
      document.getElementById('status').innerHTML = 'Share onSendDone';
  }
}

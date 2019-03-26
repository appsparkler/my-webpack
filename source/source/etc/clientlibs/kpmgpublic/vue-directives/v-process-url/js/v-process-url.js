define(['vue','jquery'], function(Vue, $) {
    'use strict';
    //
    var config;
    //
    config = {
        bind: processUrl,
        componentUpdated: processUrl
    };
    //Initialize directive
    Vue.directive('processUrl', config);
    // private functions
    function processUrl(el, binding) {
        processHref();
        // private functions
        function processHref() {
            var href;
            //
            href = binding.value;
            //
            if (href && href.indexOf('#') === -1) {
                if(!href) {
                    editElementForBrokenLink();
                }
                else {
                    setHrefForWoringLink(href);
                }
            } else {
                setHrefForWoringLink(href);
            }
        }
        
        function editElementForBrokenLink() {
            // setting href="#" and onclic="return false;" creates a non-navigational link
            $(el).attr('href', '#').attr('onclick', 'return false;');
        }
        
        function setHrefForWoringLink(href) {
            $(el).attr('href', href);
        }
    }
});
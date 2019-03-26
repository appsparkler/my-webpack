define(['vue'], function (Vue) {
    'use strict';
    var VueAnimatedSearchBar;
    //
    VueAnimatedSearchBar = Vue.component('animated-search-bar', {
        template: '#animated-search-bar-component-template',
        props: ['vm'],
        methods: {
            showSearchBar: showSearchBar,
            hideSearchBar: hideSearchBar
        }
    });
    //
    return VueAnimatedSearchBar;
    // private functions
    function hideSearchBar() {
        /*jshint validthis:true */
        var thisEl;
        //
        thisEl = this.$el;
        //
        $(thisEl).animate({
            width: '0',
            opacity: 0
        }, function () {
            // RESET val of the search bar
            $(thisEl)
                .removeClass('d-inline')
                .addClass('d-none')
                .find('input')
                .val('');
            $(thisEl).parent().trigger('focus');
        });
    }

    function showSearchBar() {
        /*jshint validthis:true */
        var thisEl, rightElem, leftElem;
        //
        thisEl = this.$el;
        //
        rightElem = 'nav.navbar div.navbar-ikon-menu-component .icon-site-selector';
        leftElem = 'nav.navbar a.navbar-brand';
        //
        $(thisEl)
            .removeClass('d-none')
            .addClass('d-inline');
        //
        $(thisEl)
            .stop()
            .animate({
                width: getDifferenceBetweenTwoElements(rightElem, leftElem) - 20 + 'px',
                opacity: 1,
                top: '-3px'
            }, function () {
                // focus on the input once the search-bar animation is completed.
                $(this).find('input').trigger('focus');
            });

        $(window).on('resize', function () {
            // WHEN OPACITY == 1, it means search bar is open when window was resized.
            var rightElem, leftElem;
            //
            rightElem = 'nav.navbar div.navbar-ikon-menu-component .icon-site-selector';
            leftElem = 'nav.navbar a.navbar-brand';
            //
            if (+$(thisEl).css('opacity') === 1) {
                $(thisEl)
                    .stop()
                    .animate({
                        width: getDifferenceBetweenTwoElements(rightElem, leftElem) - 20 + 'px',
                        top: '-3px'
                    });
            }
        });
        // private functions (good candidate for abstraction)
        function getDifferenceBetweenTwoElements(rightElem, leftElem) {
            var rightElemLeftOffset, rightElemWidth, leftElemLeftOffset, leftElemWidth;
            //
            rightElemLeftOffset = $(rightElem).offset().left;
            leftElemLeftOffset = $(leftElem).offset().left;
            rightElemWidth = $(rightElem).innerWidth();
            leftElemWidth = $(leftElem).innerWidth();
            //
            return rightElemLeftOffset - leftElemLeftOffset - leftElemWidth - rightElemWidth;
        }
    }
});

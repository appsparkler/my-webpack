define(['jquery'], function($) {
    'use strict';

    //Case insensitive :contains selector
    $.expr[':'].icontains = function(a, i, m) {
        return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    var autoScroll = function(elem, selector) {
        var searchText = '',
            doneTypingInterval = 500,
            currentElement = '',
            typingTimer;

        $(document).off('keyup').on('keyup', function(e) {
            var charTyped = String.fromCharCode(e.which);

            currentElement = $(elem + ":visible")[0];

            if (/[a-z\d]/i.test(charTyped)) {
                searchText += charTyped;
                searchAndScroll(searchText.toLowerCase());
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
            }
        });

        $(document).off('keydown').on('keydown', function() {
            clearTimeout(typingTimer);
        });

        function doneTyping() {
            searchText = '';
        }

        function searchAndScroll(text) {
            var scrollTop = $(currentElement).scrollTop() - 5,
                pos = $(selector+":icontains('" + text + "'):eq(0)", currentElement).position();

            if (pos) {
                $(currentElement).scrollTop(scrollTop + pos.top);
            }
        }
    };

    return autoScroll;
});

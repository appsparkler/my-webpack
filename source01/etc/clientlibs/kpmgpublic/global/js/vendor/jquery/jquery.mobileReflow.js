/**
 * jQuery Mobile Priority Reflow
 * Reflows components on a template level based on mobile prioity
 *
 * @author <a href='mailto:bdrummond2@sapient.com'>Brent Drummond</a>
 * @version 0.2
 * @requires jquery 1.7+
 *
 * Known Issues:
 * None
 *
 * Changelog:
 * v0.1 - Initial build
 * v0.2 - Changed so script only empties and reflows divs where the mobile and the desktop order do not match
 *        Was previously removing and replacing all divs.
 *
 * Usage:
 * In the template HTML where this should be used, two attributes must be placed in the component containers:
 *
 * data-desktop-cell - This is the initial order of the compoents on the page. This should be sequential to initial component 
 * order in the template.
 * data-mobile-cell  - This is the new sort order. You must number these based on the sequence of components on mobile.
 * To make the javascript functionaity work, simply add 'jquerymobilereflow' to the template level javascript define like the 
 * example below:
 * define(['jquery', 'navigation', 'navflyouta', 'navflyoutb', 'navflyoutc', 'footer', 'jquerymobilereflow'],
 * This will load the script and make it available to the template. 
 * 
 * Example:
 * <div class="col-md-12 tmpl-row" data-desktop-cell="1"  data-mobile-cell="4">
 *      {{component include}}
 * </div>
 * 
 * In the above example, this would be the first component within our template. When the mobile breakpoint is detected 
 * (currently 641px and below). The components will reorder, and this will be the 4th component on the page.
 * When the mobile breakpoint is detected, the script will go through all divs containing the "data-desktop-cell" attribute 
 * and populate the $elements arrary if the orders do not match, and then empty the HTML from the div. It will then repopulate 
 * the divs based on mobile sort order. On orientation change from mobile to desktop breakpoints the process is reveresed.
 **/

define([
        'jquery'
    ],
    function(
        $
    ) {
        'use strict';

        var $elements = [];

        // Takes divs on the page with the data-desktop-cell attribute, creates and array with the elements and clears the divs if not in correct order
        function getElementsToReflow(direction) {
            // If this is mobile, populate the $element array and empty the divs.
            if (direction === 'toMobile') {
                $elements = [];
                $('[data-desktop-cell]').each(function() {
                    var jqWrap = $(this),
                        $originalOrder = parseInt(jqWrap.attr('data-desktop-cell')),
                        $mobileOrder = parseInt(jqWrap.attr('data-mobile-cell')),
                        $htmlContents = jqWrap.html();
                    if ($originalOrder !== $mobileOrder) {
                        $elements.push({originalOrder: $originalOrder, mobileOrder: $mobileOrder, htmlContents: $htmlContents});
                        jqWrap.empty();
                    }
                });
                reflowContents($elements, 'toMobile');
            } else {
                // On desktop we just need to empty the cells to reflow, as original sort order is already contained within $elements
                $('[data-desktop-cell]').each(function() {
                    var jqWrap = $(this),
                        $originalOrder = parseInt(jqWrap.attr('data-desktop-cell')),
                        $mobileOrder = parseInt(jqWrap.attr('data-mobile-cell'));
                    if ($originalOrder !== $mobileOrder) {
                        jqWrap.empty();
                    }
                });
                reflowContents($elements, 'toDesktop');
            }
        };

        function initComponents(components) {
            if (components && components.length) {
                $.each(components, function (index, val) {
                    var name = $(val).attr('class'),
                        module = name.substring(7, name.indexOf(' '));
                    require([module], function (mod) {
                        mod(val, module);
                    });
                });
            }
        }

        // Repopulates the divs based on mobile or desktop order.
        function reflowContents(elements, direction) {
            if (direction === 'toMobile') {
                // Repopulates the divs based on mobile order.
                $.each(elements, function(index) {
                    var selectorQuery = '[data-desktop-cell="' + elements[index].mobileOrder + '"]';
                    $(selectorQuery).html(elements[index].htmlContents);
                    initComponents($('.component', $(selectorQuery)));
                });
                $('body').addClass('contents-reflowed');
                $(document).trigger('mobilereflowedFinished');
            } else {
                // Repopulates the divs back to original desktop order.
                $.each(elements, function(index) {
                    var selectorQuery = '[data-desktop-cell="' + elements[index].originalOrder + '"]';
                    $(selectorQuery).html(elements[index].htmlContents);
                    initComponents($('.component', $(selectorQuery)));
                });
                $('body').removeClass('contents-reflowed');
            }  

            $(document).trigger('reflow.complete');
        };

        $(function() {
            // On mobile breakpoint, start the reflow process
            $(document).on('mobileBreakpoint', function() {
                if (!$('body').hasClass('contents-reflowed')) {
                    getElementsToReflow('toMobile');
                }  
            });

            // On desktop breakpoint, check to see if contents are reflowed (iPad orientation change), and if so, reflow everthing back to desktop
            $(document).on('desktopBreakpoint',function() {
                if ($('body').hasClass('contents-reflowed')) {
                    getElementsToReflow('toDesktop');
                }
            });
        });
    }
);
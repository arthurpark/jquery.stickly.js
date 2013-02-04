/**
 * jquery.stickly.js
 * stickly is a jQuery plugin that makes an element inside a container
 * sticky (fixed) as browser is scrolled vertically.
 *
 * @name stickly
 * @author Tom Jakubowski, Arthur Park
 *
 * Usage:
 *     $('.stickly').stickly();
 *     $('.stickly').stickly({ top: 50 });
 *
 * Source and example available at:
 * https://github.com/tomjakubowski/jquery.stickly.js
 *
 */
(function(window,$) {
    "use strict";

    var defaults = {
        // This is used as top when stickly's position: fixed
        top: 0,
        // Default container is direct parent.
        container: null
    };

    $.fn.stickly = function(options) {
        // Cache values that doesn't change after intialization to lighten up process function which is
        // called on every scroll event.
        var config = $.extend({}, defaults, options),
            $container = (config.container) ? $(config.container) : this.parent(),
            $me = this,
            sticklyHeight = $me.height(),
            containerHeight = $container.outerHeight(),
            containerBottom = $container.offset().top + containerHeight,
            containerPaddingTop = $container.css('padding-top') ? parseInt($container.css('padding-top'), 10) : 0,
            containerPaddingBottom = $container.css('padding-bottom') ? parseInt($container.css('padding-bottom'), 10) : 0,
            topBound    = $me.offset().top - config.top,
            bottomBound = containerBottom - sticklyHeight - config.top - containerPaddingBottom,
            isSticky    = false;

        $(window).on("scroll.stickly", process);

        /**
         * This function goes through some conditionals, and change style position: only when the $me
         * hits boundary.
         */
        function process() {
            var scrollTop = $(document).scrollTop(),
                containerPositionLeft = $container.offset().left,
                containerPaddingLeft = $container.css('padding-left') ? parseInt($container.css('padding-left'), 10) : 0;

            if ( !isSticky ) {
                // While scrolling down, when scroll position hits stickly's top, make stickly fixed.
                if (scrollTop > topBound && scrollTop < bottomBound) {
                    $me.css({
                        'position': 'fixed',
                        'top':  ((config.top) ? config.top + 'px' : 0),
                        'bottom': '',
                        'left': (containerPositionLeft + containerPaddingLeft) + 'px'
                    });
                    isSticky = true;
                }
            } else {
                if ($me.css('position') === 'fixed') {
                    if (scrollTop >= bottomBound) {
                        // When stickly's bottom hit's bottom thrashhold
                        $me.css({
                            'position': 'absolute',
                            'top': '',
                            'bottom' : containerPaddingBottom + 'px',
                            'left': (containerPaddingLeft ? containerPaddingLeft + 'px' : 0)
                        });
                        isSticky = false;
                    } else if (scrollTop <= topBound || scrollTop <= 0) {
                        // When stickly's top hits its original top position.
                        $me.css({
                            'position': 'absolute',
                            'top': containerPaddingTop + 'px',
                            'bottom': '',
                            'left': (containerPaddingLeft ? containerPaddingLeft + 'px' : 0)
                        });
                        isSticky = false;
                    }
                }
            }
        }
    };
})(this, this.jQuery);

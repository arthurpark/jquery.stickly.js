(function(window, $) {

  'use strict';

  $.fn.stickly = function(container) {
    var $container = $(container),
        $sticky = $(this);

    $(window).on('scroll.stickly', process());

    function process() {
      var minBound = $container.offset().top,
          maxBound = minBound + $container.height();

      var minPosTop = $sticky.position().top,
          maxPosTop = $container.height() - $sticky.height() - minPosTop;

      return function(e) {
          var scrollTop = $(window).scrollTop(),
              newPosTop = scrollTop - minBound + minPosTop;

          newPosTop = Math.max(newPosTop, minPosTop);
          newPosTop = Math.min(newPosTop, maxPosTop);

          $sticky.css('top', newPosTop);
      };
    }
  };

})(this, this.jQuery);


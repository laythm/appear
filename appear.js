        (function ($) {
            $.fn.appear = function (options) {

                var defaults = {
                    parentElement: window,
                    shownCallback: function () { },
                    hiddenCallback: function () { }
                };

                var settings = $.extend({}, defaults, options);

                function isScrolledTo(el, parentElement) {
                    var viewTop = $(parentElement).scrollTop();
                    var viewBottom = viewTop + $(parentElement).height();

                    var elemTop = $(el).offset().top;
                    var elemBottom = elemTop + $(el).height();

                    return ((elemBottom >= viewTop) && (elemTop <= viewBottom));
                }

                function onScrolledTo(el, parentElement, shownCallback, hiddenCallback) {
                    var isVisible = false;

                    $(parentElement).scroll(function () {
                        if ($(el).is(':visible')) {
                            if (isScrolledTo(el, parentElement)) {
                                if (!isVisible) {
                                    isVisible = true;
                                    if (shownCallback) (shownCallback());
                                }
                            } else {
                                if (isVisible) {
                                    isVisible = false;
                                    if (hiddenCallback) (hiddenCallback());
                                }
                            }
                        }
                    }).scroll();
                }
                return this.each(function () {
                    el = this;
                    //assign scroll event on parent elment to check if scroll will show the element then
                    onScrolledTo(el, settings.parentElement, settings.shownCallback, settings.hiddenCallback);

                    //if the element is shown and scrolled to then showncall back
                    $(el).bind('show', function () {
                        if (isScrolledTo(el, settings.parentElement)) {
                            if (settings.shownCallback) (settings.shownCallback());
                        }
                    });
                });
            };

        }(jQuery));
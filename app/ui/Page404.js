var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

require('../styles/Page404.css');

var Page404 = React.createClass({
    renderJQuery: function(e) {

        !function($){
              
            var defaults = {
                animation: "flipOut",
                beforeOpen: null,
                afterOpen: null,
                beforeClose: null,
                afterClose: null
            };
                
            function oddOrEven(value) {
                if (value%2 == 0)
                    return "even";
                else
                    return "odd";
            }
                
            function Timer(callback, delay) {
                var timerId, start, remaining = delay;

                this.pause = function() {
                    window.clearTimeout(timerId);
                    remaining -= new Date() - start;
                };

                this.resume = function() {
                    start = new Date();
                    timerId = window.setTimeout(callback, remaining);
                };

                this.resume();
            }
              
            $.fn.getDimension = function (d) {
                $clone = this.clone().addClass("foc-card foc-open").css("visibility","hidden").appendTo($('body'));
                if (d == "width") {
                    var $width = $clone.outerWidth();
                    $clone.remove();
                    return $width;
                } else {
                    var $height = $clone.outerHeight();
                    $clone.remove();
                    return $height;
                }

            };
              
            $.fn.flipout_cards = function(options){
                var settings = $.extend({}, defaults, options),
                el = $(this);

                      
                return this.each(function(){

                    var left = "",
                    right = "",
                    top = "",
                    bottom = "",
                    animation = false,
                    width = 0,
                    height = 0,
                    extraclass = "";
                                
                    switch (settings.animation) { 
                        case 'slideOut':
                            extraclass = "foc-slideout";
                            break;
                        case 'foldOut':
                            extraclass = "foc-foldout";
                            break;
                        default:
                    }
                                  
                                
                    el.find(".foc-left").each(function (index) {
                        var el2 = $(this);
                        width += el2.getDimension("width");
                        var new_el = el2.clone();
                        el2.remove();
                        left += "<div class='foc-card foc-left " + extraclass + "'>" + new_el.html() + "</div>";
                    });
                                
                    if (left != "")  $("<div style='width:" + width + "px;' class='foc-left-wrapper foc-wrapper'>" + left + "</div>").appendTo(".foc-main");
                    width = 0;

                    el.find(".foc-right").each(function (index) {
                        var el2 = $(this);
                        width +=  el2.getDimension("width");
                        var new_el = el2.clone();
                        el2.remove();
                        right += "<div class='foc-card foc-right " + extraclass + "'>" + new_el.html() + "</div>";
                    });

                    if (right != "") $("<div style='width:" + width + "px;' class='foc-right-wrapper foc-wrapper'>" + right + "</div>").appendTo(".foc-main");

                    $(el.find(".foc-top").get().reverse()).each(function (index) {
                        var el2 = $(this);
                        height += el2.getDimension("height");
                        var new_el = el2.clone();
                        el2.remove();
                        top = "<div class='foc-card foc-top " + extraclass + " " + oddOrEven(index+1) + "'>" + new_el.html() + "</div>" + top;
                    });

                    if (top != "") $("<div style='height:" + height + "px;' class='foc-top-wrapper foc-wrapper'>" + top + "</div>").appendTo(".foc-main");

                    height = 0;

                    el.find(".foc-bottom").each(function (index) {
                        var el2 = $(this);
                        height += el2.getDimension("height");
                        var new_el = el2.clone();
                        el2.remove();
                        bottom += "<div class='foc-card foc-bottom " + extraclass + "'>" + new_el.html() + "</div>";
                    });

                    if (bottom != "") $("<div style='height:" + height + "px;' class='foc-bottom-wrapper foc-wrapper'>" + bottom + "</div>").appendTo(".foc-main");

                    el.hover( function() {
                        if (typeof settings.beforeOpen == 'function') settings.beforeOpen();
                        $(this).addClass( "foc-open" );
                        el.find(".foc-wrapper").each(function () {
                            var el4 =  $(this);
                            if (el4.hasClass("foc-top-wrapper")) {
                                var cards = $(el4.find(".foc-card").get().reverse())
                            } else {
                                var cards = el4.find(".foc-card")
                            }
                            if (animation == false) {
                                var donecheck = false;
                                cards.each(function (i) {
                                    var el3 = $(this);
                                    animation = true;
                                    var timeout_open = new Timer(function() {
                                        if (el.hasClass("foc-open")) el3.addClass("foc-open")
                                    }, i * 100);
                                    if (i == el4.find(".foc-card").length - 1) {
                                        animation = false;
                                        el3.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                                            if (typeof settings.afterOpen == 'function' && donecheck == false) settings.afterOpen();
                                            donecheck = true;
                                        });

                                    }
                                });
                            }
                        });


                    }, function() {
                        if (typeof settings.beforeClose == 'function') settings.beforeClose();
                        $(this).removeClass( "foc-open" );
                        el.find(".foc-wrapper").each(function () {
                            var el4 =  $(this);
                            if (animation == false) {
                                if (el4.hasClass("foc-top-wrapper")) {
                                    var cards = el4.find(".foc-card")
                                } else {
                                    var cards = $(el4.find(".foc-card").get().reverse())
                                }
                                var donecheck = false;
                                cards.each(function (j) {
                                    var el3 = $(this);
                                    animation = true;
                                    var timeout_close = new Timer(function() {
                                        if (!el.hasClass("foc-open"))el3.removeClass("foc-open")
                                    }, j * 100);
                                    if (j == el4.find(".foc-card").length - 1) {
                                        animation = false;
                                        el3.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                                            if (typeof settings.afterClose == 'function' && donecheck == false) {
                                                settings.afterClose();
                                                donecheck = true;
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });

                });


            }
        }(window.jQuery);

        $(".flipout").flipout_cards();

    },
    componentDidMount: function() {
        this.renderJQuery();
    },
    render: function() {
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 col-sm-12 col-xs-12 text-center'>
                        <div className="flipout">
                            <div className="foc-main">
                                <h1>404</h1>
                                <h4>Error</h4>
                                <hr />
                                <p>Page Not Found</p>
                            </div>
                            <div className="foc-left">
                                <h1>404</h1>
                                <p>The requested URL was not found on this server.</p>
                            </div>
                            <div className="foc-left">
                                <p>46&#176;C</p>
                                <small>The next is even worse.</small>
                            </div>
                            <div className="foc-right">
                                <p>46&#176;C</p>
                                <small>The next is even worse.</small>
                            </div>
                            <div className="foc-right">
                                <p>50&#176;C</p>
                                <small>Don't go out.</small>
                            </div>
                            <div className="foc-bottom">
                                <p>50&#176;C</p>
                                <small>Don't go out.</small>
                            </div>
                            <div className="foc-bottom">
                                <p>GO Home</p>
                                <Link to='/home'>
                                    <input type='button' className='btn btn-default' value='Home' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
});

module.exports = Page404;

jQuery(window).bind('mercury:ready', function() {
    Mercury.saveUrl = '/content';
    console.debug("I am ready to do my code");
});

jQuery(window).bind('mercury:ready', function(e) {

    //    Mercury.modalHandlers.insertTable = function (e) {
    //        console.debug("doing my bit: " + $(e));

    //    };



});

var pressed = false;
var start = undefined;
var startX, startWidth;

$("table tr:first td").mousedown(function(e) {
    console.debug("resize me up................");
    start = $(this);
    pressed = true;
    startX = e.pageX;
    startWidth = $(this).width();
    $(start).addClass("resizing");
});

$(document).mousemove(function(e) {
    if (pressed) {
        $(start).width(startWidth + (e.pageX - startX));
    }
});

$(document).mouseup(function() {
    if (pressed) {
        $(start).removeClass("resizing");
        pressed = false;
    }
});
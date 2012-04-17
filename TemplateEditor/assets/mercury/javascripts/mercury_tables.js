//jQuery(window).bind('mercury:ready', function() {
//    Mercury.saveUrl = '/content';
//    console.debug("resize me ------------------->");
//});

var onSampleResized = function(e) {
    var table = jQuery(e.currentTarget); //reference to the resized table
};

$("table").live("click", function(e) {
    $(this).colResizable({
        liveDrag: true,
        gripInnerHtml: "<div class='te-resizegrip'></div>",
        draggingClass: "dragging",
        onResize: onSampleResized
    });
});

$("table").bind("table_recalc", function(event, params) {
    //doSomethingKickAss(params);
    console.debug("recalc table................");
});

//$("#some-element").trigger("main_event", "Known at execution time");

//trigger an event so the table can be disabled then re-enabled - so all handlers can be added again



//    var pressed = false;
//    var start = undefined;
//    var startX, startWidth;

//    jQuery("#coverpage-canvas").mousedown(function(e) {
//        console.debug("resize me up................");
//        start = jQuery(this);
//        pressed = true;
//        startX = e.pageX;
//        startWidth = jQuery(this).width();
//        jQuery(start).addClass("resizing");
//    });

//    jQuery(document).mousemove(function(e) {
//        if (pressed) {
//            jQuery(start).width(startWidth + (e.pageX - startX));
//        }
//    });

//    jQuery(document).mouseup(function() {
//        if (pressed) {
//            jQuery(start).removeClass("resizing");
//            pressed = false;
//        }
//    });


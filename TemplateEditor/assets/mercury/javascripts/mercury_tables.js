
$("table").bind("table_recalc", function(event, params) {

    console.debug("recalc table................");
});

//$("#some-element").trigger("main_event", "Known at execution time");

//trigger an event so the table can be disabled then re-enabled - so all handlers can be added again

(function($) {
    //
    // Table resizer plugin
    //

    //resize handlers
    var resizeHandlers = $("<div class='te-resize-handlers'>")
              .append("<div class='te-table-column-resize-dragger' style='top: 0px; left: 0px;'>")
              .append("<div class='te-table-column-resize-guide' style='top: 0px; left: 0px; display: none;'>");

    //declare namespace
    $.jTableResizer = {};

    $.fn.transformTable = function() {
        console.debug("table transformed: " + this);
    };

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

    //if you hover over any td within the first row, set the position of the resize handler to that td

    function attachResizeHandlers(selector, wrapper) {

        $(selector).find("tr:first td").live("mouseover", function(e) {
            Mercury.log("what object is this: ", $(selector) + " event: " + e);
            var position = $(this).position();
            $(wrapper).find(".te-table-column-resize-dragger").css("top", position.top).css("left", position.left);
        });

        $(".te-table-column-resize-dragger").live("mousedown", function(e) {
            //prevent browser from adding some sort of cursor - mozilla does this
            e.preventDefault();
            Mercury.log("what object is this: ", $(selector) + " event: " + e);
            var position = $(this).position();
            $(wrapper).find(".te-table-column-resize-guide").css("top", position.top).css("left", position.left).css("height", $(selector).height()).show();
        });

        $(".te-table-column-resize-dragger").live("mouseup", function(e) {
            //prevent browser from adding some sort of cursor - mozilla does this
            e.preventDefault();
            Mercury.log("mouseup: ", $(selector) + " event: " + e);
            $(wrapper).find(".te-table-column-resize-guide").hide();
        });

    }

    $.fn.setupTables = function() {
        //add handlers to each table
        var that = this, wrapper = $(that).parent();
        Mercury.log("what object is this: ", wrapper);

        if ($(wrapper).hasClass("te-table")) {
            //check if resize handlers already exist, if not add them
            if ($(wrapper).find(".te-resize-handlers").length > 0)
                return;
            $(wrapper).append(resizeHandlers);
            attachResizeHandlers(that, wrapper);
        }
    };

})(jQuery);

var onSampleResized = function(e) {
    var table = jQuery(e.currentTarget); //reference to the resized table
};

jQuery("table").live("click", function(e) {
    jQuery(this).colResizable({
        liveDrag: false,
        draggingClass: "dragging",
        onResize: onSampleResized
    });
});

jQuery("table").bind("table_reset", function(e) {
    Mercury.log("what object called: ", jQuery(this));
});




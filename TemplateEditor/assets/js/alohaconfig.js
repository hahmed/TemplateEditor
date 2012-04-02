(function (window, undefined) {
    var Aloha = window.Aloha || (window.Aloha = {});

    Aloha.settings = {
        logLevels: { 'error': true, 'warn': true, 'info': false, 'debug': false, 'deprecated': true },
        errorhandling: false,
        ribbon: false,
        locale: 'en',
        floatingmenu: {
            width: 630,
            behaviour: 'topalign'
        },
        plugins: {
            format: {
                // all elements with no specific configuration get this configuration
                config: ['b', 'i', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'removeFormat']
            },
            list: {
                // all elements with no specific configuration get an UL, just for fun :)
                config: ['ul', 'ol']
            },
            listenforcer: {
                editables: ['.aloha-enforce-lists']
            },
            table: {
                // all elements with no specific configuration are not allowed to insert tables
                config: ['table'],
                summaryinsidebar: false,
                // [{name:'green', text:'Green', tooltip:'Green is cool', iconClass:'GENTICS_table GENTICS_button_green', cssClass:'green'}]
                tableConfig: [
					{ name: 'hor-minimalist-a' },
					{ name: 'box-table-a' },
					{ name: 'hor-zebra' },
				],
                columnConfig: [
					{ name: 'table-style-bigbold', iconClass: 'aloha-button-col-bigbold' },
					{ name: 'table-style-redwhite', iconClass: 'aloha-button-col-redwhite' }
				],
                rowConfig: [
					{ name: 'table-style-bigbold', iconClass: 'aloha-button-row-bigbold' },
					{ name: 'table-style-redwhite', iconClass: 'aloha-button-row-redwhite' }
				]
            },
            formatlesspaste: {
                formatlessPasteOption: true,
                strippedElements: [
				"em",
				"strong",
				"small",
				"s",
				"cite",
				"q",
				"dfn",
				"abbr",
				"time",
				"code",
				"var",
				"samp",
				"kbd",
				"sub",
				"sup",
				"i",
				"b",
				"u",
				"mark",
				"ruby",
				"rt",
				"rp",
				"bdi",
				"bdo",
				"ins",
				"del"]
            }
        }
    };

    Aloha.ready(function () {
        Aloha.jQuery('.canvas-updateable').aloha();
    });


    $('table').live("contextmenu", function (e) {
        //alert("context menu should not show...");
        //e.preventDefault();
    });

    //if you hover over a table *first row only*, set the resizer div to be on the closest td it can find
    $('table tr:first td').live("hover", function (e) {
        //get this tables parent wrapper
        //        var parent = $(this).closest(".aloha-table-wrapper"), resizer = $(parent).find(".aloha-table-column-resize-dragger"),
        //        position = $(this).position();
        //        console.debug(position);
        //        //set the position of the resizer
        //        $(resizer).css("left", position.left + "px");
        //        $(resizer).css("top", position.top + "px");
    });

    $('.aloha-table-column-resize-dragger').live("click", function (e) {
        //get this tables parent wrapper
        //        var parent = $(this).closest(".aloha-table-wrapper"), resizer = $(parent).find(".aloha-table-column-resize-guide"),
        //        position = $(this).position();
        //        console.debug(position);

        //        $(resizer).css("left", position.left + "px");
        //        $(resizer).css("top", position.top + "px");

        //        $(resizer).show();
    });

    $("table").colResizable({
        liveDrag:true,
        headerOnly:true
    });

    $("#btnSaveTemplate").click(function () {
        $(".serverresponse").show();
        $("#serverreply").html("");
        $("#loading").show();
        var token = $("#canvas-content").find('input[name=__RequestVerificationToken]').val();

        $.ajax({
            url: $(".menu").data("save-url"),
            type: "Post",
            cache: false,
            data: { __RequestVerificationToken: token, coverpage: $("#coverpage-canvas").html(), bodycontent: $("#bodypage-canvas").html() },
            error: function (request) {
                //code to display message to user
                console.log(request);
                $("#serverreply").html("something went wrong with that request, please try again");

                $("#loading").hide();
            },
            success: function (data) {
                $("#serverreply").html(data.Message);
                $("#loading").hide();
                return;
            } // end on sucess
        });
    });

    $("#btnLoadTemplateFields").live("click", function () {
        $.ajax({
            url: $("body").data("fields-url"),
            type: "POST",
            error: function (xhr, status, error) {
                // you may need to handle me if the json is invalid
                // this is the ajax object
                $("#loading").hide();
                console.error(error);
                return;
            },
            success: function (data) {
                try {
                    if (data.Data.Error)
                        throw "data is empty";
                    $("#template-field-sidebar").find(".field-list").html($(data.Data.Fields));
                    return;
                }
                catch (err) {
                    console.error(err);
                }
                return;
            } // end on sucess
        }); // end ajax call
    });
})(window);

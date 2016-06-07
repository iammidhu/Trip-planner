$(document).ready(function() {
    var table = $('#trip-data-table').DataTable();
    var addButton, removeButton, origin, desitination;

    $(function() {
        var destinations = [
            "Kasargod", "Kottayam", "Kollam",
            "Trivandrum", "Pathanamthitta",
            "Kochi", "Thrissur", "Palakkad",
            "Kannur", "Calicut", "Malappuram",
            "Idukki", "Alappuzha", "Wayanad"
        ];

        $("#destination").autocomplete({
            source: destinations
        });

        $("#origin").autocomplete({
            source: destinations
        });
    });
    //When form submits
    $("#search").on('click', function(e) {
        e.preventDefault();
        var stops = $("input[name=stops]").val();
        var counter = table.rows().count();
        origin = $("#origin").val();
        destination = $("#destination").val();
        rowData();
        for (var i = 1; i <= stops; i++) {

            table.row.add(
                [
                    addButton,
                    removeButton,
                    ++counter,
                    originInput,
                    destinationInput,
                    $("input[name=start]").val(),
                    $("input[name=enddate]").val()
                ]
            ).draw();
        }
        setOrigin();
        setDestination();
    });

    setOrigin = function() {
        table.cell({
            row: 0,
            column: 3
        }).data(
            '<input type="text" onfocusout="changeOrigin(this)"  class="form-control" value="' + origin + '" />'
        ).draw();
    }

    setDestination = function() {
        var total = table.rows().count();
        table.cell({
            row: total - 1,
            column: 4
        }).data(
            '<input type="text" class="form-control" onfocusout="changeDestination(this)" value="' + destination + '" />'
        ).draw();
    }

    //initialising row data
    rowData = function() {
        addButton = '<button class="btn btn-success" onclick="addrow(this)">+</button>';
        removeButton = '<button class="btn btn-default" onclick="deleteRow(this)">-</button>';
        originInput = '<input type="text" onfocusout="changeOrigin(this)" class="form-control" name="data-origin">';
        destinationInput = '<input type="text" class="form-control" onfocusout="changeDestination(this)" name="data-destination">';
    }

    /**

    Deleting row when remove button is clicked
    The row is deleted and redraw the entire table

    */
    deleteRow = function(node) {
        var index = table.row($(node).parents('tr')).index() + 1;
        table.row($(node).parents('tr')).remove();
        var counter = table.rows().count();
        updateIndex(index);
        $("input[name=stops]").val(counter);
        setOrigin();
        setDestination();
        rowAfterDelete();
    }

    rowAfterDelete = function() {
        var limit = table.rows().count();
        var value;
        for (var i = limit - 1; i > 0; i--) {
            value = $(table.row(i).data()[3]).val();
            table.cell({
                row: i - 1,
                column: 4
            }).data(
                '<input type="text" onfocusout="changeOrigin(this)" name="data-destination" class="form-control" value="' + value + '"/>'
            ).draw();
        }
    }

    updateIndex = function(rowIndex) {
        var currentPage = table.page();
        var newId = rowIndex - 1;
        var tableData;
        var rowCount = table.rows().count();
        for (var i = newId; i < rowCount; i++) {
            table.cell({
                row: i,
                column: 2
            }).data(++newId)
        }
    }

    //adding new rows to existing table

    addrow = function(node) {
        var index = table.row($(node).parents('tr')).index();
        var counter = table.rows().count();
        var rows = table.rows().data();
        rowData();
        var newRow = table.row.add(
            [
                addButton,
                removeButton,
                ++counter,
                originInput,
                destinationInput,
                $("input[name=start]").val(),
                $("input[name=enddate]").val()
            ]
        ).draw();
        $("input[name=stops]").val(counter++);
        setDestination();
        redrawTable(index, rows);

    }

    redrawTable = function(addIndex, fullData) {
        var limit = table.rows().count();
        var value;
        // making indexed row destination value null
        table.cell({
            row: addIndex,
            column: 4
        }).data(
            '<input type="text" onfocusout="changeDestination(this)" name="data-destination" class="form-control" value=""/>'
        ).draw();
        for (var i = addIndex; i <(limit-2); i++) {

            value = $(table.row(i + 1).data()[3]).val();
            table.cell({
                row: i + 1,
                column: 4
            }).data(
                '<input type="text" onfocusout="changeOrigin(this)" name="data-destination" class="form-control" value="' + value + '"/>'
            ).draw();
        }

        for (var i = 0; i < limit; i++) {
            value = $(table.row(i).data()[4]).val();
            table.cell({
                row: i + 1,
                column: 3
            }).data(
                '<input type="text" onfocusout="changeOrigin(this)" name="data-destination" class="form-control" value="' + value + '"/>'
            ).draw();
        }

    }

    changeOrigin = function(node) {
        var rowIndex = table.row($(node).parents('tr')).index();
        table.cell({
            row: rowIndex,
            column: 3
        }).data(
            '<input type="text" onfocusout="changeOrigin(this)" name="data-origin" class="form-control" value="' + $(node).val() + '"/>'
        ).draw();
        table.cell({
            row: rowIndex - 1,
            column: 4
        }).data(
            '<input type="text" onfocusout="changeDestination(this)" name="data-destination" class="form-control" value="' + $(node).val() + '"/>'
        ).draw();
    }

    changeDestination = function(node) {
        var id = table.row($(node).parents('tr')).index();
        table.cell({
            row: id,
            column: 4
        }).data(
            '<input type="text" onfocusout="changeDestination(this)" name="data-destination" class="form-control" value="' + $(node).val() + '"/>'
        ).draw();

        table.cell({
            row: id + 1,
            column: 3
        }).data(
            '<input type="text" onfocusout="changeOrigin(this)" name="data-origin" class="form-control" value="' + $(node).val() + '"/>'
        ).draw();
    }

});

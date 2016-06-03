$(document).ready(function() {
  var table = $('#trip-data-table').DataTable();
  var addButton, removeButton, origin, desitination;
  var dataSrc = ["australia", "austria", "antartica", "argentina", "algeria"];

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

  $('#search').on('click', function(e) {
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
    table
      .row($(node).parents('tr'))
      .remove();
    var counter = table.rows().count();
    updateIndex(index);
    $("input[name=stops]").val(counter);
    redrawTable();

  }


  redrawTable = function() {
    var limit = table.rows().count();
    var value;
    for (var i = 0; i < limit; i++) {
      value = $(table.row(i).data()[4]).val();
      table.cell({
        row: i + 1,
        column: 3
      }).data(
        '<input type="text" onfocusout="changeOrigin(this)" name="data-destination" class="form-control" value="' + value + '"/>'
      ).draw();
    }

    var previousData = table.rows().data();
    debugger;
    table.clear().draw();
    table.rows.add(previousData);
    table.draw();
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
    var index = table.row($(node).parents('tr')).index() + 1;
    var counter = table.rows().count();

    rowData();
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

    setDestination();
    $("input[name=stops]").val(counter++);
  }



  changeOrigin = function(node) {
    var ind = table.row($(node).parents('tr')).index();
    table.cell({
      row: ind,
      column: 3
    }).data(
      '<input type="text" onfocusout="changeOrigin(this)" name="data-origin" class="form-control" value="' + $(node).val() + '"/>'
    ).draw();
    table.cell({
      row: ind - 1,
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

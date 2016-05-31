$(document).ready(function() {
  var table = $('#trip-data-table').DataTable();
  var addButton, removeButton, origin, desitination;

  //When form submits

  $('#search').on('click', function(e) {
    e.preventDefault();
    var stops = $("input[name=stops]").val();
    var counter = table.rows().count();
    origin = $("input[name=origin]").val();
    destination = $("input[name=destination]").val();
    rowData();
    addTableRow(stops, counter);
    setOrigin();
    setDestination();
  });

  setOrigin = function() {

    table.cell({
      row: 0,
      column: 3
    }).data(
      '<input type="text" id="origin" class="form-control" value="' + origin + '" />'
    ).draw();
  }

  setDestination = function() {
    var total = table.rows().count();
    table.cell({
      row: total-1,
      column: 4
    }).data(
      '<input type="text" id="origin" class="form-control" value="' + destination + '" />'
    ).draw();
    }
    // add rows by the value in stops input
  addTableRow = function(rows, counter) {
    for (var i = 1; i <= rows; i++) {
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
  }

  //initialising row data
  rowData = function() {
    addButton = '<button class="btn btn-success" onclick="addrow(this)">+</button>';
    removeButton = '<button class="btn btn-default" id="removeButton">-</button>';
    originInput = '<input type="text" name="data-origin">';
    destinationInput = '<input type="text" name="data-destination">';
  }

  /**

  Deleting row when remove button is clicked
  The row is deleted and redraw the entire table

  */

  $('#example tbody').on('click', '#removeButton', function() {
    debugger;
    table
      .row($(this).parents('tr'))
      .remove()
      .draw();

    var counter = table.rows().count();
    var index = 0;

    table
      .clear()
      .draw();
    addTableRow(counter, index);

    $("input[name=stops]").val(counter);
  });

  // removeRow = function() {
  //   debugger;
  //   table
  //     .row($(this).parents('tr'))
  //     .remove()
  //     .draw();
  //
  //   var counter = table.rows().count();
  //   var index = 0;
  //   debugger;
  //   table
  //     .clear()
  //     .draw();
  //   addTableRow(counter, index);
  //
  //   $("input[name=stops]").val(counter);
  // };

//adding new rows to existing table

addrow = function() {
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

  $("input[name=stops]").val(counter++);
}


});

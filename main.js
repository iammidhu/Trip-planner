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
      '<input type="text" class="form-control" value="' + origin + '" />'
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
    originInput = '<input type="text" class="form-control" name="data-origin">';
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
      .remove()
    var counter = table.rows().count();
    updateIndex(index);
    setOrigin();
    setDestination();
    $("input[name=stops]").val(counter);
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
    console.log(index);
    debugger;
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

  changeDestination = function(node) {
    var id = table.row($(node).parents('tr')).index();
    table.cell({
      row: id + 1,
      column: 3
    }).data(
      '<input type="text" onfocusout="changeDestination(this)" name="data-destination" class="form-control" value="' + $(node).val() + '"/>'
    );
  }

});

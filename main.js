$(document).ready(function() {
  var table = $('#trip-data-table').DataTable();
  var addButton, removeButton, origin, desitination;


  //When form submits

  $('#search').on('click', function(e) {
    e.preventDefault();
    var stops = $("input[name=stops]").val();
    var counter = table.rows().count();
    addTableRow(stops, counter)
  });

  // add rows by the value in stops input
  addTableRow = function(rows, counter) {
    for (var i = 1; i <= rows; i++) {
      table.row.add(
        [
          '<button class="btn btn-success" onclick="addrow(this)">+</button>',
          '<button class="btn btn-default" id="removeButton">-</button>',
          ++counter,
          $("input[name=origin]").val(),
          $("input[name=destination]").val(),
          $("input[name=start]").val(),
          $("input[name=enddate]").val()
        ]
      ).draw();
    }
  }


  /**

  Deleting row when remove button is clicked
  The row is deleted and redraw the entire table

  */

  $('#trip-data-table tbody').on('click', '#removeButton', function() {
    table
      .row($(this).parents('tr'))
      .remove()
      .draw();
    debugger;
    var counter = table.rows().count();
    var index = 0;

    table
      .clear()
      .draw();
    addTableRow(counter, index);

    $("input[name=stops]").val(counter);
  });

  //adding new rows to existing table

  addrow = function() {
    var counter = table.rows().count();
    table.row.add(
      [
        '<button class="btn btn-success" onclick="addrow(this)">+</button>',
        '<button class="btn btn-default" id="removeButton">-</button>',
        ++counter,
        $("input[name=origin]").val(),
        $("input[name=destination]").val(),
        $("input[name=start]").val(),
        $("input[name=enddate]").val()
      ]
    ).draw();
    $("input[name=stops]").val(counter++);
  }


});

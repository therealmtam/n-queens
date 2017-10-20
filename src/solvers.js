/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined;
  //solutions is a board object.

  //All we want is one board object that represents one possible solution to the rooks problem
  //given is the number of rooks we want to be present on the board.

  //First identify that this problem needs to run for n times ==> indicates you can't use a for loop
  //The solutions change with each setting of a piece. 

  //This can be done using a recursive function:
    //The exit criteria of the function is if number of pieces = n and all tests pass.
    //The exit criteria does not need to be passed in as a parameter.
      //The tests passing can be local.
      //The number of pieces can be global.

  //Steps of recursive function loop:
  //Place a piece on the board until it passes all tests.
  //Set piece starting at (r, c) = (0, 0). Increment to 0, 1 ==> n. Then select the next row (1, 0)
  //and increment. 
    //Do a check first to see if the value in that point is === 1, if so, then increment to next.
  //With each increment of toggling on the board, run all the tests after setting the piece.
  //Run Row Conflict Test and Column Conflict Test.

  //var row = 0;
  //var col = 0;
  //Check if a value is at row 0 and col 0.
  //If there is no value there


  //If both tests pass and number of pieces set !== n, increment the row and call the function again.
  //Else ==> do nothing, we have set all pieces and all tests have passed.

  var board = new Board({'n': n});
  var matrix = board.rows();

  matrix.forEach(function(rowArr, rowIndex) {

    var colIndex = 0;

    function placeItem () {
      board.togglePiece(rowIndex, colIndex);

      var hasRowConflict = board.hasAnyRowConflicts();
      var hasColConflict = board.hasAnyColConflicts();

      if (hasColConflict !== false || hasRowConflict !== false) {
        board.togglePiece(rowIndex, colIndex);
        colIndex++;
        placeItem();
      }
    }
    placeItem();

  });

  solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  if(n === 0 || n === 1) {
    return 1;
  }

  var solutionCount = 0;

  var board = new Board({'n': n});

  for (var topRowColIndex = 0; topRowColIndex < n; topRowColIndex++) {
    board.togglePiece(0, topRowColIndex);

    function permutations(row) {
      nSolutions = 0;

        for (var colIndex = 0; colIndex < n; colIndex++) {
          board.togglePiece(row, colIndex);

          var hasRowConflict = board.hasAnyRowConflicts();
          var hasColConflict = board.hasAnyColConflicts();

          if (hasColConflict !== false || hasRowConflict !== false) {
            board.togglePiece(row, colIndex);
          } else {
          
            if (row === n - 1) {

              board.togglePiece(row, colIndex);
              return 1;

            } else {
              nSolutions = nSolutions + permutations(row + 1);
              board.togglePiece(row, colIndex);
            }
          }
        }
      return nSolutions;
    }

    solutionCount = solutionCount + permutations(1);
    board.togglePiece(0, topRowColIndex);
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  debugger;


  var solution = undefined;

  var board = new Board({'n': n});

  var rw = 0

  recurse(row) {

    var flag = 0;

    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);

      var hasQueensConflicts = board.hasAnyQueensConflicts();

      if (hasQueensConflicts === false) {

        if (row !== n - 1) {

          flag = recurse(row + 1);

        } else {

          //when on last row and piece is set:

          //count number of pieces
          var numOfPieces = 0;
          board.rows().forEach(function(arr) {

            var rowPieces = arr.reduce(function(acc, el) {
              if (el === 1) {
                acc++;
              }
              return acc;
            }, 0);

            numOfPieces += rowPieces;
          });

          if (numOfPieces === n) {
            return 0;
          }

          if (numOfPieces !== n) {
            //detoggle
            board.togglePiece(row, col);
            return 1;
          }

        }
        //Else if there are conflicts, detoggle the piece and run through the loop again
      } else {
        //detoggle
        board.togglePiece(row, col);
      }




    }//End of For Loop

    if(flag === 1) {
      //detoggle
      board.togglePiece(row, col);
    }

    if (flag === 1 && row ==)

  }  







  matrix.forEach(function(rowArr, rowIndex) {

      var colIndex = 0;

      function placeItem () {
        board.togglePiece(rowIndex, colIndex);

        var hasQueensConflicts = board.hasAnyQueensConflicts();

        if (hasQueensConflicts !== false) {
          board.togglePiece(rowIndex, colIndex);

          if (colIndex < n-1) {
            colIndex++;
            placeItem();
          }
        }
      }

      placeItem();

    });

    var numOfPieces = 0;
    board.rows().forEach(function(arr) {

      var rowPieces = arr.reduce(function(acc, el) {
        if (el === 1) {
          acc++;
        }
        return acc;
      }, 0);

      numOfPieces += rowPieces;
    });

    if (numOfPieces === n) {
      solution = board.rows();
      return
    } else {
      getSolution();
      return;
    }
  }
  getSolution();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme



  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

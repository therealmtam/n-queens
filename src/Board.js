// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    //Places a 1 in the matrix if there is nothing there.
    //Places a 0 in the matrix if there is a 1 there.

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {

      //Need to go row by row in the matrix located in the attributes property ==> ex. {0: [0..], 1:[0,..]... n: 4}.

      //Store the result of true or false

      //Access the row ==> to access the row, access the object's keys
      
      var row = this.get(rowIndex);   //the get method is ==> this.attributes[rowIndex];
      var countOfPiecesInRow = row.reduce(function(acc, location) {

        if(location === 1) {
          return ++acc;
        } else {
          return acc;
        }
      }, 0);

      //Check to see if there are more than 1 number 1's in the row. If true, exit. If false, return so.
      if (countOfPiecesInRow > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {

      var hasConflict = false;

      var n = this.get('n');

      for (var i = 0; i < n; i++) {
        //Grab the row from the Board Obj:
        var row = this.get(String(i));

        var countOfPiecesInRow = row.reduce(function(acc, location) {
          if(location === 1) {
            return ++acc;
          } else {
            return acc;
          }
        }, 0);

        if (countOfPiecesInRow > 1) {
          hasConflict = true;
        } 
      }

      return hasConflict;   
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      
      var n = this.get('n');
      var countOfPiecesInColumn = 0;

      for (var i = 0; i < n; i++) {
        var row = this.get(i);
        if(row[colIndex] === 1) {
          countOfPiecesInColumn++;
        } 
      }

      if (countOfPiecesInColumn > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //For Each Column:
      //Pulls each row array.
      //Check that column index (ie., the index in that row array)
      //Increments a counter if there is a value in that column.
      //If the counter > 1, then return true. Else false.

      var n = this.get('n');

      var countOfPiecesInColumn = [];
      
      for (var x = 0; x < n; x++) {
        countOfPiecesInColumn[x] = 0;
      }

      for (var i = 0; i < n; i++) {
        var row = this.get(i);

        for (var y = 0; y < n; y++) {
          if(row[y] === 1) {
            countOfPiecesInColumn[y]++;
            if (countOfPiecesInColumn[y] > 1) {
              return true;
            }
          }
        }
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      var startingCol = majorDiagonalColumnIndexAtFirstRow;
      var matrix = this.rows();
      var counter = 0;

      matrix.forEach(function(row) {
        if(startingCol < 0) {
          startingCol++;
        } else {
          if(row[startingCol] === 1) {
            counter++;
          }
          startingCol++;
        }
      });

      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {

      var n = this.get('n');

      for (var i = -n + 2; i < n - 1; i++) {
        if(this.hasMajorDiagonalConflictAt(i) === true){
          return true;
        }
      }

      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      var startingCol = minorDiagonalColumnIndexAtFirstRow;
      var matrix = this.rows();
      var n = this.get('n');
      var counter = 0;

      matrix.forEach(function(row) {
        if(startingCol >= n ) {
          startingCol--;
        } else {
          if(row[startingCol] === 1) {
            counter++;
          }
          startingCol--;
        }
      });

      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.get('n');

      for (var i = 1; i < 2 * n - 2; i++) {
        if(this.hasMinorDiagonalConflictAt(i) === true){
          return true;
        }
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());



//TO DISPLAY THE BOARD:
//Need ==> new BoardView({ model: new Board(Matrix) });
//
// window.displayBoard = function(matrix){
//         $('body').html(
//           new BoardView({
//             model: new Board(matrix)
//           }).render()
//         );
//       };


//Each Board Object: (2 states, populated (has 1's in it) or empty (only 0s in it))
//To create:
//Need ==> new Board({n: #}) ==> creates an empty board object of nxn
//Need ==> new Board([[1, 0, 0, 0],
//                    [0, 1, 0, 0],
//                    [0, 0, 1, 0],
//                    [0, 0, 0, 1]]); ==> creates a populated board

//Properties of a Board of {n: 4}:
//{ 
//  attributes: { 0: [0, 0, 0, 0],
//                1: [0, 0, 0, 0],
//                2: [0, 0, 0, 0],
//                3: [0, 0, 0, 0],
//                n: 4 },
//  
//     changed: { 0: [0, 0, 0, 0],
//                1: [0, 0, 0, 0],
//                2: [0, 0, 0, 0],
//                3: [0, 0, 0, 0]
//              },
//changes: [],
//_changing: false,
//_currentAttributes: { 0: [0, 0, 0, 0],
//                      1: [0, 0, 0, 0],
//                      2: [0, 0, 0, 0],
//                      3: [0, 0, 0, 0],
//                      n: 4 },
//_hasComputed: true,
//_pending: false,
//_previousAttributes:{ 0: [0, 0, 0, 0],
//                      1: [0, 0, 0, 0],
//                      2: [0, 0, 0, 0],
//                      3: [0, 0, 0, 0],
//                      n: 4 },
//}








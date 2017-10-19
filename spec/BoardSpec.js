describe('Board', function() {

  var capitalize = function(word) {
    return word[0].toUpperCase() + word.slice(1);
  };


  var verifyConflictTypes = function(expectedConflicts, matrix) {
    // The Board() constructor will accept a matrix and build that into a (Backbone) Board object (as defined in Board.js)
    var board = new Board(matrix);
    _.map('row col rooks majorDiagonal minorDiagonal queens'.split(' '), function(conflictType) {
      var conflictDetected = board['hasAny' + capitalize(conflictType) + 'Conflicts']();  //returns T/F
      var conflictExpected = _(expectedConflicts).contains(conflictType); //Returns T/F. Sees if the conflict type is expected
      var message = conflictExpected ? 'should' : 'should not';
      it(message + ' find a ' + conflictType + ' conflict', function() {
        expect(conflictDetected).to.be.equal(conflictExpected);
      });

    });
  };

  describe('Empty board', function() {
    verifyConflictTypes([''], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });


//*************

  describe('Board with row conflicts', function() {
    verifyConflictTypes(['row', 'rooks', 'queens'], [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

//OWN UNIT TESTS:
//---------------
  // describe('Board with row conflict at 2', function() {  
  //   var matrix = [
  //     [0, 0, 0, 0],
  //     [1, 1, 0, 0],
  //     [0, 0, 0, 0],
  //     [0, 0, 0, 0]
  //   ]
  //   var board = new Board(matrix);
    
  //   it('should detect if there are is a conflict in row 2', function() {
  //     expect(board['hasRowConflictAt'](1)).to.be.equal(true);
  //   });

  // });

  // describe('Board with a row conflict', function() {
      
  //   var matrix = [
  //     [0, 0, 0, 0],
  //     [1, 1, 0, 0],
  //     [0, 0, 0, 0],
  //     [0, 0, 0, 0]
  //   ]
  //   var board = new Board(matrix);
    
  //   it('should detect if there are any row conflicts', function() {
  //     expect(board['hasAnyRowConflicts']()).to.be.equal(true);
  //   });

  // });

  // describe('Board with a column conflict at 1', function() {
      
  //   var matrix = [
  //     [0, 0, 0, 0],
  //     [0, 1, 0, 0],
  //     [0, 1, 0, 0],
  //     [0, 0, 0, 0]
  //   ]
  //   var board = new Board(matrix);
    
  //   it('should detect if there is a row conflict at Column Index 1', function() {
  //     expect(board['hasColConflictAt'](1)).to.be.equal(true);
  //   });

  // });

  // describe('Board with a column conflict', function() {
      
  //   var matrix = [
  //     [0, 0, 0, 0],
  //     [0, 1, 0, 0],
  //     [0, 1, 0, 0],
  //     [0, 0, 0, 0]
  //   ]
  //   var board = new Board(matrix);
    
  //   it('should detect if there are any row conflicts', function() {
  //     expect(board['hasAnyColConflicts']()).to.be.equal(true);
  //   });

  // });

  // describe('Board with a Major Diagonal Conflict at ___', function() {
      
  //   var matrix = [
  //     [0, 0, 0, 0],
  //     [0, 1, 0, 0],
  //     [0, 1, 0, 0],
  //     [0, 0, 0, 0]
  //   ]
  //   var board = new Board(matrix);
    
  //   it('should detect if there is a Major Diagonal Conflict at ___', function() {
  //     expect(board['hasMajorDiagonalConflictAt'](2)).to.be.equal(true);
  //   });

  // });
//---------------

  describe('Board with col conflicts', function() {
    verifyConflictTypes(['col', 'rooks', 'queens'], [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);
  });

  describe('Board with major diagonal conflicts', function() {
    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]);

    verifyConflictTypes(['majorDiagonal', 'queens'], [
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0]
    ]);
  });

  describe('Board with minor diagonal conflicts', function() {
    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ]);

    verifyConflictTypes(['minorDiagonal', 'queens'], [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0]
    ]);
  });
});

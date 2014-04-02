var assert = require("assert"),
    nuc = require('../lib/nuc'),
    Protein = require('../lib/prot'),
    substanceP = "RPKPQQ ffGLM.",
    nSeq = "AGCT";

describe('Protein Tools', function() {
  var protein = new Protein(substanceP);

  describe('return sequence', function(){
    it('should return the sequence', function(){
      assert.equal( protein.sequence , 'RPKPQQFFGLM' );
    });
  });

  describe('mol wt', function(){
    it('Calculate Molecular Weight', function(){
      assert.equal( protein.mw() , 1348.6147565);
    });
  });

  // describe('format sequence', function(){
  //   it('remove non-amino acids, capitalize, remove space', function(){
  //     assert.equal( protein.sequence('RPKPqqF X FGLM') , 'RPKPQQFFGLM');
  //   });
  // });

});
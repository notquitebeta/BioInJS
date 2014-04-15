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

  describe('protein composition', function(){
    it('Calculate composition of protein', function(){
      assert.equal( JSON.stringify(protein.composition()) ,  
        '{"A":0,"C":0,"D":0,"E":0,"F":2,"G":1,"H":0,"I":0,"K":1,"L":1,"M":1,"N":0,"P":2,"Q":2,"R":1,"S":0,"T":0,"V":0,"W":0,"Y":0}');
    });
  });

  describe('protein coloring default', function(){
    it('Colors HTML protein sequence', function(){
      assert.equal( protein.HTMLColor('QF', 'red', substanceP) ,  
        'RPKP<span color="red">QQ</span> ffGLM.');
    });
  });

  describe('protein coloring formatted input', function(){
    it('Colors preformated sequence in HTML', function(){
      assert.equal( protein.HTMLColor('QF', 'red') ,  
        'RPKP<span color="red">QQFF</span>GLM');
    });
  });

});

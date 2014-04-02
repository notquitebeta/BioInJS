var mw = require('./aa_mw'),
    aaList = Object.keys(mw.aaMW); // list of valid residues

function Protein(seq) {
  // sequence must be all caps
  this.sequence = fixSequence(seq);

  function fixSequence(seq){
    // remove residues that are non standard
    // capitalize all residues
    var seqArray = seq.toUpperCase().split(''),
        sequence = '';
    seqArray.forEach(function(element, index, array){
      if (aaList.indexOf(element) != -1){
        sequence += element 
      }
    })
    // console.log(aaList);
    return sequence;
  };

};

Protein.prototype.mw = function() {

  var weight = 0,
      residueCount = 0;
      water = 1.0079759 * 2 + 15.9993047,
      sequenceArray = this.sequence.split('');

  // Add molecular weights for all valid residues
  sequenceArray.forEach(function(element, index, array) {
    if (mw.aaMW[element]) {
      weight += mw.aaMW[element];
      residueCount++;
    } 
    // else {
    //   console.log("Invalid residue: "+ element);
    // }
  });

  // Remove weights for peptide bonds ()
  // weight -= water * (residueCount = 1);
  // add resulting weight of free termini 
  // amine hydrogen, carboxylate oxygen and hydrogen
  weight += water;

  return weight;
};

module.exports= Protein;

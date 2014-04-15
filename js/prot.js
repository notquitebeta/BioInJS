
var molWeightAminoAcids = {
G :  57.05132 ,
A :  71.0779   ,
S :  87.0773   ,
P :  97.11518  ,
V :  99.13106  ,
T :  101.10388 ,
C :  103.1429  ,
I :  113.15764 ,
L :  113.15764 ,
N :  114.10264 ,
D :  115.0874  ,
Q :  128.12922 ,
K :  128.17228 ,
E :  129.11398 ,
M :  131.19606 ,
H :  137.13928 ,
F :  147.17386 ,
R :  156.18568 ,
Y :  163.17326 ,
W :  186.2099 
}

var aminoAcidsList = ['G', 'A', 'S', 'P', 'V', 
                          'T', 'C', 'I', 'L', 'N', 
                          'D', 'Q', 'K', 'E', 'M', 
                          'H', 'F', 'R', 'Y', 'W']

var aaList = aminoAcidsList.sort(); // list of valid residues

function Protein(seq) {
  // sequence must be all caps
  this.sequence = fixSequence(seq);

  function fixSequence(seq){
  /* remove residues that are non standard
     capitalize all residues */
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
    if (mw.molWeightAminoAcids[element]) {
      weight += mw.molWeightAminoAcids[element];
      residueCount++;
    } 
  });

  /* Remove weights for peptide bonds ()
     weight -= water * (residueCount = 1);
     add resulting weight of free termini 
     amine hydrogen, carboxylate oxygen and hydrogen */
  weight += water;

  return weight;
};

Protein.prototype.composition = function() {
  var compositionObj = {},
      sequenceArray = this.sequence.split('');

  // initialize object
  for (var i = 0; i < aaList.length; i++){
    compositionObj[aaList[i]] = 0;
  }

  // increment residue counts
  for (var i = 0; i < sequenceArray.length; i++){
    compositionObj[sequenceArray[i]] += 1;
  }

  return compositionObj; 
}

Protein.prototype.HTMLColor = function ( residues, color, formattedSequence ){
  /* takes a string of residues (e.g. 'KRH')
     takes a color value for <span color="color"> </span>
     The third argument can be used for preformmated formatted text
     wraps each residue with span */

  var selectionArray = residues.toUpperCase().split(''),
      sequenceArray, 
      htmlColorSequence = '',
      openSpan = '<span color="'+color+'">',
      closeSpan = '</span>';

  if (formattedSequence) {
    sequenceArray = formattedSequence.split('')
  } else {
    sequenceArray = this.sequence.split('')
  }
  for (var i = 0; i < sequenceArray.length; i++){
    var residue = sequenceArray[i];
    if ( selectionArray.indexOf(residue) != -1 ) {
      // add opening span if this is the first selection
      // or first residue of sequence
      if ( i == 0 || selectionArray.indexOf(sequenceArray[i-1]) == -1 ) {
        htmlColorSequence += openSpan;
      }
      htmlColorSequence += residue;
      // close span if next residue is not in seelction or if the last residue 
      if ( i == sequenceArray.length -1 || selectionArray.indexOf(sequenceArray[i+1]) == -1 ) {
        htmlColorSequence += closeSpan;
      }
    }else{
      htmlColorSequence += residue;
    }
  }
  return htmlColorSequence;
}

Protein.prototype.formatOutput = function (spaceLength, lineLength, sequence) {
  /* spaceLength is the number of characters before a space is inserted
     lineLength is the number of characters before a new line is inserted 
     new line supercedes inserting spaces */

  var sequenceArray = this.sequence.split(''),
      outputSequence = '';

  for (var i = 0; i < sequenceArray.length ; i++) {
    var character = sequenceArray[i];
    outputSequence += character;

    if ( (i+1) % lineLength == 0 ) {
      outputSequence += '\n';
    }else if ( (i+1) % spaceLength == 0 ) {
      outputSequence += ' ';
    }
  }
  return outputSequence;
}

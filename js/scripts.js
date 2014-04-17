$(document).ready(function(){
  var sequenceBox = $('#sequenceBox');
  parseURL(sequenceBox);
  sequenceBox.on('keypress', enableRecalculate);
  sequenceBox.on("change", updateInfo);
});

// Requires lib/prot.js //

function parseURL(sequenceBox){
  /* load sequence passed from url into sequence box
    if sequence is not available but Fasta is, load fasta from uniprot
  */
  var urlSequence = getQueryVariable('sequence');
  var urlFasta = getQueryVariable('fasta');

  if (urlSequence){
    // load from sequence=
    
    // split sequence in 10's for printing
    var p = new Protein(urlSequence);

    sequenceBox.val(p.formatOutput(10, 0));

    updateInfo();
  } else if (urlFasta) {
    // load from fasta=
    var fastaUrl = 'http://www.uniprot.org/uniprot/'+urlFasta+'.fasta';
    $.ajax({
      url: fastaUrl,
      context: document.body
    }).done(function( data ) {
      // split title and sequence
      var fasta = parseFasta( data );

      $('#sequenceTitle').html( fasta.title );
      var p = new Protein(fasta.sequence)
      sequenceBox.val( p.formatOutput(10, 0) );

      updateInfo();
    });
  };

}

function parseFasta (fastaSequence){
  var lines = fastaSequence.split('\n'),
      title = '',
      sequence;

  if (lines[0][0] == '>'){
    // if the first line starts with a '>', it's a title
    title = lines.shift();
  };
  sequence = lines.join('\n');
  return {title:title, sequence:sequence};
}

function updateInfo(){
  var sequence = $('#sequenceBox').val(),
      protein = new Protein(sequence),
      molecularWeightDiv = $('#molecular-weight'),
      composition = $('#composition');

  disableRecalculate();

  molwt = protein.mw().toFixed(2);
  molecularWeightDiv.html('Molecular Weight: '+molwt);

  var compString = '<ul>',
      compositionValues = protein.composition();

  Object.keys(compositionValues).forEach(function(k,i){
    compString += '<li>'+k+": "+compositionValues[k]+'</li>'
  })
  compString += '<ul>';
  composition.html(compString);

  console.log();
}

function enableRecalculate(sequenceBox){
  var recalculateButton = $('#recalculateButton');
  recalculateButton.removeClass('disable');
  recalculateButton.on('click', updateInfo);
}

function disableRecalculate(){
  var recalculateButton = $('#recalculateButton');
  recalculateButton.addClass('disable');
}

function getQueryVariable(variable)
{ //http://stackoverflow.com/questions/10609511/javascript-url-parameter-parsing
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}
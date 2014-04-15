#! /usr/bin/env node
var Protein = require("./lib/prot"),
    pSeq = "NPXY",
    seq = 'RPKPqqF X FGLM',
    p = new Protein(seq),
    nSeq = "AGCT";

// console.log( seq );
console.log( p.sequence );
// console.log( p.mw() );
// console.log( p.composition() );
// console.log( p.HTMLColor('QF', 'red', 'RPKPQQ ffGLM.') );
// console.log( p.HTMLColor('QF', 'red') );
console.log( p.formatOutput(2, 4) );

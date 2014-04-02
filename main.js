#! /usr/bin/env node
var Protein = require("./lib/prot"),
    pSeq = "NPXY",
    seq = 'RPKPqqF X FGLM',
    p = new Protein(seq),
    nSeq = "AGCT";

console.log(seq);
console.log( p.sequence );
console.log( p.mw() );
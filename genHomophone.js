var fs = require('fs');
var fword = fs.readFileSync('fwords.txt').toString();
var pcin = fs.readFileSync('phone.cin.utf8.txt').toString();
// console.log(fword.length);
// console.log(pcin.length);
var pcins = pcin.split('\r\n');
var startCharDef = false;
var charHash = {};
var phneHash = {};

for(var i=0, len = pcins.length; i<len; i++) {
	if(pcins[i].indexOf('%chardef  end')>-1) break;
	if(pcins[i].indexOf('%chardef  begin')>-1) {
		startCharDef = true;
		// console.log(i, 'found chardef begin')	
	}
	if(!startCharDef) continue;
	var t = pcins[i].split('\t');
	// console.log(i, 'check', t[0], t[1])
	//check 常用字
	if(fword.indexOf(t[1]) === -1) continue;
	// console.log(i, 'useful', t[0], t[1])
	if(!charHash[t[0]]) charHash[t[0]] = [];
	charHash[t[0]].push(t[1]);
	phneHash[t[1]] = t[0];
}

var fwords = fword.split('');
var opt = '';
for(var i=0, len = fwords.length; i<len; i++) {
	var c = fwords[i];
	var p = phneHash[c];
	if(!p || charHash[p].length <= 1) continue;
	// console.log(i, 'p', p, charHash[p]);
	opt = opt + '\n' + c + ' => ' + charHash[p].join(', ');
}

console.log(opt);

console.log('\n\n\n');

for(var p in charHash) {
	if(charHash[p].length <= 1) continue;
	console.log(charHash[p].join(', ') + '=>' + charHash[p].join(', '));
}
var csv = require("fast-csv");
var fs = require("fs");
var remoteFile = "export.csv.gz";
var file = "export.csv";
// var file = "sample.csv";
var http = require('https');
var url = require('url');
var interval;
var blockedUrlsLink = 'https://api.blocked.org.uk/data/export.csv.gz';

function progressEvents() {
	interval = setInterval(function() {
		console.log('blockedUrls length', blockedUrls.length);
	}, 2000);
}

var blockedUrls = [];

var key = "SXGWLZPDOKFIVUHJYTQBNMACERxswgzldpkoifuvjhtybqmncare";

function encode(uncoded) {
	uncoded = uncoded.toUpperCase().replace(/^\s+|\s+$/g,"");
	var coded = "";
	var chr;
	for (var i = uncoded.length - 1; i >= 0; i--) {
		chr = uncoded.charCodeAt(i);
		coded += (chr >= 65 && chr <= 90) ?
		key.charAt(chr - 65 + 26*Math.floor(Math.random()*2)) :
		String.fromCharCode(chr);
	}
	return encodeURIComponent(coded);
}

function processData(data) {
	var url = data[0].replace('http://', '');
	if (data[4] === "blocked" && blockedUrls.indexOf(url) === -1) {
		return url;
	}
}

function handleRecord(data) {
	var url = processData(data);
	if (url) {
		blockedUrls.push(url);
	}
}

function writeFile(urls) {
	var data = urls.map(encode).toString();
	var file = fs.createWriteStream('blockedSites.js');
	file.on('error', function(err) { console.log('error', err) });
	file.write( 'var blockedSites = "' + data + '";');
	file.end();
}

function complete() {
	var sortedUrls = blockedUrls.sort();
	console.log('Final blocked URLs length: ', blockedUrls.length);
	// console.log(blockedUrls);
	clearInterval(interval);
	writeFile(blockedUrls);
	fs.unlinkSync(file);
	console.timeEnd('Read CSV');
}

// function downloadUrls() {
// 	var file = fs.createWriteStream(remoteFile);
// 	var request = http.get(blockedUrlsLink, function(response) {
// 	  response.pipe(file);
// 	});
// }

// downloadUrls();
console.time('Read CSV');
csv.fromPath(file).on("record", handleRecord).on("end", complete);
progressEvents();
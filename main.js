(function(global) {

	var key = "SXGWLZPDOKFIVUHJYTQBNMACERxswgzldpkoifuvjhtybqmncare";

	function decode(coded) {
		coded = decodeURIComponent(coded);
		var uncoded = "";
		var chr;
		for (var i = coded.length - 1; i >= 0; i--) {
			chr = coded.charAt(i);
			uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ?
			String.fromCharCode(65 + key.indexOf(chr) % 26) :
			chr;
		}
		return uncoded;
	}

	function getListOfSites(data) {
		return data.split(',').map(decode).map(function(item) {
			return item.toLowerCase();
		});
	}

	function addToDom(data) {
		var list = $('<ul>').addClass('blocked-sites');
		data.forEach(function(item) {
			var li = $('<li>');
			li.text(item);
			list.append(li);
		});
		$('.container').append(list);
	}

	$(function() {
		var blocked = getListOfSites(global.blockedSites);
		addToDom(blocked);
	});
}(window));
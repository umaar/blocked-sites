(function() {

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

	function showMessage(data) {
		var message = $('.blocked-urls-message');
		message.find('.blocked-url-count').text(data.length);
		message.fadeIn();
	}

	function addToDom(data) {
		var list = $('<ul>').addClass('blocked-sites');
		data.forEach(function(item) {
			var li = $('<li>');
			li.text(item);
			list.append(li);
		});
		$('.container').append(list);

		setTimeout(function() {
			showMessage(data);
		}, 1000);
	}

	$(function() {

		$.ajax({
			url: "blockedSites.txt"
		}).done(function(e) {
			var blocked = getListOfSites(e);
			addToDom(blocked);
			$('.spinner').fadeOut();
		});

	});
}());
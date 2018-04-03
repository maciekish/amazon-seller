var items = $('div.s-item-container');

for (var i = 0, l = items.length; i < l; i++) {
	processItem(i);
}

function processItem(i) {
	var item = items[i];
	var a = $('a.s-access-detail-page', item);
	var href = a.attr('href');

	$.get(href, function(detail_page) {
		var number = i;
		var lastItem = '';

		// Merchant info
		if ($('#merchant-info', detail_page)[0] != undefined) {
			var merchant_info = $('#merchant-info', detail_page)[0].innerHTML;

			// If no merchant info available
			if (merchant_info.trim().length < 64) {
				merchant_info = $('#availability_feature_div', detail_page)[0];
				merchant_info = merchant_info.innerHTML + '<br/>';
			}

			lastItem = $('<div class="a-row">' + merchant_info + '</div>').insertAfter(a.parent().parent());
		}

		// Delivery information, Amazon.de
		if ($('#ddmDeliveryMessage', detail_page)[0] != undefined) {
			var delivery_info = $('#ddmDeliveryMessage', detail_page)[0].innerHTML;

			lastItem = $('<div class="a-row">' + delivery_info + '</div>').insertAfter(lastItem);

			// If not deliverable
			if (delivery_info.includes('does not ship to')) {
				a.css('opacity', '0.2');
			}
		}

		// Delivery information, Amazon.com
		if ($('#fast-track-message', detail_page)[0] != undefined) {
			var delivery_info = $('#fast-track-message', detail_page)[0].innerHTML;

			// If not deliverable
			if (delivery_info.includes('does not ship to')) {
				a.css('opacity', '0.2');
				lastItem = $('<div class="a-row" style="color: red">' + delivery_info + '</div>').insertAfter(lastItem);
			} else {
				lastItem = $('<div class="a-row">' + delivery_info + '</div>').insertAfter(lastItem);
			}
		}

		// Spacing
		$('<div class="a-row"><br/></div>').insertAfter(lastItem);
	});
}
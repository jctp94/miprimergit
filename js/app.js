var parseAppID = 'your-parse-app-id'
var parseRestKey = 'your-rest-api-key'

// Azat's app, change these values to your own keys
parseAppID = 'admin'
parseRestKey = 'admin'

$(document).ready(function(){
	getMessages()
	$('#send').click(function(){
		var $sendButton = $(this)
		$sendButton.html('<img src="img/spinner.gif" width="20"/>')
		var username = $('input[name=username]').val()
		var message = $('input[name=message]').val()
		$.ajax({
			url: 'http://localhost:1337/parse/classes/MessageBoard',
			headers: {
				'X-Parse-Application-Id': parseAppID,
				'X-Parse-REST-API-Key': parseRestKey
			},
			contentType: 'application/json',
			dataType: 'json',
			processData: false,
			data: JSON.stringify({
				'username': username,
				'message': message
			}),
			type: 'POST',
			success: function() {
				console.log('sent')
				getMessages()
				$sendButton.html('SEND')
			},
			error: function() {
				console.log('error')
				$sendButton.html('SEND')
			}
		})

	})
})
function getMessages() {
	$.ajax({
		url: 'http://localhost:1337/parse/classes/MessageBoard?limit=1000',
		headers: {
			'X-Parse-Application-Id': parseAppID,
			'X-Parse-REST-API-Key': parseRestKey
		},
		contentType: 'application/json',
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			console.log('get')
			updateView(data)
		},
		error: function() {
			console.log('error')
		}
	})
}

function updateView(messages) {
	// messages.results = messages.results.reverse()
	var table = $('.table tbody')
	table.html('')
	$.each(messages.results, function (index, value) {
		var trEl = ('<tr><td>'
		  + value.username
			+ '</td><td>'
			+ value.message
			+ '</td></tr>')
		table.append(trEl)
	})

	console.log(messages)
}

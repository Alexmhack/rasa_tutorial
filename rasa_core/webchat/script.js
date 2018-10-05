var botui = new BotUI('my-botui-app');

$(() => {

	// send ajax request to rasa core server with message received from user
	function sendMessage(message) {
		console.log("SEND FUNCTION IS RUNNING...");
		console.log("USER MESSAGE: " + message);

		var chatMessage = {
			"sender": "Djangio",
			"message": message
		}

		var botMessage;

		$.ajax({
			url: "http://localhost:5005/webhooks/rest/webhook",
			method: "post",
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			data: JSON.stringify(chatMessage),
			traditional: true,
			crossDomain: true,
			success: (res) => {
				console.log(res[0]['text']);
				console.log(res[0]['recipient_id']);

				botMessage = "This is the sample message";
			},
			error: (err) => {
				console.error("AJAX REQUEST ERROR: " + err);
				console.error(err.status);
				console.error(err.statusText);
			}
		})

		console.log(botMessage);
		return botMessage;
	}

	botui.message.add({ // show a message
	  human: true,
	  content: 'Hey there! I am Django Bot'
	}).then(function () { // wait till its shown
	  return botui.action.text({ // show 'text' action
	    action: {
	      placeholder: 'Enter your message here...'
	    }
	  });
	}).then(function (res) { // get the result
	  botui.message.add({
	    content: sendMessage(res.value)	// sendMessage(message);
	  });
	});

})

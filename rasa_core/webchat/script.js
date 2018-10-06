var botui = new BotUI('my-botui-app');

$(() => {

	$.support.cors = true;

	// send ajax request to rasa core server with message received from user
	function sendMessage(message) {
		console.log(message);

		console.log("SEND FUNCTION IS RUNNING...");
		console.log("USER MESSAGE: " + message);

		var chatMessage = {
			"sender": "Djagi]p",
			"message": message
		}

		var botMessage = " this is bot message variable";

		$.ajax({
			headers: {
              	"Access-Control-Allow-Origin":"*"
          	},
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
			},
			error: (err) => {
				console.error(err);
				console.error(err.status);
				console.error(err.statusText);
			}
		// ajax ends here
		})

	// function ends here
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
	  	content: res.value + sendMessage(res.value)
	 //  	loading: true
	 //  }).then(function (index) {
	 //    var response = sendMessage(res.value)
	 //    console.log(response);

		// botui.message.update(index, {
		// 	loading: false,
		// 	content: response
		// });
	  })
	});

})

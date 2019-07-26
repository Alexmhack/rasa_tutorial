var botui = new BotUI('my-botui-app');

$(() => {

	// for enabling CORS headers
	$.support.cors = true;

	var sender = "spotlight";

	function generateResponse(message) {
		console.log('generateResponse is working...')
		var chatMessage = {
			"sender": sender,
			"message": message
		}

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
				console.log(res);
				if (res.value == "Alright then") {
					console.log('STOP HERE');
				}
				for (var i=0; i<res.length; i++) {
					// console.log(res[i]['text'])
					botui.message.add({
						bot: true,
						content: res[i]['text'],
						delay: 500
					})
				}
			},
			error: (err) => {
				console.error(err);
				console.error(err.status);
				console.error(err.statusText);
			}
		// ajax ends here
		})

	}

	botui.message.add({ // show a message
	  bot: true,
	  content: 'Hey there! I am Django Bot'
	}).then(function () { // wait till its shown
	  return botui.action.text({ // show 'text' action
	    action: {
	      placeholder: 'Enter your message here...'
	    }
	  });
	}).then(function (res) { // get the result
		
		generateResponse(res.value)

	// then function ends here
	}).then(function () { // wait till its shown
	  return botui.action.text({ // show 'text' action
	    action: {
	      placeholder: 'Enter your message here...'
	    }
	  });
	}).then(function (res) { // get the result
		
		generateResponse(res.value)

	// then function ends here
	}).then(function () { // wait till its shown
	  return botui.action.text({ // show 'text' action
	    action: {
	      placeholder: 'Enter your message here...'
	    }
	  });
	}).then(function (res) { // get the result
		
		generateResponse(res.value)

	// then function ends here
	}).then(function () { // wait till its shown
	  return botui.action.text({ // show 'text' action
	    action: {
	      placeholder: 'Enter your message here...'
	    }
	  });
	}).then(function (res) { // get the result
		
		generateResponse(res.value)

	// then function ends here
	}).then(function () { // wait till its shown
	  return botui.action.text({ // show 'text' action
	    action: {
	      placeholder: 'Enter your message here...'
	    }
	  });
	}).then(function (res) { // get the result
		
		generateResponse(res.value)

	// then function ends here
	}).then(function () { // wait till its shown
	  return botui.action.text({ // show 'text' action
	    action: {
	      placeholder: 'Enter your message here...'
	    }
	  });
	}).then(function (res) { // get the result
		
		generateResponse(res.value)

	// then function ends here
	}).then(function () { // wait till its shown
	  return botui.action.text({ // show 'text' action
	    action: {
	      placeholder: 'Enter your message here...'
	    }
	  });
	}).then(function (res) { // get the result
		
		generateResponse(res.value)

	// then function ends here
	}).then(function () { // wait till its shown
	  return botui.action.text({ // show 'text' action
	    action: {
	      placeholder: 'Enter your message here...'
	    }
	  });
	}).then(function (res) { // get the result
		
		generateResponse(res.value)

	// then function ends here
	}).then(function () { // wait till its shown
	  return botui.action.text({ // show 'text' action
	    action: {
	      placeholder: 'Enter your message here...'
	    }
	  });
	}).then(function (res) { // get the result
		
		generateResponse(res.value)

	// then function ends here
	})

// document ready function ends here
})

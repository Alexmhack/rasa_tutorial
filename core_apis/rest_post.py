import requests

url = 'http://localhost:5005/webhooks/rest/webhook'

while True:
	message = input(">> ")
	if message == 'stop':
		break
	data = {
		"sender": "Rasa",
		"message": f"{message}"
	}
	r = requests.post(url, json=data)
	print(r.status_code)
	print(r.json())

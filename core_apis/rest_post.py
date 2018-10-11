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
	try:
		r = requests.post(url, json=data)
		print(r.status_code)
		print(r.json())
	except Exception as e:
		print(e)

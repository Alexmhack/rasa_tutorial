import requests
from random import uniform

url = 'http://localhost:5005/webhooks/rest/webhook'

sender = uniform(0, 20)

while True:
	message = input(">> ")
	if message == 'stop':
		break
	data = {
		"sender": sender,
		"message": f"{message}"
	}
	try:
		r = requests.post(url, json=data)
		print(r.status_code)
		print(r.json())
	except Exception as e:
		print(e)

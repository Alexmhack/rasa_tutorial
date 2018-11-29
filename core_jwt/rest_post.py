import requests
import jwt

# url = 'http://localhost:5005/webhooks/rest/webhook'
url = 'http://localhost:5005/conversations/rasa/respond'

payload = {
	'username': 'rasa',
	'role': 'user',
}

token = jwt.encode(payload, 'thisismysecret', algorithm='HS256')
token = token.decode("utf-8")
print(token)

while True:
	message = input(">> ")
	if message == 'stop':
		break
	data = {
		"sender_id": "rasa",
		"query": f"{message}"
	}
	try:
		r = requests.post(url, json=data, headers={'Authorization': 'Bearer ' + f'{token}'})
		print(r.status_code)
		print(r.json())
	except Exception as e:
		print(e)

import requests

url = 'http://localhost:5005/webhooks/rest/webhook'

data = {
	"sender": "Rasa",
	"message": "hello"
}

r = requests.post(url, json=data)
print(r.status_code)
print(r.json())

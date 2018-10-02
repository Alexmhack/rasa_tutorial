import time

from rasa_core.agent import Agent

messages = ['Hi! I am Django Services Bot. You can enter "stop" anytime to end the conversation']

agent = Agent.load('models/dialogue', interpreter='models/current/nlu')

def chatlogs_html(message):
	messages_html = f"<p>{message}</p>"
	# chatbot_html = "<div id='chatbotMessage'>{}</div>".format(messages_html)
	return messages_html


while True:
	print([m for m in messages])
	a = input(">> ")
	messages.append(a)
	if a == 'stop':
		break
	responses = agent.handle_message(a)
	print(f"RESPONSE: {responses}")
	for r in responses:
		print(r)
		messages.append(r.get('text'))
	time.sleep(0.3)
	print(chatlogs_html(a))

from rasa_core.agent import Agent

messages = ['Hi! I am Django Services Bot. You can enter "stop" anytime to end the conversation']

agent = Agent.load('models/dialogue')

def chatlogs_html(messages):
	messages_html = "".join(["<p>{}</p>".format(m) for m in messages])
	chatbot_html = "<div id='chatbotMessage'>{}</div>".format(messages_html)
	return chatbot_html


while True:
	print(chatlogs_html(messages))
	time.sleep(0.3)
	a = input()
	messages.append(a)
	if a == 'stop':
		break
	responses = agent.handle_message(a)
	for r in responses:
		messages.append(r.get('text'))

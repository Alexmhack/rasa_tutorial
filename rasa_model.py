import json

from rasa_nlu.model import Interpreter

interpreter = Interpreter.load('./models/current/nlu')
message = "Let's see some chinese restaurants"

message = message.lower()
result = interpreter.parse(message)

print(json.dumps(result, indent=4))

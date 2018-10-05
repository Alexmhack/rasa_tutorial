from rasa_core_sdk import Action
from rasa_core_sdk.events import SlotSet

class ActionSendEmail(Action):
	def name(self):
		return "action_send_email"

	def run(self, dispatcher, tracker, domain):
		email_id = tracker.get_slot('email_id')
		return f"Confirmation email is sent to {email_id}"

import smtplib

from rasa_core_sdk import Action
from rasa_core_sdk.events import SlotSet

from smtplib import SMTP
from decouple import config

host = "smtp.gmail.com"
port = 587
username = config("EMAIL_ID")
password = config("EMAIL_ID_PASSWORD")

_from = username

email_conn = SMTP(host, port)
email_conn.ehlo()
email_conn.starttls()

def send_mail(email=None):
    if email is not None:
        try:
            email_conn.login(username, password)
        except Exception as e:
            print("ERROR: " + e)

        try:
            email_conn.sendmail(_from, email, "Django Rasa ChatBot sends his regards...")
            email_conn.quit()
        except Exception as e:
            print("ERROR: " + e)
    else:
        print('NONE PROVIDED INSTEAD OF EMAIL')


class ActionStoreEmail(Action):
    """Stores the email in a slot"""

    def name(self):
        return "action_store_email"

    def run(self, dispatcher, tracker, domain):
        email = next(tracker.get_latest_entity_values('email'), None)

        if email:
            send_email(email)

        # if no email entity was recognised, prompt the user to enter a valid
        # email and go back a turn in the conversation to ensure future
        # predictions aren't affected
        if not email:
            dispatcher.utter_message("We need your email, please enter a valid one.")
            return [UserUtteranceReverted()]

        return [SlotSet('email', email)]

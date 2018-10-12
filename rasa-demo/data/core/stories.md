## bye
* bye
	- utter_bye

## how you doing + sing up
* greet
	- utter_greet
	- utter_ask_goal
* ask_howdoing
	- utter_ask_howdoing
* signup_account
    - utter_great
    - utter_ask_username
* enter_data{"username": "rishabh"}
    - utter_ask_email
    - utter_awesome_username
* enter_data{"email": "maxmeier@firma.de"}
    - utter_confirm_email
    - slot{"email": "maxmeier@firma.de"}

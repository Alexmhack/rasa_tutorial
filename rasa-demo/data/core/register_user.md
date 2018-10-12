## register new user
* greet
	- utter_greet
	- utter_ask_goal
* signup_account
    - utter_great
    - utter_ask_username
* enter_data{"username": "rishabh"}
    - utter_ask_email
    - utter_awesome_username
* enter_data{"email": "maxmeier@firma.de"}
    - utter_confirm_email
    - slot{"email": "maxmeier@firma.de"}

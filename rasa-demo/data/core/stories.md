## greet
* greet
	- utter_greet

## bye
* bye
	- utter_bye

## how you doing
* ask_howdoing
	- utter_ask_howdoing

## newsletter
* greet
	- utter_greet
	- utter_ask_goal
* signup_newsletter
    - utter_great
    - utter_ask_email
* enter_data{"email": "maxmeier@firma.de"}
    - utter_confirm_email
    - slot{"email": "maxmeier@firma.de"}

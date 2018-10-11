## bye
* bye
	- utter_bye

## how you doing + newsletter
* greet
	- utter_greet
	- utter_ask_goal
* ask_howdoing
	- utter_ask_howdoing
* signup_newsletter
    - utter_great
    - utter_ask_email
* enter_data{"email": "maxmeier@firma.de"}
    - utter_confirm_email
    - slot{"email": "maxmeier@firma.de"}

## newsletter
* greet
	- utter_greet
	- utter_ask_goal
* signup_newsletter
    - utter_great
    - utter_ask_email
* enter_data{"email": "maxmeier@firma.de"}
    - slot{"email": "maxmeier@firma.de"}
    - utter_confirm_email

## Generated Story 6300792002127654078
* greet
    - utter_greet
    - utter_ask_goal
* signup_newsletter
    - utter_great
    - utter_ask_email
* enter_data{"email": "alex@gmail.com"}
    - slot{"email": "alex@gmail.com"}
    - utter_confirm_email

## Generated Story 4243586333205857142
* greet
    - utter_greet
    - utter_ask_goal
* signup_newsletter
    - utter_great
    - utter_ask_email
* enter_data{"email": "dunkirk@dun.kir"}
	- action_store_email
    - slot{"email": "dunkirk@dun.kir"}
    - utter_confirm_email

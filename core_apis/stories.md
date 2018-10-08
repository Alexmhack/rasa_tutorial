## negative greet
* greet
	- utter_greet
	- utter_ask_name
* negative
	- utter_no_worries

## bye path
* bye
	- utter_bye

## Generated Story -1419940888143078244
* greet
    - utter_greet
    - utter_ask_name
* provideName{"name": "Virat"}
    - slot{"name": "Virat"}
    - utter_greet_with_name
    - utter_formality
    - utter_ask_email_id
* provide_email{"email": "virat@india.com"}
    - slot{"email": "virat@india.com"}
    - utter_send_email
    - action_restart


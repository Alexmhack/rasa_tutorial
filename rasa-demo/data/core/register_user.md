## register new user
* greet
    - utter_greet
    - utter_ask_goal
* signup_account
    - utter_great
    - utter_ask_username
* enter_data{"username": "alexmhack"}
    - utter_awesome_username
    - utter_ask_email
* enter_data{"email": "discovery@hdworld.com"}
    - slot{"email": "discovery@hdworld.com"}
    - utter_confirm_email

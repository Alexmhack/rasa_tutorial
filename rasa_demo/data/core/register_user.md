## Generated Story -8469077829767321247
* greet
    - utter_greet
    - utter_ask_goal
* signup_account
    - utter_great
    - utter_ask_username
* enter_data{"username": "alexhopper"}
    - slot{"username": "alexhopper"}
    - utter_awesome_username
    - utter_ask_email
* enter_data{"email": "alex@hopper.com"}
    - slot{"email": "alex@hopper.com"}
    - utter_confirm_email
    - utter_confirm_details
    - action_store_email
    - utter_anything_else
* deny
    - utter_alright_then

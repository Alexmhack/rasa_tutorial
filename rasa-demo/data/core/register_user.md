## Generated Story 5937402908917683327
* greet
    - utter_greet
    - utter_ask_goal
* signup_account
    - utter_great
    - utter_ask_username
* enter_data{"username": "pranav"}
    - slot{"username": "pranav"}
    - utter_awesome_username
    - utter_ask_email
* enter_data{"email": "pranav@rasa.com"}
    - slot{"email": "pranav@rasa.com"}
    - utter_confirm_email
    - utter_confirm_details
    - action_store_email
    - utter_anything_else
* deny
    - utter_alright_then

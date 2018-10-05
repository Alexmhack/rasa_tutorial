# Rasa NLU Basic Bot 
Creating first Rasa NLU bot to help people search for restaurants

**intents** can be classified into

1. greet
2. restaurant_search
3. thankyou

Ways in which user can **greet**:

1. Hey there!
2. Hi!
3. Hello

And even more ways to say that you want to look for restaurants:

1. Do you know any good pizza places?
2. I’m in the North of town and I want chinese food
3. I’m hungry

Rasa needs to identify the correct intent first from the given sentences.

The second job is to label words like “chinese” and “North” as cuisine and location 
entities, respectively.

## Prepare NLU Training Data
Create a file ```nlu.md``` and paste the below text in it

```
## intent:greet
- hey
- hello
- hi
- good morning
- good evening
- hey there

## intent:restaurant_search
- i'm looking for a place to eat
- I want to grab lunch
- I am searching for a dinner spot
- i'm looking for a place in the [north](location) of town
- show me [chinese](cuisine) restaurants
- show me a [mexican](cuisine) place in the [centre](location)
- i am looking for an [indian](cuisine) spot
- search for restaurants
- anywhere in the [west](location)
- anywhere near [18328](location)
- I am looking for [asian fusion](cuisine) food
- I am looking a restaurant in [29432](location)

## intent:thankyou
- thanks!
- thank you
- thx
- thanks very much
```

## Define Machine Learning Model
Rasa NLU has pre-defined pipelines but we will be using```tensorflow_embedding``` pipeline. 

Create another file ```nlu_config.yml``` and inside it

```
language: en
pipeline: tensorflow_embedding
```

There are many more pipelines, you can choose that fits your needs from [here](https://rasa.com/docs/nlu/choosing_pipeline/#choosing-pipeline)

## Train Model
Training model is done by command ```rasa_nlu.train``` by just telling where to find your configuration and training data.

```
python -m rasa_nlu.train -c nlu_config.yml --data nlu.md -o models --fixed_model_name nlu --project current --verbose
```

We are also passing the ```--project current``` and ```--fixed_model_name nlu``` 
parameters, this means the model will be saved at ```./models/current/nlu``` relative 
to your working directory. Which means your project name is **current** and your model
name will be **nlu**

## Trying The Model
There are two ways with which you can test your model, first directly from **Python** 
or running a local http server.

To use your new model in python, create an **interpreter** object and pass a message to its **parse()** method: 

Run the above commands first before running the below code

Create a file rasa_model.py
```
import json

from rasa_nlu.model import Interpreter

interpreter = Interpreter.load('./models/current/nlu')
message = "Let's see some chinese restaurants"
result = interpreter.parse(message)

print(json.dumps(result, indent=4))
```

The results will be json formatted data 

```
{
    "intent": {
        "name": "restaurant_search",
        "confidence": 0.8486170768737793
    },
    "entities": [
        {
            "start": 15,
            "end": 22,
            "value": "chinese",
            "entity": "cuisine",
            "confidence": 0.5989079106570395,
            "extractor": "ner_crf"
        }
    ],
    "intent_ranking": [
        {
            "name": "restaurant_search",
            "confidence": 0.8486170768737793
        },
        {
            "name": "greet",
            "confidence": 0.41720008850097656
        },
        {
            "name": "thankyou",
            "confidence": 0.0
        }
    ],
    "text": "let's see some chinese restaurants"
}
```

## Server Testing
Once the models is trained you can run the **rasa_nlu** server using

For server testing run another command that will create another training model\\

```
python -m rasa_nlu.train -c nlu_config.yml --data nlu.md
```

```
python -m rasa_nlu.server -c nlu_config.yml --path models/nlu
```

Send message to **rasa_nlu** using 

```
# copy model_<random number> from your directory => models/nlu/default/model_<>
curl -XPOST localhost:5000/parse -d "{\"q\":\"I am looking for chinese food\", \"project\":\"default\", \"model\":\"model_20181002-111701\"}"

# result
{
  "intent": {
    "name": "restaurant_search",
    "confidence": 0.9771914482116699
  },
  "entities": [],
  "intent_ranking": [
    {
      "name": "restaurant_search",
      "confidence": 0.9771914482116699
    },
    {
      "name": "greet",
      "confidence": 0.002338866237550974
    },
    {
      "name": "thankyou",
      "confidence": 0.0
    }
  ],
  "text": "I am looking for Chinese food",
  "project": "default",
  "model": "model_20181002-111701"
}
```

These backslashes are to escape the double quotes because cmd only accepts double 
quotes not single quotes.

In terminal you can simply run

```
$ curl -XPOST localhost:5000/parse -d '{"q":"I am looking for chinese food", "project":"default", "model":"model_20181002-111701"}'
```

Try out some more command with other messages

```
curl -XPOST localhost:5000/parse -d "{\"q\":\"how me chinese restaurants\", \"project\":\"default\", \"model\":\"model_20181002-111701\"}"

# result
{
  "intent": {
    "name": "restaurant_search",
    "confidence": 0.9607101082801819
  },
  "entities": [
    {
      "start": 7,
      "end": 14,
      "value": "chinese",
      "entity": "cuisine",
      "confidence": 0.7814517850850685,
      "extractor": "ner_crf"
    }
  ],
  "intent_ranking": [
    {
      "name": "restaurant_search",
      "confidence": 0.9607101082801819
    },
    {
      "name": "greet",
      "confidence": 0.04189501330256462
    },
    {
      "name": "thankyou",
      "confidence": 0.012600380927324295
    }
  ],
  "text": "how me chinese restaurants",
  "project": "default",
  "model": "model_20181002-111701"
}
```

# [Rasa Core](https://rasa.com/docs/core/quickstart/)
```
pip install rasa_core
```

## Write Stories
In this very simple conversation, the user says hello to our bot, and the bot says hello back. This is how it looks as a story:

```
## story 1
* greet
  - utter_grret
```

A story starts with ```##``` followed by a name which is optional. Line that starts 
with ```*``` are the messages sent by user. Although we don't write the messages 
themselves but rather the intents and entities what the user means. Lines that start
with ```-``` are actions by your bot.

In the above case we simply call the action of ```utter_bot``` which are simply 
messages sent back to the user, but in general actions can do anything including 
calling an **API** and interacting with the outside world.

Create a file named ```stories.md```

```
## happy path
* greet
  - utter_greet
* mood_great
  - utter_happy

## sad path 1
* greet
  - utter_greet
* mood_unhappy
  - utter_cheer_up
  - utter_did_that_help
* mood_affirm
  - utter_happy

## sad path 2
* greet
  - utter_greet
* mood_unhappy
  - utter_cheer_up
  - utter_did_that_help
* mood_deny
  - utter_goodbye

## say goodbye
* goodbye
  - utter_goodbye
```

The above stories are pretty straight forward. ```## happpy path``` which means that
take this path whenver **rasa_core** detects happy path. It will be invoked on a 
```* greet``` message from user and if that happens then bot will reply with ```- utter_greet```

These all responses and messages will defined later on.

The same way all other stories work.

## Define Domain
The next thing we will do is define a **domain**. The domain defines the **universe** 
your bot lives in.

Here is an example domain for our bot, write this into ```domain.yml```

```
intents:
  - greet
  - goodbye
  - mood_great
  - mood_affirm
  - mood_deny
  - mood_unhappy

actions:
  - utter_greet
  - utter_cheer_up
  - utter_did_that_help
  - utter_happy
  - utter_goodbye

templates:
  utter_greet:
    - text: "Hey! How are you ?"

  utter_cheer_up:
    - text: "Here is something to cheer you up:"
    - image: "https://i.imgur.com/nGF1K8f.jpg"

  utter_did_that_help:
    - text: "Did that help you ?"

  utter_happy:
    - text: "Great carry on!"

  utter_goodbye:
    - text: "Bye"
```

Below are the meaning of different parts of ```domain.yml``` file

1. ```intents``` : things we expect users to say
2. ```actions``` : things your bot can do and say
3. ```templates``` : template strings your bot can say
4. ```entities``` : pieces of info you want to extract from messages
5. ```slots``` : information to keep track of during a conversation

**Rasa Core's** job is to choose the right action to execute at each step of the 
conversation. Simple actions are just sending a message to the user. These simple
actions are the **actions** in the domain, that start with **utter_**.

They will just respond with a message based on a template from the templates section. 
See [Actions](https://rasa.com/docs/core/customactions/#customactions) for how to build more interesting actions.

We haven't added **entities** and **slots** in the domain because we don't need them 
in this simple example.

## Train Dialogue Model
Next step is to train a neural network on our example stories. To do this run the 
command below

```
python -m rasa_core.train -d domain.yml -s stories.md -o models/dialogue
```

## Talking To Bot
Now we can use our train model to send structed messages directly, we haven't added a 
model yet.

You can play around with the bot, directly sending in the intents in the domain. To 
do this, start your message with a /. Give it a try by sending the message /greet.

Run the below code 

```
python -m rasa_core.run -d models/dialogue

# output

2018-10-02 18:14:46 INFO     root  - Rasa Core server is up and running on http://localhost:5005
Bot loaded. Type a message and press enter (use '/stop' to exit):
/greet
Hey! How are you ?
127.0.0.1 - - [2018-10-02 18:15:07] "POST /webhooks/rest/webhook?stream=true&token= HTTP/1.1" 200 186 0.300320
```

Only ```/greet``` would work right now. In the next section we will add **NLU**

## Add NLU
It's obvious that we want our bot to understand real language and not just structered 
input.

An interpreter is responsible for parsing messages. It performs the **Natural 
Language Understanding(NLU)** and transforms the message into structed output. We 
will use **Rasa NLU** for this purpose.

We are going to use Markdown Format for NLU training data. Let’s create some intent 
examples in a file called nlu.md:

```
## intent:greet
- hey
- hello
- hey there
- hi
- good morning
- good evening
- good afternoon

## intent:goodbye
- bye
- seeya
- see ya
- goodbye
- see you later
- see you around

## intent:mood_affirm
- yes
- indeed
- of course
- obviously
- that sounds good
- correct
- alright
- alright then
- sure
- that's nice
- awesome
- yeah
- yippy

## intent:mood_deny
- no
- never
- nahhh
- I don't think so
- don't like that
- no way
- not really
- not sure
- nope
- definitely not
- wrong

## intent:mood_great
- perfect
- good
- very good
- great
- amazing
- wonderful
- I'am feeling very good
- I'am great
- I'm good
- definitely
- that's perfect
- I'am feeling better

## intent:mood_unhappy
- sad
- very sad
- unhappy
- bad
- very bad
- awful
- terrible
- not very good
- extremely sad
- so sad
- not feeling nice
- feeling bad
- awfully bad
```

These are some very common messages that our bot can receive. You can improve this 
by adding lot's more responses natural language messages.

After this we need a **configuration** file ```nlu_config.yml``` for the **NLU** model

```
language: en
pipeline: tensorflow_embedding
```

If you haven't installed **Rasa NLU** module install it first ```pip install rasa_nlu``` and then train the **NLU** model by running

```
python -m rasa_nlu.train -c nlu_config.yml --data nlu.md -o models --fixed_model_name nlu --project current --verbose
```

A new directory models/current/nlu should have been created containing the NLU model. 
Note that current stands for project name, since this is specified in the train 
command.

## Talking To Bot
Now that we’ve added an NLU model, you can talk to your bot using natural language, 
rather than typing in structured input. Let’s start up your full bot, including both 
Rasa Core and Rasa NLU models!

Run this command 

```
python -m rasa_core.run -d models/dialogue -u models/current/nlu
```

## Rasa Rest Channel
To use the **Rasa Core** ```rest``` features you need to create a file named **credentials.yml**

```
rest:
  # you don't need to provide anything here - this channel doesn't
  # require any credentials
```

Now we need to run the ```rasa_core``` server providing the ```credentials```

```
python -m rasa_core.run -d models/dialogue -u models/current/nlu --credentials credentials.yml
```

This will provide us with a endpoint that can receive ```POST``` requests.

```
POST /webhooks/rest/webhook
```

For sending those requests you can send a post request using python

**rest_post.py**
```
import requests

url = 'http://localhost:5005/webhooks/rest/webhook'

data = {
  "sender": "Rasa",
  "message": "no it didn't"
}

r = requests.post(url, json=data)
print(r.status_code)
print(r.json())
```

This way we can make use of the rest input channels that rasa core provides.
Checkout [docs](https://rasa.com/docs/core/connectors/#restinput) for more info.

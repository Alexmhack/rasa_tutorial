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
to your working directory.

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

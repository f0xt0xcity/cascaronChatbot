// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const { WebhookClient, Card, Suggestion } = require('dialogflow-fulfillment');


mongoose.connect('mongodb+srv://manueloct77:3uropa26_78@dialogflowcluster.15dxq.mongodb.net/chatbotDB?retryWrites=true&w=majority', 
  (err, res) => {
    if( err ) return console.log(`Hubo un error en la db ${ err }`);
  
    console.log('DASE DE DATOS ONLINE');
  } 
);

app.post('/webhook', express.json() ,function ( req, res ) {
    const agent = new WebhookClient({ request: req, response: res });
    console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
    
    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }
    
    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }
  
    function prueba(agent) {
        let origen = req.body.originalDetectIntentRequest.source;
        agent.add( new Card({
            title : 'Titulo de prueba',
            imageUrl : 'https://dialogflow.com/google.png',
            text : 'texto de prueba',
            buttonText :'boton',
            buttonUrl : 'https://google.com'
            }) 
        );
        agent.add( new Suggestion('respuesta rapida'));
    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('prueba', prueba);

    agent.handleRequest(intentMap);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

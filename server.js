const express = require("express");
const app = express();
const mongoose = require('mongoose');
const { WebhookClient, Card, Suggestion } = require('dialogflow-fulfillment');
const fetch = require('node-fetch');


const ChatbotUser = require('./Models/ChatbotUsers');


mongoose.connect('mongodb+srv://manueloct77:3uropa26_78@dialogflowcluster.15dxq.mongodb.net/chatbotDB?retryWrites=true&w=majority', 
  (err, res) => {
    if( err ) return console.log(`Hubo un error en la db ${ err }`);
  
    console.log('DASE DE DATOS ONLINE');
  } 
);

app.use("/api", require("./routes/api"));

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
  
    async function prueba(agent) {
        let nombre = req.body.queryResult.parameters.firstName;
        let correo = req.body.queryResult.parameters.email;
      
        let chatbotUser = new ChatbotUser({
          firstName : nombre,
          email : correo,
        });
        try {
          let reg = await chatbotUser.save();
          console.log( reg );
        } catch ( err ) {
          console.log( err );
        }
        agent.add(`Tu nombre es ${ nombre } y tu email es ${ correo }`)
    }
  
   async function api(agent){
     let respuesta;
     await fetch("https://www.breakingbadapi.com/api/quote/random")
      .then(promesaFetch => promesaFetch.json())
      .then(contenido => { respuesta = contenido });
     
    agent.add( respuesta[0].quote );
  }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('prueba', prueba);
    intentMap.set('api', api);

    agent.handleRequest(intentMap);
});



// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

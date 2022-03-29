const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dfff = require('dialogflow-fulfillment');
const { WebhookClient, Card, Suggestion, Payload } = require('dialogflow-fulfillment');
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
        let asunto = req.body.queryResult.parameters.asunt;
      
        let chatbotUser = new ChatbotUser({
          firstName : nombre,
          email : correo,
          asunt : asunto
        });
        try {
          let reg = await chatbotUser.save();
        } catch ( err ) {
          console.log( err );
        }
      
        agent.add(`Gracias ${ nombre }, se ha registrado tu reporte.`)
    }
  
   async function api(agent){
     let respuesta;
     let pokemon = req.body.queryResult.parameters.pokemon;
     try {
       agent.add('Aquí tienes la información');
       agent.add(`${Math.round(Math.random()*(151-0)+parseInt(0))}`)
       await fetch(`https://pokeapi.co/api/v2/pokemon/${ pokemon }`)
      .then(promesaFetch => promesaFetch.json())
      .then(contenido => { respuesta = contenido });
       agent.add(  
         new Card({
         title : `${respuesta.name}`,
         imageUrl : respuesta.sprites.front_default,
         text : `Hola mi nombre es ${ pokemon } y soy un pokemon`,
         buttonText : `Mas informacion sobre ${ pokemon }`,
         buttonUrl : `https://www.google.com/search?q=${ pokemon }`
         })  
       );
       
       let payLoad = {
                "richContent": [
                    [
                        {
                            "type": "image",
                            "accessibilityText": "Dialogflow across platforms",
                            "rawUrl": respuesta.sprites.front_default
                        },
                        {
                            "subtitle": texto,
                            "actionLink": `https://www.google.com/search?q=${ pokemon }`,
                            "title": `Mas informacion sobre ${ pokemon }`,
                            "type": "info"
                        }
                    ]
                ]
            }
     } catch(err) {
       console.log(err);
       agent.add(`No se ha encontrado el pokemon ${ pokemon }`)
       }
    }
  
  async function pokemonAzar( agent ){
    let respuesta;
     try {
       agent.add('Aquí tienes la información');
       let azar = Math.round(Math.random()*(151));
       await fetch(`https://pokeapi.co/api/v2/pokemon/${ azar }`)
      .then(promesaFetch => promesaFetch.json())
      .then(contenido => { respuesta = contenido });
       agent.add(  new Card({
         title : `${respuesta.name}`,
         imageUrl : respuesta.sprites.front_default,
         text : `Hola mi nombre es ${ respuesta.name } y soy un pokemon`,
         buttonText : `Mas informacion sobre ${ respuesta.name }`,
         buttonUrl : `https://www.google.com/search?q=${ respuesta.name }`
       })  );
     } catch(err) {
       console.log(err);
       agent.add(`Por el momento no puedo darte información`)
       }
  }
  
  function testRichResponse( agent ){
    agent.add('respuesta enriquecida');
    let payloadData ={
    "richContent": [
        [
          {
            "type": "chips",
            "options": [
              {
                "text": "Realizar un reporte"
              },
              {
                "text": "Quiero informacion sobre un pokemon"
              },
              {
                "text": "Pokemon al azar"
              }
            ]
          }
        ]
      ]
    }

  agent.add( new Payload( agent.UNSPECIFIED, payloadData, { sendAsMessage: true, rawPayload : true }));
    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('prueba', prueba);
    intentMap.set('api', api);
    intentMap.set('pokemonAzar', pokemonAzar);
    intentMap.set('testRichResponse', testRichResponse);

    agent.handleRequest(intentMap);
});



// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

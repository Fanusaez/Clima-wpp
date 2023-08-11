// Configura tus claves de API y números de teléfono
const weatherAPIKey2 = 'b59f4b7a3e072e5b18450c2559e1605d';
const twilioSID = 'ACd14c1917eb9a65f4aefb1bfc8215e5fb';
const twilioAuthToken = '7abe21c9cb178aef006ddbac4acacc26';
const client = require('twilio')(twilioSID, twilioAuthToken);

// Pais y ciudad
const country = 'Argentina';
const city = 'Obera';

// Función para obtener el pronóstico del tiempo
async function getWeatherForecast() {
  try {
    const url = `http://api.weatherstack.com/current?access_key=${weatherAPIKey2}&query=${country},${city}`;
    const response = await fetch(url); // Use the 'await' keyword to get the response
    
    if (!response.ok) {
      throw new Error('Network response was not ok'); // Handle potential network errors
    }

    const data = await response.json(); // Parse the response body as JSON
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error; // Rethrow the error to handle it further up the call stack
  }
}

// create whatsapp message
function create_climate_message(weatherData){
  weatherDescription = weatherData["current"]["weather_descriptions"][0];
  humidity = weatherData["current"]["humidity"];
  temperature = weatherData["current"]["temperature"];
  
  message =  `Hello fanu, today the weather in ${city} is ${weatherDescription} with temperature of ${temperature}°C. The Humidity level is ${humidity}.`
  return message;

}

// Función para enviar un mensaje de WhatsApp
function sendWhatsAppMessage(message) {
  client.messages.create({
    from: 'whatsapp:+14155238886',
    body: message,
    to: 'whatsapp:+5493755564968'
  })
  .then(message => console.log('Mensaje de WhatsApp enviado:', message.sid))
  .catch(error => console.error('Error al enviar el mensaje de WhatsApp:', error));
}

// Llama a la función para obtener el pronóstico del tiempo

(async () => {
  const weatherData = await getWeatherForecast();
  const message = create_climate_message(weatherData);
  sendWhatsAppMessage(message);
})();

const axios = require('axios').default;

const handleWeather = async (ctx) => {
  const ciudad = ctx.message.text.split('/weather ')[1].trim();
  console.log(ciudad);
  ctx.reply('hola tiempo');

  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${process.env.WEATHER_API_KEY
    }&units=metric`);

  const res = `La temperatura en ${ciudad} es 
  TEMP: ${response.data.main.temp}º
  MAX: ${response.data.main.temp_max}º
  MAX: ${response.data.main.temp_min}º
  HUMEDAD: ${response.data.main.humidity}%`


  ctx.reply(res);


}

module.exports = handleWeather;
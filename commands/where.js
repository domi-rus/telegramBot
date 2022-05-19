const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',
  apiKey: process.env.WHERE_API_KEY
}

const handleGeocoder = async (ctx) => {
  try {
    console.log(ctx.message);
    const direccion = ctx.message.text.split('/where ')[1].trim().toLowerCase();
    ctx.reply('hola tiempo');
    console.log(direccion);

    const geocoder = NodeGeocoder(options);
    const res = await geocoder.geocode(direccion);

    const imgMap = `https://maps.googleapis.com/maps/api/staticmap?center=${res[0].latitude},${res[0].longitude
      }&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${res[0].latitude}, ${res[0].longitude
      }&key=${process.env.WHERE_API_KEY}`

    ctx.replyWithLocation(res[0].latitude, res[0].longitude);
    ctx.replyWithPhoto(imgMap);

  } catch (error) {
    ctx.reply('Direccion erronea intentalo de nuevo ');
  }

}

module.exports = handleGeocoder;
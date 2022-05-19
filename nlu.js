const { Wit, log } = require('node-wit');
const fs = require('fs');
const googleTTS = require('google-tts-api');

const client = new Wit({
  accessToken: process.env.WIT_TOKEN,
  logger: new log.Logger(log.DEBUG)
})


const handleNlu = async (ctx) => {

  const res = await client.message(ctx.message.text);
  if (res.intents.length === 0) {
    ctx.reply('no te entiendo');
  } else {
    if (res.intents[0].confidence > 0.75) {
      const intent = res.intents[0].name;
      const content = fs.readFileSync(`./frases/${intent}.txt`, 'utf-8');
      const frases = content.split('\n');
      const frasesSeleccionada = frases[Math.floor(Math.random() * frases.length)];

      const audioUrl = googleTTS.getAudioUrl(frasesSeleccionada, {
        lang: 'es',
        slow: false
      });

      // ctx.reply(frasesSeleccionada);

      ctx.replyWithAudio(audioUrl);

    } else {
      ctx.reply('no te entiendo');
    }
  }
}

module.exports = handleNlu;
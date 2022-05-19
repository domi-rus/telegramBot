const handleTest = (ctx) => {
  console.log(ctx.message);
  ctx.reply('hola que pasa');
  ctx.replyWithDice();
}

module.exports = handleTest;
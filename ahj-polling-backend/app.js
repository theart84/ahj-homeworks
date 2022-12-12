const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const Router = require('koa-router');
const router = new Router();
const fakeData = require('./fakerModule')

const app = new Koa();

app.use(cors());
app.use(koaBody({urlencoded: true}))

let messages = [];

setInterval(() => {
  const quantityMessage = [1, 2, 3, 4]
  let quantity = Math.floor(Math.random() * quantityMessage.length);
  messages = [];
  while(quantity > 0) {
    messages.push(fakeData())
    quantity -= 1;
  }
}, 5000)

router.get('/messages/unread', async (ctx) => {
  ctx.response.body = {
    status: "ok",
    timestamp: Date.now(),
    messages: messages
  };
})

router.get('/messages/clear', async (ctx) => {
  messages = [];
  ctx.response.body = messages;
})

app.use(router.routes());

module.exports = app;

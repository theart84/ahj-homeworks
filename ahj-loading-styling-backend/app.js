const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const Router = require('koa-router');
const slow = require('koa-slow');
const router = new Router();
const fakeData = require('./fakerModule')

const app = new Koa();

app.use(cors());
app.use(koaBody({urlencoded: true}))
app.use(slow({
  delay: 3000
}))

let posts = [fakeData(), fakeData(), fakeData()];




router.get('/posts', async (ctx) => {
  ctx.response.body = {
    status: "ok",
    timestamp: Date.now(),
    posts
  };
})

app.use(router.routes());

module.exports = app;

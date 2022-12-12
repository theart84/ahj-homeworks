const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const Router = require('koa-router');
const {readFile} = require('fs/promises');
require('./fakerModule.js')();

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(koaBody({urlencoded: true}))
app.use(router.routes());

router.get('/posts/latest', async (ctx) => {
  ctx.response.body = await readFile('./posts.json', 'utf-8');
})

router.get('/posts/:id/comments/latest', async (ctx) => {
  const comments =  JSON.parse(await readFile('./comments.json', 'utf-8'))
  const filteredByID = comments.filter((comment) => comment.post_id === ctx.request.params.id)
  ctx.response.body = filteredByID;
})



module.exports = app;

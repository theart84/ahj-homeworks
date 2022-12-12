const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const idGenerator = require('node-unique-id-generator');

const app = new Koa();

app.use(cors());
app.use(koaBody({urlencoded: true}))

const tickets = [{
  id: idGenerator.generateGUID(),
  name: 'Поменять краску в принтере, ком. 404',
  description: 'Принтер HP LJ-1210, картриджи на складе',
  status: false,
  created: Date.now()
},
  {
    id: idGenerator.generateGUID(),
    name: 'Переустановить Windows, PC-Hall24',
    description: '',
    status: false,
    created: Date.now()
  },
  {
    id: idGenerator.generateGUID(),
    name: 'Установить обновление KB-31642dv3875',
    description: 'Вышло критическое обновление для Windows',
    status: false,
    created: Date.now()
  }
];

app.use(async ctx => {
  const {method, id} = ctx.request.query;
  switch (method) {
    case 'allTickets':
      ctx.response.body = tickets;
      return;
    case 'ticketById':
      ctx.response.body = tickets.find(ticket => ticket.id === id)
      return;
    case 'createTicket':
      const createData = JSON.parse(ctx.request.body)
      const newTicket = {
        id: idGenerator.generateGUID(),
        name: createData.name,
        status: false,
        description: createData.description || '',
        created: Date.now()
      };
      tickets.push(newTicket);
      ctx.response.body = [newTicket]
      return;
    case 'deleteById':
      const deleteIdx = tickets.findIndex(ticket => ticket.id === id)
      tickets.splice(deleteIdx, 1)
      ctx.response.body = tickets;
      return;
    case 'updateById':
      const updateIdx = tickets.findIndex(ticket => ticket.id === id);
      const updateData = JSON.parse(ctx.request.body)
      const ticket = {
        ...tickets[updateIdx],
        ...updateData
      }
      tickets.splice(updateIdx, 1);
      tickets.splice(updateIdx, 0, ticket);
      ctx.response.body = tickets;
      return;
    default:
      ctx.response.status = 404;
      return;
  }
});

module.exports = app;

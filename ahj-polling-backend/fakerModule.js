const faker = require('faker');
const idGenerator = require('node-unique-id-generator');


const fakeData = () => {
  return {
    id: idGenerator.generateGUID(),
    from: faker.internet.email(),
    subject: faker.lorem.words(),
    body: faker.lorem.text() ,
    received: Date.now(),
  }
}

module.exports = fakeData

const faker = require('faker');
const idGenerator = require('node-unique-id-generator');


const fakeData = () => {
  return {
    id: idGenerator.generateGUID(),
    title: faker.lorem.sentence(),
    bodyImage: faker.image.technics(),
    body: faker.lorem.paragraph(),
    received: Date.now(),
  }
}

module.exports = fakeData

const faker = require("faker");
const idGenerator = require("node-unique-id-generator");
const { readFile, writeFile } = require("fs/promises");

const fakeData = async () => {
  await writeFile("./posts.json", JSON.stringify([]), "utf-8");
  await writeFile("./comments.json", JSON.stringify([]), "utf-8");
  for (let index = 0; index < 10; index++) {
    const post = {
      id: idGenerator.generateGUID(),
      author_id: idGenerator.generateGUID(),
      title: faker.lorem.sentence(),
      author: faker.name.findName(),
      avatar: faker.internet.avatar(),
      image: faker.image.technics(),
      created: faker.date.past(),
    };
    const postsArray = JSON.parse(await readFile("./posts.json", "utf-8"));
    postsArray.push(post);
    await writeFile("./posts.json", JSON.stringify(postsArray), "utf-8");
    for (let index = 0; index < Math.ceil(Math.random() * 3); index++) {
      const comments = {
        id: idGenerator.generateGUID(),
        post_id: post.id,
        author_id: faker.name.findName(),
        author: faker.name.findName(),
        avatar: faker.internet.avatar(),
        content: faker.lorem.words(),
        created: faker.date.past(),
      };
      const commentsArray = JSON.parse(
        await readFile("./comments.json", "utf-8")
      );
      commentsArray.push(comments);
      await writeFile(
        "./comments.json",
        JSON.stringify(commentsArray),
        "utf-8"
      );
    }
  }
};

module.exports = fakeData;

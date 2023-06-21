import { fakerEN_IN as faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$connect();
  await prisma.savedPost.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  const hashedPassword = await hash("test1234", 12);
  //creating users and their posts
  for (let i = 0; i < 20; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        address: faker.location.streetAddress(),
        email: faker.internet.email(),
        bio: faker.lorem.words(10),
        password: hashedPassword,
        name: faker.person.fullName(),
        image: faker.image.avatarGitHub(),
        role: faker.helpers.arrayElement(["HANDICAPP", "USER", "ORG"]),
        Post: {
          createMany: {
            data: [
              {
                content: faker.lorem.words(10),
                media_url: faker.image.urlPicsumPhotos(),
              },
              {
                content: faker.lorem.words(10),
                media_url: faker.image.urlPicsumPhotos(),
              },
              {
                content: faker.lorem.words(10),
                media_url: faker.image.urlPicsumPhotos(),
              },
              {
                content: faker.lorem.words(10),
                media_url: faker.image.urlPicsumPhotos(),
              },
            ],
          },
        },
      },
    });
  }

  //create comments
  const posts = await prisma.post.findMany();
  const users = await prisma.user.findMany({
    where: {
      role: "HANDICAPP",
    },
  });

  await Promise.all(
    posts.map(async (post) => {
      const randomUserIndex = _.random(0, users.length - 1);
      const randomUser = users[randomUserIndex];
      const content = faker.lorem.words(5);
      const postId = post.id;
      const userId = randomUser.id;
      await prisma.comment.create({
        data: {
          postId,
          userId,
          content,
        },
      });
    })
  );

  //add some posts to save list
  await Promise.all(
    users.map(async (user, index) => {
      const posts = await prisma.post.findMany({
        where: {
          NOT: {
            userId: user.id,
          },
        },
        take: 5,
      });

      //add some posts to users savelist
      await Promise.all(
        posts.map(async (post) => {
          await prisma.savedPost.create({
            data: {
              userId: user.id,
              postId: post.id,
            },
          });
        })
      );
    })
  );
};

main()
  .then(() => {
    console.log("Seeded successfully 🚀");
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

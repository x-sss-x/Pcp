import { fakerEN_IN as faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$connect();
  await prisma.savedPosts.deleteMany();
  await prisma.comments.deleteMany();
  await prisma.posts.deleteMany();
  await prisma.users.deleteMany();

  //creating users and their posts
  for (let i = 0; i < 5; i++) {
    await prisma.users.create({
      data: {
        username: faker.internet.userName(),
        address: faker.location.streetAddress(),
        email: faker.internet.email(),
        bio: faker.lorem.words(10),
        password: faker.internet.password(),
        phone_no: faker.phone.number(),
        fullname: faker.person.fullName(),
        posts: {
          createMany: {
            data: [
              {
                title: faker.lorem.words(3),
                description: faker.lorem.words(10),
                media_url: faker.image.urlPicsumPhotos(),
              },
              {
                title: faker.lorem.words(3),
                description: faker.lorem.words(10),
                media_url: faker.image.urlPicsumPhotos(),
              },
              {
                title: faker.lorem.words(3),
                description: faker.lorem.words(10),
                media_url: faker.image.urlPicsumPhotos(),
              },
              {
                title: faker.lorem.words(3),
                description: faker.lorem.words(10),
                media_url: faker.image.urlPicsumPhotos(),
              },
            ],
          },
        },
      },
    });
  }

  //create comments
  const posts = await prisma.posts.findMany();
  const users = await prisma.users.findMany();

  await Promise.all(
    posts.map(async (post) => {
      const randomUserIndex = _.random(0, users.length - 1);
      const randomUser = users[randomUserIndex];
      const content = faker.lorem.words(5);
      const postId = post.id;
      const userId = randomUser.id;
      await prisma.comments.create({
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
      const posts = await prisma.posts.findMany({
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
          await prisma.savedPosts.create({
            data: {
              usersId: user.id,
              postsId: post.id,
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

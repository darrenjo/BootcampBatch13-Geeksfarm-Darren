import { faker } from "@faker-js/faker";

export function getComments(count) {
  return Array.from({ length: count }, () => ({
    author: faker.person.firstName(),
    avatar: faker.image.avatar(),
    date: faker.date.recent().toLocaleDateString(),
    text: faker.lorem.sentence(),
  }));
}

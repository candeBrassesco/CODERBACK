import {fakerEN_US as faker} from "@faker-js/faker";


export const generateProduct = () => {
    const product = {
        _id: faker.database.mongodbObjectId,
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int(100),
        code: faker.commerce.isbn({separator: ' '}),
        status: true
    }

    return product
}


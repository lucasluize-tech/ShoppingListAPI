const request = require('supertest')
const app = require('../app')
const items = require('../fakeDb')

// create a item to work with
let laptop = { name: "laptop", price: 1000 }

beforeEach(() => {
    items.push(laptop)
})
afterEach(() => {
    items.length = 0
})

describe('/GET routing tests', () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({items: [laptop]})
    })

    test("Get specific item", async () => {
        const res = await request(app).get(`/items/${laptop.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ item: laptop })
    })

    test("Get non existing item", async () => {
        const res = await request(app).get(`/items/boat`)
        expect(res.statusCode).toBe(404)
    })
})

describe('/POST routing tests', () => {
    test("Create an Item", async () => {
        const res = await request(app).post("/items").send({name: "earbuds", price: 149.99})
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({added : {name: "earbuds", price: 149.99}})

    })
})

describe('/PATCH routing tests', () => {
    test("Edit an Item", async () => {
        const res = await request(app).patch(`/items/${laptop.name}`).send({price: 2000})
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({updated : laptop})
    })

    test("Edit non existing Item", async () => {
        const res = await request(app).patch(`/items/cabin`)
        expect(res.statusCode).toBe(404)
    })
})

describe('/DELETE routing tests', () => {
    test("Delete an Item", async () => {
        const res = await request(app).delete(`/items/${laptop.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message: 'Item deleted'})
    })

    test("Delete non existing Item", async () => {
        const res = await request(app).delete(`/items/golfcart`)
        expect(res.statusCode).toBe(404)
    })
})
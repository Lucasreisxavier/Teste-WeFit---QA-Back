import { AppModule } from "@/infra/app.module"
import { Test, TestingModule } from '@nestjs/testing'
const request = require('supertest')

describe('All Integrations Tests', () => {
    let app;
    let randomMovieId: any;
    let orderData: any;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    })

    it('list movies', async () => {
        const response = await request(app.getHttpServer())
            .get('/movie')
        const numberOfMovies = response.body.length;

        // select a random movie

        const randomMovie = Math.floor(Math.random() * numberOfMovies)
        randomMovieId = response.body[randomMovie]

        expect(response.status).toBe(200);





    });
    it('Create a order', async () => {

        const randomQuantity = Math.floor(Math.random() * 10) + 1
        const data = {
            orderId: "",
            movieId: randomMovieId.id,
            quantity: randomQuantity
        }
        const response = await request(app.getHttpServer())
            .post('/order')
            .send(data)

        expect(response.status).toBe(201);

        orderData = response.body

    })

    it('get Order infos', async () => {

        const response = await request(app.getHttpServer())
            .get(`/order/${orderData.id}`)


        expect(response.status).toBe(200);

    })

    it('Update Order Item', async () => {
        const randomQuantity = Math.floor(Math.random() * 10) + 1


        const response = await request(app.getHttpServer())
            .patch(`/order/item/${orderData.orderItemId}`)
            .send({ quantity: randomQuantity })
        expect(response.status).toBe(200);


    })

    it('Delete Order Item', async () => {
        const response = await request(app.getHttpServer())
            .delete(`/order/item/${orderData.orderItemId}`);

        expect(response.status).toBe(204);

    })
})
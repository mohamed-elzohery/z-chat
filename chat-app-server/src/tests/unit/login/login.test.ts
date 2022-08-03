import app from '../../../app';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User, { Gender } from '../../../models/User';

let mongoServer: MongoMemoryServer;
const loginEndPoint = '/api/v1/auth/login';

describe('Testing login functionality', () => {
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });
      
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('Sending empty user data', async () => {
        const res = await request(app)
              .post(loginEndPoint)
              .send({});

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual("Please enter email and password.");
    });


    describe('Sending invalid data', () => {
        beforeAll(async () => {
            await User.create({
                name: "Amal",
                email: "amal@gmail.com",
                phone: "011223232323",
                gender: Gender.FEMALE,
                password: "Amal@1997"
            });
        });

        afterAll(async () => {
            await User.deleteMany({});
        });

        it('Sending invalid email and password', async () => {
            const res = await request(app)
                    .post(loginEndPoint)
                    .send({email: "amal22@gmail.com", password: "weweewewewe"})
            
                    expect(res.statusCode).toEqual(400);
                    expect(res.body).toEqual("Invalid email or password.");
        });

        it('Sending valid email and invalid password', async () => {
            const res = await request(app)
                    .post(loginEndPoint)
                    .send({email: "amal@gmail.com", password: "weweewewewe"})
            
                    expect(res.statusCode).toEqual(400);
                    expect(res.body).toEqual("Invalid email or password.");
        });

        it('Sending valid email and valid password', async () => {
            const res = await request(app)
                    .post(loginEndPoint)
                    .send({email: "amal@gmail.com", password: "Amal@1997"})
            
                    expect(res.statusCode).toEqual(200);
        })
    })

} );
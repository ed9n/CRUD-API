import supertest from 'supertest';
import { server } from '../src/app';
import { User } from '../src/interfaces/interfaces';


describe('Scenario 1', () => {
    it('Should: return nobody users', async () => {

        const res = await supertest(server).get('/api/users');

        expect(res.body).toEqual([]);
        expect(res.statusCode).toEqual(200);

    });

    let userId: User;

    it('Should: create user', async () => {
        const user = {
            name: "Eduard",
            age: 25,
            hobbies: [
                'program',
                'footbal'
            ]
        };

        const res = await supertest(server).post('/api/users').send(user);
        expect(res.statusCode).toEqual(201);
        return userId = res.body.id;

    });

    it('Should: get user', async () => {

        const res = await supertest(server).get(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(200);

    });

    it('Should: update user', async () => {

        const changedUser = {
            name: "Pasha",
            age: 35,
            hobbies: [
                'cooking'
            ]
        };

        const res = await supertest(server).put(`/api/users/${userId}`).send(changedUser);
        expect(res.statusCode).toEqual(200);

    });

    it('Should: delete user', async () => {

        const res = await supertest(server).delete(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(204);

    });

    it('Should: no find person', async () => {

        const res = await supertest(server).get(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(404);

    });

});

describe('Scenario 2', () => {

    it('Should: return bad request if we put wrong type for value in metod POST', async () => {

        const user = {
            name: 123,
            age: "edsd",
            hobbies: [
                'program',
                'footbal'
            ]
        };

        const res = await supertest(server).post('/api/users').send(user);
        expect(res.statusCode).toEqual(400);

    });

    it('Should: return bad request if we put wrong key in metod POST', async () => {

        const user = {
            name123: 'Pet9',
            age33: 25,
            hobbies: [
                'program',
                'footbal'
            ]
        };

        const res = await supertest(server).post('/api/users').send(user);
        expect(res.statusCode).toEqual(400);

    });

    it('Should: return bad request if we put wrong uuid', async () => {

        const res = await supertest(server).get(`/api/users/qwerty123`)
        expect(res.statusCode).toEqual(400);

    });


    it('Should: create user', async () => {
        const user = {
            name: "Artem",
            age: 35,
            hobbies: [
                'cars',
            ]
        };

        const res = await supertest(server).post('/api/users').send(user);
        expect(res.statusCode).toEqual(201);


    });

    it('Should: create user', async () => {
        const user = {
            name: "pet9",
            age: 55,
            hobbies: []
        };

        const res = await supertest(server).post('/api/users').send(user);
        expect(res.statusCode).toEqual(201);

    });

    it('Should: get users', async () => {

        const res = await supertest(server).get(`/api/users`)
        expect(res.statusCode).toEqual(200)

    });
});

describe('Scenario 3', () => {

    let userId: User;

    it('Should: create user', async () => {

        const user = {
            name: "Eduard",
            age: 25,
            hobbies: [
                'program',
                'footbal'
            ]
        };

        const res = await supertest(server).post('/api/users').send(user);
        expect(res.statusCode).toEqual(201);
        return userId = res.body.id;

    });

    it('Should: return bad request if we put wrong type for value in metod PUT', async () => {

        const changedUser = {
            name: 123,
            age: "123",
            hobbies: [
                'cooking'
            ]
        };

        const res = await supertest(server).put(`/api/users/${userId}`).send(changedUser);
        expect(res.statusCode).toEqual(400);
    });

    it('Should: return bad request if we put wrong key in metod PUT', async () => {

        const changedUser = {
            name123: "Egor",
            age3: 35,
            hobbies: [
                'cooking'
            ]
        };

        const res = await supertest(server).put(`/api/users/${userId}`).send(changedUser);
        expect(res.statusCode).toEqual(400);

    });

    it('Should: return bad request if put requests to non-existing endpoints', async () => {

        const res = await supertest(server).get(`/api/users/name/age`);
        expect(res.statusCode).toEqual(404);

    });

    it('Should: return bad request if delete user with wrong uuid', async () => {

        const res = await supertest(server).delete(`/api/users/qwery123`);
        expect(res.statusCode).toEqual(400);

    });

    it('Should: delete user', async () => {

        const res = await supertest(server).delete(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(204);

    });


    it('Should: return bad request if delete non-existent user', async () => {

        const res = await supertest(server).delete(`/api/users/${userId}`);
        expect(res.statusCode).toEqual(404);

    });
});

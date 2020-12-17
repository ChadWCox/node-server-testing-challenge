const request = require('supertest');
const server = require('./server.js');

const users = [
    {
        id: 1,
        fname: 'Chad',
        lname: 'Cox',
        email: 'chad@email.com'
    },
]

const chad = {
        id: 1,
        fname: 'Chad',
        lname: 'Cox',
        email: 'chad@email.com'
    }

const cathy = {
    id: 2,
    fname: 'Cathy',
    lname: 'Cox',
    email: 'cathy@email.com'
}



describe('endpoints', () => {
    describe('[GET] /users', () => {
        it('responds with 200 Ok', async () => {
            const res = await request(server).get('/users')
            expect(res.status).toBe(200)
        })
        it('responds with 1 users if no users added', async () => {
            const res = await request(server).get('/users')
            expect(res.body).toHaveLength(1)
        })  
    })
    describe('[GET] /users/:id', () => {
        it('responds with the user with given id', async () => {
            let res = await request(server).get('/users/1')
            expect(res.body).toMatchObject(chad)
        })
        it('responds with 404 if user not found', async () => {
            const res = await request(server).get('/users/2');
            expect(res.status).toBe(404)
        })
    })
    describe('[POST] /users', () => {
        it('returns the newly created user', async () => {
            const res = await request(server).post('/users').send(cathy);
            expect(res.body.id).toBe(2);
            expect(res.body.fname).toBe('Cathy')
        })
        it('if we add same user twice responds with "emails must be unique"', async () => {
            await request(server).post('/users').send(cathy);
            const res = await request(server).post('/users').send(cathy);
            expect(JSON.stringify(res.body)).toMatch(/emails must be unique/)
          })
    })
    describe('[DELETE] /users:id', () => {
        it('reponsds with 200 OK upon user deletion', async () => {
            const res = await request(server).delete('/users/2')
            expect(res.status).toBe(200)
        })
        it('expects return of users array at deletion', async () => {
            const res = await request(server).delete('/users/2')
            expect(res.body).toHaveLength(1)
        })
    })
})
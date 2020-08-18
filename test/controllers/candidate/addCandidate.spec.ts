import app from '../../../src/app'
import request from 'supertest'

describe('POST /candidate', () => {
  it('add candidate to in memory db', async () => {
    const candidate = {
      id: 'ae588a6b-4540-5714-bfe2-a5c2a65f547a',
      name: 'John Coder',
      skills: ['javascript', 'es6', 'nodejs', 'express'],
    }
    const result = await request(app)
      .post('/candidate')
      .set('Content-type', 'application/json')
      .expect('Content-Type', 'application/json')
      .send({ ...candidate })
      .expect(201)
    expect(JSON.parse(result.text)).toMatchObject(candidate)
  })

  it('should fail because no candidate object passed', async () => {
    const candidate = {}
    const result = await request(app)
      .post('/candidate')
      .set('Content-type', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .send({ ...candidate })
      .expect(400)

    expect(result.text).toEqual('No candidate data received')
  })
})

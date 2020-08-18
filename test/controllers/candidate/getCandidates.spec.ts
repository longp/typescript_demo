import app from '../../../src/app'
import request from 'supertest'
import Database from '../../../src/lib/database'

describe('GET /candidate', () => {
  it('get best candidate depending on search query', async () => {
    const db = Database.getInstance()
    db.seedStaticDatabase()

    const query = '?skills=javascript,react,typescript'
    const result = await request(app)
      .get('/candidate/search' + query)
      .expect(200)

    const data = JSON.parse(result.text)
    expect(data).toHaveProperty('id')
    expect(data).toHaveProperty('name')
    expect(data).toHaveProperty('skills')
    expect(data.skills.toString()).toMatch(/react|typescript|javascript/)
  })

  it('return 404 because no candidate was found with search query', async () => {
    const db = Database.getInstance()
    db.seedStaticDatabase()

    const query = '?skills=javascriptx'
    const result = await request(app)
      .get('/candidate/search' + query)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404)

    expect(result.text).toEqual('no candidates were matched')
  })

  it('return error because no candidate in database', async () => {
    const db = Database.getInstance()
    db.flush()
    const query = '?skills=javascriptx'
    const result = await request(app)
      .get('/candidate/search' + query)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404)

    expect(result.text).toEqual('no candidates stored')
  })

  it('return error because search query empty', async () => {
    const db = Database.getInstance()
    db.seedStaticDatabase()
    const query = '?skills='
    const result = await request(app)
      .get('/candidate/search' + query)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(400)

    expect(result.text).toEqual('no skills provided!')
  })
})

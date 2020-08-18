import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()
// Controllers (route handlers)
import * as homeController from './controllers/home'
import * as candidateController from './controllers/candidate'
// Create Express server
const app = express()

// Express configuration
app.set('port', process.env.PORT)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('tiny'))

// in memory store of our candidates
import Database from './database'
const db = Database.getInstance()
// seed db if env var set to true
if (process.env.SEED_DB) {
  if (process.env.SEED_DB === 'random') db.seedRandomDatabase()
  if (process.env.SEED_DB === 'static') db.seedStaticDatabase()
}

/**
 * Primary app routes.
 */
app.get('/', homeController.index)
app.get('/database', useDatabase, (req: Request, res: Response) => {
  res.send(res.locals.database)
})
app.get('/candidate/search', useDatabase, candidateController.searchCandidate)
app.post('/candidate', useDatabase, candidateController.addCandidate)

app.get('*', (req: Request, res: Response) => {
  res.status(404).send('woah not found')
})

function useDatabase(req: Request, res: Response, next: NextFunction) {
  res.locals.database = db._data
  next()
}

export default app

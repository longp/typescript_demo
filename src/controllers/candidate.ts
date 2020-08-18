import { Request, Response } from 'express'
import { pickBestCandidateFromList } from '../lib/Candidate'
import ICandidate from '../interfaces/ICandidate'
/**
 * Get Candidate.
 * @route GET /
 */
export const searchCandidate = (req: Request, res: Response): void => {
  let errorCode = 400
  try {
    if (!res.locals.database || res.locals.database.length === 0) {
      errorCode = 404
      throw new Error('no candidates stored')
    }

    if (!req.query.skills) {
      throw new Error('no skills provided!')
    }
    const skills: string = req.query.skills as string
    const skillsList: string[] = skills.split(',')

    const best = pickBestCandidateFromList(skillsList, res.locals.database)

    if (!best) {
      errorCode = 404
      throw new Error('no candidates were matched')
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(best))
    res.end()
  } catch (error) {
    res.status(errorCode).send(error.message)
  }
}

/**
 * Add Candidate.
 * @route POST /
 */
export const addCandidate = (req: Request, res: Response): void => {
  try {
    const { id, name, skills } = req.body

    if (Object.keys(req.body).length === 0 || (!id && !name && !skills)) {
      throw new Error('No candidate data received')
    }

    const newCandidate: ICandidate = {
      id,
      name,
      skills,
    }

    res.locals.database.push(newCandidate)

    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.write(JSON.stringify(newCandidate))
    res.end()
  } catch (error) {
    res.status(400).send(error.message)
  }
}

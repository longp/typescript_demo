import { Request, Response } from 'express'
import { pickBestCandidateFromList } from '../lib/Candidate'
import ICandidate from '../interfaces/ICandidate'
/**
 * Get Candidate.
 * @route GET /
 */
export const searchCandidate = (req: Request, res: Response): Response => {
  if (!res.locals.database || res.locals.database.length === 0) {
    return res.status(404).send('no candidates stored')
  }
  if (!req.query.skills) return res.status(400).send('no skills provided!')
  const skills: string = req.query.skills as string
  // create skills hash and array of skills that were searched
  const skillsList: string[] = skills.split(',')

  const best = pickBestCandidateFromList(skillsList, res.locals.database)

  if (!best) return res.status(404).send('no candidates were matched')

  return res.send(best)
}

/**
 * Add Candidate.
 * @route POST /
 */
export const addCandidate = (req: Request, res: Response): Response => {
  try {
    const { id, name, skills } = req.body

    if (Object.keys(req.body).length === 0 || (!id && !name && !skills))
      return res.status(400).send('No candidate data received')

    const newCandidate: ICandidate = {
      id,
      name,
      skills,
    }
    res.locals.database.push(newCandidate)

    return res.status(201).send({ msg: 'Successfully created!', data: newCandidate })
  } catch (error) {
    return res.status(400).send(error.message ? error.message : 'Unable to create candidate')
  }
}

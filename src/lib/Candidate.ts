import ICandidate from '../interfaces/ICandidate'
import IMergedBestCandidate from '../interfaces/IMergedBestCandidate'
import * as faker from 'faker'
import { v4 as uuidv4 } from 'uuid'
import { randomNumber } from '../functions'

const skills = [
  'php',
  'javascript',
  'docker',
  'golang',
  'c++',
  'c',
  'python',
  'mysql',
  'postgressql',
  'elixir',
  'swift',
  'react',
  'typescript',
  'ruby',
  'jest',
  'pytorch',
  'tensorflow',
  'tika',
  'jira',
  'agile',
  'mongodb',
  'redis',
  'elasticsearch',
  'apache',
  'rabbitmq',
  'apache kafke',
  'memcached',
  'codeigniter',
  'laravel',
  'django',
  'flask',
  'erlang',
]

export function generateRandomCandidate(): ICandidate {
  return {
    id: uuidv4(),
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    skills: generateRandomSkills(),
  }
}

export function generateRandomSkills(amountCountMax = 20): string[] {
  const amountCount = randomNumber(1, amountCountMax)
  const randomSkills: string[] = []
  const usedIndexes = new Set()
  for (let i = 0; i < amountCount; i++) {
    const randomIndex = randomNumber(0, skills.length - 1)
    const randomSkill = skills[randomIndex]

    if (!usedIndexes.has(randomSkill)) {
      usedIndexes.add(randomSkill)
      randomSkills.push(randomSkill)
    }
  }

  return randomSkills
}

export function pickBestCandidateFromList(skillsList: string[], candidateList: ICandidate[]): ICandidate | false {
  // create skills map
  const skillHash = new Map()

  for (const skill of skillsList) {
    if (!skillHash.has(skill)) skillHash.set(skill, true)
  }

  let best = null

  for (const candidate of candidateList) {
    let skills_matches = 0

    if (!candidate.skills) continue

    for (const skill of candidate.skills) {
      if (skillHash.has(skill)) skills_matches++
    }
    // keep iterating if no skills were found to match the query
    if (skills_matches <= 0) continue
    // found the first candidate with atleast one match
    if (!best) {
      best = mergeBestCandidate(skills_matches, candidate)
      continue
    }
    /**
     * if current skills_matches equals the best candidate skills_matches we will pick the one with the most skills
     * no logic for when they are equal
     */
    if (best.skills_matches === skills_matches) {
      const bestSkillCount: number = best.skills.length
      const currentSkillCount: number = candidate.skills.length

      if (currentSkillCount > bestSkillCount) best = mergeBestCandidate(skills_matches, candidate)
    }

    if (best.skills_matches < skills_matches) best = mergeBestCandidate(skills_matches, candidate)
  }

  if (!best) return false
  else
    return {
      id: best.id,
      name: best.name,
      skills: best.skills,
    }
}

//simple helper merges candidate object with skills_matches property
export function mergeBestCandidate(skills_matches: number, candidate: ICandidate): IMergedBestCandidate {
  return {
    skills_matches,
    id: candidate.id,
    name: candidate.name,
    skills: candidate.skills,
  }
}

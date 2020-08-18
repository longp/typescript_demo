import { generateRandomCandidate } from '../../../src/lib/Candidate'

describe('Candidate.generateRandomCandidate', () => {
  test('check that candidate obj props are created', () => {
    const candidate = generateRandomCandidate()

    // debugger
    expect(candidate.id).toBeDefined()
    expect(candidate.name).toBeDefined()
    expect(candidate.skills).toBeDefined()
  })
})

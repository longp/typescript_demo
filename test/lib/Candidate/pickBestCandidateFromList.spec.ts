import { pickBestCandidateFromList } from '../../../src/lib/Candidate'
import data from '../../../src/data/seedDatabase.json'

describe('pickBestCandidateFromList()', () => {
  test('check to get candidate with all the skills', () => {
    const skillsList = ['mongodb', 'redis']
    const candidateList = data
    const output = {
      id: '8dc768a2-f0cb-405a-9637-1dd17a5be3e0',
      name: 'Brandyn Gleason',
      skills: [
        'codeigniter',
        'elasticsearch',
        'php',
        'laravel',
        'jira',
        'python',
        'rabbitmq',
        'postgressql',
        'apache kafke',
        'swift',
        'erlang',
        'memcached',
        'redis',
        'mongodb',
      ],
    }
    // debugger
    expect(pickBestCandidateFromList(skillsList, candidateList)).toEqual(output)
  })

  test('check to get candidate with some of the skills', () => {
    const skillsList = ['mongodb', 'redis2']
    const candidateList = data
    const output = {
      id: '5ea060f7-3b23-484d-9a20-a7b873e67aa9',
      name: 'Taylor Heathcote',
      skills: [
        'typescript',
        'tika',
        'ruby',
        'pytorch',
        'apache',
        'react',
        'docker',
        'mongodb',
        'apache kafke',
        'elixir',
        'golang',
        'postgressql',
        'rabbitmq',
        'laravel',
        'erlang',
        'elasticsearch',
      ],
    }
    // debugger
    expect(pickBestCandidateFromList(skillsList, candidateList)).toEqual(output)
  })

  test('check to get  false/ no candidate ', () => {
    const skillsList = ['call of duty']
    const candidateList = data
    // debugger
    expect(pickBestCandidateFromList(skillsList, candidateList)).toBeFalsy()
  })
})

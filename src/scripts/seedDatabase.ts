import { generateRandomCandidate } from '../lib/Candidate'
import Database from '../lib/database'

function main() {
  console.log('running seedDatabase')
  const db = new Database()
  db.seedRandomDatabase()
  console.log('finished!')
}
// only will run if you run it as a script
if (!module.parent) {
  main()
}

import ICandidate from './interfaces/ICandidate'
import staticData from './data/seedDatabase.json'
import { generateRandomCandidate } from './lib/Candidate'

// Singleton
class Database {
  _data: ICandidate[] = []
  private static instance: Database

  seedRandomDatabase(seedCount = 20): void {
    for (let i = 0; i < seedCount; i++) {
      // create a random candidate
      const RandomCandidate = generateRandomCandidate()
      this._data.push(RandomCandidate)
    }
  }
  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
  seedStaticDatabase(): void {
    this._data = staticData
  }

  flush(): void {
    this._data = []
  }

  get data(): ICandidate[] {
    return this._data
  }
  set data(data: ICandidate[]) {
    this._data = data
  }
}
export default Database

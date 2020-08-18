import ICandidate from '../interfaces/ICandidate'
import staticData from '../data/seedDatabase.json'
import { generateRandomCandidate } from './Candidate'

// Singleton
class Cache {
  _data: Map<string, unknown> = new Map()
  private static instance: Cache

  static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache()
    }

    return Cache.instance
  }

  getAllData(): Map<string, unknown> {
    return this._data
  }

  getData(key: string): unknown {
    if (this._data.has(key)) return this._data.get(key)
    else return false
  }

  setData(key: string, data: unknown): void {
    this._data.set(key, data)
  }
}
export default Cache

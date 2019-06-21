import { MatchResult } from './MatchResult'
import { MatchReader } from './MatchReader'

const matchReader = new MatchReader('football.csv')
matchReader.read()

let manUnitedWins = 0
matchReader.data.forEach(match => {
  if (
    (match[1] === 'Man United' && match[5] === MatchResult.HomeWin) ||
    (match[2] === 'Man United' && match[5] === MatchResult.AwayWin)
  ) {
    manUnitedWins++
  }
})

console.log('manUnitedWins: ', manUnitedWins)

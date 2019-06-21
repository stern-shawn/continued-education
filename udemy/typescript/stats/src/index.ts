import { MatchResult } from './MatchResult'
import { MatchReader } from './MatchReader'
import { CsvFileReader } from './CsvFileReader'

const csvFileReader = new CsvFileReader('football.csv')
const matchReader = new MatchReader(csvFileReader)
matchReader.load()

const manUnitedWins = matchReader.matches.reduce((wins, match) => {
  if (
    (match[1] === 'Man United' && match[5] === MatchResult.HomeWin) ||
    (match[2] === 'Man United' && match[5] === MatchResult.AwayWin)
  ) {
    return wins + 1
  }
  return wins
}, 0)

console.log('Manchester United Won: ', manUnitedWins)

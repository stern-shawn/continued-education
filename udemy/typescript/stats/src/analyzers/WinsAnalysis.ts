import { Analyzer } from '../Summary'
import { MatchData } from '../MatchData'
import { MatchResult } from '../MatchResult'

export class WinsAnalysis implements Analyzer {
  constructor(public teamName: string) {}

  run(matches: MatchData[]): string {
    const wins = matches.reduce((totalWins, match) => {
      if (
        (match[1] === this.teamName && match[5] === MatchResult.HomeWin) ||
        (match[2] === this.teamName && match[5] === MatchResult.AwayWin)
      ) {
        return totalWins + 1
      }
      return totalWins
    }, 0)

    return `Team ${this.teamName} won ${wins} games`
  }
}

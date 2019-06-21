import fs from 'fs'

const matches = fs
  .readFileSync('football.csv', { encoding: 'utf-8' })
  .split('\n')
  .map(match => match.split(','))

console.log('matches: ', matches)

let manUnitedWins = 0
matches.forEach(match => {
  if ((match[1] === 'Man United' && match[5] === 'H') || (match[2] === 'Man United' && match[5] === 'A')) {
    manUnitedWins++
  }
})

console.log('manUnitedWins: ', manUnitedWins)

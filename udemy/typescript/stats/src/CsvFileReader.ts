import fs from 'fs'

// Use generics so we read any definition of data
export abstract class CsvFileReader<T> {
  data: T[] = []

  constructor(public filename: string) {}

  abstract mapRow(row: string[]): T

  read(): void {
    this.data = fs
      .readFileSync(this.filename, { encoding: 'utf-8' })
      .split('\n')
      .map(match => match.split(','))
      .map(this.mapRow)
  }
}

export class CharactersCollection {
  constructor(public data: string) {}

  get length(): number {
    return this.data.length
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return this.data[leftIndex].toLowerCase() > this.data[rightIndex].toLowerCase()
  }

  swap(leftIndex: number, rightIndex: number): void {
    // We can't mutate a string, but we can split it into an array of chars, mutate, and re-join
    const chars = this.data.split('')

    const leftHand = chars[leftIndex]
    chars[leftIndex] = chars[rightIndex]
    chars[rightIndex] = leftHand

    this.data = chars.join('')
  }
}

export class Attributes<T> {
  constructor(private data: T) {}

  // Constrain inputs to only keys of the generic T
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key]
  }

  set(update: T) {
    Object.assign(this.data, update)
  }
}

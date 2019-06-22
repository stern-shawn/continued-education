import axios from 'axios'

interface HasId {
  id?: number
}

export class Sync<T extends HasId> {
  constructor(public rootUrl: string) {}
  fetch(id: number) {
    return axios.get<T>(`${this.rootUrl}/${id}`)
  }

  save(data: T) {
    const { id } = data

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data)
    } else {
      return axios.post(this.rootUrl, data)
    }
  }
}

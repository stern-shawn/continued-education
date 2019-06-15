const profile = {
  name: 'shawn',
  age: 28,
  coords: {
    lat: 0,
    lng: 20,
  },
  setAge(age: number): void {
    this.age = age
  },
}

const { age } = profile
const {
  coords: { lat, lng },
} = profile

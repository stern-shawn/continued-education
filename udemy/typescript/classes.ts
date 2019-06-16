class Vehicle {
  // color: string

  // constructor(color: string) {
  //   this.color = color
  // }

  // shorthand constructor
  constructor(public color: string) {
    this.color = color
  }

  public drive(): void {
    console.log('Me go')
  }

  protected honk(): void {
    console.log('Beep Bep')
  }
}

class Car extends Vehicle {
  constructor(public wheels: number, color: string) {
    super(color)
    this.wheels = wheels
  }

  public drive(): void {
    console.log('Zoom Zoom')
  }

  startDriving(): void {
    this.drive()
    this.honk()
  }
}

const vehicle = new Vehicle('Orange')
vehicle.drive()
vehicle.honk() // protected, so it can only be accessed from within the class or children!

const car = new Car(4, 'Red')
car.startDriving() // Has access to honk via protected inheritance

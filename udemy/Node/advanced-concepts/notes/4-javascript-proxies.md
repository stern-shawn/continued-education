Instead of manipulating a library's prototype with our own custom functionality or trying to extend the class with a custom class, we can use the ES6 Proxy object.

Tying it below with this sample greeting code where we pretend the `Greetings` class is from an external library that we want to extend the functionality of, but that we do not want to directly modify either:

```JavaScript
class Greetings {
  english() { return 'Hello'; }
  spanish() { return 'Hola'; }
}

class MoreGreetings {
  german() { return 'Hallo'; }
  japanese() { return 'Konnichiha'; }
}

const greetings = new Greetings();
const moreGreetings = new MoreGreetings();

const allGreetings = new Proxy(moreGreetings, {
  // Here, `target` is moreGreetings
  get: function(target, property) {
    return target[property] || greetings[property];
  },
});

console.log(allGreetings.japanese());
console.log(allGreetings.english());
```

Here we can see that when we try to access a property on the proxy, it attempts to get the property first from the target (`moreGreetings`), and falls back to the original `greetings` implementation if it returns `undefined`, ie. the method isn't implemented in our custom version.

In the context of our testing, this means we can extend the puppeteer Page object in this manner to include our custom login + set cookie logic.

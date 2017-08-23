# Text Decorators
Some *italics*
Also _italics_

Get __bold__
Stay **bold**

This text is ~~terrible~~ great

## Some h2 ipsum
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo commodo commodo. Suspendisse nec nisl id ante bibendum faucibus. Sed lectus tortor, lobortis a erat at, sollicitudin molestie lacus. Praesent faucibus faucibus dolor. Donec dignissim tellus eu nisl vehicula porta. Integer pulvinar purus eget justo maximus sollicitudin. Mauris mauris justo, scelerisque vel nulla a, vehicula laoreet augue. Vivamus vel vulputate sapien, eget luctus nisi.

### H3

Link to my blog with angle brackets: <https://stern-shawn.github.io>

[My Blog With Text as Link](https://stern-shawn.github.io "oh look, I'm hover text!")

[My Blog Using Tokens!][1]

#Images

![Images!](http://unsplash.it/500/500?random "This is a tooltip example")

### Pup pic
![We can use references here just like with links!][puppy]

We can also use an image as a link!

[![](http://unsplash.it/50/50?image=1012)][puppy]

If that syntax is too strange, you can always just use the normal HTML syntax...

[<img src="http://unsplash.it/100/100?image=1012"/>][puppy]

# Lists

Standard unordered list with nesting
- eggs
  - take from chicken
    - avoid getting pecked or something
- milk
- flour

Ordered list, note that you don't need to manually number the elements, the parser will do this for you so you don't need manual updates whenever you change the list order or add new elements out of order...

1. Hey
1. Ho
1. Let's go

Nested OLs + inline content

1. do the first step
    - Sub-step of the first step

        Inline content!
        ![][random100]

        ```js
          const foo = 'bar'
        ```
1. The next step after that...
1. Final step?

#Who Doesn't Like Horizontal Rules?

---

How about quotes?

> You miss 100% of the shots you don't take
>
> -_Wayne Gretzky_

[1]: https://stern-shawn.github.io
[puppy]: http://unsplash.it/500/500?image=1012
[random100]: http://unsplash.it/100/100?random

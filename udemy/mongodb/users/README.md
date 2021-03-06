# MongoDB/Mongoose methods, operators, and testing

In this section of the project, I'm gaining more knowledge of mongoose operations, with the added benefit of working more with Mocha for testing as I go.

Note that as I write schemas, I'm using this convention to differentiate types:

- Collections are capitalized camelcase, ie. Users, BlogPosts, etc

- Subdocuments are normal camelcase, ie. posts

## Topics I hope to learn through this part of the course

- Fleshing out and expanding existing knowledge of CRUD methods with MongoDB/Mongoose library

- Getting more familiarity with update operators ($inc, $set, etc)

- Validation

- Required attributes

- Relational data

- Subdocuments
  - A collection of items directly tied to another collection, as opposed to assosciating relationships with refs (still defined with its own schema)

- Virtual types

- Handling problems like dangling references when a user deletes content that is referenced by other documents in the DB

- Smart Schema Design

- Refs

- Many/HasOne relations

- Populating queries

- Mongoose middleware (ie. pre-save, pre-remove, and similar hooks)

- Pagination

- _TBD..._

## Some bonus learning I didn't really expect

Some tidbits that I learned observing the course or by tinkering with the code outside of the lecture flow (adding in more ES6 or using async/await that aren't covered):

- Flattening Promise chains by returning a new Promise in each preceeding .then(), avoiding the need for deeper and deeper nesting similar to classic _callback hell_...

- IDs in MongoDB are actually of type ObjectId, and aren't actually Strings, making comparison just by === a simple mistake (need to use .toString() on the objects first).

- Want a faster testing experience? :rocket: You can replace it() with it.only() and Mocha will only execute that one test. Great for if you're developing a new test within a larger suite that takes a long time to run and don't want every other test taking up execution time.

- If we're using async/await in a unit test with Mocha, there is no need for the `done` callback as an async function already returns a promise. If you DO pass done to an async test and call it, Mocha will return an error for over-specificity.

- _...more to come..._

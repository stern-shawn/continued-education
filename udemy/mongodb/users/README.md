# MongoDB/Mongoose methods, operators, and testing

In this section of the project, I'm gaining more knowledge of mongoose operations, with the added benefit of working more with Mocha for testing as I go.

## Topics I hope to learn through this part of the course:
- Fleshing out and expanding existing knowledge of CRUD methods with MongoDB/Mongoose library
- Getting more familiarity with update operators ($inc, $set, etc)
- Validation
- Required attributes
- Relational data
- Subdocuments
- Virtual types
- Handling problems like dangling references when a user deletes content that is referenced by other documents in the DB
- Smart Schema Design
- Refs
- Many/HasOne relations
- Populating queries
- Mongoose middleware
- Pagination
- _TBD..._

## Some bonus learning I didn't really expect:
- Flattening Promise chains by returning a new Promise in each preceeding .then(), avoiding the need for depper and deeper nesting similar to classic _callback hell_...
- IDs in MongoDB are actually of type ObjectId, and aren't actually Strings, making comparison just by === a simple mistake (need to use .toString() on the objects first)
- _...more to come..._

const { ObjectId } = require('mongodb');

// Example of how you might be using ObjectId incorrectly
// let id = ObjectId(someId); // Incorrect usage

// Correct usage
let id = new ObjectId(someId); // Ensure 'new' is used 
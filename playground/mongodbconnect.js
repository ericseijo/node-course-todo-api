//const MongoClient = require('mongodb').MongoClient;
//const {MongoClient} = require('mongodb'); // identical
const {MongoClient, ObjectID} = require('mongodb');

// Get object id if we want
// var obj = new ObjectID();
// console.log(obj);

// ES6 destructuring
var user = {name: 'Eric', age: 39};
var {name} = user;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDB Server');

  // db.collection('Todos').insertOne({
  //   text: 'Hang with Julie',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'Eric',
    age: 39,
    location: 'Clearwater'  
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2));
    console.log(result.ops[0]._id);
    console.log(result.ops[0]._id.getTimestamp());
  });

  db.close();
});
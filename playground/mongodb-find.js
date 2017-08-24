const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDB Server');

  // All
  db.collection('Todos').find().toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  // Not completed
  db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    console.log('Not Completed Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  // Get by id
  db.collection('Todos').find({
    _id: new ObjectID('599cdb1c808382c253a496d3')
  }).toArray().then((docs) => {
    console.log('Get by ID');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  // Count
  db.collection('Todos').find().count().then((count) => {
    console.log('Todos count: ' + count);
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  // Not completed
  db.collection('Users').find({name: 'Eric'}).toArray().then((docs) => {
    console.log('User - Eric');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch user', err);
  });
 
  //db.close();
});
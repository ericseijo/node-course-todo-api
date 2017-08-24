const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connect to MongoDB Server');

  // Delete many
  // db.collection('Todos').deleteMany({text: 'Hang with Julie'}).then((result) => {
  //   console.log(result);
  // });

  // Delete one
  // db.collection('Todos').deleteOne({text: 'Hang with Julie'}).then((result) => {
  //   console.log(result);
  // });

  // findONeAndDelete
  // db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name: 'Eric'}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').deleteOne({
    _id: new ObjectID('599e1fce634a8f06ad8da32e')
  }).then((result) => {
    console.log(result);
  });
 
  //db.close();
});
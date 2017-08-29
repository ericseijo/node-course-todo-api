const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove all
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findOneAndRemove({_id: 'abc'}).then((todo) => {
  
});

Todo.findByIdAndRemove('59a4af983306cb0eb329227f').then((todo) => {
  console.log(todo);
});
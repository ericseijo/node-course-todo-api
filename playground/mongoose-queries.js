const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '699f7db80697e417aad260c2';
var userId = '599e3172e31f390a4c2f0ca8';

if (!ObjectID.isValid(id)|| !ObjectID.isValid(userId)) {
  console.log('ID not valid');
}
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by id', todo);
}).catch((e) => console.log(e));

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('User ID not found');
  }
  console.log('User by id', user);
}).catch((e) => console.log(e));
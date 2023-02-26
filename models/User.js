const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      email: true,
    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'thought',
        },
      ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
    ]
  },
  {
    toJSON: {
        virtuals: true,
    },
  },
);

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length
  });


const User = model('user', userSchema);

module.exports = User;

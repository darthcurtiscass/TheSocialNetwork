const { ObjectId } = require('bson');
const { timeStamp } = require('console');
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            length: [,280]
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: timeStamp,
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

module.exports = reactionSchema
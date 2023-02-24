const { ObjectId } = require('bson');
const { timeStamp } = require('console');
const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: ObjectId,
            default: ObjectId
        },
        reactionBody: {
            type: String,
            require: true,
            length: [,280]
        },
        username: {
            type: String,
            require: true
        },
        createdAt: {
            type: Date,
            default: timeStamp,
        }
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

reactionSchema
const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            length: [1, 280],
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        username: {
            type: String,
            require: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length
    })

    const Thought = model('thought', thoughtSchema);

    module.exports = Thought;
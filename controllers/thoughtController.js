const {ObjectId} = require('mongoose').Types;
const { User, Thought} = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
            .then(async (thoughtData) => {
                const thoughts = {
                    thoughtData
                }
                return res.json(thoughts)
            })
    },

    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId})
        .select('-__v')
        .then(async (thought) =>
            !thought
                ? res.status(404).json({message: "no thought found by that id"})
                : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    {$addToSet: {thoughts: thought._id}},
                    {new: true}
            )}
            )
            .then((user) =>
                !user
                    ? res.status(404).json({message: "Thought wasn't associated with a user. Try again"})
                    : res.status(200).json("Thought posted and tied to user.")
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            })
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            // {$pull: { thoughts,  }},
            {runValidators: true, new: true}
        )
        .then((updatedThought) => !updatedThought ? res.status(404).json({message: "wrong update"})
        : res.status(200).json(updatedThought)
        )
        .catch((err) => res.status(500).json(err))
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((deletedThought) => 
            !deletedThought 
            ? res.status(404).json({message: "no Thought by that id"})
            : res.json({ message: 'thought erased'})
            )
            .catch((err) => res.status(500).json(err))
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
        )
            .then((thoughtReaction) => 
                !thoughtReaction
                ? res.status(404).json({message: "no Reaction found"})
                : res.status(200).json(thoughtReaction)
                )
                .catch((err) => res.status(500).json(err));
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reaction: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
            .then((thoughtReaction) => 
                !thoughtReaction
                ? res.status(404).json({message: "no Reaction found"})
                : res.status(200).json(thoughtReaction)
                )
                .catch((err) => res.status(500).json(err));
    }

};
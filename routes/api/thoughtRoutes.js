const router = require('express').Router();
const {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction)

    router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;

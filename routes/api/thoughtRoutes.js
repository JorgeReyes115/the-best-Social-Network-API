const router = require("express").Router();

const {
    getThoughts,
    oneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/thoughtId").get(oneThought).delete(deleteThought).put(updateThought);

router.route("/ThoughtId/reactions").post(addReaction);

router.route("/ThoughtId/reactions/reactionId").delete(deleteReaction);

module.exports = router;
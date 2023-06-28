const router = require("express").Router();

const {
    getUsers,
    oneUser,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,

} = require("../../controllers/userController");

router.route("/").get(getUsers).post(addUser);

router.route("/:userId").get(oneUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:freindId").post(addFriend).delete(deleteFriend)

module.exports = router;
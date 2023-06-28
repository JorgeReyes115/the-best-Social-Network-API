const {Thought, User} = require("../models");

module.exports = {
  //get all users
  async getUsers(req, res) {
    try {
        const allUsers = await User.find({});
        res.json(allUsers);
    } catch (err) {
        return res.status(500).json(err);
    }
    },

    //get one user
    async oneUser(req, res) {
        try {
            const oneUser = await User.findOne({_id: req.params.UserId});
            if (!oneUser) {
                return res.status(404).json({message: "no user with that ID"})
            }

            res.json(oneUser);
        }catch (err) { 
            res.status(500).json(err);
        }
    },

    // add new user
    async addUser(req, res) {
        try {
            const createUser = await User.create(req.body);
            if (!createUser) {return res.status(404).json(err);
            }
            res.json(createUser);
        }catch (err) {
            res.status(500).json(err)
        }
    },

    //update user


    async updateUser(req, res) {
        try{
            const updatedU = await User.findOneAndUpdate(
                {_id: req.params.id},
                {$addToSet: {reactions:body} },
                {new: true}
            );

            if (!updatedU) {return res.status(404).json(err);
            }
            res.json(updatedU)
        }catch (err) {
            res.status(500).json(err);
        }
    },

    //delete user

    async deleteUser(req, res) {
        try {
            const deletedU = await User.findOneAndDelete({_id: req.params.userId});
            res.json(deletedU)
         
            const userName = User.userName;
            const thoughtsDelete = await Thought.deleteMany({username: userName})
            if(!thoughtsDelete) {
                return;
            }

        }catch (err) {
            res.status(500).json(err);     
        }
    },


    //add friend
    async addFriend(req, res) {
        try {
            const newFreind = await User.findOneAndUpdate(
                {_id: req.params.UserId},
                {$push: {friends: req.params.friendId}},
                {new: true}
             );
    
             res.json(newFreind);
            } catch (err) {
                res.status(500).json(err)
            }
    },

    //delete friend


    async deleteFriend(req, res) {
        try {
            const dltFriend = await USer.findOneAndUpdate(
                {_id: req.params.UserId},
                {$pull: { friends: {_id: friendId}} },
                {new: true}
             );
    
             res.json(dltFriend);
            } catch (err) {
                res.status(500).json(err)
            }
        },
}
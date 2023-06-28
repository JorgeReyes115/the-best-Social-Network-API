const {Thought, User} = require("../models");

module.exports = {

//get all thoughts
    async getThoughts(req, res) {
        try{
            const allThoughts = await Thought.find();
            res.json(allThoughts);
        } catch(err){
            res.status(500).json(err);
        }
    },

 //get one thought
    async oneThought(req, res) {
        try {
            const oneThought = await Thought.findOne({_id: req.params.thoughtId});
            if (!oneThought) {
                return res.status(404).json({message: "no thought with that ID"})
            }

            res.json(oneThought);
        }catch (err) { 
            res.status(500).json(err);
        }
    },

 //add a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: {thoughts: thought._id} },
                {new: true}
            );

            if(!user) {
                return res.status(404).json({message:"no user found for that created thought" });
            }
            res.json(thought);
        }catch (err) {
            console.log(err);
            res.status(500).json(err);
        }   
    },

 //update a thought

 async updateThought(req, res) {
    try{
        const updated = await Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$addToSet: {reactions:body} },
            {new: true}
        );
        res.json(updated)
      }catch (err) {
        res.status(500).json(err);
     }
    },

 // delete thought

    async deleteThought(req, res) {
        try {
            const deleted = await Thought.findOneAndDelete({_id: req.params.thoughtId});
            res.json(deleted)
        }catch (err) {
            res.status(500).json(err);     
        }
    },

 // add reaction
 
 async addReaction(req, res) {
    try {
        const newReaction = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {new: true}
         );

         res.json(newReaction);
        } catch (err) {
            res.status(500).json(err)
        }
    },


 //delete reaction

 async deleteReaction(req, res) {
    try {
        const dltReaction = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: { reactions: {_id: reactionId}} },
            {new: true}
         );

         res.json(dltReaction);
        } catch (err) {
            res.status(500).json(err)
        }
    },





    
}
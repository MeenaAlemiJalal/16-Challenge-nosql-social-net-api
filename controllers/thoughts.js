const Thought = require('../models/thought');
const User = require('../models/user');

const thoughts = {

    createThought: (req, res) => {
        Thought.create(req.body)
        .then(({_id}) => {
            return User.findOneAndUpdate({ _id: req.params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(thoughtsData => {
            if(!thoughtsData) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
            res.json(thoughtsData)
        })
        .catch(err => res.json(err)); 
    },

    getAllThoughts: (req,res) => {
        Thought.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(thoughtsData => res.json(thoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getThoughtById: (req, res) => {
        Thought.findOne({ _id: req.params.id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(thoughtsData => {
            if(!thoughtsData) {
            res.status(404).json({message: 'No thoughts with this ID!'});
            return;
        }
        res.json(thoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    updateThought: (req, res) => {
        Thought.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(thoughtsData => {
            if (!thoughtsData) {
                res.status(404).json({message: 'No thoughts with this ID!'});
                return;
            }
                res.json(thoughtsData);
        })
        .catch(err => res.json(err));
    },

    // Delete a current thought by ID
    deleteThought: (req, res) => {
        Thought.findOneAndDelete({_id: req.params.id})
        .then(thoughtsData => {
            if (!thoughtsData) {
                res.status(404).json({message: 'No thoughts with this ID!'});
                return;
            }
            res.json(thoughtsData);
            })
            .catch(err => res.status(400).json(err));
    },

    addReaction: (req, res) => {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$push: {reactions: req.body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(thoughtsData => {
        if (!thoughtsData) {
            res.status(404).json({message: 'No thoughts with this ID!'});
            return;
        }
        res.json(thoughtsData);
        })
        .catch(err => res.status(400).json(err))

    },

    deleteReaction: (req, res) => {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: {reactionId: req.params.reactionId}}}, {new : true})
        .then(thoughtsData => {
            if (!thoughtsData) {
                res.status(404).json({message: 'No thoughts with this ID!'});
                return;
            }
            res.json(thoughtsData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = thoughts;
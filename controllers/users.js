const User = require('../models/user');

const users = {
    
    createUser: (req, res) => {
        User.create(req.body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },

    getAllUsers: (req, res) =>{
        User.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getUserById: (req, res) => {
        User.findOne({_id: req.params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(userData => {
            if(!userData) {
                res.status(404).json({message: 'No User with this ID!'});
                return; 
            }
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    updateUser: (req, res) => {
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(userData => {
            if(!userData) {
                res.status(404).json({message: 'No User with this ID!'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.json(err))
    },

    deleteUser: (req, res) => {
        User.findOneAndDelete({_id: req.params.id})
        .then(userData => {
            if(!userData) {
                res.status(404).json({message: 'No User with this ID!'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend: (req, res) => {
        User.findOneAndUpdate({_id: req.params.id}, {$push: { friends: req.params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(userData => {
            if (!userData) {
                res.status(404).json({message: 'No User with this ID!'});
                return;
            }
        res.json(userData);
        })
        .catch(err => res.json(err));
    },

    deleteFriend: (req, res) => {
        User.findOneAndUpdate({_id: req.params.id}, {$pull: { friends: req.params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(userData => {
            if(!userData) {
                res.status(404).json({message: 'No User with this ID!'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    }

}

module.exports = users; 
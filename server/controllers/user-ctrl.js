const User = require('../models/user-model');

//createUser, updateUser, deleteUser, getUserById, getUsers

/**
 *
 * Create User function will create a user
 * It creates a user based on what is sent through the body
 * It will then save the user
 * If it succeeds it will then send a message back saying user created
 * If it fails it will then send a message back saying User not created
 *
 */
createUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user'
        });
    }

    const user = new User(body);

    if (!user) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: "User created!"
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: "User not created"
            })
        })
}

/**
 *
 * Update User function will update the specific User
 * To find the user to update the findOne function is called which requires the id of the user
 * If a user with that id is found then the user details are updated with the details submitted in the body
 * The user is then saved
 *
 */

updateUser = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user'
        });
    }

    User.findOne({_id: req.params.id}, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!'
            })
        }

        user.name = body.name;
        user.dob = body.dob;
        user.phone = body.phone;
        user.username = body.username;
        user.password = body.password;
        user.posts = body.posts;

        User
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: "User updated!"
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: "User not updated"
                })
            })
    })
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({_id: req.params.id}, (err, user) => {
        if (err) {
            return res.status(400).json( {success: false, error: err});
        }
        if (!user) {
            return res.status(404).json( { success:false, error: "User not found"});
        }

        return res.status(200).json( {success:true, data:user})
    }).catch(err => console.log(`Error: ${err}`));
}

getUserById = async (req, res) => {
    await User.findOne({_id: req.params.id}, (err, user) => {
        if (err) {
            return res.status(400).json( {success: false, error: err});
        }
        if (!user) {
            return res.status(404).json( { success:false, error: "User not found"});
        }

        return res.status(200).json({ success: true, data: user});
    }).catch(err => console.log(`Error: ${err}`));
}

getUsers = async (req,res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (users.length == null) {
            return res.status(400).json( {success: false, error: "Movie not found"});
        }

        return res.status(200).json( {success: true, data: users});
    }).catch(err => console.log(`Error: ${err}`));
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUsers
}

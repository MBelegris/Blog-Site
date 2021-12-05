const User = require('../models/user-model');
const logger = require('../Logger');

createUser = async (req, res) => {
    logger.info('Attempting user creation');
    const body = req.body;

    if (!body) {
        logger.error('Failed user creation as no user was provided');
        return res.status(400).json({success: false, error: 'You must provide a user'});
    }

    const user = new User(body);

    if (!user) {
        logger.error(`Failed user creation: ${err}`);
        return res.status(400).json({success: false, error: err});
    }

    await User.findOne({username: body.username}, (err, userCheck) => {

        if (!userCheck) {
            user
                .save()
                .then(() => {
                    logger.info('Successful user creation');
                    return res.status(201).json({success: true, id: user._id, message: 'User created!'});
                })
                .catch(error => {
                    logger.error(`Failed user creation`);
                    return res.status(400).json({error, message: 'User not created!'});
                });
        } else {
            logger.error(`Failed user creation, username already exists`);
            return res.status(201).json({success: false, message: 'User not created, username already exists!'});
        }
    });
}

updateUser = async (req, res) => {
    logger.info('Attempting to update user');
    const body = req.body;

    if (!body) {
        logger.error(`Failed to update user as no body was provided`);
        return res.status(400).json({success: false, error: 'You must provide a body to update'});
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            logger.error(`Failed to update user as no user was found`);
            return res.status(404).json({err, message: 'User not found!'});
        }
        user.name = body.name;
        user.dob = body.dob;
        user.phone = body.phone;
        user.username = body.username;
        user.password = body.password;

        user
            .save()
            .then(() => {
                logger.info('Successfully updated user');
                return res.status(200).json({success: true, id: user._id, message: 'User updated!'});
            })
            .catch(error => {
                logger.error('Failed to update user');
                return res.status(404).json({error, message: 'User not updated!'});
            });
    });
}

deleteUser = async (req, res) => {
    logger.info("Attempting user deletion");
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            logger.error(`Failed to delete user: ${err}`);
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            logger.error(`Failed to delete user: no user found`);
            return res.status(404).json({ success: false, error: `User not found` });
        }

        logger.info("Successful user deletion");
        return res.status(200).json({ success: true, data: user });
    }).catch(err => {
        logger.error(`Failed to delete user: ${err}`);
        console.log(err)
    });
}

getUserById = async (req, res) => {
    logger.info("Attempting to find user by ID");
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            logger.error(`Failed to find user: ${err}`);
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            logger.error(`Failed to delete user: User not found`);
            return res.status(404).json({ success: false, error: `User not found` });
        }
        logger.info("Found user");
        return res.status(200).json({ success: true, data: user });
    }).catch(err => {
        logger.error(`Failed to find user: ${err}`);
        console.log(err)
    });
}

getUserByUsernamePwd = async (req, res) => {
    logger.info("Attempting to find user by Username and Password");
    await User.findOne({ username: req.params.username, password: req.params.password }, (err, user) => {
        if (err) {
            logger.error(`Failed to find user: ${err}`);
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            logger.error(`Failed to find user: User not found`);
            return res.status(404).json({ success: false, error: `User not found` });
        }
        logger.info("Found user");
        return res.status(200).json({ success: true, data: user });
    }).catch(err => {
        logger.error(`Failed to find user: ${err}`);
        console.log(err);
    });
}

getUsers = async (req, res) => {
    logger.info('Attempting to get all users');

    await User.find({}, (err, users) => {
        if (err) {
            logger.error(`Failed to get all users: ${err}`);
            return res.status(400).json({ success: false, error: err });
        }
        if (!users.length) {
            logger.error('Failed to get all users: Users not found');
            return res.status(404).json({ success: false, error: `User not found` });
        }
        return res.status(200).json({ success: true, data: users });
    }).catch(err => {
        logger.error(`Failed to get users: ${err}`);
        console.log(err)
    });
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
    getUserByUsernamePwd
}
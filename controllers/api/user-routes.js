const router = require('express').Router();
const { User, Post, Vote } = require("../../models");

//GET /api/users
router.get('/', (req, res) => {
    //access our User modal and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    }) //->findAll is the same as SELECT*FROM users;
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
            //set up the API endpoint so that when the client makes a GET request to /api/users
            //we will select all users from the user table in the database and send it back as JSON
        })
});

//GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {//to indicate we want to find a user where its id value equals whatever req.params.id is
            id: req.params.id //SELECT*FROM users WHERE id = 1
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'title', 'post_url', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ]
    })
        .then(dbUserData => {// if there is no user with that Id
            if (!dbUserData) {
                res.status(404).json({ message: 'NO user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//POST /api/users
router.post('/', (req, res) => {
    //expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({ //To insert data, we can use Sequelize's .create() method.
        username: req.body.username,  // INSERT INTO users (username, email, password)
        email: req.body.email,        //VALUES ('lerantino', 'lerantino@gmail.com', 'password1234');
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    //expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        //res.json({ user: dbUserData});
        //verify user
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        res.json({ user: dbUserData, message: 'You are now logged in!' });
    })
});
//The .findOne() Sequelize method looks for a user with the specified email. 
//The result of the query is passed as dbUserData to the .then() part of the .findOne() method. 
//If the query result is successful (i.e., not empty), we can call .checkPassword(), which will be on the dbUserData object. 
//We'll need to pass the plaintext password, which is stored in req.body.password, into .checkPassword() as the argument.
//The .compareSync() method, which is inside the .checkPassword() method, can then confirm or deny that the supplied password matches the hashed password stored on the object. 
//.checkPassword() will then return true on success or false on failure. 
//We'll store that boolean value to the variable validPassword.

//PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        //This .update() method combines the parameters for creating data and looking up data.
        individualHooks: true,
        where: {
            id: req.params.id
            //We pass in req.body to provide the new data we want to use in the update and req.params.id to indicate where exactly we want that new data to be used.
            //UPDATE users
            //SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
            //WHERE id = 1;
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//DELETE /api/users/1
router.delete('/:id', (req, res) => {
    //use the .destroy() method and provide some type of identifier to indicate where exactly we would like to delete data from the user database table.
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;
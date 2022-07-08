const router = require('express').Router();
const { User } = require('../../models');

//GET /api/users
router.get('/', (req, res) => {
    //access our User modal and run .findAll() method
    User.findAll( {
        attributes: { exclude: ['password']}
    }) //->findAll is the same as SELECT*FROM users;
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
//set up the API endpoint so that when the client makes a GET request to /api/users
//we will select all users from the user table in the database and send it back as JSON
    })
});

//GET /api/users1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {//to indicate we want to find a user where its id value equals whatever req.params.id is
            id: req.params.id //SELECT*FROM users WHERE id = 1
        }
    })
    .then(dbUserData => {// if there is no user with that Id
        if(!dbUserData) {
            res.status(404).json({message: 'NO user found with this id'});
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

//PUT /api/users/1
router.put('/:id', (req, res) => {
// expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
// if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
//This .update() method combines the parameters for creating data and looking up data.
        where: {
            id: req.params.id
//We pass in req.body to provide the new data we want to use in the update and req.params.id to indicate where exactly we want that new data to be used.
//UPDATE users
//SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
//WHERE id = 1;
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({message: 'No user found with this id'});
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
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'});
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
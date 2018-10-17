const router = require('express').Router();
const sequelize = require('../db');
const validateSession = require('../middleware/validate-session');
const User = sequelize.import('../models/user');
const Wine = sequelize.import('../models/wine');
const ListNameModel = sequelize.import('../models/list_name');
const UserFavoritesModel = sequelize.import('../models/user_favorite');

/* GET ALL LISTS */
router.get('/all', validateSession, (req, res) => {
    ListNameModel.findAll()
        .then(list => res.status(200).json(list))
        .catch(err => res.status(500).json({ err: err }))
});

/* GET A SPECIFIC LIST */
router.get('/:id', validateSession, (req, res) => {
    let listid = req.params.id
    
    ListNameModel
    .findOne({
        where: { id: listid }
    }).then(
        function findSuccess(data) {
            res.json(data);
        },
        function findError(err) {
            res.send(500, err.message)
        }
    )
});

/* CREATE A LIST */
router.post('/create', validateSession, (req, res) => {
    if (!req.errors) {
        const title = {
            title: req.body.list_name.title
        }
        
        ListNameModel.create(title)
            .then(list => res.status(200).json(list))
            .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
});


module.exports = router;




const router = require('express').Router();
const sequelize = require('../db');
const validateSession = require('../middleware/validate-session');
const User = sequelize.import('../models/user');
const Wine = sequelize.import('../models/wine');
const UserFavoritesModel = sequelize.import('../models/user_favorite');

/*******************************
* BASE ROUTE is /userfavorites *
*******************************/

/* GET ALL USER LISTS */
router.get('/all', function(req, res) {
    let userid = req.user.id;
    
    UserFavoritesModel
    .findAll({
        where: { user_id: userid }
    }).then(
        function findSuccess(data) {
            res.json(data);
        },
        function findError(err) {
            res.send(500, err.message)
        }
    )
});

/* GET SPECIFIC USER LIST */
router.get('/:id', function(req, res) {
    let data = req.params.id;
    let userid = req.user.id;
    
    UserFavoritesModel
    .findOne({
        where: { id: data, user_id: userid }
    }).then(
        function findSuccess(data) {
            res.json(data);
        },
        function findError(err) {
            res.send(500, err.message)
        }
    );
});

/* CREATE A USER LIST */
router.post('/create/:wineid/list/:listid', validateSession, function(req, res) {
    let userid = req.user.id
    let wineid = req.params.wineid 
    let listid = req.params.listid 
     
    UserFavoritesModel
    .create({
        user_id: userid,
        wine_id: wineid,
        list_id: listid
    }).then(
        function createSuccess(data) {
            res.json(data)
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
});

/* UPDATE A WINE TO USER FAVORITES LIST */
router.put('/:id/wines/:wineid', function(req, res) {
    let userlist = req.params.id
    let wineid = req.params.wineid
    
    UserFavoritesModel 
    .update({
        wine_id: wineid
    },
    {where: {id: userlist}}
    ).then(
        function updateSuccess(updatedWine) {
            res.json({
                wine_id: wineid
            });
        },
        function updateError(err) {
            res.send(500, err.message)
        }
    )
});

/* DELETE A USER FAVORITES LIST */
router.delete('/delete/:id', function(req, res) {
    let userFavoritesInstance = req.params.id
    let userid = req.user.id
    
    UserFavoritesModel
    .destroy({
        where: { id: userFavoritesInstance, user_id: userid }
    }).then(
        function deleteSuccess(data) {
            res.send("Table Deleted!")
        },
        function deleteError(err) {
            res.send(500, err.message);
        }
    );
});

/* DELETE A WINE FROM USER FAVORITES LIST */
router.delete('/delete/:id/wines/:wine_id', function(req, res) {
    let userFavoritesInstance = req.params.id
    let wineid = req.params.wine_id
    let userid = req.user.id
    
    UserFavoritesModel
    .destroy({
        where: { id: userFavoritesInstance, user_id: userid, wine_id: wineid }
    }).then(
        function deleteSuccess(data) {
            res.send("You removed a wine.")
        },
        function deleteError(err) {
            res.send(500, err.message)
        }
    )
});

/* GET ALL DATA ASSOCIATED WITH LIST ID */
router.get('/lists/:list_id', validateSession, (req, res) => {
    let listid = req.params.list_id
    
    UserFavoritesModel
    .findAll({
        where: { list_id: listid },
        include: ["wines"]
    }).then(
        function findSuccess(data) {
            res.json(data)
        },
        function findError(err) {
            res.send(500, err.message)
        }
    )
})



module.exports = router;
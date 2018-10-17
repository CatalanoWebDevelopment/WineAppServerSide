const router = require('express').Router();
const sequelize = require('../db');
const validateSession = require('../middleware/validate-session')
const WineTestModel = sequelize.import('../models/wine');

/* GET ALL WINES */
router.get('/all', function(req, res) {
    WineTestModel.findAll() 
        .then(wine => res.status(200).json(wine))
        .catch(err => res.status(500).json({ err: err }))
});

/* CREATE A WINE */
router.post('/create', validateSession, (req, res) => {
    if (!req.errors) {
        const wineFromRequest = {
            vintage: req.body.wine.vintage,
            color: req.body.wine.color,
            apellation: req.body.wine.apellation,
            country: req.body.wine.country,
            score: req.body.wine.score,
            confidence_index: req.body.wine.confidence_index,
            region: req.body.wine.region,
            name: req.body.wine.name
        }
        
        WineTestModel.create(wineFromRequest)
            .then(wine => res.status(200).json(wine))
            .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
});

/* GET A SPECIFIC WINE */
router.get('/:id', (req, res) => {
    WineTestModel.findOne({ where: { id: req.params.id }})
        .then(wine => res.status(200).json(wine))
        .catch(err => res.status(500).json({ error: err }))
});
 
/* DELETE A SPECIFIC WINE */ 
router.delete('/delete/:id', validateSession, (req, res) => {
    if (!req.errors) {
        WineTestModel.destroy({ where: { id: req.params.id }})
            .then(wine => res.status(200).json(wine))
            .catch(err => res.status(500).json({ error: err }))
    } else {
        res.status(500).json(req.errors)
    }
}); 

/* UPDATE A SPECIFIC WINE */
router.put('/update/:id', validateSession, (req, res) => {
     if(!req.errors) {
         WineTestModel.update(req.body.wine, { where: { id: req.params.id }})
            .then(wine => res.status(200).json(wine))
            .catch(err => res.status(500).json({ error: err }))
     } else {
         res.status(500).json(req.errors)
     }
});

module.exports = router;
const router = require('express').Router();
const { models: { Character, Description } } = require('../db/index');

router.get('/characters', async(req, res, next) => {
    try {
        res.send(await Character.findAll());
    }
    catch(ex) {
        next(ex);
    }
});

router.get('/characters/:id/description', async(req, res, next) => { 
    try {
        res.send(await Description.findAll({
            where: {
                characterId: req.params.id
            }
        }))
    }
    catch(ex) {
        next(ex);
    }
});

module.exports = router;
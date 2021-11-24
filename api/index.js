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

router.get('/descriptions', async(req, res, next) => {
    try {
        res.send(await Description.findAll());
    }
    catch(ex) {
        next(ex);
    }
});

// add companions - need to update model

// router.get('/characters/:id/companion', async(req, res, next) => {
//     try {
//         res.send(await Companion.findAll({
//             where: {
//                 userId: req.params.id
//             },
//             include: [
//                 Description
//             ]
//         }))
//     }
//     catch(ex) {
//         next(ex)
//     }
// })

module.exports = router;
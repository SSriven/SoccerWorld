var express = require('express');
var router = express.Router();
const recommendCon = require("../controller/users_recommends")


router.get('/', (req, res, next) => {
    let userphone = req.query.userphone;
    recommendCon.getRecommendsByUserId(userphone).then(result => {
        res.json(result)
    }).catch(err => res.json(err))
})

module.exports = router;
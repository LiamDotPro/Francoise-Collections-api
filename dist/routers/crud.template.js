'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _restifyRouter = require('restify-router');

var router = new _restifyRouter.Router();

router.get('/', function (req, res, next) {
    res.send({});
    next();
});

router.post('/', function (req, res, next) {
    res.send({});
    next();
});

exports.default = router;
//# sourceMappingURL=crud.template.js.map
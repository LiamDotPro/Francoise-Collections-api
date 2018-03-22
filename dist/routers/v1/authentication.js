'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _restifyRouter = require('restify-router');

var router = new _restifyRouter.Router();

router.get('/login', function (req, res, next) {
    res.send({ message: 'This is a test!' });
    next();
});

router.get('/login', function (req, res, next) {
    res.send({ message: 'This is a test!' });
    next();
});

exports.default = router;
//# sourceMappingURL=authentication.js.map
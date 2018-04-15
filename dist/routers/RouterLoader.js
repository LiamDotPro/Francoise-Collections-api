'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadRouters = loadRouters;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routerDir = _fs2.default.readdirSync('./routers/v1');

/**
 * Loads all of the router modules.
 * @param app
 */
function loadRouters(app) {

    var foundModuleNames = routerDir.map(function (el) {
        return {
            routePrefix: '/v1/' + el.split('.')[0],
            route: './v1/' + el.split('.')[0] + '.js'
        };
    });

    foundModuleNames.forEach(function (el) {
        var router = require(el.route);
        app.use(el.routePrefix, router.default);
    });
}
//# sourceMappingURL=RouterLoader.js.map
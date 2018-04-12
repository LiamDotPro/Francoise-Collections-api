import fs from 'fs';

let routerDir = fs.readdirSync('./routers/v1');

/**
 * Loads all of the router modules.
 * @param app
 */
export function loadRouters(app) {

    let foundModuleNames = routerDir.map((el) => {
        return {
            routePrefix: '/v1/' + el.split('.')[0],
            route: './v1/' + el.split('.')[0] + '.js'
        };
    });

    foundModuleNames.forEach((el) => {
        let router = require(el.route);
        app.use(el.routePrefix, router.default);
    });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setup = setup;
var sio = require('socket.io');

var io = exports.io = null;

/**
 * Takes a restify server as parameter and constructs a new instance of socketio server which lives within the module.
 * @param server
 */
function setup(server) {
    exports.io = io = sio.listen(server.server);

    console.log('Socket Server Enabled');

    io.on('connection', function (socket) {
        console.log('A client has connected!');
    });
}
//# sourceMappingURL=io.js.map
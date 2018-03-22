let sio = require('socket.io');

export let io = null;

/**
 * Takes a restify server as parameter and constructs a new instance of socketio server which lives within the module.
 * @param server
 */
export function setup(server) {
    io = sio.listen(server.server);

    console.log('Socket Server Enabled');

    io.on('connection', (socket) => {
        console.log('A client has connected!');
    })
}
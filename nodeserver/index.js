const io = require("socket.io")(8000, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"]
    }
});

const users = {};

io.on('connection', socket => {
    const { id } = socket;

    socket.on('new-user-joined', name => {
        console.log(name);
        users[id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message, name: users[id] });
    });

    socket.on('disconnect', () => {
        const userName = users[id];
        if (userName) {
            socket.broadcast.emit('left', userName);
            delete users[id];
        }
    });
});

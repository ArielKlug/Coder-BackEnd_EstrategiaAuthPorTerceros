
const socket = io()





socket.emit('message', 'todo bien')
socket.emit('newMessage', )
socket.on('newMessage2', (data) => {
    console.log('hola')
})




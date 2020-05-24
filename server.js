
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 4001

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('New client connected')

  socket.on('enter', async (term) => {

    socket.join(term);
    io.to(term).emit("enter", term); 

   
      // What needs to be done, is pass in the room as a parameter, so them 
      // IT knows what to send over
    

});

        socket.on('change color', (color, room) => {
          io.to(room).emit('change color', color)
        })
        
   
        socket.on('search', (result, room) => {
         
          io.to(room).emit('search', result)
        })

        socket.on('select', (video, room) => {
          io.to(room).emit('select', video)
        })

        socket.on('play', (state, room) => {
          io.to(room).emit('play',state)
        })

        socket.on('newTime', (newTime, room) => {
          io.to(room).emit('newTime',newTime)
        })
       
        socket.on('disconnect', () => {
          console.log('user disconnected')
        })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
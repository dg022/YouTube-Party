
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

      socket.on('enter', (term) => {
        ///io.sockets.emit('enter', term); 
        console.log(term); 
      })
      

 
        socket.on('change color', (color) => {
          io.sockets.emit('change color', color)
        })
        
   
        socket.on('search', (result) => {
          io.sockets.emit('search', result)
        })

        socket.on('select', (video) => {
          io.sockets.emit('select', video)
        })

        socket.on('play', (state) => {
          io.sockets.emit('play',state)
        })

        socket.on('newTime', (newTime) => {
          io.sockets.emit('newTime',newTime)
        })
       
        socket.on('disconnect', () => {
          console.log('user disconnected')
        })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
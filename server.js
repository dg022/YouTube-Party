
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
var room; 
// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('New client connected')

  socket.on('enter', async (term) => {

    socket.join(term);
    io.to(term).emit("enter", term); 
    room = term; 
   
      
    

});

     // socket.on('enter', function(term) {
      
        
    
       //   console.log(term); 

          
         // socket.join(1); 
         //console.log(Object.keys(socket.rooms))
          //io.sockets.in(term).emit('enter', term); 
         
          //io.to(1).emit('enter', term); 
          
        
        

        //io.in(term).emit('enter', term);


        //room = term;


        
     // })
      
    
 
        socket.on('change color', (color) => {
          io.to(room).emit('change color', color)
        })
        
   
        socket.on('search', (result) => {
          console.log("I WAS CALLED AFTER THE SEARCH QEURY")
          console.log(room); 
          io.to(room).emit('search', result)
        })

        socket.on('select', (video) => {
          io.to(room).emit('select', video)
        })

        socket.on('play', (state) => {
          io.to(room).emit('play',state)
        })

        socket.on('newTime', (newTime) => {
          io.to(room).emit('newTime',newTime)
        })
       
        socket.on('disconnect', () => {
          console.log('user disconnected')
        })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
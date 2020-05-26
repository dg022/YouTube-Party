
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
var mongoose = require("mongoose");
const config = require("./config/config.js"); 


mongoose.connect(config.KEY, { useNewUrlParser: true });

var Schema    =   mongoose.Schema;
var Users = new Schema({ // example from docs
    code         :   {
        type        :   String,
        require     :   true
    }
});

var a = 1; 
// This is equivlnet to the TANKl 
var Codes = mongoose.model('Codes', Users);

//var newUser = new Codes({"code":"A"}); // you also need here to define _id since, since you set it as required.
//newUser.save(function(err, result){
  //  if(err){
    //    console.log('>>>>>> Error');
    //}else{
      //  console.log('>>>>>> ' + JSON.stringify(result, null, 4));
   // }
//});

//Codes.deleteOne({ code: 'A' }, function (err) {
  //if (err) console.log(err); 
  // deleted at most one tank document
//});



// our localhost port
const PORT = process.env.PORT || 8080;

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)




// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('New client connected')

  socket.on('enter', async (term) => {
    // If it is in the database, then allow the socket to join the room
      if(await Codes.exists({ code: term })){

        // Code exists, allow the user into the room
        console.log("The room name exists.. joining room")
        socket.join(term);
        io.to(term).emit("enter", term); 
      }else{
        // Code does not exist, Alert to the user who emmited, that 
        // They entered a code that does not exist

        //var newUser = new Codes({"code":term}); // you also need here to define _id since, since you set it as required.
        //newUser.save(function(err, result){
            //if(err){
              //  console.log('>>>>>> Error');
            //}else{
              //  console.log('>>>>>> ' + JSON.stringify(result, null, 4));
          // }
        //}); 
        socket.emit("enter", "FAIL"); 
        console.log("ROOM DOES NOT EXIST");
      }  

});


socket.on('createRoom', async () => {
  
  console.log("right here")
  //createRoom is called, when the user clciks the create Session button. 
  // Here we need to generate some kind of number, and set it as the code. This is the roomName/code to join 
      var term =  Math.floor(Math.random() * 100000); 
      var newUser = new Codes({"code":term}); // you also need here to define _id since, since you set it as required.
      newUser.save(function(err, result){
          if(err){
              console.log('>>>>>> Error');
          }else{
              console.log('>>>>>> ' + JSON.stringify(result, null, 4));
         }
      }); 
      
      socket.join(term);
      io.to(term).emit("enter", term); 
    

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

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
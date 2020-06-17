
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
var mongoose = require("mongoose");
const config = require("./config/config.js"); 
const cons =  config.KEY; 
 
//process.env.MONGO ||

const bodyParser = require('body-parser')
const path = require('path');
var app = express()
  , server = require('http').createServer(app)
  , io =  require('socket.io').listen(server)

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});





mongoose.connect(cons, { useNewUrlParser: true });

var Schema    =   mongoose.Schema;
var Users = new Schema({ // example from docs
    code         :   {
        type        :   String,
        require     :   true
    }, 

    //members         :   {
     // type        :   [String],
      //require     :   true
  //},

  members         :   {
    type        :   Map,
    of: String,
    require     :   true
},


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


// our server instance


// This creates our socket using the instance of the server

var currentRoomId;

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('New client connected')

  socket.on('enter', async (term) => {
    // If it is in the database, then allow the socket to join the room
      if(await Codes.exists({ code: term })){

        // Code exists, allow the user into the room
        console.log("The room name exists.. joining room")
        socket.join(term);
        io.to(term).emit("enter", term, socket.id); 
         currentRoomId = term; 
      }else{
        socket.emit("enter", "FAIL"); 

        
      }  

});




socket.on('createRoom', async () => {
  
 

  //createRoom is called, when the user clciks the create Session button. 
  // Here we need to generate some kind of number, and set it as the code. This is the roomName/code to join 
      var term =  Math.floor(Math.random() * 100000); 
      var newUser = new Codes({"code":term, "members":{}}); // you also need here to define _id since, since you set it as required.
      newUser.save(function(err, result){
          if(err){
              console.log('>>>>>> Error');
          }else{
              console.log('>>>>>> ' + JSON.stringify(result, null, 4));
         }
      }); 
      
      socket.join(term);
      currentRoomId = term; 
      io.to(term).emit("enter", term, socket.id); 
    

});

      // Emit newMember 
      socket.on('newMember', async (name, ID, room) =>{

        // Right here, we want to make a query to the room, get the room and memers arraym, push the new member, and give it back as an array

        const doc = await Codes.findOne({code:room});
        var newList  = doc.members; 
       
        newList.set(ID, name); 
        doc.members =  newList;
        
         newList = [...newList.values()]
         


        await doc.save(); 
        

        // Here we have pushed a newMember to the database

        io.to(room).emit('newMember', newList)
      })
        socket.on('change color', (color, room) => {
          io.to(room).emit('change color', color)
        })
        socket.on('n', (selectedVideo, videos, room) => {
          
          socket.to(room).emit('n', selectedVideo, videos); 
        })
        socket.on('newMemberPause', (room) => {
         
          socket.to(room).emit('newMemberPause'); 
        })

        socket.on('text', (text, room) => {
          socket.to(room).emit('text', text); 
        })


        socket.on('memberTime', (time, room) => {
         
          socket.to(room).emit('memberTime', time); 
        })
        socket.on('joined', (room) => {
         
          io.to(room).emit('joined');
        })
   
        socket.on('search', (result, room) => {
         
          io.to(room).emit('search', result)
        }) 
        socket.on('onChange', (state, room) => {
         
          io.to(room).emit('onChange', state)
        })



        socket.on('select', (video, room) => {
          io.to(room).emit('select', video)
        })
        socket.on('play', (time,id, room) => {
          //io.to(room).emit('play',state, time)
          socket.to(room).emit('play', time, id);
        })
        socket.on('pause', (id, room) => {
          //io.to(room).emit('play',state, time)
          socket.to(room).emit('pause', id);
        })
        socket.on('newTime', (newTime, room) => {
          io.to(room).emit('newTime',newTime)
        })

        // This here senses when a user has disconneted, send it to everyone except the sender, cuz they left
        socket.on('disconnect', async () => {

        

        const doc = await Codes.findOne({code:currentRoomId});
        var newList  = doc.members;
        var mapList = doc.members;  
        mapList.delete(socket.id); 
        newList.set(socket.id, undefined, {strict: false} );
        doc.members =  newList;
        mapList = [...mapList.values()]
        await doc.save();

        //logic to remove the record from the database entrely, if its no longer there

        io.to(currentRoomId).emit('remove', mapList)

        const docs = await Codes.findOne({code:currentRoomId}); 
        if(docs.members.size == 0 ) {
          
          

            Codes.deleteOne({ code: currentRoomId}, function (err) {
              if(err) console.log(err);
              console.log("Successful deletion");
            });
        

        }


        



        })
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
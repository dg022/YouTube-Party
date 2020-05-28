import React from 'react'; 
import SearchBar from './SearchBar'; 
import youtube from '../api/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import CommentDetail from './CommentDetail';
import io from 'socket.io-client'
import Message from './Message'; 
import MessageList from './MessageList';
import Login from './Login'; 
import './App.css';
import MemberList from './MemberList'; 
//"https://agile-mountain-68964.herokuapp.com/"
const socket = io("http://localhost:8080"); 


// There might be some PURE aids with the rooms here

class App extends React.Component {
    state = {videos: [], selectedVideo: null, data:null,  endpoint: "/", color: 'white', members:[], messages:[],newTime:0, time:0, playerState:-1, target:[], id: Math.floor(Math.random() * 100000), room:null, error:0 , name:null};
    

    send = (list) => {
    
       
        //You are sendign the array of messages
        socket.emit('change color', list, this.state.room) 
      }

    // When a user makes a search query, it is emmited to the other sockets, then once it is recived again, it will be rendered
    EmitSearch = (result) =>{
       
       
        
        socket.emit('search', result, this.state.room);


    }
      componentWillMount = () => {
         
         
          socket.on('change color', (col) => {
              // Here Im updating the messages array, to be the new messages that I have recived
              this.setState({messages:col});
          })

          // Setting the state with the search result
          socket.on('search', (result) => {
            console.log("theery reached back here")
            this.setState({
                videos: result.data.items,
                selectedVideo:result.data.items[0]
              });   
        })

        socket.on('select', (video) => {
            
            this.setState({selectedVideo:video});

        })

        socket.on('play', (state) => {
            this.setState({playerState:state})
        })

        socket.on('newTime', (newTime) => {
            this.setState({newTime:newTime})
        })

        socket.on('newMember', (list) => {
            
            console.log(list); 
            this.setState({members:list}); 
        
            
        


        })
        

        socket.on('enter', (term) => {
            if(term!="FAIL"){

            // So here the room will no longer be null
            // Here when this happens you need to

            this.setState({room:term})
            }else{
                // Here you attempted to enter a code that doesnt exist
                console.log("The code you have entered does not exist in the data base, please try again"); 

                // IF the code doesnt work, we want to display a message, with an x button, that indciates the wrong code was used
                this.setState({error:1}); 




            }
        })


      }

    sendMessage = (message) =>{
        
        // You take this message that is given, and update the state of the messages
        const list = this.state.messages;
        list.push(message); 

        //This sends the current list of the messages to all the sockets
        this.send(list)

    }


    pressPlay = (state) => {

      
        socket.emit('play', state, this.state.room)


    }


    newTime = (newTime) => {

      
        socket.emit('newTime', newTime, this.state.room)


    }

 
    search = async (term)=>{
        //The SearchBar calls the search funciton with the term
        // And here we will make the api request
        
        const result = await youtube.get("/search", {
            params: {
              q: term,
              part: "snippet",
               type: 'video',
              maxResults: 5,
              key: 'AIzaSyBSAzBSy4bhfG8JaCmptEDdreLpQXdAAbQ'            }
          });
          
          console.log(result);
          this.EmitSearch(result);
          
    }


enter = (term) => {
   
    console.log(term); 
    socket.emit('enter', term); 
}

nameSubmission = (name) => {
   
   
    this.setState({name:name}); 

    // What we want to do is, have the logic to check the length og the list
    socket.emit("newMember", name, this.state.room); 

   
    
}

createRoom = () => {
    // When the create room session button is pressed, we want to emit that we want to create a new room
    console.log("Ive been clic")
    socket.emit('createRoom');



}


// This is a function
onVideoSelect = (video) =>{

    
 
    socket.emit('select', video, this.state.room) 
   
}

close = ( ) => {

    this.setState({error:0}); 
}


ErrorDecider = () =>{


    if(this.state.error == 1){
        return(
            <div className="cont">
                <div className="ui segment" >

                
                <Login enter={this.enter} createRoom={this.createRoom} roomStatus={null}/>
                </div>

                <div class="ui negative message">
                        <i onClick={this.close} class="close icon"></i>
                        <div class="header">
                            Invalid room code!
                        </div>
                        <p>Try again, or create new session. 
                        </p></div>


            </div>
        );
            }else{

                return(
                    <div className="cont">
                            <div className="ui segment" >
                            <Login enter={this.enter} createRoom={this.createRoom} roomStatus={null}/>
                            </div>
                    </div>

                );


}

}

EnterName = () => {

    // If the name is null, then we must prompt the user to enter in their name, which will
    if(this.state.name == null){

        // pass in 
        return(
        <div className= "cont">
            <div className="ui segment">
            <Login nameSubmission={this.nameSubmission} roomStatus={this.state.room}/>
            </div>

        </div>
        );

    }else{

        // Right here, we want to emit to all rooms that a new memebr has joined
      

        return(

            <div className="ui container" style ={{marginTop:'10px' }}>
    
                <SearchBar Search={this.search} />
                
                
                <div className="ui grid">
                    <div className="ui row">
    
                        <div  className="eleven wide column">
                            
                            <VideoDetail  updatedTime={this.state.newTime} newTime ={this.newTime}id={this.state.id} time ={this.state.time} playerState={this.state.playerState} play={this.pressPlay} video={this.state.selectedVideo}/>
                            <h4 className="ui header"> Chat Room</h4>
                                
                                    {this.state.data}
                                <div className="ui segment"> 
                                <MessageList  msglist={this.state.messages}/>
                                
                                </div>
                                <Message msg={this.sendMessage} name={this.state.name}/>
    
    
    
                        </div>
    
                        <div className="five wide column">
    
                            <VideoList videos={this.state.videos} onVideoSelect = {this.onVideoSelect}/>
                            <div className="ui segment"> 
                                <h4 className="ui header"> Connected members</h4>
                                <MemberList msglist={this.state.members} name={this.state.name}/>
                                
                                </div>


                        </div>
    
                    </div>
                    
                     
                    
                </div>
               
        
             </div>
        );



    }




}






render(){



    
    if(this.state.room == null){
        return this.ErrorDecider(); 
    }
    
//Here the room is no longer null, we must once again parse this out into its own logic to allow users to enter their name
    return this.EnterName(); 

}





}

export default App; 
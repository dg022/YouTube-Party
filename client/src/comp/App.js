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
import Chat from "./Chat"
import Loading from "./Loading"
import { Random } from 'react-animated-text';
//"https://agile-mountain-68964.herokuapp.com/"
//"http://localhost:8080"
const socket = io("https://agile-mountain-68964.herokuapp.com/"); 
//"https://agile-mountain-68964.herokuapp.com/"

// There might be some PURE aids with the rooms here

class App extends React.Component {
    state = {videos: [], 
        selectedVideo:null, 
        data:null, 
        socketId:null, 
        id:Math.floor(Math.random() * 100000), 
         members:[], 
         messages:[],
         newTime:0, 
         time:0, 
         onChange:-1,
         PlayerState:"",
         target:[], 
         room:null, 
         loaded:false, 
         error:0,
         newMessage:null, 
         newMemberPause:0,  
         name:null};

    joined = false;
    called = false; 
    
    loaded = () => {

        this.setState({loaded:true});

        // if joined is TRUE, this is when we send the message
        console.log("This loaded:"); 
       
        if(this.called == true){
            
            console.log("This loaded: this.state.joined == true"); 
            socket.emit('newMemberPause', this.state.room); 
            this.called = false; 
        }

    }

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
            this.setState({
                videos: result.data.items,
                selectedVideo:result.data.items[0]
              });   
        })
        socket.on('select', (video) => {  
            this.setState({selectedVideo:video});
        })
        socket.on('play', (time, id) => {
            console.log("From APP.js: Play will now setState")
            this.setState({time:time, PlayerState:"PLAY", id:id})
        })
        socket.on('pause', (id) => {
            this.setState({PlayerState:"PAUSE", id:id})
        })
        socket.on('memberTime', (times) => {

            // If we are really a new member reciving this time
            if(this.state.joined ==true){

                console.log(times); 
                this.setState({time:times});

            }
            


        })
        socket.on('newTime', (newTime) => {
            this.setState({newTime:newTime})
        })
        socket.on('onChange', (state) => {
            this.setState({onChange:state})
        })
        socket.on('newMemberPause', () => {
            // Now this is used to update the props, to notify everyone that a new member has joined
            this.setState({newMemberPause:1})
        })
       
        socket.on('n', (SelectedVideo) => {

            if(this.state.selectedVideo != SelectedVideo){   
                this.setState({selectedVideo:SelectedVideo})
                console.log("n: setting joined:true, this should come first")
                this.joined= true;  
            }

            
            
        })

        socket.on('newMember', (list) => {
            if(this.state.selectedVideo!= null){   
               this.newMemberVideo();  
            }
            console.log(list); 
            this.setState({members:list}); 
        })

        socket.on('remove', (list) => {
           
            console.log(list); 
            this.setState({members:list}); 
        })

        socket.on('text', (message) => {
           
            console.log(message)
            this.setState({newMessage:String(message)}); 
        })

        socket.on('enter', (term, ID) => {
            if(term!="FAIL"){
            // So here the room will no longer be null
            // Here when this happens you need to
            this.setState({room:term})
            this.setState({socketId:ID})
            }else{
                // Here you attempted to enter a code that doesnt exist
                console.log("The code you have entered does not exist in the data base, please try again"); 
                // IF the code doesnt work, we want to display a message, with an x button, that indciates the wrong code was used
                this.setState({error:1}); 
            }
        })


      }

      newMemberVideo = () => {
        console.log(this.state.room);
        
        socket.emit('n', this.state.selectedVideo, this.state.room);

      }

    sendMessage = (message) =>{
        
        // You take this message that is given, and update the state of the messages
        const list = this.state.messages;
        list.push(message); 

        //This sends the current list of the messages to all the sockets
        this.send(list)

    }


    pressPlay = (time, id) => {
      // From here it will emit to all the other sokcets, execpt this one
       
        socket.emit('play',time, id, this.state.room)
    }

    pressPause = (id) => {
        // From here it will emit to all the other sokcets, execpt this one
          socket.emit('pause', id, this.state.room)
      }

    newTime = (newTime) => {
        socket.emit('newTime', newTime, this.state.room)
    }

    Reset = () =>{
        this.setState({newMemberPause:0}); 
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
    socket.emit("newMember", name,this.state.socketId, this.state.room); 

}


onChange = (state) => {

    socket.emit("onChange", state, this.state.room);

}

reset = (time) => {

   
    socket.emit("memberTime", time, this.state.room);

}


StateReset = () => {

    this.setState({PlayerState:""}); 
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


Header = () => {

    return(

        <div class="ui fixed inverted menu red">
        <left>
        <div class="ui container">
          <a href="#" class="header item">
          <img src="https://img.icons8.com/clouds/150/000000/youtube-play.png"/>
            YouTube Party!
          </a>
        </div>
        </left>
      </div>
      


    );

}

Footer= () =>{
    return(
    <div class="ui red inverted vertical footer segment form-page">
    <div class="ui container">
      <left> YouTube Party by David George</left> 
    </div>
    </div>
    ); 

}

ErrorDecider = () =>{


    if(this.state.error == 1){
        return(
            <div> 
                {this.Header()}
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
                  {this.Footer()}
            </div>
        );
            }else{

                return(
                    <div > 
                        {this.Header()}
                    <div className="cont">
                            <div className="ui segment" >
                            <Login enter={this.enter} createRoom={this.createRoom} roomStatus={null}/>
                            </div>
                    </div>

                    {this.Footer()}
                    </div>

                );


}

}

newText = (message) => {

    console.log("from App.js:")
    console.log(message); 
    socket.emit("text", message, this.state.room) 

}

joinedReset = () => {

   console.log("joinedReset: Called")
    this.joined = false; 
    this.called = true; 
}

textReset = () => {
    this.setState({newMessage:""})
}

joined = () => {

    socket.emit('joined', this.state.room);
}

EnterName = () => {

    // If the name is null, then we must prompt the user to enter in their name, which will
    if(this.state.name == null){
        
        // pass in 
        return(
            <div > 
                {this.Header()}
        <div className= "cont">
            <div className="ui segment">
            <Login nameSubmission={this.nameSubmission} roomStatus={this.state.room}/>
            </div>

        </div>
        {this.Footer()}
       
               
        </div>
        );

    }else{

        if(this.state.selectedVideo == null){
            return(
            <div> 
                
            <div className="ui container" style ={{marginTop:'10px' }}>
                <h4 className="ui header"> ROOM CODE: {this.state.room}</h4>
               
                <center> <img src="https://img.icons8.com/clouds/300/000000/youtube-play.png"/></center>
                <center> <h1>YouTube Party!</h1></center>
                <SearchBar Search={this.search} />
                <Loading/>
                
                
               
              
        
             </div>
             {this.Footer()}
             </div>
            ); 
        }
      

        return(
            <div> 
                
            <div className="ui container" style ={{marginTop:'10px' }}>
                <h4 className="ui header"> ROOM CODE: {this.state.room}</h4>
                <SearchBar style ={{marginBottom:'10px' }}Search={this.search} />
                
                
                <div style ={{marginTop:'10px' }} className="ui grid">
                    <div className="ui row">
    
                        <div  className="eleven wide column">
                            
                            <VideoDetail loaded={this.loaded} Reset={this.Reset}joined={this.joined} joinedReset={this.joinedReset} StateReset={this.StateReset}reset={this.reset } nPause={this.state.newMemberPause}   onChange={this.onChange} PlayerState={this.state.PlayerState}  State={this.state.onChange}  updatedTime={this.state.newTime} newTime ={this.newTime} id={this.state.id} time ={this.state.time}  pause={this.pressPause} play={this.pressPlay} video={this.state.selectedVideo}/>
                            
                                
                                    {this.state.data}
                                    <div className="ui segment"> 
                                <h4 className="ui header"> Connected members</h4>
                                <MemberList msglist={this.state.members} name={this.state.name}/>
                                </div>
                                
    
    
    
                        </div>
    
                        <div className="five wide column">
                                <VideoList videos={this.state.videos} onVideoSelect = {this.onVideoSelect}/>
                            
                        </div>
                    </div>  
                </div>
              
              <Chat textReset={this.textReset} text={this.newText}  newtext={this.state.newMessage}/>
              
        
             </div>
             {this.Footer()}
             </div>
        );



    }




}



render(){
    if(this.state.room == null){
        return (
            <div> 
            {this.ErrorDecider()}
            </div>
        )
    }
    
//Here the room is no longer null, we must once again parse this out into its own logic to allow users to enter their name
    return this.EnterName(); 

}





}

export default App; 
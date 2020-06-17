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
import ReactGa from 'react-ga'
 ReactGa.initialize('UA-169327515-1');
 ReactGa.pageview(window.location.pathname + window.location.search);
//"https://agile-mountain-68964.herokuapp.com/"
//"http://localhost:8080"
const socket = io("http://localhost:8080"); 
//"https://agile-mountain-68964.herokuapp.com/"

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
       
       
        if(this.called == true){
            
          
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
            
            this.setState({time:time, PlayerState:"PLAY", id:id})
        })
        socket.on('pause', (id) => {
            this.setState({PlayerState:"PAUSE", id:id})
        })
        socket.on('memberTime', (times) => {

            // If we are really a new member reciving this time
            if(this.state.joined ==true){

               
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
            this.joined = false; 
        })
       
        socket.on('n', (SelectedVideo, Videos) => {
         
            if(this.state.selectedVideo != SelectedVideo){   
    
                this.setState({selectedVideo:SelectedVideo})

                if(Videos.length != 0){

                    this.setState({videos:Videos})
                }

              
                this.joined= true;  
            }

            
            
        })

        socket.on('newMember', (list) => {
            if(this.state.selectedVideo!= null){   
               this.newMemberVideo();  
            }
          
            this.setState({members:list}); 
        })

        socket.on('remove', (list) => {
           
             
            this.setState({members:list}); 
        })

        socket.on('text', (message) => {
           
           
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
               
                // IF the code doesnt work, we want to display a message, with an x button, that indciates the wrong code was used
                this.setState({error:1}); 
                document.getElementById("searchid").style.borderColor = "red";
            }
        })


      }

      newMemberVideo = () => {
        
        
        socket.emit('n', this.state.selectedVideo,  this.state.videos, this.state.room,);

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
          
          
          this.EmitSearch(result);
          
    }


enter = (term) => {
   
    
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
          <a href="#" class="header item"></a>
          <img src="https://img.icons8.com/clouds/150/000000/youtube-play.png"/>
            YouTube Party!
          
        </div>
        </left>
      </div>
      


    );

}


ErrMsg = () =>{

return(
    <div class="ui negative message">
    <i onClick={this.close} class="close icon"></i>
    <div class="header">
        Invalid room code!
    </div>
    <p>Try again, or create new session. 
    </p></div>


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


    //console.log( md.is('desktop') );     
    //console.log( md.is('iphone') );   // false
    //console.log(window.navigator.userAgent);
    window.mobileAndTabletCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      };

     
      
                


                return(
                        
                            
                            <Login incor={0} enter={this.enter} createRoom={this.createRoom} roomStatus={null}/>
                            
                            
                       

                  
                );


}



newText = (message) => {

 
    socket.emit("text", message, this.state.room) 

}

joinedReset = () => {

 
    this.joined = false; 
    this.called = true; 
}

textReset = () => {
    this.setState({newMessage:""})
}

joined = () => {

    socket.emit('joined', this.state.room);
}


isMobileRender = () => {

    // here we want to render that message saying we will be back :(
    return(


       
            <div class="ui container middle aligned center aligned grid"> 
                
            <div id="R" className="ui container middle aligned center aligned grid" >
                <h4 className="ui header "> </h4>
               
                <div id="utube"className="ui container middle aligned center aligned grid">
                    <div> 
                     <img src="https://img.icons8.com/clouds/300/000000/youtube-play.png"/>
                     </div>
                     </div>
                <div className="ui container middle aligned center aligned grid"> <h1  style ={{marginTop:'80px' }}>Support for mobile and tablets coming soon!</h1></div>
                <Loading/>
                
                
               
              
        
             </div>
            
             </div>
            




    ); 


}

EnterName = () => {

    // If the name is null, then we must prompt the user to enter in their name, which will
    if(this.state.name == null){
        
        // pass in 
        return(
         
            <Login nameSubmission={this.nameSubmission} roomStatus={this.state.room}/>
         
        );

    }else{

        if(this.state.selectedVideo == null){
            return(
            <div class="ui container middle aligned center aligned grid"> 
                
            <div id="R" className="ui container middle aligned center aligned grid" >
                <h4 className="ui header "> ROOM CODE: {this.state.room}</h4>
               
                <div id="utube"className="ui container middle aligned center aligned grid">
                    <div> 
                     <img src="https://img.icons8.com/clouds/300/000000/youtube-play.png"/>
                     </div>
                     </div>
                <div className="ui container middle aligned center aligned grid"> <h1  style ={{marginTop:'80px' }}>YouTube Party!</h1></div>
                <SearchBar Search={this.search} />
                <Loading/>
                
                
               
              
        
             </div>
            
             </div>
            ); 
        }
      

        return(
            <div> 
                
            <div className="ui container" style ={{marginTop:'80px' }}>
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
              
              <Chat  textReset={this.textReset} text={this.newText}  newText={this.state.newMessage}/>
              
        
             </div>
            
             </div>
        );



    }




}



render(){

    window.mobileAndTabletCheck = function() {
        console.log("This should be getting hit")
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
      };

    if(window.mobileAndTabletCheck() == true){
        console.log("This should be getting hit")
        return(
        <div class="ui middle aligned center aligned grid" > 
        {this.isMobileRender()}

        </div>
        ); 


    }



    if(this.state.room == null){
        console.log("This should be getting hit")
        return (

            <div class="ui middle aligned center aligned grid"      > 
            {this.ErrorDecider()}

            </div>
        )
    }
    
//Here the room is no longer null, we must once again parse this out into its own logic to allow users to enter their name
    return this.EnterName(); 

}





}

export default App; 
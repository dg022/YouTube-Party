import React from 'react'; 
import SearchBar from './SearchBar'; 
import youtube from '../api/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import CommentDetail from './CommentDetail';
import socketIOClient from "socket.io-client";
import Message from './Message'; 
import MessageList from './MessageList';


class App extends React.Component {
    state = {videos: [], selectedVideo: null, data:null,  endpoint: "localhost:4001", color: 'white', messages:[]};
    




    send = (list) => {
        const socket = socketIOClient(this.state.endpoint);
        //You are sendign the array of messages
        socket.emit('change color', list) 
      }
      
    
      
    
      componentWillMount = () => {
          const socket = socketIOClient(this.state.endpoint);
          
        
          socket.on('change color', (col) => {
              // Here Im updating the messages array, to be the new messages that I have recived
              this.setState({messages:col});
          })
      }

   

     
    sendMessage = (message) =>{
        // You take this message that is given, and update the state of the messages
        const list = this.state.messages;
        list.push(message); 
        this.send(list)

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

         
          this.setState({
              videos: result.data.items,
              selectedVideo:result.data.items[0]
            });   
    }

onVideoSelect = (video) =>{
this.setState({selectedVideo:video});


}

render(){

    const socket = socketIOClient(this.state.endpoint);
    console.log(this.state.messages);


    return(

        <div className="ui container" style ={{marginTop:'10px' }}>

            <SearchBar Search={this.search} />
            
            
            <div className="ui grid">
                <div className="ui row">

                    <div className="eleven wide column">
                        <VideoDetail video={this.state.selectedVideo}/>
                    </div>

                    <div className="five wide column">

                        <VideoList videos={this.state.videos} onVideoSelect = {this.onVideoSelect}/>
                    </div>
                </div>
                  <div className="ui row">
                  <h4 className="ui header"> Chat Room</h4>
                    <div className="sixteen wide column ui segment">
                        {this.state.data}
                    
                    <MessageList msglist={this.state.messages}/>
                    </div>
                </div>
            </div>
           
       
        <Message msg={this.sendMessage} />
         </div>

    );

}





}

export default App; 
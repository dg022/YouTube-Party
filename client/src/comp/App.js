import React from 'react'; 
import SearchBar from './SearchBar'; 
import youtube from '../api/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import CommentDetail from './CommentDetail';
import socketIOClient from "socket.io-client";


class App extends React.Component {
    state = {videos: [], selectedVideo: null, data:null,  endpoint: "localhost:4001", color: 'white'};
    

    send = () => {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('change color', this.state.color) // change 'red' to this.state.color
      }
      ///
    
      // adding the function
      setColor = (color) => {
        this.setState({ color })
      }
    
      componentDidMount = () => {
          const socket = socketIOClient(this.state.endpoint);
          setInterval(this.send(), 1000)
          socket.on('change color', (col) => {
              document.body.style.backgroundColor = col;
          })
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
                    <CommentDetail/>
                    </div>
                </div>
            </div>
           
        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>
        
         </div>

    );

}





}

export default App; 
import React from 'react'; 
import SearchBar from './SearchBar'; 
import youtube from '../api/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends React.Component {
    state = {videos: [], selectedVideo: null};
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
            </div>
         </div>

    );

}





}

export default App; 
import React from 'react'; 
import SearchBar from './SearchBar'; 
import youtube from '../api/youtube';
import VideoList from './VideoList';

class App extends React.Component {
    state = {videos: []};
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

         
          this.setState({videos: result.data.items});
        
    }


render(){

    return(

        <div className="ui container">

            <SearchBar Search={this.search} />
            
            I have {this.state.videos.length} videos

            <VideoList videos={this.state.videos}/>

            </div>

    );

}





}

export default App; 
import React from 'react'; 
import SearchBar from './SearchBar'; 
import youtube from '../api/youtube';

class App extends React.Component {
    
    search = async (term)=>{
        //The SearchBar calls the search funciton with the term
        // And here we will make the api request

        const result = await youtube.get("/search", {
            params: {
              q: term,
              part: "snippet",
              maxResults: 5,
              key: 'AIzaSyBSAzBSy4bhfG8JaCmptEDdreLpQXdAAbQ'            }
          });


        console.log(result);
    }


render(){

    return(

        <div className="ui container">

            <SearchBar Search={this.search} />
            
            
            </div>

    );

}





}

export default App; 
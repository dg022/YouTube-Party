import React from 'react'; 
import './App.css';


class SearchBar extends React.Component{

state = {term: ''}; 

 change = (event) =>{
this.setState({term:event.target.value});
};

submit = (event) =>{
event.preventDefault(); 
this.props.Search(this.state.term);
//this.props.Search.search(this.state.term);

//To Do this term will be used to call the YouTube api

};

render(){

return(
    <div className="style">
        <form onSubmit={this.submit}className ="ui form rounded">
            <div className="field" >

                <label>Search by Title/URL</label>
                <input 
                onChange={this.change }
                value={this.state.term}
                type="text"/>
            </div>
        </form>
       
    </div>
);

}




}

export default SearchBar;
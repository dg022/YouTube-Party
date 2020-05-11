import React from 'react'; 


class SearchBar extends React.Component{

state = {term: ''}; 

render(){

return(
    <div className="search-bar ui segment">
        <form className ="ui form">
            <div className="field" >

                <label>Video Search</label>
                <input type="text"/>
            </div>
        </form>
       
    </div>
);

}




}

export default SearchBar;
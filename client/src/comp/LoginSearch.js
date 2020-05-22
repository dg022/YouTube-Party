import React from 'react'; 


class LoginSearch extends React.Component{

state = {term: ''}; 

 change = (event) =>{
this.setState({term:event.target.value});
};

submit = (event) =>{
event.preventDefault(); 
console.log(event);


};

render(){

return(
    <div className="search-bar ui segment">
        <form onSubmit={this.submit}className ="ui form">
            <div className="field" >
            
            <div class="ui left icon input">
            <i class="terminal icon"/>
           
                <input 
                
                onChange={this.change }
                value={this.state.term}
                
                type="text" placeholder="Enter Code"/>
                  

                  </div>
            </div>
        </form>
       
    </div>
);

}




}

export default LoginSearch; 
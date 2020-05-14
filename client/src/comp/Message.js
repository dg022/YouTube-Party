import React from 'react'; 


class Message extends React.Component{

state = {term: ''}; 

 change = (event) =>{
this.setState({term:event.target.value});
};

submit = (event) =>{
event.preventDefault(); 
this.props.msg(this.state.term);
event.target.value ="";


};

render(){

return(
    <div className="search-bar ui segment">
        <form onSubmit={this.submit}className ="ui form">
            <div className="field" >

                <label>Send message</label>
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

export default Message;
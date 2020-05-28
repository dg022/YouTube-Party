import React from 'react'; 


class Message extends React.Component{

state = {term: ''}; 

 change = (event) =>{
this.setState({term:event.target.value});
};


 timeNow = () => {
    var d = new Date(),
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes();
    return h + ':' + m;
  }


submit = (event) =>{

event.preventDefault(); 

// Here you want to pass in a object 
// Pass in the name of the user
// Pass in the current time --> Dont know how to do that

var obj = {
"Content": this.state.term, 
"Name": this.props.name,
"Time":this.timeNow()
};

this.props.msg(obj);



};

render(){

return(
    <div className="search-bar ui segment">
        <form id="myForm" onSubmit={this.submit}className ="ui form">
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
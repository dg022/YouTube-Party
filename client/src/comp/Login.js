import React from 'react'; 
import './Login.css';

class Login extends React.Component{

   
state = {term: ''}; 


change = (event) =>{
    this.setState({term:event.target.value});
    };
    
    submit = (event) =>{
        
    event.preventDefault(); 
    
    this.props.enter((this.state.term)); 
    
    
    };

    createRoom = () => {

        this.props.createRoom(); 

    };


    render(){
    return(

        <div class="ui middle aligned center aligned grid">
                <div class="column"> 
                    <h2 class="ui image header">
                        <div class="content">
                            YouTube Party!
                        </div>
                    </h2>
                   
                        
                               <div> 
                               <img src="https://img.icons8.com/clouds/150/000000/youtube-play.png"/>
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
                                    </div>
                      

                  
                    
                            <div style ={{marginTop:'10px' }} onClick={this.submit} class="ui fluid large red submit button">Join Session</div>
                            <div style ={{marginTop:'10px' }} onClick={this.createRoom}  class="ui fluid large white submit button">Create Session</div>

                    

                    
                </div>
        </div>




    );

    }

}


export default Login; 
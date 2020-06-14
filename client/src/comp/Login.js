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

    submitName = (event) =>{
        
        event.preventDefault(); 
        
        this.props.nameSubmission((this.state.term)); 
        
        
        };




    createRoom = () => {

        this.props.createRoom(); 

    };



    determineRender  = () => {

        if(this.props.roomStatus ==null){
            
            return(

                <div class="ui middle aligned center aligned grid">
                        <div      class="column log"> 
                            <h2 class="ui image header">
                                <div class="content">
                                    YouTube Party!
                                </div>
                            </h2>
                           
                                
                                       <div> 
                                       <img src="https://img.icons8.com/clouds/150/000000/youtube-play.png"/>
                                            <div className="search-bar">
                                                
                                                <form onSubmit={this.submit}className ="ui form">
                                                    <div className="field" >
                                                    
                                                    <div class="ui left icon input">
                                                    <i class="terminal icon"/>
                                                
                                                        <input id="searchid"
                                                        
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
        else{
            return(

                <div class="ui middle aligned center aligned grid">
                <div class="column log"> 
                    <h2 class="ui image header">
                        <div class="content">
                            YouTube Party!
                        </div>
                    </h2>
                   
                        
                               <div> 
                               <img src="https://img.icons8.com/clouds/150/000000/youtube-play.png"/>
                                    <div className="search-bar">
                                        
                                        <form onSubmit={this.submitName}className ="ui form">
                                            <div className="field" >
                                            
                                            <div class="ui left icon input">
                                            <i class="user icon"/>
                                        
                                                <input 
                                                
                                                onChange={this.change }
                                                value={this.state.term}
                                                
                                                type="text" placeholder="Enter Name"/>
                                                

                                                </div>
                                            </div>
                                        </form>
                                    
                                    </div>
                                    </div>
                      

                  
                    
                            <div style ={{marginTop:'10px' }} onClick={this.submitName} class="ui fluid large green submit button">Continue!</div>
                        

                    

                    
                </div>
        </div>











            );


        }


    }

    render(){


        
    return this.determineRender();

    }

}


export default Login; 
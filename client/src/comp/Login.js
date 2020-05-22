import React from 'react'; 
import './Login.css';
import LoginSearch from './LoginSearch'; 
const Login = () => {


    return(

        <div class="ui middle aligned center aligned grid">
                <div class="column"> 
                    <h2 class="ui image header">
                        <div class="content">
                            YouTube Party!
                        </div>
                    </h2>
                    <form  method="get" class="ui large form">
                        
                            <LoginSearch/>
                      

                    </form>
                    
                            <div class="ui fluid large red submit button">Join Session</div>
                            <div style ={{marginTop:'10px' }}class="ui fluid large red submit button">Create Session</div>

                    

                    
                </div>
        </div>




    );



}


export default Login; 
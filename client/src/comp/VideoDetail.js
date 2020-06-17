import React from 'react'; 
import YouTube from 'react-youtube';
import Slider from './ContinuousSlider';
import SearchBar from './SearchBar';

// You need to pass a funciton to VideoDetail 
// Which will then be called from inside, 
//props.video.id.videoId ---> This  is the link to the video


class VideoDetail extends React.Component{

    state = {id:0, player:[], duration:0}; 

    //internalChange = false; 
    
    internalChange = false
    started  = false; 
    newMemberPause = false;
    internalStart = 1; 
    wePaused =  false ; 
    
    videochange =(event)=> {
          
      if(event.target.playerInfo.playerState == 3 && this.started == false){
        this.props.play(event.target.playerInfo.currentTime, this.state.id);
       this.started = true; 
       this.messageSent = true;
       this.internalStart = 0; 

        }
  
      }
      

    onPlay =(event)=>{

        

          
          
          if(this.internalChange === false  && this.started == true && this.internalStart ==1) {
         
            this.props.play(event.target.playerInfo.currentTime, this.state.id);
            
             
          }else{

            if(this.internalStart ==0){
              this.internalStart = 1; 
            }

            if(this.started == false){
              this.started = true; 
            }


            if(this.internalChange === true){
              this.internalChange = false; 
            }

       


          }



        }
      
  

    onPause = (event) => {

            
            if(this.internalChange === false  && this.started == true && this.internalStart ==1  ) {
        
            this.props.pause(this.state.id);
           
             
          }
          
          else{

              if(this.internalStart ==0){
                this.internalStart = 1; 
              }

              if(this.started == false){
                this.started = true; 
              }

              if(this.newMemberPause == true){
               this.newMemberPause = false; 
              
              }


              if(this.internalChange === true){
                this.internalChange = false; 
              }
          }
  }

    //nextProps that are being passed 
    componentWillReceiveProps =(nextProps)=>{


        // This means the requres to change the play status is coming from a differnt person
          
            // Here you need to add the logic to deal with the a slider chage here

          
        
            if(this.props.video!=null){
              
              if(this.props.video.id.videoId != nextProps.video.id.videoId){
                this.started = false; 
               

              }

            }
          
          

            // that means a video has been chosen
           if(this.state.player[0]!=null && nextProps.nPause == 1 && this.state.player[0].playerInfo.playerState != -1){

           
              if(this.state.player[0]!=null){
             
                // A new member has joined, quick lets send them the current time thats being played
              this.props.StateReset(); 
              this.internalChange = true;
              this.state.player[0].pauseVideo();
              this.props.reset(this.state.player[0].getCurrentTime());
              this.props.Reset();
              this.props.joinedReset();  
              this.wePaused = true; 
              console.log("a new member has joined, send the current time and pause")
             

              

              
              }

            }
            

              if(this.state.player[0]!=null){
                
                this.internalChange = true;

                if(nextProps.joined == true && this.wePaused!=true){
                  
                 console.log("Joined was true here")
                  this.props.joinedReset(); 
                  this.state.player[0].seekTo(nextProps.time).pauseVideo();
                  this.started = true; 
                  
              } if(this.wePaused == true){
                this.wePaused = false 
                ; 
              }


                 else if(nextProps.PlayerState == "PLAY"){
                      
                     
                      this.props.StateReset(); 
                      this.state.player[0].seekTo(nextProps.time).playVideo();
                      
                  }

                  else if(nextProps.PlayerState == "PAUSE"){

                     
                      this.props.StateReset();
                      this.state.player[0].pauseVideo();
                      
                  }


              
              }
          
            // -1 = unstarted
            // 0 = ended 
            // 1 = playing 
            // 2 = paused
            // 3 = buffering
            // 5= video cued


    
     // }
        
        


    }
   
   
    
     

      Ready =(event) => {

      
        const player = this.state.player;
        player.push(event.target);
       
        this.setState({
          player: player,
          duration:player[0].getDuration(), 
          id:this.props.id
        });

        
        this.props.loaded(); 
      }



  
    render() {

        const opts = {
          height: '390',
          width: '640',
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
        
            enablejsapi:1,
          },
        };

        if(this.props.video==null){
        return <div></div>; 
        }
        

        // You need to call, a call back functtion, which then will will emit to all other sockets, then on reciveing from 
        //Socket you can then click the button to play
        //You need to send back event.target
        return(

            <div>

                
                <div  className="ui embed">
                <YouTube  onStateChange={this.videochange}  onPlay={this.onPlay} onPause={this.onPause} onReady={this.Ready}     videoId={this.props.video.id.videoId} opts={opts}  />;
        
                </div>

             

        
                <div className = "ui segment">
                <h4 className="ui header">{this.props.video.snippet.title}</h4>
                <p>{this.props.video.snippet.description}</p>
                </div>

              
        </div>
        );
      }
    
    }
  


export default VideoDetail;
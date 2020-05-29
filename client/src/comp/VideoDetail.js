import React from 'react'; 
import YouTube from 'react-youtube';
import Slider from './ContinuousSlider';
import SearchBar from './SearchBar';

// You need to pass a funciton to VideoDetail 
// Which will then be called from inside, 
//props.video.id.videoId ---> This  is the link to the video
class VideoDetail extends React.Component{

    state = {id:0, player:[], duration:0, started:0}; 

    //internalChange = false; 
    messageSent = false; 
    interalChange = -1; 
    
    videochange = (event) => {

    // Here you need to emit a event that 

        //if( event.target.playerInfo.playerState!=-1  && event.target.playerInfo.playerState!=3  && this.internalChange!=true ){
        

        //This.props.play will need to emit the current player state and the time
        //this.props.play(event.target.playerInfo.playerState,  event.target.playerInfo.currentTime);

        //console.log(event.target.playerInfo);
        //console.log(event.target.playerInfo);


        //}else if(this.internalChange==true){
            //this.internalChange = false; 
       // }
       
    }

    onPlay =(event)=>{
      
      if(this.internalChange == -1) {
        this.props.play(event.target.playerInfo.currentTime, this.state.id);
        this.messageSent = true; 
        console.log("I was played!"); 
      }else{

        this.internalChange = -1;  
      }

    }

    onPause = (event) => {

        


        if(this.internalChange == -1) {
          this.props.pause(this.state.id); 
          this.messageSent = true; 
          console.log("I was paused!"); 
        }else{
  
          this.internalChange = -1; 
        }
  


    }

    //nextProps that are being passed 
    componentWillReceiveProps =(nextProps)=>{

        // This means the requres to change the play status is coming from a differnt person
          
            // Here you need to add the logic to deal with the a slider chage here
            
            if(this.messageSent!=true){

            if(this.state.player[0]!=null){
              console.log("I iniated the change and I'm still getting this message")
                this.internalChange = 0; 


                //This is using the custom made slider
                //if(this.props.updatedTime!= nextProps.updatedTime){
             
                    //this.state.player[0].seekTo(this.props.updatedTime);
                //}

                //if(this.props.time!= nextProps.time){
             
                    //this.state.player[0].seekTo(this.props.time);
               // }


               
                if(nextProps.PlayerState == "PLAY"){
                   
            
                    this.state.player[0].seekTo(nextProps.time).playVideo();
                   


                }

                if(nextProps.PlayerState == "PAUSE"){
                
                    this.state.player[0].pauseVideo();
                }


            
            }
          }else{
            this.messageSent = false; 
          }
            // -1 = unstarted
            // 0 = ended 
            // 1 = playing 
            // 2 = paused
            // 3 = buffering
            // 5= video cued


    




    }
   
   
    
      componentDidMount(){

        // This is only ever called once
        
        //this.setState({id:Math.floor(Math.random() * 100000)}); 
        console.log(this.state.id); 
        
      }

      Ready =(event) => {

      
        const player = this.state.player;
        player.push(event.target);
       
        this.setState({
          player: player,
          duration:player[0].getDuration(), 
          id:this.props.id
        });
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

                <Slider newTime={this.props.newTime} time={this.state.duration} valueLabelDisplay="auto"/>
                <div  style ={{marginTop:'10px' }}class="ui buttons fluid">

                    
                        <button   onClick={() => this.props.play(1)} class="ui icon button"><i aria-hidden="true" class="play icon"></i></button>
                        <button onClick={() => this.props.play(2) }class="ui icon button"><i aria-hidden="true" class="pause icon"></i></button>
                       
                    
                   

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
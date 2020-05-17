import React from 'react'; 
import YouTube from 'react-youtube';
// You need to pass a funciton to VideoDetail 
// Which will then be called from inside, 
//props.video.id.videoId ---> This  is the link to the video
class VideoDetail extends React.Component{

    state = {id:0, player:[]}; 
    abc = false; 

    videochange = (event) => {

        if(this.abc!=true){
        console.log("I was called DESPITE")
        this.props.play(event.target.playerInfo.currentTime, event.target.playerInfo.playerState, this.state.id);

        
        }else{
            console.log("THIS means that, it attempted to call another funciton SINCE we mainpulated the play back")
            this.abc = false;
        }
        //PlayerState = 2 then it is playing
        //PlayerState = 1 then it is pasued

        //Match the player state, if it is 2 we pause at the current time, if it is 1 we play at the currnet time that is passed
        
       
    }

    //nextProps that are being passed 
    componentWillReceiveProps =(nextProps)=>{

        // This means the requres to change the play status is coming from a differnt person
        
        if(nextProps.id!= this.state.id){

            if(this.state.player[0]!=null){
                
                this.abc =true; 

                if(nextProps.playerState == 1){
                    console.log("Here you should play");
                    this.state.player[0].seekTo(nextProps.time);
                    this.state.player[0].playVideo(); 

                }

                if(nextProps.playerState == 2){
                    console.log("The video has been pasued");
                    this.state.player[0].seekTo(nextProps.time,2); 

                }


            
            }

            // -1 = unstarted
            // 0 = ended 
            // 1 = playing 
            // 2 = paused
            // 3 = buffering
            // 5= video cued


        }





    }
   
   
    
      componentDidMount(){

        // This is only ever called once
        
        this.setState({id:this.props.id}); 
        
      }

      Ready =(event) => {
        const player = this.state.player;
        player.push(event.target);
        this.setState({
          player: player
        });
      }



  
    render() {

        const opts = {
          height: '390',
          width: '640',
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
        
            enablejsapi:1
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
                <YouTube  onStateChange={this.videochange}   onReady={this.Ready}     videoId={this.props.video.id.videoId} opts={opts}  />;
        
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
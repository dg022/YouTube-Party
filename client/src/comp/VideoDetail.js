import React from 'react'; 
import YouTube from 'react-youtube';
// You need to pass a funciton to VideoDetail 
// Which will then be called from inside, 
//props.video.id.videoId ---> This  is the link to the video
class VideoDetail extends React.Component{

    //state = {time:0, playerState:1}; 

    videochange = (event) => {

        
        this.props.play(event.target.playerInfo.currentTime, event.target.playerInfo.playerState);

        //PlayerState = 2 then it is playing
        //PlayerState = 1 then it is pasued

        //Match the player state, if it is 2 we pause at the current time, if it is 1 we play at the currnet time that is passed
        //this.setState({time:event.target.playerInfo.currentTime,playerState:event.target.playerInfo.playerState});

    }


    ready =(event) =>{

        //So its all dependant on the props state here
        //-1 == unstarted
        //0 == ended
        //1 = playing
        //2 = pasued
        //3 =  buffering
        //5 = video cued 

        //event.target.player.seekTo(this.props.time);
        event.target.seekTo(this.props.time);

    }

    //If the props have changed, then I want to 
    componentDidUpdate(prevState, prevProps) {
        // we access props with this.props
        // and state with this.state
        
        // prevState contains state before update
        // prevProps contains props before update
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
                <YouTube  onStateChange={this.videochange}   onReady={this.ready}     videoId={this.props.video.id.videoId} opts={opts}  />;
        
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
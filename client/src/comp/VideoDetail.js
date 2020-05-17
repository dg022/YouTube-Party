import React from 'react'; 
import YouTube from 'react-youtube';
// You need to pass a funciton to VideoDetail 
// Which will then be called from inside, 
//props.video.id.videoId ---> This  is the link to the video
class VideoDetail extends React.Component{

    state = {id:0, player:[]}; 
   

    videochange = (event) => {

       
        this.props.play(event.target.playerInfo.currentTime, event.target.playerInfo.playerState, this.state.id);

        //PlayerState = 2 then it is playing
        //PlayerState = 1 then it is pasued

        //Match the player state, if it is 2 we pause at the current time, if it is 1 we play at the currnet time that is passed
        
       
    }

    //nextProps that are being passed 
    componentWillReceiveProps =(nextProps)=>{

        // This means the requres to change the play status is coming from a differnt person
        console.log("IVE BEEN CALELD")
        if(nextProps.id!= this.state.id){
            if(this.state.player[0]!=null){
            this.state.player[0].seekTo(nextProps.time); 
            }


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
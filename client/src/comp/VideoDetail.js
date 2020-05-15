import React from 'react'; 
import YouTube from 'react-youtube';
// You need to pass a funciton to VideoDetail 
// Which will then be called from inside, 
//props.video.id.videoId ---> This  is the link to the video
class VideoDetail extends React.Component{
  
    render() {

        const opts = {
          height: '390',
          width: '640',
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
          },
        };

        if(this.props.video==null){
        return <div></div>; 
        }

        return(

            <div>
                <div  className="ui embed">
                <YouTube videoId={this.props.video.id.videoId} opts={opts} onReady={this._onReady} />;
        
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
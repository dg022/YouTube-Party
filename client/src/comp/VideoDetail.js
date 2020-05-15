import React from 'react'; 

// You need to pass a funciton to VideoDetail 
// Which will then be called from inside, 

const VideoDetail = ({video}) =>{
  
    if(video == null){
        return(
            <div></div>
        );

    }
    
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`


return(

    <div>
        <div onClick={() => console.log("HeSWAG") } className="ui embed">
            <iframe id="myFrame" onClick={()=>console.log("MILGYA")} src={videoSrc} />

        </div>

        <div className = "ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
        </div>

    </div>

);

}


export default VideoDetail;
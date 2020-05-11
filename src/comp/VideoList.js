import React from 'react';
import VideoItem from './VideoItem'
const VideoList  = ({videos,  onVideoSelect}) =>{

    const vidlist = videos.map((video)=>{

        return <VideoItem vid = {video} onVideoSelect = {onVideoSelect}/>

    });

    return(

        <div className="ui relaxed divided list">

            {vidlist}


        </div>

    );



}

export default VideoList; 
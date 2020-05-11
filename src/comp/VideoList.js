import React from 'react';
import VideoItem from './VideoItem'
const VideoList  = ({videos}) =>{

    const vidlist = videos.map((video)=>{

        return <VideoItem vid = {video}/>

    });

    return(

        <div>

            {vidlist}


        </div>

    );



}

export default VideoList; 
import React from 'react';

const VideoItem = ({vid}) =>{

    return (<div> 
        <img src={vid.snippet.thumbnails.medium.url}/>
        {vid.snippet.title}


    </div>);

};

export default VideoItem;
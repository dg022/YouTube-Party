import React from 'react';
import './vi.css';
const VideoItem = ({vid, onVideoSelect}) =>{
  
    return (
    
    <div onClick={() => onVideoSelect(vid)}className="video-item item">
        <img className="ui image"src={vid.snippet.thumbnails.medium.url}/>
        <div className="content">
        <div className="header">  {vid.snippet.title}</div>
        </div>


    </div>);

};

export default VideoItem;
import React from 'react'; 


import Avatar from 'react-avatar';
 


const CommentDetail = (props) =>{

return(

  
            <div className="comment">
                <a className="avatar">
                <Avatar size="40" color='red' name={props.name} />
                </a>
                <div className="content">
                <a className="author"> {props.name}    </a>
                <div class="metadata">
                <div className="Date">{props.time}</div>
                    
                </div>
                <div class="text">
                    {props.content} 
                </div>
                </div>
            </div>
           



);



}
export default CommentDetail; 
import React from 'react'; 

import Faker from 'faker';

const CommentDetail = (props) =>{

return(

  
            <div className="comment">
                <a className="avatar">
                <img src={Faker.image.avatar()}/>
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
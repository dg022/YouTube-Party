import React from 'react'; 

import Faker from 'faker';

const CommentDetail = (props) =>{

return(

  
            <div className="comment">
                <a className="avatar">
                <img src={Faker.image.avatar()}/>
                </a>
                <div className="content">
                <a className="author"> {props.author}    </a>
                <div class="metadata">
                    <div className="date">2 days ago</div>
                    <div className="rating">
                    <i className="star icon"></i>
                    5 Faves
                    </div>
                </div>
                <div class="text">
                    {props.content} 
                </div>
                </div>
            </div>
           



);



}
export default CommentDetail; 
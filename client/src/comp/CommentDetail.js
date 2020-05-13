import React from 'react'; 

import Faker from 'faker';

const CommentDetail = (props) =>{

return(

    <div class="ui comments">
            <div class="comment">
                <a class="avatar">
                <img src={Faker.image.avatar()}/>
                </a>
                <div class="content">
                <a class="author"> {props.author}    </a>
                <div class="metadata">
                    <div class="date">2 days ago</div>
                    <div class="rating">
                    <i class="star icon"></i>
                    5 Faves
                    </div>
                </div>
                <div class="text">
                    Hey guys, I hope this example comment is helping you read this documentation.
                </div>
                </div>
            </div>
            </div>



);



}
export default CommentDetail; 
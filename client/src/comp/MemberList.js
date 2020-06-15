
import React from 'react'; 
import CommentDetail from './CommentDetail';

const MemberList = (props) => {
    
  
  const images = props.msglist.map(msg => {
    
    if(msg!=null){
    return <CommentDetail content = {"joined"} name ={msg}  />;
    }
  });

  return <div className="ui comments"> {images}</div>;

};

export default MemberList;
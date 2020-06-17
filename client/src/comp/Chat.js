import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import './App.css';

class Chat extends Component {
  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
  }

  componentWillReceiveProps =(nextProps) => {

    if(nextProps!=null&& nextProps.newText!=null &&nextProps.newText!="") {

        if(nextProps.newText!=""){

            addResponseMessage(nextProps.newText);
          
            nextProps.textReset(); 

        }

    }


  }

  handleNewUserMessage = (newMessage) => {
    
    // Now send the message throught the backend API

    this.props.text(newMessage)
  }

  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title="Welcome to the Chat!"
          subtitle="Have Fun!"
          //profileAvatar={logo}
        />
      </div>
    );
  } 
}

export default Chat;
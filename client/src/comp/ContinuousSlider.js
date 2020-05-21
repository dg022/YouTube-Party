import React from 'react';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



 class  ContinuousSlider extends React.Component {


    state = {duration:2, value:0 }

    componentWillReceiveProps =(nextProps)=>{

        
        this.setState({duration:nextProps.time});

        

    }

     Format =(x) => {
          

        return Number.isNaN(x) ?  "00:00:00" : new Date(x * 1000).toISOString().substr(11, 8);  

    }

    handleSliderChange = (event, newValue)=> {

        // Here, what we want to do, call a deeply nested call back function, which then notifies all the components of the new time
    
        this.setState({value: newValue});
        this.props.newTime(newValue); 


      };
    

   
render(){

   

        return (
            <div >
            <Typography id="discrete-slider-small-steps" gutterBottom>
            </Typography>
            <Slider
                 
                value={this.state.value}
                max={this.state.duration}
                aria-labelledby="discrete-slider-small-steps"
                valueLabelDisplay="auto"
                valueLabelFormat={x => this.Format(x) }
                onChange={this.handleSliderChange}
            />
            </div>
        );
        
}
 }
export default ContinuousSlider; 
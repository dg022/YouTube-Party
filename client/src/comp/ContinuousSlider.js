import React from 'react';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



 class  ContinuousSlider extends React.Component {


    state = {duration:2}

    componentWillReceiveProps =(nextProps)=>{

        console.log(nextProps.time);
        this.setState({duration:nextProps.time}); 
        

    }

     Format =(x) => {
          

        return Number.isNaN(x) ?  "00:00:00" : new Date(x * 1000).toISOString().substr(11, 8);  

    }


   
render(){

   

        return (
            <div >
            <Typography id="discrete-slider-small-steps" gutterBottom>
            </Typography>
            <Slider
                 
                
                 max={this.state.duration}
                aria-labelledby="discrete-slider-small-steps"
                valueLabelDisplay="auto"
                valueLabelFormat={x => this.Format(x) }
            />
            </div>
        );
        
}
 }
export default ContinuousSlider; 
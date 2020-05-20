import React from 'react';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



 class  ContinuousSlider extends React.Component {


    state = {duration:2}

    componentWillReceiveProps =(nextProps)=>{

        console.log(nextProps.time);
        this.setState({duration:nextProps.time}); 
        

    }


    Time = () => {

      return 1; 
    }

render(){

   

        return (
            <div >
            <Typography id="discrete-slider-small-steps" gutterBottom>
            </Typography>
            <Slider
                 scale={(x) =>this.state.duration==0 ? 1 : this.state.duration}
            
                aria-labelledby="discrete-slider-small-steps"
                valueLabelDisplay="auto"
            />
            </div>
        );
        
}
 }
export default ContinuousSlider; 
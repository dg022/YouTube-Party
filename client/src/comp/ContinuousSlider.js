import React from 'react';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



 class  ContinuousSlider extends React.Component {


    state = {duration:2}

    componentWillReceiveProps =(nextProps)=>{

        
        this.setState({duration:nextProps.duraiton}); 
        

    }


    Time = () => {

        if(this.state.duraiton!=0){
            console.log("this MOTHER FUck")
            return this.state.duraiton; 
        }else{
            console.log("damn it")
            return 0; 
        }

    }

render(){

   

        return (
            <div >
            <Typography id="discrete-slider-small-steps" gutterBottom>
            </Typography>
            <Slider
                 scale={(x) => x+ 1}
            
                aria-labelledby="discrete-slider-small-steps"
                valueLabelDisplay="auto"
            />
            </div>
        );
        
}
 }
export default ContinuousSlider; 
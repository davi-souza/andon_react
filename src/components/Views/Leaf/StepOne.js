import React from 'react';
import Button from '@material-ui/core/Button';

const StepOne = (props) => {
  return (
    <div>
      {props.reasons.sort((a,b) => {
        let aN = a.name.toUpperCase();
        let bN = b.name.toUpperCase();
        if(aN < bN) return -1;
        else if(bN < aN) return 1;
        return 0;
      }).map(reason=>(
        <Button
          variant='contained'
          className='display-block width-perc-100 height-rem-7 txt-size-rem-2 margin-bottom-8 bg-color-dark txt-color-white'
          onClick={()=>{props.handleInfoClick('reason',reason,props.step+1)}} key={reason.id}>
          {reason.name}
        </Button>
      ))}
      <div className='height-rem-4'></div>
    </div>
  )
}

export default StepOne;
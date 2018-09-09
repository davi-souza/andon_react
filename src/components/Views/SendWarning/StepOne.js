import React from 'react';
import Button from '@material-ui/core/Button';

const StepOne = (props) => {
  return (
    <div>
      {props.reasons.sort((a,b) => {
        let aN = a.toUpperCase();
        let bN = b.toUpperCase();
        if(aN < bN) return -1;
        else if(bN < aN) return 1;
        else return 0;
      }).map(r=>(
        <Button className='ds-send-warning-step-1-button' onClick={()=>{props.handleInfoClick('reason',r,props.step+1)}} key={r}>{r}</Button>
      ))}
      <div className='ds-space-for-fixed-footer'></div>
    </div>
  )
}

export default StepOne;
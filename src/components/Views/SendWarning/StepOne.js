import React from 'react';
import Button from '@material-ui/core/Button';

const StepOne = (props) => {
  return (
    <div>
      {props.reasons.map(r=>(
        <Button className='ds-send-warning-step-1-button' onClick={()=>{props.handleInfoClick('reason',r,props.step+1)}} key={r}>{r}</Button>
      ))}
      <div className='ds-space-for-fixed-footer'></div>
    </div>
  )
}

export default StepOne;
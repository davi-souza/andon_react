import React from 'react';
import Button from '@material-ui/core/Button';

const StepTwo = (props) => {
  return (
    <div>
      {props.places.map(r=>(
        <Button className='ds-send-warning-step-2-button' onClick={()=>{props.handleInfoClick('where',r,props.step+1)}} key={r}>{r}</Button>
      ))}
      <div className='ds-space-for-fixed-footer'></div>
    </div>
  )
}

export default StepTwo;
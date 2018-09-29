import React from 'react';
import Button from '@material-ui/core/Button';

let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

const StepTwo = (props) => {
  return (
    <div>
      {/* {props.places.sort((a,b) => {
        let aN = a.toUpperCase();
        let bN = b.toUpperCase();
        if(aN < bN) return -1;
        else if(bN < aN) return 1;
        else return 0;
      }).map(p=>(
        <Button className='ds-send-warning-step-2-button' onClick={()=>{props.handleInfoClick('placeName',p,props.step+1)}} key={p}>{p}</Button>
      ))} */}
      {props.places.sort(collator.compare).map(p=>(
        <Button className='ds-send-warning-step-2-button' onClick={()=>{props.handleInfoClick('placeName',p,props.step+1)}} key={p}>{p}</Button>
      ))}
      <div className='ds-space-for-fixed-footer'></div>
    </div>
  )
}

export default StepTwo;
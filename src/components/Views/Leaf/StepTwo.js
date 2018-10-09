import React from 'react';
import Button from '@material-ui/core/Button';

let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

const StepTwo = (props) => {
  return (
    <div>
      {props.places.map(place=>(
        <Button
          className='display-block width-perc-100 height-rem-7 txt-size-rem-2 margin-bottom-8 bg-color-dark txt-color-white'
          onClick={()=>{props.handleInfoClick('place',place,props.step+1)}}
          key={place.id}>
          {place.name}
        </Button>
      ))}
      <div className='height-rem-4'></div>
    </div>
  )
}

export default StepTwo;
import React from 'react';
import Button from '@material-ui/core/Button'

const StepZero = (props) => {
  return (
    <div className='margin-bottom-64'>
      <Button variant='contained' className='display-block width-perc-100 height-rem-16 bg-color-yellow margin-bottom-8 txt-size-rem-3' onClick={()=>{props.handleInfoClick('type','ALERTA',props.step+1)}}>ALERTA</Button>
      <Button variant='contained' className='display-block width-perc-100 height-rem-16 bg-color-red txt-size-rem-3 txt-color-white' onClick={()=>{props.handleInfoClick('type','PARADO',props.step+1)}}>PARADO</Button>
    </div>
  )
}

export default StepZero;
import React from 'react';
import Button from '@material-ui/core/Button'

const StepZero = (props) => {
  return (
    <div className='ds-send-warning-step-0'>
      <Button className='ds-send-warning-step-0-button alert' onClick={()=>{props.handleInfoClick('type','ALERTA',props.step+1)}}>ALERTA</Button>
      <Button className='ds-send-warning-step-0-button stopped' onClick={()=>{props.handleInfoClick('type','PARADO',props.step+1)}}>PARADO</Button>
    </div>
  )
}

export default StepZero;
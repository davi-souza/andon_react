import React from 'react';
import Paper from '@material-ui/core/Paper';

const PaperSimple = (props) => {
  let style = {
    padding: '0.5rem',
  };
  if(props.round) {
    style.borderRadius = '0.5rem';
  }
  return (
    <div className='ds-component-paper-simple'>
      <Paper style={style} elevation={1}>
        {props.children}
      </Paper>
    </div>
  );
}

export default PaperSimple;
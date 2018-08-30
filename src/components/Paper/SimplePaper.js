import React from 'react';
import Paper from '@material-ui/core/Paper';

const SimplePaper = (props) => {
  let style = {
    padding: '0.5rem',
  };
  if(props.round) {
    style.borderRadius = '0.5rem';
  }
  return (
    <div>
      <Paper style={style} elevation={1} className={props.className}>
        {props.children}
      </Paper>
    </div>
  );
}

export default SimplePaper;
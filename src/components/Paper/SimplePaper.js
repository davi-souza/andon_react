import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const SimplePaper = (props) => {
  let style = {
    padding: '0.5rem',
  };
  if(props.padding) {
    style.padding = `${props.padding}rem`;
  }
  if(props.round) {
    style.borderRadius = '0.5rem';
  }
  return (
    <Paper style={style} elevation={1} className={props.className}>
      {props.paperTitle && <Typography variant="title">{ props.paperTitle }</Typography>}
      {props.children}
    </Paper>
  );
}

export default SimplePaper;
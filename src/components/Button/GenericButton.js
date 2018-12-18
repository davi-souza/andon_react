import React from "react";

import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

export default (props) => {
  if(props.loading) {
    return (
      <CircularProgress color="secondary" size={props.loadingSize} />
    )
  }
  return (
    <Button
      disabled={props.disabled || props.loading}
      className={props.className}
      onClick={props.onClick}
      variant="contained"
      color="secondary"
    >
      { props.children }
    </Button>
  )
}
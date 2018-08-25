import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import theme from '../../theme/theme.json';

const NumberPanel = (props) => {
  let style = {
    height:String(props.size)+'rem',
    fontSize: String(props.size/3)+'rem',
    fontWeight: 'bold',
  }
  if(props.color === 'dark') {
    style.backgroundColor = '#212121';
    style.color= '#fff';
  }
  else if(props.color === 'secondary') {
    style.backgroundColor = theme.palette.secondary.main;
    style.color= theme.palette.secondary.contrastText;
  }
  return (
    <div className='ds-component-number-panel'>
      <Grid container>
        {[1,2,3,4,5,6,7,8,9,10,0,11].map(n=>{
          if(n <= 9) {
            return (
              <Grid item xs={4} className='ds-component-number-panel-grid-item' key={n}>
                <Button variant='contained' onClick={()=>props.buttonClick(n)} style={style}>{n}</Button>
              </Grid>
            )
          }
          else if(n === 11){
            return (
              <Grid item xs={4} className='ds-component-number-panel-grid-item' key={n}>
                <Button style={style} disabled={props.confirmDisabled} onClick={props.confirmClick}>
                  <i className='material-icons' style={{fontSize:'inherit',fontWeight:'inherit'}}>check</i>
                </Button>
              </Grid>
            );
          }
          else {
            return (
              <Grid item xs={4} key={n}></Grid>
            );
          }
        })}
      </Grid>
    </div>
  );
}

export default NumberPanel;
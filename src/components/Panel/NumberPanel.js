import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const NumberPanel = (props) => {
  let style = {
    height:String(props.size)+'rem',
    fontSize: String(props.size/3)+'rem',
  }
  return (
    <Grid container>
      {[1,2,3,4,5,6,7,8,9,10,0,11].map(n=>{
        if(n <= 9) {
          return (
            <Grid item xs={4} className='margin-top-8 txt-align-center' key={n}>
              <Button className='width-perc-90 bg-color-dark txt-color-white' variant='contained' onClick={()=>props.buttonClick(n)} style={style}>{n}</Button>
            </Grid>
          )
        }
        else if(n === 11){
          return (
            <Grid item xs={4} className='margin-top-8 txt-align-center' key={n}>
              {
                props.loading ? 
                <CircularProgress style={{marginTop:props.size/6+'rem'}} color='secondary' size={50} />
                :
                <Button className='width-perc-90' style={style} disabled={props.confirmEraseDisabled} onClick={props.confirmClick}>
                  <i className='material-icons' style={{fontSize:'inherit',fontWeight:'inherit'}}>check</i>
                </Button>
              }
            </Grid>
          );
        }
        else {
          return (
            <Grid item xs={4} className='margin-top-8 txt-align-center' key={n}>
              {
                props.loading ?
                <CircularProgress style={{marginTop:props.size/6+'rem'}} color='secondary' size={50} />
                :
                <Button className='width-perc-90' style={style} disabled={props.confirmEraseDisabled} onClick={props.eraseClick}>
                  <i className='material-icons' style={{fontSize:'inherit',fontWeight:'inherit'}}>backspace</i>
                </Button>
              }
            </Grid>
          );
        }
      })}
    </Grid>
  );
}

export default NumberPanel;
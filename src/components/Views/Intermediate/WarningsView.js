import React from 'react';
import Grid from '@material-ui/core/Grid';

import WarningCard from './WarningCard';

const WarningViews = (props) => {
  return (
    <div className='ds-intermediate-warnings'>
      <Grid container spacing={8}>
        {props.warnings.filter(w=>{return !w.resolved}).sort((a,b)=>a.when-b.when).map(w=>(
          <WarningCard rounded warning={w} key={w.id}/>
        ))}
      </Grid>
    </div>
  );
}

export default WarningViews;
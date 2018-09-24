import React from 'react';
import Grid from '@material-ui/core/Grid';

import WarningCard from './WarningCard';

const WarningViews = (props) => {
  return (
    <div className='ds-intermediate-warnings'>
      <Grid container spacing={8}>
        {props.warnings.filter(w=>{return !w.resolvedDate}).sort((a,b)=>a.createdDate-b.createdDate).map(w=>(
          <WarningCard loadingResolveWarning={props.loadingResolveWarning} handleResolveWarning={props.handleResolveWarning} rounded warning={w} key={w.id}/>
        ))}
      </Grid>
    </div>
  );
}

export default WarningViews;
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const WarningCard = (props) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
      <Card className={props.warning.type==='ALERTA'?'ds-intermediate-warning-card-type-alert':'ds-intermediate-warning-card-type-stopped'}>
        <div className='ds-intermediate-warning-card'>
          <p>{props.warning.type}</p>
          <p>{props.warning.reason}</p>
          <p>{props.warning.where}</p>
          <p>{props.warning.user.name}</p>
          <p>{props.warning.when.toLocaleString()}</p>
        </div>
      </Card>
    </Grid>
  );
}

export default WarningCard;
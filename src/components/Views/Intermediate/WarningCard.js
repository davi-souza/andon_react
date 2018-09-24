import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const WarningCard = (props) => {
  let cardMediaOptions = {
    yellowImg: '/img/yellow.jpg',
    redImg: '/img/red.jpg',
    height: '60'
  }
  let cardClassName = 'ds-intermediate-warning-card';
  if(props.warning.type==='ALERTA') {
    cardClassName += ' alert';
  }
  else {
    cardClassName += ' stopped';
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
      <Card className={cardClassName}>
        {
          props.warning.type === 'ALERTA' ?
          <CardMedia 
            component='img'
            image={cardMediaOptions.yellowImg}
            height={cardMediaOptions.height}
            title='ALERTA'
          /> :
          <CardMedia 
            component='img'
            image={cardMediaOptions.redImg}
            height={cardMediaOptions.height}
            title='PARADO'
          />
        }
        <CardContent>
          <div className='ds-intermediate-warning-card-content'>
            <Typography variant="headline" component="h2">{props.warning.type}</Typography>
            <Typography component="p">Motivo: {props.warning.reasonName}</Typography>
            <Typography component='p'>Onde: {props.warning.placeName}</Typography>
            <Typography component='p'>Autor: {props.warning.userThatCreated.length>=20?props.warning.userThatCreated.substring(0,20):props.warning.userThatCreated}</Typography>
            <Typography component='p'>Quando: {new Date(props.warning.createdDate).toLocaleString('pt-BR')}</Typography>
          </div>
        </CardContent>
        <CardActions className='ds-intermediate-warning-card-actions'>
          {
            props.loadingResolveWarning?
            <CircularProgress color='secondary' size={40} /> :
            <Button variant='contained' color='secondary' onClick={()=>{props.handleResolveWarning(props.warning.id)}}>Resolvido</Button>
          }
        </CardActions>
      </Card>
    </Grid>
  );
}

export default WarningCard;
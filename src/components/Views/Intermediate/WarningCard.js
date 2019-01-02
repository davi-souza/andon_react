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
          <div className=''>
            <Typography variant="headline" component="h2">{props.warning.type}</Typography>
            <Typography component="p">Motivo: {props.warning.reason.name}</Typography>
            <Typography component='p'>Onde: {props.warning.place.name}</Typography>
            <Typography component='p'>Autor: {`${props.warning.userThatCreated.firstname} ${props.warning.userThatCreated.lastname.substring(0,10)}`}</Typography>
            <Typography component='p'>Quando: {new Date(props.warning.createdDate).toLocaleString('pt-BR')}</Typography>
          </div>
        </CardContent>
        <CardActions className='txt-align-center display-block'>
          {
            props.resolveLoading?
            <CircularProgress color='secondary' size={40} /> :
            <Button
              className='width-perc-50 border-round bg-color-gray txt-color-black'
              variant='contained'
              disabled={props.resolveLoading}
              onClick={()=>{props.resolve(props.warning.id)}}>Resolver</Button>
          }
        </CardActions>
      </Card>
    </Grid>
  );
}

export default WarningCard;
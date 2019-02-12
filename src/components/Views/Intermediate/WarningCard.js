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
            <Typography component='p'>Onde: {renderPlace(props.places, props.warning.place)}</Typography>
            <Typography component='p'>Autor: {`${props.warning.userThatCreated.firstname} ${props.warning.userThatCreated.lastname.substring(0,10)}`}</Typography>
            <Typography component='p'>Função do Autor: {props.warning.userThatCreated.jobTitle}</Typography>
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

const renderPlace = (places, place) => {
  if (places) {
    let array = [place];
    while(place.superPlaceId !== null) {
      const superPlace = places.find(placeAux => placeAux.id === place.superPlaceId);
      array = [superPlace, ...array];
      place = superPlace;
    }
    return array.map(p => p.name).join(", ");
  }
  return place.name;
};


export default WarningCard;
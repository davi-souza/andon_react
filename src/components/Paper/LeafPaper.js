import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export default (props) => {
  return (
    <Paper className="padding-32 ds-andon-send-warning-step-4">
      <Typography variant="headline" className="margin-bottom-16">Autor: {`${props.user.firstname} ${props.user.lastname}`}</Typography>
      <Typography variant="headline" className="margin-bottom-16">Tipo: {props.type}</Typography>
      <Typography variant="headline" className="margin-bottom-16">Razão: {props.reason.name}</Typography>
      <Typography variant="headline" className="margin-bottom-24">Local: {renderPlace(props.places, props.place)}</Typography>
      <Grid container>
        <Grid item xs={12} className="margin-bottom-24">
          <span id="countdown-time">O aviso será enviado em {props.secondsToSend} segundos.</span>
        </Grid>
        <Grid item xs={12} className="txt-align-center">
          {
            !props.sendLoading &&
            <Button
              className="bg-color-red txt-color-white width-perc-50 border-round"
              variant="contained" disabled={props.sendLoading}
              onClick={props.handleCancelSendWarning}>Cancelar</Button>
          }
          {
            props.sendLoading && <CircularProgress color="secondary" size={50} id="" />
          }
        </Grid>
      </Grid>
    </Paper>
  )
};

const renderPlace = (places, place) => {
  let array = [place];
  while(place.superPlaceId !== null) {
    const superPlace = places.find(placeAux => placeAux.id === place.superPlaceId);
    array = [superPlace, ...array];
    place = superPlace;
  }
  return array.map(p => p.name).join(", ");
};
import React from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import ColorPalette from "./ColorPalette";
import NumberPanel from "../../Panel/NumberPanel";

import compare from "../../../util/compare";

export default class Place extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberPanelValue: "",
      suggestedPlace: null,
      placeId: null,
    };
  }

  render() {
    let buttonsHeight = 4;
    return (
      <div>
        <Typography variant="display1" className="margin-bottom-16">Localização. Procurando por: {this.state.numberPanelValue}</Typography>
        <Grid container className="margin-bottom-24">
          <Grid item xs={12}>
            <div className="txt-align-center height-56">
              <Typography variant="display3" className="txt-color-dark">
                {this.state.suggestedPlace ? `${this.state.suggestedPlace.id} - ${this.state.suggestedPlace.name}` : "-"}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <NumberPanel
          color="dark"
          buttonClick={this.handleNumberPanelButtonClick}
          confirmClick={this.handleConfirmClick}
          eraseClick={this.handleEraseNumber}
          confirmEraseDisabled={this.state.numberPanelValue===""}
          loading={false}
          size={buttonsHeight}
        />
      </div>
    );
  }

  handleNumberPanelButtonClick = (n) => {
    if(this.state.numberPanelValue === "" && n === 0) {
      // ... nothing ...
    }
    else if(this.state.numberPanelValue.length === 11) {
      // ... nothing ...
    }
    else {
      let numberPanelValue = this.state.numberPanelValue + n.toString();
      let suggestedPlace = this.handleGetSuggested(numberPanelValue);
      this.setState({
        numberPanelValue,
        suggestedPlace,
      });
    }
  }

  handleConfirmClick = () => {
    // if there is a suggested place
    if(this.state.suggestedPlace) {
      console.log(this.state.suggestedPlace);
      // get the place
      let place = this.props.places.find(place => place.id === this.state.suggestedPlace.id);
      console.log('place',place);
      // if place exists
      if(place) {
        // if place doesnt have sub places
        if(place.subPlaces.length === 0) {
          console.log('doesnt have sub places');
          // go to the next step
          this.props.handleInfoClick("place",place,this.props.step+1);
        } else {
          console.log('does have sub places');
          // if the place does have sub places
          // reset numberPanelValue and suggestedPlace
          // updated placeId
          this.setState({
            numberPanelValue: "",
            suggestedPlace: null,
            placeId: place.id,
          });
        }
      }
    }
  }

  handleEraseNumber = () => {
    let numberPanelValue = this.state.numberPanelValue;
    if(numberPanelValue.length !== 0) {
      numberPanelValue = numberPanelValue.substring(0,numberPanelValue.length-1);
    }
    let suggestedPlace = this.handleGetSuggested(numberPanelValue);
    this.setState({
      numberPanelValue,
      suggestedPlace,
    });
  }

  handleGetSuggested = (numberPanelValue) => {
    if(!numberPanelValue) {
      return null;
    }
    let places = this.props.places;
    if(this.state.placeId) {
      places = places.find(place => place.id === this.state.placeId).subPlaces;
    } else {
      places = places.filter(place => place.superPlaces.length === 0);
    }
    return places.filter(place => (new RegExp(`[a-zA-Z0-9\s\-]*${numberPanelValue}[a-zA-Z0-9\s\-]*`)).test(`${place.id} - ${place.name}`))[0];
  }
}
import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import NumberPanel from "../../Panel/NumberPanel";


export default class Place extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberPanelValue: "",
      suggestedPlace: null,
      placeId: null,
      whatPlaceState: 0,
    };
  }

  render() {
    let buttonsHeight = 4;
    return (
      <div>
        <Typography variant="display1" className="margin-bottom-16">Localização {this.renderWhatIsLookingfor()}. Procurando por: {this.state.numberPanelValue}</Typography>
        <Grid container className="margin-bottom-24">
          <Grid item xs={12}>
            <div className="txt-align-center height-56">
              <Typography variant="display3" className="txt-color-dark">
                {this.state.suggestedPlace ? `${this.state.suggestedPlace.name}` : "-"}
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

  renderWhatIsLookingfor = () => {
    if (this.state.whatPlaceState !== 0) {
      return "(Casa)";
    }
    return "(Quadra)";
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
      // get the place
      let place = this.props.places.find(place => place.id === this.state.suggestedPlace.id);
      // if place exists
      if(place) {
        // if place doesnt have sub places
        if(place.subPlaces.length === 0) {
          // go to the next step
          this.props.handleInfoClick("place",place,this.props.step+1);
        } else {
          const whatPlaceState = this.state.whatPlaceState + 1;
          // if the place does have sub places
          // reset numberPanelValue and suggestedPlace
          // updated placeId
          this.setState({
            numberPanelValue: "",
            suggestedPlace: null,
            placeId: place.id,
            whatPlaceState,
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
      places = places.filter(place => place.superPlaceId === null);
    }
    return places.filter(place => (new RegExp(`[a-zA-Z]* ${numberPanelValue}$`)).test(`${place.name}`))[0];
  }
}
import React, { Component } from "react";
import AppBarCentral from '../../../../components/Appbar/AppBarCentral';
import Container from '../../../../components/Grid/Container';
import SelectTablePlace from "../../../../components/Table/SelectTablePlace";
import CentralContext from "../../../../contexts/CentralContext";

class placeUpdate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppBarCentral />
        <Container appbarFixed>
          <CentralContext.Consumer>
            {central => (
              <SelectTablePlace
                placeLeader={central.places.find(place => place.id === parseInt(this.props.match.params.id,10))}
                places={central.places.filter(place => place.id !== parseInt(this.props.match.params.id,10))}
                updatePlaceLoading={central.updatePlaceLoading}
                addSubPlace={central.addSubPlace}
                removeSubPlace={central.removeSubPlace}
              />
            )}
          </CentralContext.Consumer>
        </Container>
      </div>
    );
  }
}

export default placeUpdate;
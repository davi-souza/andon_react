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
    const placeId = parseInt(this.props.match.params.id,10);
    return (
      <div>
        <AppBarCentral />
        <Container appbarFixed>
          <CentralContext.Consumer>
            {central => (
              <SelectTablePlace
                placeLeader={central.places.find(place => place.id === placeId)}
                places={central.places.filter(place => place.id !== placeId)
                  .filter(place => place.superPlaceId === null || place.superPlaceId === placeId)
                  .sort((place1,place2) => {
                    if (place1.id < place2.id) {
                      return -1;
                    }
                    if (place1.id > place2.id) {
                      return 1;
                    }
                    return 0;
                  })}
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
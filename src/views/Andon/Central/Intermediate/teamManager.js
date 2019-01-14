import React, { Component } from "react";
import AppBarCentral from '../../../../components/Appbar/AppBarCentral';
import Container from '../../../../components/Grid/Container';
import SelectTable from "../../../../components/Table/SelectTable";
import CentralContext from "../../../../contexts/CentralContext";

class teamManager extends Component {
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
              <SelectTable
                teamLeader={central.intermediateUsers.find(user => user.id === parseInt(this.props.match.params.id,10))}
                leafUsers={central.leafUsers.filter(user => user.level === "leaf")}
                loadingTeamUpdate={central.loadingTeamUpdate}
                addTeamMember={central.addTeamMember}
                removeTeamMember={central.removeTeamMember}
              />
            )}
          </CentralContext.Consumer>
        </Container>
      </div>
    );
  }
}

export default teamManager;
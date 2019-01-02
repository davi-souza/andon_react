import React from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ColorPalette from "./ColorPalette";

import compare from "../../../util/compare";

export default class Reason extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "Motivo",
      reasons: this.props.reasons,
      reasonId: null,
    };
  }

  render() {
    return (
      <div className="margin-bottom-64">
        <Typography variant="display2" className="margin-bottom-16">{ this.state.label }</Typography>
          {this.state.reasons.sort((reason1,reason2) => compare(reason1.name,reason2.name)).map( (reason,index) => (
            <Button
              variant="contained"
              className="display-block width-perc-100 height-rem-7 txt-size-rem-2 margin-bottom-8 txt-color-white"
              style={{
                backgroundColor: ColorPalette[index%ColorPalette.length],
              }}
              onClick={() => { this.handleReasonClick(reason) }} key={reason.id}>
              {reason.name}
            </Button>
          ))}
      </div>
    )
  };

  handleReasonClick = (reason) => {
    this.setState({
      reasonId: reason.id,
    });
    if(reason.subReasons && reason.subReasons.length !== 0) {
      this.setState({
        reasons: reason.subReasons,
        // label: "Motivo mais detalhado",
      });
    } else {
      this.props.handleInfoClick("reason",reason,this.props.step+1);
    }
  }
}
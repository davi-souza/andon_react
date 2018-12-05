import React from "react";
import SimplePaper from "./SimplePaper";
import Typography from "@material-ui/core/Typography";

const DashboardPaper = (props) => {
  return (
    <SimplePaper round padding={props.padding} className={`${props.className} height-perc-100`}>
      <Typography variant="title">
        { props.header }
      </Typography>
      <Typography variant="display1" className="padding-16">
        { props.children }
      </Typography>
    </SimplePaper>
  );
}

export default DashboardPaper;
import React from "react";

import Grid from "@material-ui/core/Grid";

import IntermediateContext from "../../../contexts/IntermediateContext";

import WarningCard from "./WarningCard";

const Warnings = (props) => {
  return (
    <IntermediateContext.Consumer>
      {intermediate => (
        <Grid container spacing={16}>
          {intermediate.warnings
            .sort((a,b) => {
              if(a.createdDate > b.createdDate) {
                return 1;
              } else if(a.createdDate < b.createdDate) {
                return -1;
              }
              return 0;
            })
            .filter(warning => warning.userThatCreated || false)
            .map(warning => (
            <WarningCard
              warning={warning}
              resolve={intermediate.resolve}
              resolveLoading={intermediate.resolveLoading}
            />
          ))}
        </Grid>
      )}
    </IntermediateContext.Consumer>
  )
}
export default Warnings;

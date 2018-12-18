import React from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ColorPalette from "./ColorPalette";

// let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: "base"});

export default (props) => {
  return (
    <div>
      <Typography variant="display2" className="margin-bottom-16">Localização</Typography>
      {props.places.map( (place,index) =>(
        <Button
          className="display-block width-perc-100 height-rem-7 txt-size-rem-2 margin-bottom-8 txt-color-white"
          style={{
            backgroundColor: ColorPalette[index%ColorPalette.length],
          }}
          onClick={()=>{props.handleInfoClick("place",place,props.step+1)}}
          key={place.id}>
          {place.name}
        </Button>
      ))}
      <div className="height-rem-4"></div>
    </div>
  )
};
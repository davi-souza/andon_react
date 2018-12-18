import React from "react";

export default (props) => {
  let className = ["container"];

  if(props.fullPage) {
    className = className.concat([
      "full-page",
    ]);
  }

  if(props.appbarFixed) {
    className = className.concat([
      "appbar-fixed",
    ]);
  }

  return (
    <div className={className.join(" ")}>
      { props.children }
    </div>
  );
}
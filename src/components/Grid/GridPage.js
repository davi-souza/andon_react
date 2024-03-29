import React from 'react';

const GridPage = (props) => {
  let className = 'grid-page';
  if(props.viewContent) {
    className += ' view-content';
  }
  if(props.appBarFixed) {
    className += ' app-bar-fixed';
  }
  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

export default GridPage;
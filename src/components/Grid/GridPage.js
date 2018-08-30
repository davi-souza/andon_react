import React from 'react';

const GridPage = (props) => {
  let className = '';
  if(props.viewContent) {
    className += ' view-content';
  }
  if(props.appBarFixed) {
    className += ' app-bar-fixed';
  }
  return (
    <div className={'ds-grid-page' + className}>
      {props.children}
    </div>
  );
}

export default GridPage;
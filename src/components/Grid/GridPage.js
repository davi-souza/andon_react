import React from 'react';

import './GridPage.css';

const GridPage = (props) => {
  let className = '';
  if(props.viewContent) {
    className += ' view-content';
  }
  if(props.appBarFixed) {
    className += ' app-bar-fixed';
  }
  return (
    <div className={'ds-component-grid-page' + className}>
      {props.children}
    </div>
  );
}

export default GridPage;
import React from 'react';

const FullGridPage = (props) => {
  let className = 'grid-page-full';
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

export default FullGridPage;
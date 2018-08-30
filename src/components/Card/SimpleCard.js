import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const SimpleCard = (props) => {
  let style = {};
  if(props.rounded) {
    style.borderRadius = '0.5rem';
  }
  return (
    <div className='ds-component-simple-card'>
      <Card style={style}>
        <CardContent>
          {props.children}
        </CardContent>
      </Card>
    </div>
  )
}

export default SimpleCard;
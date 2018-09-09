import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const SimpleCard = (props) => {
  let className = props.className + ' ds-simple-card';
  if(props.rounded) {
    className += ' rounded';
  }
  if(props.centered) {
    className += ' centered';
  }
  return (
    <div>
      <Card className={className}>
        <CardContent>
          {props.children}
        </CardContent>
      </Card>
    </div>
  )
}

export default SimpleCard;
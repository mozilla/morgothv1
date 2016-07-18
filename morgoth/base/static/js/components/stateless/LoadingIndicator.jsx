import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';


export default function LoadingIndicator() {
  const style = {
    display: 'inline-block',
    position: 'relative',
  };

  return (
    <RefreshIndicator size={48} status="loading" style={style} top={0} left={0} />
  );
}

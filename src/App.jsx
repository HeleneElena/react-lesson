import React from 'react';
import ComponentClass from './components/ClassComponent';

export default class App extends React.Component {
  render() {
    return (
      <div className='app'>
       <ComponentClass max={10} min={1} /> 
      </div>
    );
  }
}

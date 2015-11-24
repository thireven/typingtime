import React from 'react';
import { connect } from 'react-redux'
import { inputKey, nextKey, loadTemplate } from './actions';
import TypingContainer from './TypingContainer';

var App = React.createClass({
  componentDidMount: function() {
    this.props.dispatch(loadTemplate(`<h1>Hello, World!</h1>
<p>This is a public service announcement</p>
<div style="width: 50px; height: 50px; background: red; color: white;">
Hehe
</div>`));
    //this.props.dispatch(nextKey());
  },
  render: function() {
    const { dispatch, template, input, currentKey } = this.props;
    return (
      <TypingContainer
        input={input}
        currentKey={currentKey}
        template={template}
        newInput={newKey => dispatch(inputKey(newKey))}
      />
    )
  }
});

function select(state) {
  return state.toObject();
}

export default connect(select)(App)

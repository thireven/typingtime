import React from 'react';
import TypingContent from './TypingContent';
import hotkey from 'react-hotkey';

hotkey.activate('keypress');

export default React.createClass({
  mixins: [hotkey.Mixin('onKeyPress')],
  onKeyPress: function(e) {
    this.props.newInput(e.charCode);
  },
  render: function() {
    return (
      <section className="code-container">
        <TypingContent input={this.props.input} currentKey={this.props.currentKey} template={this.props.template} />
      </section>
    );
  }
});

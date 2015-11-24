import React from 'react';
import Character from './Character';

export default React.createClass({
  processContent: function(lines) {
    let processed_lines = [];
    let iterator = 0;
    let wrongLine = -1, wrongPosition = -1;
    let currentPosition = this.props.currentKey.get('position'),
        currentLine = this.props.currentKey.get('line');

    if(this.props.input.get('isWrong')) {
      wrongLine = currentLine,
      wrongPosition = currentPosition;
    }

    return <ol>
        {lines.map(line => {
          let characters = [];
          for (let i = 0; i < line.length; i++) {
            let key = iterator.toString().concat(i);
            let wrong = (iterator == wrongLine && i == wrongPosition) ? true : false;
            let active = (iterator == currentLine && i == currentPosition) ? true : false;

            characters.push(
              <Character
                key={key}
                isWrong={wrong}
                isActive={active}
                char={line.charAt(i)} />
            );
          }
          iterator++;
          return <li key={iterator}>
              {characters}
            </li>
        })}
      </ol>;
  },
  render: function()
  {
    return (
      <pre className="code">{this.processContent(this.props.template)}</pre>
    );
  }
});

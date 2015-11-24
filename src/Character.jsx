import React from 'react';
import classNames from 'classnames';

function errorArrow(isWrong) {
  if(isWrong) {
    return <i className="fa fa-arrow-circle-down"></i>;
  }
}

export default function Character(props) {
  let charClass = classNames({
    'initial': true,
    'char-active': props.isActive,
    'char-error': props.isWrong
  });

  return (
    <span className={charClass}>{errorArrow(props.isWrong)}{props.char}</span>
  );
}

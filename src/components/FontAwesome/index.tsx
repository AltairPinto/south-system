import React from 'react';

interface FontAwesome {
  type: string,
  name: string;
  classname?: string;
}

const FontAwesome = ({ type, name, classname }: FontAwesome) => (
  <i className={`${type} fa-${name} ${classname || ''}`} />
);

export default FontAwesome;

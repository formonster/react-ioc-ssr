import React from 'react';
import { css } from '@emotion/css'

const color = 'white'

function About() {

  return (
    <div className={css`
        padding: 32px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        &:hover {
          color: ${color};
        }
      `}>
      <h1>About</h1>
    </div>
  );
}

export default About;
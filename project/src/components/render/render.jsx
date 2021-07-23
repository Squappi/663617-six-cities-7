import React, {Fragment}  from 'react';
import {Link} from 'react-router-dom';

export default function NotFound() {
  return (
    <Fragment>
      <h1>
      404.
        <small>Page not found</small>
      </h1>
      <Link to="/">Go to main page</Link>
    </Fragment>
  );
}

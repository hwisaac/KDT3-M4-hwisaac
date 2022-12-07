import React from 'react';
import { Link } from 'react-router-dom';

export default function PageLink(props, i) {
  return <Link to={props.routerLink}>{props.page}</Link>
}


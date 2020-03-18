import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({context}) => {

    // calls the signout function from context and redirects it to the homepage
    context.action.signOut();
    return <Redirect to="/" />;
}
  
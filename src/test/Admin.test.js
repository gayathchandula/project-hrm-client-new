// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Admin from '../views/dashboard/Admin/Admin';

it('renders correctly', () => {
  const tree = renderer
    .create(<Admin page="https://hrm-innovigent.netlify.app/#/attendence">Facebook</Admin>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Admin from '../views/dashboard/Overtime Management/Overtime Logs';
import { render,cleanup,fireEvent  } from '@testing-library/react'
import {shallow} from "enzyme";

it('renders correctly', () => {

  const tree = renderer
    .create(<Admin page="https://hrm-innovigent.netlify.app/#/Overtime%20logs">Facebook</Admin>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


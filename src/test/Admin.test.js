// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Admin from '../views/dashboard/Admin/Admin';
import { render,cleanup,fireEvent  } from '@testing-library/react'
import {shallow} from "enzyme";

it('renders correctly', () => {
  const tree = renderer
    .create(<Admin page="https://hrm-innovigent.netlify.app/#/attendence">Facebook</Admin>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

const data= [{"id":298,"deviceId":1,"temperature":null,"ambientTemperature":null,"entry":true,"createdAt":"2021-06-08T09:39:08.801Z","updatedAt":"2021-06-08T09:39:08.801Z","shiftName":"abv","location":{"id":2,"name":"Main Gate"},"employee":{"id":83,"firstName":"deere","lastName":"fdfefoerpgke"},"status":{"name":"Entered"}}];
test('we should have ids 1 and 2', () => {
  expect(data[0].location.id).toEqual(2);
});

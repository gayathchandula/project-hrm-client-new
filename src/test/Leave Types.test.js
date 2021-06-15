// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Admin from '../views/dashboard/Admin/Admin';
import {render, cleanup, fireEvent, screen} from '@testing-library/react'
import {shallow} from "enzyme";
import Employee from "../views/dashboard/Leave Management/Leave Types";

it('renders correctly', () => {
  beforeEach(cleanup)
  const tree = renderer
    .create(<Admin page="https://hrm-innovigent.netlify.app/#/Leave%20Types">Facebook</Admin>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

const data= [{"id":4,"LeaveTypeName":"Maternity","createdAt":"2021-06-04T03:51:49.792Z","updatedAt":"2021-06-04T03:51:49.792Z"},{"id":3,"LeaveTypeName":"Sick","createdAt":"2021-06-04T03:45:57.011Z","updatedAt":"2021-06-04T03:45:57.011Z"}];
test('we should have ids 1 and 2', () => {
  expect(data[0].id).toEqual(4);
});

it("Test form submit and validation", () => {

  const { getByPlaceholderText, getByText } = render(<Employee />);
  const Name = getByPlaceholderText(/Enter Leave Type Name/i);

  const id = screen.getByTestId('toggle')

  fireEvent.change(Name, { target: { value: "gayth" } });
  fireEvent.click(id);
});

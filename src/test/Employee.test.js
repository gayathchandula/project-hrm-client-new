
import React from "react";
import {render, cleanup, fireEvent,screen } from '@testing-library/react'

import Employee from '../views/dashboard/Employee/Employee';

it("Test form submit and validation", () => {

  const { getByPlaceholderText, getByText } = render(<Employee />);
  const Name = getByPlaceholderText(/First Name/i);

  const id = screen.getByTestId('toggle')

  fireEvent.change(Name, { target: { value: "gayth" } });
  fireEvent.click(id);
});

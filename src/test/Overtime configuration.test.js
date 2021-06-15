
import React from "react";
import {render, cleanup, fireEvent,screen } from '@testing-library/react'

import Employee from '../views/dashboard/Overtime Management/Overtime Configuration';

it("Test form submit and validation", () => {

  const { getByPlaceholderText, getByText } = render(<Employee />);


  const id = screen.getByTestId('toggle')

  fireEvent.click(id);
});

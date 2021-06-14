import React from "react";
import {render, cleanup, fireEvent,screen } from '@testing-library/react'

import Changepassword from '../views/dashboard/Home Page/Change Password';

it("Test form submit and validation", () => {

  const { getByPlaceholderText, getByText } = render(<Changepassword />);
  const Name = getByPlaceholderText(/type old Password/i);

  const id = screen.getByTestId('toggle')

  fireEvent.change(Name, { target: { value: "gayth" } });
  fireEvent.click(id);
});

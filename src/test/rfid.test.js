import React from "react";
import {render, cleanup, fireEvent,screen } from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom"
import Rfid from '../views/dashboard/Home Page/rfid';

it("Test form submit and validation", () => {

  const { getByPlaceholderText } = render(
    <Router>
      <Rfid/>
    </Router>
   );
  const Name = getByPlaceholderText(/RFID No/i);

  //const id = screen.getByTestId('toggle')

  fireEvent.change(Name, { target: { value: "gayth" } });
  //fireEvent.click(id);
});

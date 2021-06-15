import React from "react";
import {render, cleanup, fireEvent,screen } from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom"
import Rfid from '../views/dashboard/Overtime Management/Overtime Acceptance';

it("Test form submit and validation", () => {

  const { getByPlaceholderText } = render(
    <Router>
      <Rfid/>
    </Router>
  );

  const id = screen.getByTestId('toggle')


  fireEvent.click(id);
});

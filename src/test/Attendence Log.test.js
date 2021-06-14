// user.test.js

import React from "react";
import Attendence from "../views/dashboard/Attendence Log/Attendence Log";


describe('<Attendence />', () => {
  const data = [{"id":298,"deviceId":1,"temperature":null,"ambientTemperature":null,"entry":true,"createdAt":"2021-06-08T09:39:08.801Z","updatedAt":"2021-06-08T09:39:08.801Z","shiftName":"abv","location":{"id":2,"name":"Main Gate"},"employee":{"id":83,"firstName":"deere","lastName":"fdfefoerpgke"},"status":{"name":"Entered"}}]
  it('renders without exploding', () => {
    expect(<Attendence listData={ data } />);
  });
});

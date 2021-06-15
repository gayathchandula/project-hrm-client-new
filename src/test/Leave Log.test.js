// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Admin from '../views/dashboard/Admin/Admin';
import { render,cleanup,fireEvent  } from '@testing-library/react'
import {shallow} from "enzyme";

it('renders correctly', () => {

  const tree = renderer
    .create(<Admin page="https://hrm-innovigent.netlify.app/#/leavelogs">Facebook</Admin>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

const data= [{"id":24,"reviewstatusId":1,"employeeId":60,"employeeepf":"2345356","employeeName":"Gayath","leavetypeId":3,"leaveRequestedDate":"2021-06-09","numberOfDays":0,"reason":"fhfd","createdAt":"2021-06-09T10:10:32.826Z","updatedAt":"2021-06-09T10:10:32.826Z","leavetypes":{"id":3,"LeaveTypeName":"Sick"}},{"id":23,"reviewstatusId":1,"employeeId":60,"employeeepf":"2345356","employeeName":"Gayath","leavetypeId":3,"leaveRequestedDate":"2021-06-10","numberOfDays":0,"reason":"dsfgdg","createdAt":"2021-06-09T10:04:15.195Z","updatedAt":"2021-06-09T10:04:15.195Z","leavetypes":{"id":3,"LeaveTypeName":"Sick"}},{"id":22,"reviewstatusId":1,"employeeId":60,"employeeepf":"2345356","employeeName":"Gayath","leavetypeId":3,"leaveRequestedDate":"2021-06-10","numberOfDays":0,"reason":"fdgf","createdAt":"2021-06-09T09:41:11.576Z","updatedAt":"2021-06-09T09:41:11.576Z","leavetypes":{"id":3,"LeaveTypeName":"Sick"}},{"id":21,"reviewstatusId":1,"employeeId":60,"employeeepf":"2345356","employeeName":"Gayath","leavetypeId":3,"leaveRequestedDate":"2021-06-08","numberOfDays":0,"reason":"egtrhtyyj","createdAt":"2021-06-09T09:27:53.553Z","updatedAt":"2021-06-09T09:27:53.553Z","leavetypes":{"id":3,"LeaveTypeName":"Sick"}},{"id":20,"reviewstatusId":1,"employeeId":60,"employeeepf":"2345356","employeeName":"Gayath","leavetypeId":3,"leaveRequestedDate":"2021-06-08","numberOfDays":0,"reason":"egtrhtyyj","createdAt":"2021-06-09T09:25:09.188Z","updatedAt":"2021-06-09T09:25:09.188Z","leavetypes":{"id":3,"LeaveTypeName":"Sick"}},{"id":19,"reviewstatusId":1,"employeeId":60,"employeeepf":"2345356","employeeName":"Gayath","leavetypeId":4,"leaveRequestedDate":"2021-06-08","numberOfDays":3,"reason":"Have to take","createdAt":"2021-06-09T08:10:28.842Z","updatedAt":"2021-06-09T08:10:28.842Z","leavetypes":{"id":4,"LeaveTypeName":"Maternity"}},{"id":18,"reviewstatusId":1,"employeeId":60,"employeeepf":"2345356","employeeName":"Gayath","leavetypeId":4,"leaveRequestedDate":"2021-06-08","numberOfDays":3,"reason":"Have to take","createdAt":"2021-06-09T08:10:24.060Z","updatedAt":"2021-06-09T08:10:24.060Z","leavetypes":{"id":4,"LeaveTypeName":"Maternity"}},{"id":17,"reviewstatusId":1,"employeeId":76,"employeeepf":"54632","employeeName":"Jude","leavetypeId":3,"leaveRequestedDate":"2021-06-04","numberOfDays":3,"reason":"Having High Fever","createdAt":"2021-06-04T07:44:05.939Z","updatedAt":"2021-06-09T07:40:32.859Z","leavetypes":{"id":3,"LeaveTypeName":"Sick"}}];
test('we should have ids 1 and 2', () => {
  expect(data[0].employeeId).toEqual(60);
});

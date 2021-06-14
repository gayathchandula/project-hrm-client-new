import React from 'react';
import { shallow } from 'enzyme';
import Employee from '../views/dashboard/Employee/Employee';

describe('Test Button component', () => {
  it('Test click event', () => {
    const mockCallBack = jest.fn();

    const button = shallow((<Employee onSubmit={mockCallBack}>Ok!</Employee>));
    console.log(button.debug())
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);


  });
});

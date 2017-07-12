import React from 'react';
import {shallow} from 'enzyme';

import MenuAction from './MenuAction';

describe('MenuAction', () => {
  it('puts name prop as text', () => {
    const key = 'key';
    const name = 'Action Name';

    const wrapper = shallow(<MenuAction name={name} value={key}/>);
    expect(wrapper.contains(name)).toEqual(true);
  });

  it('uses key as value for option', () => {
    const key = 'key';
    const name = 'Action Name';

    const wrapper = shallow(<MenuAction name={name} value={key}/>);
    expect(wrapper.find('option').prop('value')).toEqual(key);
  });
});

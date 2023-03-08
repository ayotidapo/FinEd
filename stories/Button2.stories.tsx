import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '../common/Button';
import './obi.css';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example2/Button2',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    // forCheckboxes: {
    //   control: {
    //     type: 'inline-check',
    //     options: [
    //       'Option 1',
    //       'Option 2',
    //       'Option 3',
    //       'Option 4',
    //       'Option 5',
    //       'Option 6',
    //     ],
    //   },
    //   defaultValue: ['Option 1'],
    //   description: 'Specifies the available options for the component.',
    // },
    // forBoolean: {
    //   control: 'boolean',
    //   defaultValue: false,
    //   description: 'Specifies whether the component is enabled or not.',
    // },
    // forRadio: {
    //   control: {
    //     type: 'radio',
    //     options: ['light', 'dark'],
    //   },
    //   defaultValue: 'light',
    //   table: {
    //     defaultValue: {
    //       summary: 'light',
    //       detail: 'something really really long',
    //     },
    //   },
    //   description: 'Specifies the color theme for the component.',
    // },
  },

  args: {
    className: 'obi',
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary1.args = {
  bg: 'green',
  children: 'Button1',
};

export const Secondary1 = Template.bind({});
Secondary1.args = {
  bg: 'blue',
  children: 'Button2',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};

/////npx sb init --builder webpack5

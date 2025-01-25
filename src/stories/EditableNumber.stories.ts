import type { Meta, StoryObj } from '@storybook/svelte';

import EditableNumber from '../components/EditableNumber.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/EditableNumber',
  component: EditableNumber,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
  },
} satisfies Meta<EditableNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Positive: Story = {
  args: {
    value: 10,
  },
};

export const Negative: Story = {
  args: {
    value: -5,
  },
};

export const MinMax: Story = {
  args: {
    value: 5,
    min: 1,
    max: 10,
  },
};

import type { Meta, StoryObj } from '@storybook/svelte';

import Ingredient from '../components/Ingredient.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Ingredient',
  component: Ingredient,
  tags: ['autodocs'],
  argTypes: {
    ingredient: {     
      control: 'object',
    },
  },
} satisfies Meta<Ingredient>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Filled: Story = {
  args: {
    ingredient: {
      name: "Flour",
      quantity: 200,
      unit: "g",
    },
  },
};

export const Empty: Story = {
  args: {
    ingredient: {
      name: "",
      quantity: 0,
      unit: "",
    },
  },
};


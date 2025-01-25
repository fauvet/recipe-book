import type { Meta, StoryObj } from '@storybook/svelte';

import Recipe from '../components/Recipe.svelte';
import pancakesRecipe from '../sample/pancakes.recipe';
import emptyRecipe from '../sample/empty.recipe';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Recipe',
  component: Recipe,
  tags: ['autodocs'],
  argTypes: {
    recipe: { "control": "object" },
  },
} satisfies Meta<Recipe>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Filled: Story = {
  args: {
    recipe: pancakesRecipe,
  },
};

export const Empty: Story = {
  args: {
    recipe: emptyRecipe,
  },
};

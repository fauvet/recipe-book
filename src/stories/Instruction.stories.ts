import type { Meta, StoryObj } from '@storybook/svelte';

import Instruction from '../components/Instruction.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/Instruction',
  component: Instruction,
  tags: ['autodocs'],
  argTypes: {
    instruction: { control: 'text' },
    isFirst: { control: 'boolean' },
    isLast: { control: 'boolean' },
  },
} satisfies Meta<Instruction>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// export const Empty: Story = {
//   args: {
//   },
// };

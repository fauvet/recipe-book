import type { Meta, StoryObj } from '@storybook/svelte';

import EditableText from '../components/EditableText.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Components/EditableText',
  component: EditableText,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    placeholder: { control: 'text' },
    isSingleLine: { control: 'boolean' },
  },
} satisfies Meta<EditableText>;

export default meta;
type Story = StoryObj<typeof meta>;

const multiLineText = "The rose is red, the violet's blue,"
 + "\nThe honey's sweet, and so are you."
 + "\nThou are my love and I am thine;"
 + "\nI drew thee to my Valentine:"
 + "\nThe lot was cast and then I drew,"
 + "\nAnd Fortune said it should be you."

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Placeholder: Story = {
  args: {
    text: "",
    placeholder: "Placeholder...",
  },
};

export const Filled: Story = {
  args: {
    text: "Text is filled",
  },
};

export const MultiLine: Story = {
  args: {
    text: multiLineText
  },
};

export const SingleLine: Story = {
  args: {
    text: multiLineText,
    isSingleLine: true,
  },
};

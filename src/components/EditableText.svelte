<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let text: string;
  export let placeholder: string = "";
  export let isSingleLine: boolean = false;

  const dispatch = createEventDispatcher();

  $: if (isSingleLine) text = sanitize(text);

  function sanitize(text: string): string {
    const sanitizers: ((value: string) => string)[] = [];
    if (isSingleLine) sanitizers.push((value) => value.replace(/\n/g, ""));
    const sanitizedValue = sanitizers.reduce((acc, modifier) => modifier(acc), text);
    return sanitizedValue;
  }

  function onContentChanged(event: Event) {
    const target = event.target as HTMLElement;
    const value = target.innerText;
    const sanitizedValue = sanitize(value);
    dispatch("textChanged", { text: sanitizedValue });
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" || (isSingleLine && event.key === "Enter")) {
      event.preventDefault();
      const target = event.target as HTMLElement;
      target.blur();
      return;
    }
  }

  function onBlur() {
    dispatch("blur", { text });
  }
</script>

<style lang="scss">
  .editable-text {
    color: var(--accent);

    &:focus {
      padding: 0 5px;
    }
    &:empty {
      display: inline-block;
      height: 100%;
      min-width: 1em;

      &:not(:focus)::before {
        content: attr(data-placeholder);
        font-style: italic;
        opacity: 0.6;
      }
    }
  }
</style>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<span
  class="editable-text"
  data-placeholder="{placeholder}"
  bind:innerText="{text}"
  on:input="{onContentChanged}"
  on:keydown="{onKeyDown}"
  on:blur="{onBlur}"
  contenteditable>
</span>

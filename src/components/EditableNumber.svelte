<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let value: number;
  export let min: number = Number.MIN_SAFE_INTEGER;
  export let max: number = Number.MAX_SAFE_INTEGER;

  const dispatch = createEventDispatcher();

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      const target = event.target as HTMLElement;
      target.blur();
      return;
    }
  }

  function onBlur() {
    dispatch("blur", { value });
  }
</script>

<style lang="scss">
  .editable-number {
    color: var(--accent);
    position: relative;

    input {
      width: 70px;
      font: inherit;

      &:focus + span {
        display: none;
      }

      &:not(:focus) {
        position: absolute;
        left: -5px;
        opacity: 0;
        width: 28px;
        border: none;

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          display: none;
        }

        & + span:empty::before {
          content: "?";
          font-style: italic;
          opacity: 0.6;
        }
      }
    }
  }
</style>

<span class="editable-number"
  ><input type="number" bind:value="{value}" on:keydown="{onKeyDown}" on:blur="{onBlur}" min="{min}" max="{max}" /><span
    >{value ?? ""}</span>
</span>

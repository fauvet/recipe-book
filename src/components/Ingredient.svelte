<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import EditableText from "./EditableText.svelte";
  import type { Ingredient } from "../types";
  import EditableNumber from "./EditableNumber.svelte";

  export let ingredient: Ingredient;

  const dispatch = createEventDispatcher();

  function dispatchButtonRemoveClicked(): void {
    dispatch("buttonRemoveClicked", { ingredient });
  }

  function dispatchHistory(): void {
    dispatch("history", { ingredient });
  }
</script>

<style lang="scss">
</style>

<div class="ingredient">
  <button on:click="{dispatchButtonRemoveClicked}">×</button>
  <EditableText
    bind:text="{ingredient.name}"
    on:textChanged="{(event) => (ingredient.name = event.detail.text)}"
    on:blur="{dispatchHistory}"
    placeholder="Ingredient..."
    isSingleLine />&nbsp;:&nbsp;
  <EditableNumber bind:value="{ingredient.quantity}" on:blur="{dispatchHistory}" /><EditableText
    bind:text="{ingredient.unit}"
    on:textChanged="{(event) => (ingredient.unit = event.detail.text)}"
    on:blur="{dispatchHistory}"
    placeholder="x"
    isSingleLine />
</div>

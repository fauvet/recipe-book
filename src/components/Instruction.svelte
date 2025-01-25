<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import EditableText from "./EditableText.svelte";
  import Ingredient from "./Ingredient.svelte";
  import type { Instruction } from "../types";
  import EditableNumber from "./EditableNumber.svelte";

  export let instruction: Instruction;
  export let isFirst: boolean;
  export let isLast: boolean;

  const dispatch = createEventDispatcher();

  $: isButtonAddIngredientDisabled = instruction.ingredients.some(
    (ingredient) => !ingredient.name || !ingredient.quantity
  );

  function onButtonUpClicked(): void {
    dispatch("buttonUpClicked", { instruction });
  }

  function onButtonDownClicked(): void {
    dispatch("buttonDownClicked", { instruction });
  }

  function onButtonRemoveInstructionClicked(): void {
    dispatch("buttonRemoveClicked", { instruction });
  }

  function onButtonAddIngredientClicked(): void {
    instruction.ingredients = [
      ...instruction.ingredients,
      {
        name: "",
        quantity: 0,
        unit: "",
      },
    ];
    dispatchHistory();
  }

  function onButtonRemoveIngredientClicked(ingredientIndex: number): void {
    if (ingredientIndex < 0 || ingredientIndex >= instruction.ingredients.length) return;

    instruction.ingredients = instruction.ingredients.filter((_, index) => index !== ingredientIndex);
    dispatchHistory();
  }

  function dispatchHistory(): void {
    dispatch("history", { instruction });
  }
</script>

<style lang="scss">
</style>

<div class="instruction">
  <button on:click="{onButtonUpClicked}" disabled="{isFirst}">↑</button>
  <button on:click="{onButtonDownClicked}" disabled="{isLast}">↓</button>
  <button on:click="{() => onButtonRemoveInstructionClicked()}">×</button>
  <button on:click="{() => onButtonAddIngredientClicked()}" disabled="{isButtonAddIngredientDisabled}">+</button>
  <strong
    ><EditableText
      bind:text="{instruction.type}"
      on:textChanged="{(event) => (instruction.type = event.detail.text)}"
      on:blur="{dispatchHistory}"
      placeholder="Instruction..."
      isSingleLine />&nbsp;(<EditableNumber
      bind:value="{instruction.durationMinutes}"
      on:blur="{dispatchHistory}"
      min="{0}"
      max="{999}" /> minutes)</strong>
  &nbsp;:&nbsp;<EditableText
    bind:text="{instruction.description}"
    on:textChanged="{(event) => (instruction.description = event.detail.text)}"
    on:blur="{dispatchHistory}"
    placeholder="Description..." />
  {#if instruction.ingredients.length > 0}
    <ul class="ingredients">
      {#each instruction.ingredients as ingredient, ingredientIndex (ingredientIndex)}
        <li>
          <Ingredient
            bind:ingredient="{ingredient}"
            on:buttonRemoveClicked="{() => onButtonRemoveIngredientClicked(ingredientIndex)}"
            on:history="{dispatchHistory}" />
        </li>
      {/each}
    </ul>
  {/if}
</div>

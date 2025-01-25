<script lang="ts">
  import { afterUpdate } from "svelte";
  import EditableText from "./EditableText.svelte";
  import type { Recipe, Ingredient } from "../types";
  import Instruction from "./Instruction.svelte";

  export let recipe: Recipe;

  let history: Recipe[] = [structuredClone(recipe)];
  let historyIndex = 0;

  $: instructions = recipe.instructions;

  $: totalDuration = instructions
    .map((instruction) => instruction.durationMinutes)
    .filter(Number.isInteger)
    .reduce((a, b) => a + b, 0);
  $: preparationDuration = instructions
    .filter(
      (instruction) =>
        instruction.type
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .toLowerCase() === "preparation"
    )
    .map((instruction) => instruction.durationMinutes)
    .filter(Number.isInteger)
    .reduce((a, b) => a + b, 0);
  $: cookingDuration = totalDuration - preparationDuration;

  $: ingredients = instructions
    .flatMap((instruction) => instruction.ingredients)
    .reduce((acc, ingredient) => {
      if (!ingredient.name && !ingredient.quantity) return acc;

      const existing = acc.find((i) => i.name === ingredient.name && i.unit === ingredient.unit);
      if (existing) {
        existing.quantity += ingredient.quantity;
      } else {
        acc.push({ ...ingredient });
      }
      return acc;
    }, [] as Ingredient[])
    .sort((a, b) => a.name.localeCompare(b.name));

  $: isButtonAddInstructionDisabled = instructions.some((instruction) => !instruction.type || !instruction.description);

  function onButtonUndoClicked(): void {
    if (historyIndex <= 0) return;
    historyIndex--;
    recipe = structuredClone(history[historyIndex]);
  }

  function onButtonRedoClicked(): void {
    if (historyIndex >= history.length - 1) return;
    historyIndex++;
    recipe = structuredClone(history[historyIndex]);
  }

  function onButtonUpClicked(instructionIndex: number): void {
    if (instructionIndex <= 0 || instructionIndex >= instructions.length) return;
    const temp = instructions[instructionIndex];
    instructions[instructionIndex] = instructions[instructionIndex - 1];
    instructions[instructionIndex - 1] = temp;
    updateHistory();
  }

  function onButtonDownClicked(instructionIndex: number): void {
    if (instructionIndex < 0 || instructionIndex >= instructions.length - 1) return;
    const temp = instructions[instructionIndex];
    instructions[instructionIndex] = instructions[instructionIndex + 1];
    instructions[instructionIndex + 1] = temp;
    updateHistory();
  }

  function onButtonRemoveInstructionClicked(instructionIndex: number): void {
    if (instructionIndex < 0 || instructionIndex >= instructions.length) return;
    recipe.instructions = instructions.filter((_, index) => index !== instructionIndex);
    updateHistory();
  }

  function onButtonAddInstructionClicked(): void {
    recipe.instructions = [
      ...instructions,
      {
        type: "",
        durationMinutes: 0,
        description: "",
        ingredients: [],
      },
    ];
    updateHistory();
  }

  afterUpdate(() => {
    console.log("Recipe updated", recipe);
  });

  function updateHistory(): void {
    const lastRecipe = history[historyIndex];
    if (JSON.stringify(lastRecipe) === JSON.stringify(recipe)) return;

    for (const instruction of instructions) {
      instruction.ingredients = instruction.ingredients.toSorted((a, b) => a.name.localeCompare(b.name));
    }
    history = [...history.slice(0, historyIndex + 1), structuredClone(recipe)];
    historyIndex++;
    recipe = structuredClone(recipe);
  }

  setInterval(() => {
    console.log("History", history);
  }, 5000);
</script>

<style lang="scss">
  .recipe {
    text-align: left;
    font-family: system-ui, sans-serif;
    max-width: 600px;
    margin: 0 auto;

    .recipe-title {
      text-align: center;
    }

    .recipe-note:empty:not(:focus)::before {
      content: attr(data-placeholder);
      font-style: italic;
    }
  }
</style>

<div class="recipe">
  <button on:click="{onButtonUndoClicked}" disabled="{historyIndex <= 0}">Undo</button>
  <button on:click="{onButtonRedoClicked}" disabled="{historyIndex >= history.length - 1}">Redo</button>
  <h1 class="recipe-title">
    <EditableText
      bind:text="{recipe.title}"
      on:textChanged="{(event) => (recipe.title = event.detail.text)}"
      on:blur="{updateHistory}"
      placeholder="Insert the title of the recipe..."
      isSingleLine />
  </h1>
  <p>
    <span><strong>Total time</strong>&nbsp;:&nbsp;{totalDuration} minutes</span>
    <br />
    <span><strong>Preparation time</strong>&nbsp;:&nbsp;{preparationDuration} minutes</span>
    <br />
    <span><strong>Cooking time</strong>&nbsp;:&nbsp;{cookingDuration} minutes</span>
  </p>
  <p class="recipe-note">
    <EditableText
      bind:text="{recipe.note}"
      on:textChanged="{(event) => (recipe.note = event.detail.text)}"
      on:blur="{updateHistory}"
      placeholder="Insert a note about the recipe..." />
  </p>

  <h2>Ingredients</h2>
  <ul class="ingredients">
    {#each ingredients as ingredient}
      <li>{ingredient.name}&nbsp;:&nbsp;{ingredient.quantity}{ingredient.unit ?? ""}</li>
    {/each}
  </ul>

  <h2>Instructions</h2>
  {#each instructions as instruction, instructionIndex (instruction)}
    <p>
      <Instruction
        bind:instruction="{instruction}"
        isFirst="{instructionIndex <= 0}"
        isLast="{instructionIndex >= instructions.length - 1}"
        on:buttonUpClicked="{() => onButtonUpClicked(instructionIndex)}"
        on:buttonDownClicked="{() => onButtonDownClicked(instructionIndex)}"
        on:buttonRemoveClicked="{() => onButtonRemoveInstructionClicked(instructionIndex)}"
        on:history="{updateHistory}"></Instruction>
    </p>
  {/each}

  <button on:click="{onButtonAddInstructionClicked}" disabled="{isButtonAddInstructionDisabled}"
    >Add an instruction</button>
</div>

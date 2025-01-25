<script lang="ts">
  import pancakesRecipe from "../sample/pancakes.recipe";
  import Recipe from "./Recipe.svelte";
</script>

<style lang="scss">
  main {
    max-width: 1024px;
    margin: 0 auto;
  }
</style>

<main>
  <Recipe recipe="{pancakesRecipe}" />
</main>

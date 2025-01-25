import type { Recipe } from "../types";

const pancakesRecipe : Recipe = {
  "title": "Pancakes",
  "note": "",
  "instructions": [
    {
      "description": "Mix the flour and sugar.",
      "ingredients": [
        { "name": "Flour", "quantity": 300, "unit": "g" },
        { "name": "Sugar", "quantity": 50, "unit": "g" }
      ],
      "type": "Preparation",
      "durationMinutes": 5
    },
    {
      "description": "Add the eggs and mix.",
      "ingredients": [
        { "name": "Eggs", "quantity": 2, "unit": "" }
      ],
      "type": "Preparation",
      "durationMinutes": 2
    },
    {
      "description": "Gradually add the milk while mixing.",
      "ingredients": [
        { "name": "Milk", "quantity": 300, "unit": "ml" }
      ],
      "type": "Preparation",
      "durationMinutes": 3
    },
    {
      "description": "Melt the butter and add it to the batter.",
      "ingredients": [
        { "name": "Butter", "quantity": 50, "unit": "g" }
      ],
      "type": "Preparation",
      "durationMinutes": 2
    },
    {
      "description": "Cook the pancakes in a hot pan.",
      "ingredients": [],
      "type": "Cooking",
      "durationMinutes": 10
    }
  ]
};

export default pancakesRecipe;
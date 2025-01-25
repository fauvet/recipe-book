export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Instruction {
  description: string;
  ingredients: Ingredient[];
  type: string;
  durationMinutes: number;
}

export interface Recipe {
  title: string;
  note: string;
  instructions: Instruction[];
}

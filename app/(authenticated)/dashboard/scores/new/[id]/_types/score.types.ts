import { object, number } from "zod";

const getScoreSchema = () =>
  number({ required_error: "Une note est requise" })
    .min(0, "La note ne peut pas être inférieure à 0")
    .max(5, "La note ne peut pas être supérieure à 5");

export const newScoreSchema = object({
  score_1: getScoreSchema(),
  score_2: getScoreSchema(),
  score_3: getScoreSchema(),
  score_4: getScoreSchema(),
  score_5: getScoreSchema(),
});

"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/custom/loading-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition } from "react";
import { newScoreSchema } from "../_types/score.types";
import { StarRating } from "@/components/custom/star-rating";
import { newScore } from "../_actions/new-score.actions";
import { toast } from "sonner";

interface Score {
  name: string;
  title: string;
  description: string;
}

export function NewScoreForm({ teamId }: { teamId: string }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof newScoreSchema>>({
    resolver: zodResolver(newScoreSchema),
    defaultValues: {
      score_1: 0,
      score_2: 0,
      score_3: 0,
      score_4: 0,
      score_5: 0,
    },
  });

  const handleNewScore = async (values: z.infer<typeof newScoreSchema>) => {
    startTransition(async () => {
      const response = await newScore(values, teamId);

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.success);
      }
    });
  };

  const scores: Score[] = [
    { name: "score_1", title: "Note 1", description: "Description 1" },
    { name: "score_2", title: "Note 2", description: "Description 2" },
    { name: "score_3", title: "Note 3", description: "Description 3" },
    { name: "score_4", title: "Note 4", description: "Description 4" },
    { name: "score_5", title: "Note 5", description: "Description 5" },
  ];

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => handleNewScore(values))}
          className="space-y-4"
        >
          {scores.map((score) => (
            <FormField
              key={score.name}
              control={form.control}
              name={
                score.name as
                  | "score_1"
                  | "score_2"
                  | "score_3"
                  | "score_4"
                  | "score_5"
              }
              render={({ field: fieldProps }) => (
                <FormItem>
                  <FormLabel>{score.title}</FormLabel>
                  <FormControl>
                    <StarRating
                      defaultValue={fieldProps.value as number}
                      onRate={(rating) => fieldProps.onChange(rating)}
                    />
                  </FormControl>
                  <FormDescription>{score.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <LoadingButton loading={isPending} className="w-full">
            Enregistrer
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}

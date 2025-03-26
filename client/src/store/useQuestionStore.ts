/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { Question } from "../types/types";
import { persist } from "zustand/middleware";

interface QuestionState {
  fetchedQuestions: Question[] | null;
  isFetchingQuestions: boolean;
  selectedQuestion: Question | null;

  fetchQuestionsByUser: (user_id: string) => Promise<void>;
  fetchLatestQuestions: () => Promise<void>;
}

export const useQuestioStore = create<QuestionState>()(
  persist(
    (_set) => ({
      fetchedQuestions: null,
      isFetchingQuestions: false,
      selectedQuestion: null,

      fetchQuestionsByUser: async (_user_id: string) => {},
      fetchLatestQuestions: async () => {},
    }),
    {
      name: "auth-storage",
    }
  )
);

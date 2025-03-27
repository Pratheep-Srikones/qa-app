/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { Question } from "../types/types";
import { persist } from "zustand/middleware";
import { toastError } from "../utils/toast";
import {
  getLatestQuestions,
  getQuestionByTag,
  getQuestionsByUserId,
} from "../services/question.service";

interface QuestionState {
  fetchedQuestions: Question[] | null;
  isFetchingQuestions: boolean;
  selectedQuestion: Question | null;
  setSelectedQuestion: (question: Question) => void;

  fetchQuestionsByUser: (user_id: string) => Promise<void>;
  fetchLatestQuestions: () => Promise<void>;

  tag: string | null;
  setTag: (tag: string) => void;
  fetchQuestionsByTag: (tag: string) => Promise<void>;
}

export const useQuestionStore = create<QuestionState>()(
  persist(
    (set) => ({
      fetchedQuestions: null,
      isFetchingQuestions: false,
      selectedQuestion: null,
      setSelectedQuestion: (question: Question) => {
        set({ selectedQuestion: question });
      },
      fetchQuestionsByUser: async (user_id: string) => {
        if (user_id === "") {
          toastError("User ID is required");
          return;
        }
        set({ isFetchingQuestions: true });
        try {
          const data = await getQuestionsByUserId(user_id);
          set({ fetchedQuestions: data.questions });
        } catch (error) {
          toastError("Error while fetching questions");
        } finally {
          set({ isFetchingQuestions: false });
        }
      },
      fetchLatestQuestions: async () => {
        set({ isFetchingQuestions: true });
        try {
          const data = await getLatestQuestions();
          set({ fetchedQuestions: data.questions });
        } catch (error) {
          toastError("Error while fetching questions");
        } finally {
          set({ isFetchingQuestions: false });
        }
      },
      tag: null,
      setTag: (tag: string) => {
        set({ tag });
      },
      fetchQuestionsByTag: async (tag: string) => {
        if (tag === "") {
          toastError("Tag is required");
          return;
        }
        set({ isFetchingQuestions: true });
        try {
          const data = await getQuestionByTag(tag);
          set({ fetchedQuestions: data.questions });
        } catch (error) {
          toastError("Error while fetching questions by tag");
        } finally {
          set({ isFetchingQuestions: false });
        }
      },
    }),
    {
      name: "question-storage",
    }
  )
);

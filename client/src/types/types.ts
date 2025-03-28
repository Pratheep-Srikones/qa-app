export interface User {
  user_id: string;
  username: string;
  email: string;
  created_at: string;
}

export interface Question {
  question_id: string;
  user_id: string;
  image_urls: string[];
  title: string;
  description: string;
  asked_at: string;
  ai_answer: string;
}

export interface TopTags {
  tag: string;
  count: number;
}

export interface Answer {
  upvotes: number;
  downvotes: number;
  answer_id: string;
  question_id: string;
  user_id: string;
  answer: string;
  answered_at: string;
}

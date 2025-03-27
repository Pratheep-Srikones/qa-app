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

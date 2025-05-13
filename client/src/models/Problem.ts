import { Author } from "./Author";

export interface Problem {
  id: string;
  title: string;
  categories: string[];
  author: Author;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
  isSolved: boolean;
  viewCount: number;
  likes: Author[];
  comments: Comment[];
  tags?: string[];
  content: string;
}

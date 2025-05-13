import { Author } from "./Author";
import { Problem } from "./Problem";

export interface Comment {
  id: string;
  content: string;
  author: Author;
  post: Problem;
  parent: Comment | null;
  likes: Author[];
  isDeleted: boolean;
}
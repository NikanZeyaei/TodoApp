export interface user {
  id: number;
  email: string;
  password: string;
}

export interface todo {
  id: number;
  title: string;
  todo_text: string;
  author_id: number;
}

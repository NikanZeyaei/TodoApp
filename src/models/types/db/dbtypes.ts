export interface user {
  id: number;
  email: string;
  password: string;
  reset_token: string;
  reset_token_expiration: number;
}

export interface todo {
  id: number;
  title: string;
  todo_text: string;
  author_id: number;
}

export const findUserByEmail = 'select * from USERS where email = $1;';

export const insertUser = 'insert into users(email, password) values ($1,$2)';

export const insertTodo =
  'insert into todos (title, todo_text, author_id) VALUES ($1,$2,$3)';

export const findAllTodosByUserId = 'select * from todos where author_id = $1;';

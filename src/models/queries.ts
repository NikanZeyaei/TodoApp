export const findUserByEmail = 'select * from users where email = ?;';

export const insertUser = 'insert into users(email, password) values (?,?)';

export const insertTodo =
  'insert into todos (title, todo_text, author_id) VALUES (?,?,?)';

export const findAllTodosByUserId = 'select * from todos where author_id = ?;';

export const deleteTodoById = 'delete from todos where id = ?;';

export const insertResetToken =
  'UPDATE users SET reset_token = ? , reset_token_expiration = ? where email = ?;';

export const findUserByToken = 'select * from users where reset_token = ?';

export const updatePasswordByEmail =
  'UPDATE users SET password = ? WHERE email = ?';

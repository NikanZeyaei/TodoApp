// import { pool } from './pool';
// import { insertUser } from './queries';

// export class User {
//   email: string = '';
//   password: string = '';
//   constructor(email: string, password: string) {
//     this.email = email;
//     this.password = password;
//   }

//   public get getEmail(): string {
//     return this.email;
//   }

//   public get getPassword(): string {
//     return this.password;
//   }

//   async saveInDB() {
//     return await pool.promise().query(insertUser, [this.email, this.password]);
//   }
// }

import { membersDB } from './db';

export const memberSearch = (email: string) => {
  return membersDB.email === email;
};

export const passwordConfirm = (password: string) => {
  return membersDB.password === password;
};

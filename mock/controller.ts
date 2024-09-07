import { Member, membersDB } from './db';

// 이메일로 회원 검색 함수
export const memberSearch = (email: string): boolean => {
  return membersDB.some((member) => member.email === email);
};

// 비밀번호 확인 함수
export const passwordConfirm = (email: string, password: string): boolean => {
  const member = membersDB.find((member) => member.email === email);
  return member ? member.password === password : false;
};

// 새로운 회원 추가 함수 (예시로 활용)
export const addMember = (email: string, password: string): Member => {
  const newMember: Member = {
    member_id: membersDB.length
      ? membersDB[membersDB.length - 1].member_id + 1
      : 1,
    email,
    password,
    created_at: new Date(),
    updated_at: new Date(),
  };
  membersDB.push(newMember);
  return newMember;
};

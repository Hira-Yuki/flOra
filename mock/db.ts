export interface Member {
  member_id: number;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export const membersDB: Member[] = [
  {
    member_id: 1,
    email: 'test@email.com',
    password: 'q1w2e3r4',
    created_at: new Date('2024-09-08'),
    updated_at: new Date(),
  },
];

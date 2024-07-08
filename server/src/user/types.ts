export type User = {
  id: number;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateUser = Omit<User, 'id' | 'created_at' | 'updated_at'>;

export interface IUser {
  id: string;
  email: string;
  password_hash: string;
  role: 'Founder' | 'Analyst' | 'Developer' | 'Admin';
  created_at?: Date;
}

export interface UserResponse {
  id: string;
  email: string;
  role: 'Founder' | 'Analyst' | 'Developer' | 'Admin';
}

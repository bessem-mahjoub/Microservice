export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  role: Role;
  address: string;
  ERole: ERole;
}

export enum Role {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  SUPERVISOR = 'SUPERVISOR',
  TUTOR = 'TUTOR'
  
}

export enum ERole {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  SUPERVISOR = 'SUPERVISOR',
  TUTOR = 'TUTOR'
  
}

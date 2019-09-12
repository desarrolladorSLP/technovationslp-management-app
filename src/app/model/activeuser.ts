export class ActiveUser {
  id: string;
  name: string;
  preferredEmail: string;
  phoneNumber: Int32Array;
  enable: boolean;
  validated: boolean;
  roles: string[];
}

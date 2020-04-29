export interface UserProfile {
  email: string;
  name: string;
  surname: string;
  telephone: string;
  id?: string;
}

export interface UserSignIn {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface CartItem {
  id: string;
  amount: number;
  idFb?: string;
}

export interface RegisterStartRequest {
  captchaToken?: string;
}

export interface RegisterStartResponse {
  challenge: string;
}

export interface ChallengeSubmission {
  code: string;
  signature: string;
}

export interface UserProfile {
  colorA: string;
  colorB: string;
  icon: string;
}

export interface RegisterCompleteRequest {
  publicKey: string;
  challenge: ChallengeSubmission;
  namespace: string;
  device: string;
  profile: UserProfile;
}

export interface User {
  id: string;
  publicKey: string;
  namespace: string;
  profile: UserProfile;
  permissions: string[];
}

export interface Session {
  id: string;
  user: string;
  createdAt: Date;
  accessedAt: Date;
  expiresAt: Date;
  device: string;
  userAgent: string;
}

export interface RegisterCompleteResponse {
  user: User;
  session: Session;
  token: string;
}

export interface UserInfoResponse {
  user: User;
  session: Session;
}

export interface LoginStartRequest {
  publicKey: string;
}

export interface LoginStartResponse {
  challenge: string;
}

export interface LoginCompleteRequest {
  publicKey: string;
  challenge: ChallengeSubmission;
  device: string;
}

export interface LoginCompleteResponse {
  user: User;
  session: Session;
  token: string;
}

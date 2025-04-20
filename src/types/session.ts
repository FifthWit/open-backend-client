export interface UpdateSessionRequest {
  deviceName?: string;
}

export interface SessionResponse {
  id: string;
  user: string;
  createdAt: Date;
  accessedAt: Date;
  expiresAt: Date;
  device: string;
  userAgent: string;
  current: boolean;
}

export interface DeleteSessionResponse {
  id: string;
}
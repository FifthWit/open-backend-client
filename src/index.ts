import { 
  fetchMeta,
  fetchRegisterStart,
  fetchRegisterComplete,
  fetchUserInfo,
  fetchLoginStart,
  fetchLoginComplete
} from "./endpoints";

import { 
  MetaResponse,
  RegisterStartRequest,
  RegisterStartResponse,
  RegisterCompleteRequest,
  RegisterCompleteResponse,
  UserInfoResponse,
  LoginStartRequest,
  LoginStartResponse,
  LoginCompleteRequest,
  LoginCompleteResponse
} from "./types";

export class PStreamBackend {
  private readonly backendUrl: string;
  private authToken?: string;

  constructor(backendUrl: string = 'https://backend.fifthwit.net') {
    this.backendUrl = backendUrl
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  async meta(): Promise<MetaResponse> {
    return fetchMeta(this.backendUrl)
  }

  async registerStart(request: RegisterStartRequest = {}): Promise<RegisterStartResponse> {
    return fetchRegisterStart(this.backendUrl, request);
  }

  async registerComplete(request: RegisterCompleteRequest): Promise<RegisterCompleteResponse> {
    const response = await fetchRegisterComplete(this.backendUrl, request);
    this.setAuthToken(response.token);
    return response;
  }

  async loginStart(request: LoginStartRequest): Promise<LoginStartResponse> {
    return fetchLoginStart(this.backendUrl, request);
  }

  async loginComplete(request: LoginCompleteRequest): Promise<LoginCompleteResponse> {
    const response = await fetchLoginComplete(this.backendUrl, request);
    this.setAuthToken(response.token);
    return response;
  }

  async getUserInfo(): Promise<UserInfoResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call registerComplete first or set a token with setAuthToken().');
    }
    return fetchUserInfo(this.backendUrl, this.authToken);
  }
}

export * from './types';
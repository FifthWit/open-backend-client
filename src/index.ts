import { 
  fetchMeta,
  fetchRegisterStart,
  fetchRegisterComplete,
  fetchUserInfo,
  fetchLoginStart,
  fetchLoginComplete,
  fetchMetricsProviders,
  fetchUpdateSession,
  fetchDeleteSession
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
  LoginCompleteResponse,
  MetricsProvidersRequest,
  UpdateSessionRequest,
  SessionResponse,
  DeleteSessionResponse
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

  /**
   * Submit provider metrics to the server
   * 
   * @param request The metrics data to send
   * @param method The HTTP method to use (POST or PUT)
   * @returns A boolean indicating success
   */
  async sendProviderMetrics(
    request: MetricsProvidersRequest, 
    method: 'POST' | 'PUT' = 'POST'
  ): Promise<boolean> {
    return fetchMetricsProviders(this.backendUrl, request, method);
  }

  /**
   * Update a session's device name
   * 
   * @param sessionId The ID of the session to update
   * @param request The update request with new device name
   * @returns The updated session
   */
  async updateSession(sessionId: string, request: UpdateSessionRequest): Promise<SessionResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchUpdateSession(this.backendUrl, sessionId, request, this.authToken);
  }

  /**
   * Delete a session
   * 
   * @param sessionId The ID of the session to delete
   * @returns The deleted session ID
   */
  async deleteSession(sessionId: string): Promise<DeleteSessionResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchDeleteSession(this.backendUrl, sessionId, this.authToken);
  }
}

export * from './types';
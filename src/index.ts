import { 
  fetchMeta,
  fetchRegisterStart,
  fetchRegisterComplete,
  fetchUserInfo,
  fetchLoginStart,
  fetchLoginComplete,
  fetchMetricsProviders,
  fetchUpdateSession,
  fetchDeleteSession,
  fetchCreateBookmark,
  fetchDeleteBookmark,
  fetchGetLists,
  fetchCreateList,
  fetchUpdateList,
  fetchDeleteList,
  fetchUpdateProgress,
  fetchDeleteProgress,
  fetchImportProgress,
  fetchGetBookmarks,
  fetchBulkUpdateBookmarks,
  fetchUpdateUserProfile,
  fetchDeleteUser,
  fetchGetProgress,
  fetchGetUserRatings,
  fetchSetUserRating,
  fetchGetUserSessions,
  fetchGetUserSettings,
  fetchUpdateUserSettings
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
  DeleteSessionResponse,
  CreateBookmarkRequest,
  BookmarkResponse,
  DeleteBookmarkResponse,
  ProgressItem,
  UpdateProgressResponse,
  DeleteProgressRequest,
  DeleteProgressResponse,
  ImportProgressResponseItem,
  GetListsResponse,
  CreateListRequest,
  CreateListResponse,
  UpdateListRequest,
  UpdateListResponse,
  DeleteListResponse,
  GetBookmarksResponse,
  BulkUpdateBookmarksRequest,
  BulkUpdateBookmarksResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
  DeleteUserResponse,
  UserProgress,
  GetUserRatingsResponse,
  SetUserRatingRequest,
  SetUserRatingResponse,
  GetUserSessionsResponse,
  UserSettings,
  UpdateUserSettingsRequest
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

  /**
   * Create or update a bookmark for the current user
   * 
   * @param userId The ID of the user
   * @param tmdbId The TMDB ID of the content to bookmark
   * @param request The bookmark data
   * @returns The created/updated bookmark
   */
  async createBookmark(
    userId: string,
    tmdbId: string,
    request: CreateBookmarkRequest
  ): Promise<BookmarkResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchCreateBookmark(this.backendUrl, userId, tmdbId, request, this.authToken);
  }

  /**
   * Delete a bookmark for the current user
   * 
   * @param userId The ID of the user
   * @param tmdbId The TMDB ID of the content to remove from bookmarks
   * @returns The deletion response
   */
  async deleteBookmark(
    userId: string,
    tmdbId: string
  ): Promise<DeleteBookmarkResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchDeleteBookmark(this.backendUrl, userId, tmdbId, this.authToken);
  }

  /**
   * Update a progress item for tracking watch status
   * 
   * @param userId The ID of the user
   * @param tmdbId The TMDB ID of the content
   * @param progress The progress data to update
   * @returns The updated progress item
   */
  async updateProgress(
    userId: string,
    tmdbId: string,
    progress: ProgressItem
  ): Promise<UpdateProgressResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchUpdateProgress(this.backendUrl, userId, tmdbId, progress, this.authToken);
  }

  /**
   * Delete a progress item
   * 
   * @param userId The ID of the user
   * @param tmdbId The TMDB ID of the content
   * @param request Optional details for deletion
   * @returns Information about the deleted items
   */
  async deleteProgress(
    userId: string,
    tmdbId: string,
    request: DeleteProgressRequest = {}
  ): Promise<DeleteProgressResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchDeleteProgress(this.backendUrl, userId, tmdbId, request, this.authToken);
  }

  /**
   * Import multiple progress items at once
   * 
   * @param userId The ID of the user
   * @param progress The progress items to import
   * @returns The imported progress items
   */
  async importProgress(
    userId: string,
    progress: ProgressItem[]
  ): Promise<ImportProgressResponseItem> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchImportProgress(this.backendUrl, userId, progress, this.authToken);
  }

  /**
   * Get all lists for a user
   * 
   * @param userId The ID of the user
   * @returns All lists for the user
   */
  async getLists(userId: string): Promise<GetListsResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchGetLists(this.backendUrl, userId, this.authToken);
  }

  /**
   * Create a new list for a user
   * 
   * @param userId The ID of the user
   * @param request The list to create
   * @returns The created list
   */
  async createList(
    userId: string,
    request: CreateListRequest
  ): Promise<CreateListResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchCreateList(this.backendUrl, userId, request, this.authToken);
  }

  /**
   * Update a list
   * 
   * @param userId The ID of the user
   * @param request The update request
   * @returns The updated list
   */
  async updateList(
    userId: string,
    request: UpdateListRequest
  ): Promise<UpdateListResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchUpdateList(this.backendUrl, userId, request, this.authToken);
  }

  /**
   * Delete a list
   * 
   * @param userId The ID of the user
   * @param listId The ID of the list to delete
   * @returns Confirmation of deletion
   */
  async deleteList(
    userId: string,
    listId: string
  ): Promise<DeleteListResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchDeleteList(this.backendUrl, userId, listId, this.authToken);
  }

  /**
   * Get all bookmarks for a user
   * 
   * @param userId The ID of the user
   * @returns Array of bookmarks
   */
  async getBookmarks(userId: string): Promise<GetBookmarksResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchGetBookmarks(this.backendUrl, userId, this.authToken);
  }

  /**
   * Bulk update bookmarks for a user
   * 
   * @param userId The ID of the user
   * @param bookmarks The bookmarks to update
   * @returns The updated bookmarks
   */
  async bulkUpdateBookmarks(
    userId: string,
    bookmarks: BulkUpdateBookmarksRequest
  ): Promise<BulkUpdateBookmarksResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchBulkUpdateBookmarks(this.backendUrl, userId, bookmarks, this.authToken);
  }

  /**
   * Update a user's profile
   * 
   * @param userId The ID of the user
   * @param request The update request with new profile data
   * @returns The updated user
   */
  async updateUserProfile(
    userId: string,
    request: UpdateUserProfileRequest
  ): Promise<UpdateUserProfileResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchUpdateUserProfile(this.backendUrl, userId, request, this.authToken);
  }

  /**
   * Delete a user account
   * 
   * @param userId The ID of the user
   * @returns The deletion response
   */
  async deleteUser(userId: string): Promise<DeleteUserResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchDeleteUser(this.backendUrl, userId, this.authToken);
  }

  /**
   * Get all progress items for a user
   * 
   * @param userId The ID of the user
   * @returns Array of progress items
   */
  async getProgress(userId: string): Promise<UserProgress[]> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchGetProgress(this.backendUrl, userId, this.authToken);
  }

  /**
   * Get all ratings for a user
   * 
   * @param userId The ID of the user
   * @returns All ratings for the user
   */
  async getUserRatings(userId: string): Promise<GetUserRatingsResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchGetUserRatings(this.backendUrl, userId, this.authToken);
  }

  /**
   * Set a rating for a movie or TV show
   * 
   * @param userId The ID of the user
   * @param rating The rating data
   * @returns The updated rating
   */
  async setUserRating(
    userId: string,
    rating: SetUserRatingRequest
  ): Promise<SetUserRatingResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchSetUserRating(this.backendUrl, userId, rating, this.authToken);
  }

  /**
   * Get all sessions for a user
   * 
   * @param userId The ID of the user
   * @returns Array of user sessions
   */
  async getUserSessions(userId: string): Promise<GetUserSessionsResponse> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchGetUserSessions(this.backendUrl, userId, this.authToken);
  }

  /**
   * Get user settings
   * 
   * @param userId The ID of the user
   * @returns User settings
   */
  async getUserSettings(userId: string): Promise<UserSettings> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchGetUserSettings(this.backendUrl, userId, this.authToken);
  }

  /**
   * Update user settings
   * 
   * @param userId The ID of the user
   * @param settings The settings to update
   * @returns The updated user settings
   */
  async updateUserSettings(
    userId: string,
    settings: UpdateUserSettingsRequest
  ): Promise<UserSettings> {
    if (!this.authToken) {
      throw new Error('Authentication required. Call loginComplete or registerComplete first.');
    }
    return fetchUpdateUserSettings(this.backendUrl, userId, settings, this.authToken);
  }
}

export * from './types';
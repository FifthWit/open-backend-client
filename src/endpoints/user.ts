import { UserInfoResponse, CreateBookmarkRequest, BookmarkResponse, DeleteBookmarkResponse } from '../types';

/**
 * Fetch current user information
 * Requires authentication token to be set in the Authorization header
 */
export async function fetchUserInfo(
  baseUrl: string,
  token: string
): Promise<UserInfoResponse> {
  const response = await fetch(`${baseUrl}/users/@me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user information: ${response.status}`);
  }
  
  return await response.json() as UserInfoResponse;
}

/**
 * Create or update a bookmark for a user
 * 
 * @param baseUrl The base URL of the API
 * @param userId The ID of the user
 * @param tmdbId The TMDB ID of the content to bookmark
 * @param request The bookmark data
 * @param token Authentication token
 * @returns The created/updated bookmark
 */
export async function fetchCreateBookmark(
  baseUrl: string,
  userId: string,
  tmdbId: string,
  request: CreateBookmarkRequest,
  token: string
): Promise<BookmarkResponse> {
  const response = await fetch(`${baseUrl}/users/${userId}/bookmarks/${tmdbId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error(`fetchCreateBookmark error: ${response.status}`);
  }

  return await response.json() as BookmarkResponse;
}

/**
 * Delete a user's bookmark
 * 
 * @param baseUrl The base URL of the API
 * @param userId The ID of the user
 * @param tmdbId The TMDB ID of the content to remove from bookmarks
 * @param token Authentication token
 * @returns The deletion response
 */
export async function fetchDeleteBookmark(
  baseUrl: string,
  userId: string,
  tmdbId: string,
  token: string
): Promise<DeleteBookmarkResponse> {
  const response = await fetch(`${baseUrl}/users/${userId}/bookmarks/${tmdbId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`fetchDeleteBookmark error: ${response.status}`);
  }

  return await response.json() as DeleteBookmarkResponse;
}
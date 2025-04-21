import { 
  ProgressItem, 
  UpdateProgressResponse, 
  DeleteProgressRequest, 
  DeleteProgressResponse,
  ImportProgressResponse
} from '../types';

/**
 * Update a progress item
 * 
 * @param baseUrl The base URL of the API
 * @param userId The ID of the user
 * @param tmdbId The TMDB ID of the content
 * @param request The progress item to update
 * @param token Authentication token
 * @returns The updated progress item
 */
export async function fetchUpdateProgress(
  baseUrl: string,
  userId: string,
  tmdbId: string,
  request: ProgressItem,
  token: string
): Promise<UpdateProgressResponse> {
  const response = await fetch(`${baseUrl}/users/${userId}/progress/${tmdbId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error(`fetchUpdateProgress error: ${response.status}`);
  }

  return await response.json() as UpdateProgressResponse;
}

/**
 * Delete a progress item
 * 
 * @param baseUrl The base URL of the API
 * @param userId The ID of the user
 * @param tmdbId The TMDB ID of the content
 * @param request Additional details for deletion
 * @param token Authentication token
 * @returns Information about the deleted items
 */
export async function fetchDeleteProgress(
  baseUrl: string,
  userId: string,
  tmdbId: string,
  request: DeleteProgressRequest,
  token: string
): Promise<DeleteProgressResponse> {
  const response = await fetch(`${baseUrl}/users/${userId}/progress/${tmdbId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error(`fetchDeleteProgress error: ${response.status}`);
  }

  return await response.json() as DeleteProgressResponse;
}

/**
 * Import multiple progress items at once
 * 
 * @param baseUrl The base URL of the API
 * @param userId The ID of the user
 * @param request The progress items to import
 * @param token Authentication token
 * @returns The imported progress items
 */
export async function fetchImportProgress(
  baseUrl: string,
  userId: string,
  request: ProgressItem[],
  token: string
): Promise<ImportProgressResponse> {
  const response = await fetch(`${baseUrl}/users/${userId}/progress/import`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error(`fetchImportProgress error: ${response.status}`);
  }

  return await response.json() as ImportProgressResponse;
}
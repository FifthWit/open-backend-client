import { 
  ProgressItem, 
  UpdateProgressResponse, 
  DeleteProgressRequest, 
  DeleteProgressResponse,
  ImportProgressResponseItem,
  UserProgress,
  GetUserRatingsResponse,
  SetUserRatingRequest,
  SetUserRatingResponse,
  GetUserSessionsResponse,
  UserSettings,
  UpdateUserSettingsRequest
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
  progress: ProgressItem,
  token: string
): Promise<UpdateProgressResponse> {
  const response = await fetch(`${baseUrl}/users/${userId}/progress/${tmdbId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(progress)
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
  progress: ProgressItem[],
  token: string
): Promise<ImportProgressResponseItem> {
  const response = await fetch(`${baseUrl}/users/${userId}/progress/import`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ items: progress })
  });

  if (!response.ok) {
    throw new Error(`fetchImportProgress error: ${response.status}`);
  }

  return await response.json() as ImportProgressResponseItem;
}

export async function fetchGetProgress(
  baseUrl: string,
  userId: string,
  token: string
): Promise<UserProgress[]> {
  const response = await fetch(`${baseUrl}/users/${userId}/progress`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`fetchGetProgress error: ${response.status}`);
  }

  return await response.json() as UserProgress[];
}

export async function fetchGetUserRatings(
  baseUrl: string,
  userId: string,
  token: string
): Promise<GetUserRatingsResponse> {
  const response = await fetch(`${baseUrl}/users/${userId}/ratings`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`fetchGetUserRatings error: ${response.status}`);
  }

  return await response.json() as GetUserRatingsResponse;
}

export async function fetchSetUserRating(
  baseUrl: string,
  userId: string,
  rating: SetUserRatingRequest,
  token: string
): Promise<SetUserRatingResponse> {
  const response = await fetch(`${baseUrl}/users/${userId}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(rating)
  });

  if (!response.ok) {
    throw new Error(`fetchSetUserRating error: ${response.status}`);
  }

  return await response.json() as SetUserRatingResponse;
}

export async function fetchGetUserSessions(
  baseUrl: string,
  userId: string,
  token: string
): Promise<GetUserSessionsResponse> {
  const response = await fetch(`${baseUrl}/users/${userId}/sessions`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`fetchGetUserSessions error: ${response.status}`);
  }

  return await response.json() as GetUserSessionsResponse;
}

export async function fetchGetUserSettings(
  baseUrl: string,
  userId: string,
  token: string
): Promise<UserSettings> {
  const response = await fetch(`${baseUrl}/users/${userId}/settings`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`fetchGetUserSettings error: ${response.status}`);
  }

  return await response.json() as UserSettings;
}

export async function fetchUpdateUserSettings(
  baseUrl: string,
  userId: string,
  settings: UpdateUserSettingsRequest,
  token: string
): Promise<UserSettings> {
  const response = await fetch(`${baseUrl}/users/${userId}/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(settings)
  });

  if (!response.ok) {
    throw new Error(`fetchUpdateUserSettings error: ${response.status}`);
  }

  return await response.json() as UserSettings;
}
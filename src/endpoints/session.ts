import { UpdateSessionRequest, SessionResponse, DeleteSessionResponse } from '../types';

/**
 * Update a session's device name
 * 
 * @param baseUrl The base URL of the API
 * @param sessionId The ID of the session to update
 * @param request The update request payload
 * @param token Authentication token
 * @returns The updated session
 */
export async function fetchUpdateSession(
  baseUrl: string,
  sessionId: string,
  request: UpdateSessionRequest,
  token: string
): Promise<SessionResponse> {
  const response = await fetch(`${baseUrl}/sessions/${sessionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error(`fetchUpdateSession error: ${response.status}`);
  }

  return await response.json() as SessionResponse;
}

/**
 * Delete a session
 * 
 * @param baseUrl The base URL of the API
 * @param sessionId The ID of the session to delete
 * @param token Authentication token
 * @returns The deleted session ID
 */
export async function fetchDeleteSession(
  baseUrl: string,
  sessionId: string,
  token: string
): Promise<DeleteSessionResponse> {
  const response = await fetch(`${baseUrl}/sessions/${sessionId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`fetchDeleteSession error: ${response.status}`);
  }

  return await response.json() as DeleteSessionResponse;
}
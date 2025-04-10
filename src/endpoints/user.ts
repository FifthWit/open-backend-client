import { UserInfoResponse } from '../types';

/**
 * Fetch current user information
 * Requires authentication token to be set in the Authorization header
 */
export async function fetchUserInfo(
  baseUrl: string,
  token: string
): Promise<UserInfoResponse> {
  const response = await fetch(`${baseUrl}/auth/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user information: ${response.status}`);
  }
  
  return await response.json() as UserInfoResponse;
}
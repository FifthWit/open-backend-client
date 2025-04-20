import { 
  GetListsResponse,
  CreateListRequest,
  CreateListResponse,
  UpdateListRequest,
  UpdateListResponse,
  DeleteListResponse
} from '../types';

/**
 * Get all lists for a user
 * 
 * @param baseUrl The base URL of the API
 * @param userId The ID of the user
 * @param token Authentication token
 * @returns All lists for the user
 */
export async function fetchGetLists(
  baseUrl: string,
  userId: string,
  token: string
): Promise<GetListsResponse> {
  const response = await fetch(`${baseUrl}/users/${userId}/list`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`fetchGetLists error: ${response.status}`);
  }

  return await response.json() as GetListsResponse;
}

/**
 * Create a new list for a user
 * 
 * @param baseUrl The base URL of the API
 * @param userId The ID of the user
 * @param request The list to create
 * @param token Authentication token
 * @returns The created list
 */
export async function fetchCreateList(
  baseUrl: string,
  userId: string,
  request: CreateListRequest,
  token: string
): Promise<CreateListResponse> {
  const response = await fetch(`${baseUrl}/users/${userId}/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error(`fetchCreateList error: ${response.status}`);
  }

  return await response.json() as CreateListResponse;
}

/**
 * Update a list
 * 
 * @param baseUrl The base URL of the API
 * @param userId The ID of the user
 * @param request The update request
 * @param token Authentication token
 * @returns The updated list
 */
export async function fetchUpdateList(
  baseUrl: string,
  userId: string,
  request: UpdateListRequest,
  token: string
): Promise<UpdateListResponse> {
  const response = await fetch(`${baseUrl}/users/${userId}/list`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error(`fetchUpdateList error: ${response.status}`);
  }

  return await response.json() as UpdateListResponse;
}

/**
 * Delete a list
 * 
 * @param baseUrl The base URL of the API
 * @param userId The ID of the user
 * @param listId The ID of the list to delete
 * @param token Authentication token
 * @returns Confirmation of deletion
 */
export async function fetchDeleteList(
  baseUrl: string,
  userId: string,
  listId: string,
  token: string
): Promise<DeleteListResponse> {
  const response = await fetch(`${baseUrl}/users/${userId}/lists/${listId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`fetchDeleteList error: ${response.status}`);
  }

  return await response.json() as DeleteListResponse;
}
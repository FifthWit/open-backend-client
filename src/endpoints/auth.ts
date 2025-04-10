import { 
  RegisterStartRequest, 
  RegisterStartResponse,
  RegisterCompleteRequest,
  RegisterCompleteResponse
} from '../types';

export async function fetchRegisterStart(
  baseUrl: string, 
  request: RegisterStartRequest
): Promise<RegisterStartResponse> {
  const response = await fetch(`${baseUrl}/auth/register/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });
  
  if (!response.ok) {
    throw new Error(`fetchRegisterStart error: ${response.status}`);
  }
  
  return await response.json() as RegisterStartResponse;
}

export async function fetchRegisterComplete(
  baseUrl: string, 
  request: RegisterCompleteRequest
): Promise<RegisterCompleteResponse> {
  const response = await fetch(`${baseUrl}/auth/register/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });
  
  if (!response.ok) {
    throw new Error(`fetchRegisterComplete error: ${response.status}`);
  }
  
  return await response.json() as RegisterCompleteResponse;
}
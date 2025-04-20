import { 
  RegisterStartRequest, 
  RegisterStartResponse,
  RegisterCompleteRequest,
  RegisterCompleteResponse,
  LoginStartRequest,
  LoginStartResponse,
  LoginCompleteRequest,
  LoginCompleteResponse
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

export async function fetchLoginStart(
  baseUrl: string,
  request: LoginStartRequest
): Promise<LoginStartResponse> {
  const response = await fetch(`${baseUrl}/auth/login/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error(`fetchLoginStart error: ${response.status}`);
  }

  return await response.json() as LoginStartResponse;
}

export async function fetchLoginComplete(
  baseUrl: string,
  request: LoginCompleteRequest
): Promise<LoginCompleteResponse> {
  const response = await fetch(`${baseUrl}/auth/login/complete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error(`fetchLoginComplete error: ${response.status}`);
  }

  return await response.json() as LoginCompleteResponse;
}
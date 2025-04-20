import { MetricsProvidersRequest } from '../types';

/**
 * Send provider metrics to the server
 * 
 * @param baseUrl The base URL of the API
 * @param request The metrics data to send
 * @param method The HTTP method to use (POST or PUT)
 * @returns A boolean indicating success
 */
export async function fetchMetricsProviders(
  baseUrl: string,
  request: MetricsProvidersRequest,
  method: 'POST' | 'PUT' = 'POST'
): Promise<boolean> {
  const response = await fetch(`${baseUrl}/metrics/providers`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });
  
  if (!response.ok) {
    throw new Error(`fetchMetricsProviders error: ${response.status}`);
  }
  
  return await response.json() as boolean;
}
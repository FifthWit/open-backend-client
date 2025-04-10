import { MetaResponse } from "../types";

export async function fetchMeta(baseUrl: string): Promise<MetaResponse> {
  const response = await fetch(`${baseUrl}/meta`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch meta information: ${response.status}`);
  }
  
  return await response.json() as MetaResponse;
}
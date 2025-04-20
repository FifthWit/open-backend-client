export interface MetricsProviderItem {
  tmdbId: string;
  type: string;
  title: string;
  seasonId?: string;
  episodeId?: string;
  status: string;
  providerId: string;
  embedId?: string;
  errorMessage?: string;
  fullError?: string;
}

export interface MetricsProvidersRequest {
  items: MetricsProviderItem[];
  tool?: string;
  batchId?: string;
}
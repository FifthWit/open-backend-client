export interface ProgressMeta {
  title: string;
  poster?: string;
  type: 'movie' | 'tv' | 'show';
  year?: number;
}

export interface ProgressItem {
  meta: ProgressMeta;
  tmdbId: string;
  duration: number;
  watched: number;
  seasonId?: string;
  episodeId?: string;
  seasonNumber?: number;
  episodeNumber?: number;
  updatedAt?: string;
}

export interface UpdateProgressResponse {
  id: string;
  tmdbId: string;
  userId: string;
  seasonId?: string;
  episodeId?: string;
  seasonNumber?: number;
  episodeNumber?: number;
  meta: ProgressMeta;
  duration: number;
  watched: number;
  updatedAt: Date;
}

export interface DeleteProgressRequest {
  seasonId?: string;
  episodeId?: string;
  meta?: {
    type: 'movie' | 'tv' | 'show';
  };
}

export interface DeleteProgressResponse {
  count: number;
  tmdbId: string;
  seasonId?: string;
  episodeId?: string;
}

export interface ImportProgressResponseItem {
  id: string;
  tmdbId: string;
  episode: {
    id: string | null;
    number: number | null;
  };
  season: {
    id: string | null;
    number: number | null;
  };
  meta: ProgressMeta;
  duration: string;
  watched: string;
  updatedAt: string;
}

export type ImportProgressResponse = ImportProgressResponseItem[];
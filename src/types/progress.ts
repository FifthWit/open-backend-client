export interface ProgressMeta {
  title: string;
  poster?: string;
  type: 'movie' | 'show';
  year?: number;
}

export interface ProgressItem {
  meta: {
    title: string;
    year?: number;
    poster?: string;
    type: 'movie' | 'show';
  };
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
  seasonId: string | null;
  episodeId: string | null;
  seasonNumber: number | null;
  episodeNumber: number | null;
  meta: {
    title: string;
    year?: number;
    poster?: string;
    type: 'movie' | 'show';
  };
  duration: number;
  watched: number;
  updatedAt: Date;
}

export interface DeleteProgressRequest {
  seasonId?: string;
  episodeId?: string;
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

export type ImportProgressResponseItems = ImportProgressResponseItem[];

export interface UserProgress {
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
  meta: {
    title: string;
    year?: number;
    poster?: string;
    type: 'movie' | 'show';
  };
  duration: string;
  watched: string;
  updatedAt: string;
}

export interface ImportProgressResponseWithCount {
  count: number;
  items: UserProgress[];
}

export interface UserRating {
  tmdb_id: number;
  type: 'movie' | 'tv';
  rating: number;
}

export interface GetUserRatingsResponse {
  userId: string;
  ratings: UserRating[];
}

export interface SetUserRatingRequest {
  tmdb_id: number;
  type: 'movie' | 'tv';
  rating: number;
}

export interface SetUserRatingResponse {
  userId: string;
  rating: UserRating;
}

// User sessions types
export interface UserSession {
  id: string;
  userId: string;
  createdAt: string;
  accessedAt: string;
  device: string;
  userAgent: string;
}

export type GetUserSessionsResponse = UserSession[];

// User settings types
export interface UserSettings {
  id: string;
  applicationTheme: string | null;
  applicationLanguage: string;
  defaultSubtitleLanguage: string | null;
  proxyUrls: string[] | null;
  traktKey: string | null;
  febboxKey: string | null;
}

export interface UpdateUserSettingsRequest {
  applicationTheme?: string | null;
  applicationLanguage: string;
  defaultSubtitleLanguage?: string | null;
  proxyUrls?: string[] | null;
  traktKey?: string | null;
  febboxKey?: string | null;
}
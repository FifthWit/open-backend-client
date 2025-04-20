import { User, Session } from './auth';

export interface BookmarkMeta {
  title: string;
  year: number;
  poster?: string;
  type: 'movie' | 'show';
}

export interface CreateBookmarkRequest {
  meta: BookmarkMeta;
}

export interface BookmarkResponse {
  tmdbId: string;
  meta: BookmarkMeta;
  updatedAt: string; // ISO date string
}

export interface DeleteBookmarkResponse {
  success: boolean;
  tmdbId: string;
}
import { User, Session } from './auth';
import { UserProfile } from './index';

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

// New types for bookmarks endpoints
export interface BookmarkItem {
  tmdbId: string;
  meta: BookmarkMeta;
}

export type GetBookmarksResponse = BookmarkResponse[];

export interface BulkUpdateBookmarksRequest extends Array<BookmarkItem> {}

export type BulkUpdateBookmarksResponse = BookmarkResponse[];

export interface UpdateUserProfileRequest {
  profile: {
    icon: string;
    colorA: string;
    colorB: string;
  }
}

export interface UpdateUserProfileResponse {
  id: string;
  publicKey: string;
  namespace: string;
  profile: UserProfile;
  permissions: string[];
  createdAt: Date;
  lastLoggedIn: Date;
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
}
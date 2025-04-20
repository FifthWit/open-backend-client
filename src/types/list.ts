export interface ListItem {
  tmdb_id: string;
}

export interface ListItemResponse extends ListItem {
  id: string;
  list_id: string;
}

export interface List {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  list_items: ListItemResponse[];
}


export interface GetListsResponse {
  lists: List[];
}

export interface CreateListRequest {
  name: string;
  description?: string | null;
  items?: ListItem[];
}

export interface CreateListResponse {
  list: List;
  message: string;
}

export interface UpdateListRequest {
  list_id: string;
  name?: string;
  description?: string | null;
  addItems?: ListItem[];
  removeItems?: ListItem[];
}


export interface UpdateListResponse {
  list: List;
  message: string;
}

export interface DeleteListResponse {
  id: string;
  message: string;
}
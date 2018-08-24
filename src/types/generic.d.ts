type Entity = Track | Album | Artist | User;

interface PaginatedData<T extends Entity> {
  [page: number]: T[];
}

interface SearchResult<T extends Entity> {
  count: number;
  results: T[];
}

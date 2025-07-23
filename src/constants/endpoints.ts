// FBI Base API
export const BASE_FBI_API_URL =
  process.env.FBI_API_BASE_URL || 'https://api.fbi.gov/wanted/v1';

export const FBI_API_ENDPOINTS = {
  LIST: `${BASE_FBI_API_URL}/list`, // paginated list
  DETAIL: (uid: string) => `${BASE_FBI_API_URL}/${uid}`, // specific record
  FILTER: {
    FIELD_OFFICES: (office: string) =>
      `${BASE_FBI_API_URL}/list?field_offices=${office}`,
    TITLE: (title: string) =>
      `${BASE_FBI_API_URL}/list?title=${encodeURIComponent(title)}`,
    HAIR: (color: string) => `${BASE_FBI_API_URL}/list?hair=${color}`,
    EYES: (color: string) => `${BASE_FBI_API_URL}/list?eyes=${color}`,
    RACE: (race: string) => `${BASE_FBI_API_URL}/list?race=${race}`,
    NATIONALITY: (nat: string) => `${BASE_FBI_API_URL}/list?nationality=${nat}`,
    SEX: (sex: string) => `${BASE_FBI_API_URL}/list?sex=${sex}`,
  },
  SEARCH: (query: string) =>
    `${BASE_FBI_API_URL}/list?title=${encodeURIComponent(query)}`,
  PAGINATED: (page: number, query = '') =>
    `${BASE_FBI_API_URL}/list?page=${page}&title=${encodeURIComponent(query)}`,
};

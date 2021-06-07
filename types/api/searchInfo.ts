export interface SearchInfo {
  text: string;

  value: string;
}

export interface SearchStateInfo {
  data: Array<SearchInfo>;
  value: any;
  fetching: boolean;
}

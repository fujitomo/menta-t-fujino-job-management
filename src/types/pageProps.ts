export type PageProps<
  Params extends Record<string, string> = Record<string, never>,
  SearchParams extends Record<string, string | string[] | undefined> = Record<
    string,
    never
  >,
> = {
  params: Params;
  searchParams: SearchParams;
};

export const getUrlApi = (): { currentUrlOrigin: string } => {
  //const currentUrlOrigin: string = window.location.origin + /docs-json;

  const currentUrlOrigin = 'http://127.0.0.1:3333/schema'; // window.location.origin;

  return {
    currentUrlOrigin,
  };
};

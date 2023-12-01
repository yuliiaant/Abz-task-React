// eslint-disable-next-line max-len
const API_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPeople(): Promise<Response> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}

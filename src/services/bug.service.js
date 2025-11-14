import Axios from 'axios';
const axios = Axios.create({
  withCredentials: true,
});

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/bug/' :
    '//localhost:3030/api/bug/'

export const bugService = {
  query,
  getById,
  save,
  remove,
};

async function query(reqParams) {
  const bugsResponse = await axios.get(BASE_URL, { params: reqParams });
  let bugs = bugsResponse.data;
  return bugs;
}
async function getById(bugId) {
  const bugsResponse = await axios.get(BASE_URL + `${bugId}`);
  let bug = bugsResponse.data;
  return bug;
}
async function remove(bugId) {
  await axios.delete(BASE_URL + `${bugId}`);
}
async function save(bugToSave) {
  const url = BASE_URL + (bugToSave._id || '');
  const method = bugToSave._id ? 'put' : 'post';
  console.log('url method', url, method);

  try {
    const { data: savedbug } = await axios[method](url, bugToSave);
    return savedbug;
  } catch (err) {
    console.log('err:', err);
    throw err;
  }
}

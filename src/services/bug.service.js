import Axios from 'axios';
const axios = Axios.create({
  withCredentials: true,
});

const BASE_URL = 'http://localhost:3030/api/bug/';

export const bugService = {
  query,
  getById,
  save,
  remove,
};

async function query() {
  const bugsResponse = await axios.get(BASE_URL);
  let bugs = bugsResponse.data;
  return bugs;
}
async function getById(bugId) {
  const bugsResponse = await axios.get(BASE_URL + `${bugId}`);
  let bug = bugsResponse.data;
  return bug;
}
async function remove(bugId) {
  await axios.get(BASE_URL + `${bugId}/remove`);
}
async function save(bug) {
  const bugsResponse = await axios.get(BASE_URL + `save`, { params: bug });
  return bugsResponse.data;
}

import axios from 'axios'
const baseUrl = '/api/comments'

const create = async (object) => {
  const request = await axios.post(baseUrl, object)
  console.log(object)
  return request.data
}

export default { create }

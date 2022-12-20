require('dotenv').config()
const axios = require('axios')

const org_id = 'org_DnITNWXfRvtMKNu6' // circle-org

main()

async function main() {
  const { access_token, token_type } = await getM2MToken()
  console.log('token_type: ', token_type)
  console.log(access_token)
  console.log('')
  const response = await useToken ({ access_token, token_type })
  console.log('')
  console.log(response.data)
}

async function getM2MToken () {
  const options = {
    method: 'POST',
    url: `https://${process.env.DOMAIN}/oauth/token`,
    headers: {
      'content-type': 'application/json'
    },
    data: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      audience: process.env.AUDIENCE,
      grant_type: 'client_credentials',
      // organization: org_id,
    }
  }

  try {
    const response = await axios(options)
    return response.data
  } catch (error) {
    console.log('an error occured while fetching the token')
    console.log(error.message)
    return {
      data: `${error.status}: ${error.statusText}`
    }
  }
}

async function useToken ({ access_token, token_type }) {
  const options = {
    headers: {
      'Authorization': `${token_type} ${access_token}`
    }
  }
  const url = `${process.env.API_BASE_URL}/api/resource`
  // const url = `${process.env.API_BASE_URL}/api/heartbeat`

  try {
    console.log(`fetching data from ${url} ...`)
    const response = await axios.get(url, options)
    return response.data
  } catch (error) {
    console.log('an error occured while using the token')
    console.log(error.message)
    return {
      data: error?.response?.data || error
    }
  }
  
}
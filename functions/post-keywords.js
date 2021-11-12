const faunadb = require('faunadb')
exports.handler = async (event) => {
  const q = faunadb.query
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET_KEY
  })
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  }
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Successful preflight call.' })
    }
  }

  const data = JSON.parse(event.body)
  await client.query(
    q.Create(
      q.Collection('keywords'),
      { data }
    )
  )

  if (event.httpMethod === 'POST') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' })
    }
  }
}

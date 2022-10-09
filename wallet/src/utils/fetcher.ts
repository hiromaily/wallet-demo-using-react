import axios from 'axios'

// the below error would occur when running test
// - https://github.com/mswjs/msw/issues/686
//   `error: ReferenceError: fetch is not defined`
// because the fetch API is not implemented in Node
// `axios` may be better to avoid this error

// e.g.
// import useSWR from 'swr'
// const { data, error } = useSWR('/api/data', fetcher)
//const fetcher = (url: string) => fetch(url).then((res) => res.json())
const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    // if (res.status == 400) {
    //   const error = new Error('400 Bad Request')
    //   throw error
    // }
    return res.data
  })

const queryFetcher = (url: string, queryParams: string = '') => {
  return fetcher(`${url}${queryParams}`)
}

export { fetcher, queryFetcher }

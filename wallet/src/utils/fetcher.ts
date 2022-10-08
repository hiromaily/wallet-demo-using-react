import axios from 'axios'

// the below error would occur when running test
// - https://github.com/mswjs/msw/issues/686
//   `error: ReferenceError: fetch is not defined`
// because the fetch API is not implemented in Node
// `axios` may be better to avoid this error

// e.g.
// import useSWR from 'swr'
// const { data, error } = useSWR('/api/data', fetcher)
const fetcher = (url: string) => fetch(url).then((res) => res.json())
const fetcherAxios = (url: string) => axios.get(url).then((res) => res.data)

const queryFetcher = (url: string, queryParams: string = '') => {
  return fetcherAxios(`${url}${queryParams}`)
}

export { fetcher, queryFetcher }

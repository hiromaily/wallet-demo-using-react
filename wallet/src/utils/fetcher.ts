import axios from 'axios'

// e.g.
// import useSWR from 'swr'
// const { data, error } = useSWR('/api/data', fetcher)
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const queryFetcher = (url: string, queryParams: string = '') => {
  return fetcher(`${url}${queryParams}`)
}

export { fetcher, queryFetcher }

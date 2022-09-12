import { useMemo } from 'react'
import useSWR, { SWRResponse } from 'swr'
import { fetcher, getFakeApi } from 'utils/fetcher'

type Options<Data, K> = {
  key?: string;
  initial?(): Data
  next?(data: K): Data | Promise<Data>
}

const nextDefaultM = <K>(res: K) => res

export default function useFetchData<Data, K>(
  url: string,
  options?: Options<Data, K>
): [Data, SWRResponse] {
  const initial = useMemo(() => options?.initial?.(), [])
  const next = options?.next || nextDefaultM
  const key = options?.key ?? url;

  async function fetchClient(url: string) {
    if (url === 'api:fake') {
      const fakeData = (await getFakeApi()) as K

      return next(fakeData)
    }

    return fetcher(url, {
      method: 'GET',
    }).then(next)
  }

  const { data = initial, ...swr } = useSWR([url, key], fetchClient)

  return [data as Data, swr]
}

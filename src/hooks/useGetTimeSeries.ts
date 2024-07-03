import {useCallback, useState} from "react";

interface GetTimeSeries {
    symbol: string
    country: string
    startDate: string
    endDate: string
    interval: string
}

interface RequestInterface {
    data: number[] | undefined
    loading: boolean
    error: string | null
}

export const useGetTimeSeries = () => {

    const [request, setRequest] = useState<RequestInterface>({
        data: undefined,
        loading: false,
        error: null
    })

    const getTimeSeries = useCallback((params: GetTimeSeries) => {

        const queryString = new URLSearchParams({
            apikey: String(process.env.NEXT_PUBLIC_TWELVEDATA_API_KEY),
            symbol: params.symbol,
            country: params.country,
            start_date: params.startDate,
            end_date: params.endDate,
            interval: params.interval
        })

        setRequest(prev => ({
            ...prev,
            loading: true,
            error: null
        }))

        fetch('https://api.twelvedata.com/time_series?' + queryString)
            .then(res => res.json())
            .then(res => {

                if (res.status !== "ok") {
                    throw Error(res.message)
                }

                setRequest(prev => ({
                    ...prev,
                    data: res.values.map((val: {open: string}) => Number(val.open))
                }))

            })
            .catch(e => setRequest(prev => ({
                ...prev,
                error: e.message
            })))
            .finally(() => setRequest(prev => ({
                ...prev,
                loading: false
            })))

    }, [])

    return [getTimeSeries, {...request}] as const

}
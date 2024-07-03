import {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import {
    MenuItem, Box, FormLabel, Radio, Select,
    Typography, SelectChangeEvent, Button, CircularProgress
} from "@mui/material";
import {ChartOptions, IntervalOptions} from "@/constants/chartOptions";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import moment, {Moment} from "moment";
import {useGetTimeSeries} from "@/hooks/useGetTimeSeries";
import Chart from "@/components/ChartContainer/Chart";

interface ChartContainerInterface {
    symbol: string
}

const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss'

const ChartContainer: FC<ChartContainerInterface> = ({symbol}) => {

    const intervalRef = useRef<NodeJS.Timeout>()
    const realTimeInitialRef = useRef<Moment>(moment())

    const [getTimeSeries, {data, loading, error}] = useGetTimeSeries()

    const [form, setForm] = useState({
        periodicity: ChartOptions.REAL_TIME as string,
        dateFrom: moment().subtract(1, 'day'),
        dateTo: moment(),
        interval: IntervalOptions[0].value
    })

    useEffect(() => {

        if (form.periodicity === ChartOptions.REAL_TIME && !error) {

            intervalRef.current = setInterval(() => {

                const startDate = realTimeInitialRef.current.format(dateTimeFormat)
                const endDate = realTimeInitialRef.current.add(form.interval, 'minutes').format(dateTimeFormat)

                getTimeSeries({
                    country: 'US',
                    symbol: symbol,
                    startDate: startDate,
                    endDate: endDate,
                    interval: `${form.interval}min`
                })

            }, form.interval * 1000 * 60)

        } else {
            clearInterval(intervalRef.current)
        }

        return () => clearInterval(intervalRef.current)

    }, [form.periodicity, form.interval, error, getTimeSeries, symbol])

    const handleFromChange = (value: Moment | null) => {
        setForm(prev => ({
            ...prev,
            dateFrom: value || moment()
        }))
    }

    const handleToChange = (value: Moment | null) => {
        setForm(prev => ({
            ...prev,
            dateTo: value || moment()
        }))
    }

    const handleIntervalChange = (e: SelectChangeEvent) => {
        setForm(prev => ({
            ...prev,
            interval: Number(e.target.value)
        }))
    }

    const handlePeriodicityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({
            ...prev,
            periodicity: e.target.value
        }))
    }

    const handleBuildGraph = () => {

        let endDate
        let startDate

        if (form.periodicity === ChartOptions.REAL_TIME) {
            endDate = moment().format(dateTimeFormat)
            startDate = moment().subtract(form.interval, 'minutes').format(dateTimeFormat)
        } else {
            endDate = form.dateTo.format(dateTimeFormat)
            startDate = form.dateFrom.format(dateTimeFormat)
        }

        if (startDate && endDate && form.interval) {
            getTimeSeries({
                country: 'US',
                symbol: symbol,
                startDate: startDate,
                endDate: endDate,
                interval: `${form.interval}min`
            })
        }
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}
            >
                <Typography variant={"subtitle1"}>Periodicity</Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center'
                    }}
                >
                    <Radio onChange={handlePeriodicityChange} value={ChartOptions.REAL_TIME}
                           checked={form.periodicity === ChartOptions.REAL_TIME}/>
                    <FormLabel>Real time</FormLabel>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center'
                    }}
                >

                    <Radio onChange={handlePeriodicityChange} value={ChartOptions.HISTORIC}
                           checked={form.periodicity === ChartOptions.HISTORIC}/>
                    <FormLabel>Historic</FormLabel>

                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker disabled={form.periodicity !== ChartOptions.HISTORIC}
                                        onChange={handleFromChange}
                                        label="Date time from" value={form.dateFrom}/>
                        <DateTimePicker disabled={form.periodicity !== ChartOptions.HISTORIC} onChange={handleToChange}
                                        label="Date time to" defaultValue={moment()}/>
                    </LocalizationProvider>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center'
                    }}
                >
                    <FormLabel>Interval</FormLabel>
                    <Select
                        name={"interval"}
                        value={String(form.interval)}
                        onChange={handleIntervalChange}
                    >
                        {IntervalOptions.map(option => <MenuItem key={option.value}
                                                                 value={option.value}>{option.name}</MenuItem>)}
                    </Select>


                </Box>


            </Box>
            <Box
                sx={{
                    marginTop: 3
                }}
            >
                <Button variant={"contained"} onClick={handleBuildGraph}>Build graph</Button>
                {loading && <CircularProgress/>}
                {error && <p>{error}</p>}
                {data && !error && <Chart symbol={symbol} data={data}/>}
            </Box>

        </Box>
    )
}

export default ChartContainer
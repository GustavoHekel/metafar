import {NextPage} from "next";
import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {Stock} from "@/interfaces";
import {Box, Button, Typography} from "@mui/material";
import ChartContainer from "@/components/ChartContainer/ChartContainer";
import StockInfo from "@/components/StockInfo/StockInfo";

const Index: NextPage = () => {

    const router = useRouter()
    const symbol = router.query.id as string

    const [stock, setStock] = useState<Stock>()

    useEffect(() => {

        if (router.isReady) {

            fetch(`https://api.twelvedata.com/stocks?symbol=${symbol}&country=USA`)
                .then(res => res.json())
                .then(res => setStock(res.data[0]))
        }

    }, [router.isReady, router.query, symbol])


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            <Box>
                {stock && <StockInfo stock={stock}/>}
            </Box>

            <Box>
                <ChartContainer symbol={symbol}/>
            </Box>

        </Box>
    )

}

export default Index
import Head from "next/head";
import {NextPage} from "next";
import {GetStocksResponse} from "@/interfaces/GetStocksResponse";
import Table from "@/components/Table/Table";
import {Box, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {Stock} from "@/interfaces";

const Index: NextPage<GetStocksResponse> = ({data}) => {

    const [stocks, setStocks] = useState<Stock[]>(data)

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchName = e.target.name
        const results = data.filter(stock => {

            return stock[searchName as keyof Stock].toLowerCase().includes(e.target.value.toLowerCase())

        })
        setStocks(results)
    }

    return (
        <>
            <Head>
                <title>Metafar</title>
            </Head>
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 2
                    }}
                >
                    <TextField placeholder={"Search stock by symbol"} name={"symbol"} onChange={handleSearch}/>
                    <TextField placeholder={"Search stock by name"} name={"name"} onChange={handleSearch}/>
                </Box>

                <Table stocks={stocks}/>
            </Box>
        </>
    );
}

export default Index

export const getStaticProps = async () => {

    const response = await fetch('https://api.twelvedata.com/stocks?country=USA')

    if (!response.ok) {
        throw new Error('Invalid data')
    }

    const stocks = await response.json()

    return {
        props: {...stocks},
        revalidate: 600
    }
}
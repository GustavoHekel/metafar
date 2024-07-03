import {FC} from "react";
import {Box, Typography} from "@mui/material";
import {Stock} from "@/interfaces";

const StockInfo: FC<{stock: Stock}> = ({stock}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2
            }}
        >
            <Typography variant={"caption"}>Symbol: {stock.symbol}</Typography>
            <Typography variant={"caption"}>Name: {stock.name}</Typography>
            <Typography variant={"caption"}>Currency: {stock.currency}</Typography>
            <Typography variant={"caption"}>Exchange: {stock.exchange}</Typography>
            <Typography variant={"caption"}>Country: {stock.country}</Typography>
            <Typography variant={"caption"}>Type: {stock.type}</Typography>
        </Box>
    )
}

export default StockInfo
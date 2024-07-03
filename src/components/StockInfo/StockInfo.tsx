import {FC} from "react";
import {Box, Typography} from "@mui/material";
import {Stock} from "@/interfaces";

const StockInfo: FC<{stock: Stock}> = ({stock}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                gap: 2
            }}
        >
            <Typography variant={"caption"}>{stock.symbol}</Typography>
            <Typography variant={"caption"}>{stock.name}</Typography>
            <Typography variant={"caption"}>{stock.currency}</Typography>
            <Typography variant={"caption"}>{stock.exchange}</Typography>
            <Typography variant={"caption"}>{stock.country}</Typography>
            <Typography variant={"caption"}>{stock.type}</Typography>
        </Box>
    )
}

export default StockInfo
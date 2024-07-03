import {FC} from "react";
import {Stock} from "@/interfaces";
import {DataGrid} from "@mui/x-data-grid";
import {columns} from './config'
import {Box} from "@mui/material";

const Table: FC<{ stocks: Stock[] }> = ({stocks}) => {
    return (
        <Box sx={{height: 500}}>
            <DataGrid
                columns={columns}
                rows={stocks}
                getRowId={(row) => row.symbol}
                autoPageSize={true}
            />
        </Box>
    )
}

export default Table
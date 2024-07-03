import {GridColDef} from "@mui/x-data-grid";
import ViewSymbolCell from "@/components/Table/ViewSymbolCell";

export const columns: GridColDef[] = [
    {
        field: 'symbol',
        headerName: 'Symbol',
        flex: 1,
        renderCell: (params) => <ViewSymbolCell {...params} />
    },
    {
        field: 'name',
        headerName: 'Name',
        flex: 4
    },
    {
        field: 'currency',
        headerName: 'Currency',
        flex: 1
    },
    {
        field: 'type',
        headerName: 'Type',
        flex: 4
    }
]
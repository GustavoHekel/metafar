import {FC} from "react";
import {GridRenderCellParams} from "@mui/x-data-grid";
import Link from "next/link";

const ViewSymbolCell: FC<GridRenderCellParams> = (props) => {
    return <Link href={`/${props.value}`} prefetch={false}>{props.value}</Link>
}

export default ViewSymbolCell
import {Stock} from "@/interfaces/Stock";

export interface GetStocksResponse {
    data: Stock[]
    count: number
    status: string
}
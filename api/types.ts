// Tipos de las respuestas
export interface Transaction {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    input: string;
}

export interface EtherscanResponse {
    status: string;
    message: string;
    result: Transaction[];
}

export interface BalanceResponse {
    status: string;
    message: string;
    result: string;
}

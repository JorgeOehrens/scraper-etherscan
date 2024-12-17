import fetch from 'node-fetch';
import { writeFileSync } from 'fs';
import { BalanceResponse, Transaction, EtherscanResponse } from './types';

// Cargar variables de entorno
import 'dotenv/config';

// Leer variables de entorno
const apiKey: string = process.env.ETHERSCAN_API_KEY || '';
const walletAddress: string = process.env.WALLET_ADDRESS || '';

// Verificar si las variables están configuradas
if (!apiKey || !walletAddress) {
    throw new Error("Las variables ETHERSCAN_API_KEY o WALLET_ADDRESS no están configuradas en el archivo .env");
}

// Función para obtener el balance de una dirección
async function getBalance(address: string): Promise<number> {
    try {
        const query = await fetch(
            `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apiKey}`
        );

        const response = (await query.json()) as BalanceResponse;

        if (response.status !== "1") {
            console.error(`Error obteniendo balance de ${address}: ${response.message}`);
            return 0;
        }

        const balanceInWei = BigInt(response.result);
        return Number(balanceInWei) / 1e18; // Convertir Wei a ETH
    } catch (error) {
        console.error(`Error al obtener el balance de ${address}:`, error);
        return 0;
    }
}

// Función para clasificar transacciones
function classifyTransaction(tx: Transaction): string {
    if (tx.input !== "0x" && (!tx.to || tx.to === "")) {
        return "swap"; // Interacción con un contrato inteligente
    }
    if (BigInt(tx.value) > 0) {
        return "transfer"; // Transferencia regular
    }
    return "contract_interaction"; // Transacción sin valor explícito
}

async function main(): Promise<void> {
    try {
        // 1. Obtener transacciones de la wallet
        const query = await fetch(
            `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`
        );

        const response = (await query.json()) as EtherscanResponse;

        if (response.status !== "1") {
            console.error("Error en la API de Etherscan:", response.message);
            return;
        }

        const transactions: Transaction[] = response.result;

        // 2. Clasificar transacciones
        const classifiedTransactions = transactions.map(tx => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to || "Contract",
            value: Number(BigInt(tx.value)) / 1e18, // Convertir Wei a ETH
            type: classifyTransaction(tx),
            timeStamp: new Date(Number(tx.timeStamp) * 1000).toISOString(),
        }));

        // 3. Obtener balance de la wallet consultada
        const walletBalance = await getBalance(walletAddress);
        console.log(`\n💰 Balance de la Wallet (${walletAddress}): ${walletBalance} ETH\n`);

        // 4. Guardar resultados en archivos JSON
        writeFileSync('transactions.json', JSON.stringify(classifiedTransactions, null, 2));
        writeFileSync('balance.json', JSON.stringify({ [walletAddress]: walletBalance }, null, 2));

        console.log("Transacciones clasificadas guardadas en 'transactions.json'");
        console.log("Balance guardado en 'balance.json'");

        // 5. Mostrar resultados
        console.log("\n📋 Transacciones Clasificadas:\n");
        console.table(classifiedTransactions);
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

main();

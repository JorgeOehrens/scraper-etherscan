# ⚡ Etherscan API Scraper 

Este script interactúa con la **API de Etherscan** para obtener las transacciones y el balance de una dirección de Ethereum. Clasifica las transacciones, filtra sus valores y guarda los resultados en formato **JSON**.

---

## **🛠️ Configuración**

### **1. Requisitos Previos**
- Node.js instalado
- Clave API de Etherscan
- Archivo `.env` configurado

### **2. Instalación de Dependencias**

Instala las dependencias necesarias:

```bash
npm install node-fetch dotenv
```

### **3. Crear Archivo `.env`**

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```plaintext
ETHERSCAN_API_KEY=TU_API_KEY
WALLET_ADDRESS=TU_DIRECCION_DE_WALLET
```

Reemplaza `TU_API_KEY` y `TU_DIRECCION_DE_WALLET` con tus valores reales.

---

## **📚 Uso**

Ejecuta el script con el siguiente comando:

```bash
npx ts-node index.ts
```

---

## **📝 Input**

1. **Clave de API de Etherscan** (desde `.env`): Permite acceder a la API de Etherscan.
2. **Dirección de Wallet de Ethereum** (desde `.env`): Dirección de la que se extraerá la información.

---

## **📈 Output**

El script genera dos archivos JSON:

1. **`transactions.json`**: Contiene las transacciones clasificadas.
   
   **Ejemplo**:
   ```json
   [
     {
       "hash": "0x123abc...",
       "from": "0xabc",
       "to": "0xdef",
       "value": 0.5,
       "type": "transfer",
       "timeStamp": "2024-06-17T12:00:00.000Z"
     }
   ]
   ```

2. **`balance.json`**: Contiene el balance actual de la wallet.
   
   **Ejemplo**:
   ```json
   {
     "0xdA26E952B46ad873292A2A267a5FDFe262958890": 1.23456789
   }
   ```

---

## **🔄 Proceso del Script**

1. **Obtener Transacciones**:  
   Consulta la API de Etherscan para obtener las últimas transacciones de la wallet especificada.

2. **Clasificar Transacciones**:  
   Cada transacción se clasifica en:
   - **transfer**: Transferencia de valor entre wallets.
   - **swap**: Interacción con contratos inteligentes.
   - **contract_interaction**: Transacciones sin valor explícito.

3. **Calcular Balance**:  
   Se consulta el balance actual de la wallet en ETH.

4. **Guardar Resultados**:  
   Los datos clasificados y el balance se guardan en archivos `transactions.json` y `balance.json`.

5. **Mostrar Resultados**:  
   Se muestran las transacciones y el balance en consola.

---

## **📊 Ejemplo de Salida en Consola**

```plaintext
💰 Balance de la Wallet (0xdA26E952B46ad873292A2A267a5FDFe262958890): 1.23456789 ETH

📈 Transacciones Clasificadas:

┌─────────┬──────────────────┬────────────┬────────────┬──────────┬────────────┬─────────────────────────┐
│ (index) │ hash             │ from       │ to         │ value    │ type       │ timeStamp               │
├─────────┼──────────────────┼────────────┼────────────┼──────────┼────────────┼─────────────────────────┤
│ 0       │ 0x123abc         │ 0xabc      │ 0xdef      │ 0.5      │ transfer   │ 2024-06-17T12:00:00Z    │
└─────────┴──────────────────┴────────────┴────────────┴──────────┴────────────┴─────────────────────────┘

Transacciones clasificadas guardadas en 'transactions.json'
Balance guardado en 'balance.json'
```

---

## **🔗 Referencias**

- [Documentación de la API de Etherscan](https://docs.etherscan.io/)
- [Node.js](https://nodejs.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## **👨‍💻 Autor**

Desarrollado por **[Tu Nombre]**. Si tienes preguntas o mejoras, ¡no dudes en contribuir! 🚀


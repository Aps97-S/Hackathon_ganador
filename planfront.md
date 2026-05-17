
Plan Frontend
1. Estructuración del Proyecto
- 
Crear una estructura básica de carpetas y archivos necesarios:
src/
components/
styles/
pages/
utils/
.gitignore
package.json
2. Configuración Inicial
- 
Configurar el archivo package.json con las dependencias necesarias.
- 
Crear un archivo .env para variables de entorno.
3. Creación de Componentes Básicos
- 
Desarrollar los componentes principales:
- 
Dashboard.js
- 
HistoricalDataView.js
- 
ActivitySummary.js
4. Desarrollo de Vistas Detalladas
- 
Crear vistas específicas para cada funcionalidad:
src/pages/
Dashboard.js
HistoricalData.js
ActivityReport.js
5. Integración con Backend
- 
Establecer endpoints para comunicación con el backend.
6. Pruebas Unitarias
- 
Crear pruebas unitarias utilizando Jest o Mocha.


7.-Especificacion 
 FRONTEND SPEC (basado en API actual del proyecto)
📌 Contexto del sistema

Frontend para una plataforma de visualización de mercado de criptomonedas basada en API propia.

El backend expone datos con estructura normalizada:

item → recurso único
items → listas/rankings
series → datos históricos (charts)

🧩 1. DASHBOARD (Página principal)
🎯 Objetivo

Mostrar estado general del mercado en tiempo real.

📊 Datos usados

Endpoint:

GET /api/market/top

Respuesta:

{
  "items": [
    {
      "id": "bitcoin",
      "symbol": "btc",
      "name": "Bitcoin",
      "usd": 78000,
      "change_24h": 0.2,
      "market_cap": 1e12,
      "volume": 18000000000
    }
  ]
}
🧱 UI debe mostrar:
1. Tabla ranking crypto

Columnas:

Rank (#)
Name + symbol
Price (USD)
24h change (verde/rojo)
Market cap
Volume
2. Highlights (cards arriba)
Bitcoin price
Ethereum price
Top gainer (24h)
Top loser (24h)
3. UX behavior
Auto refresh opcional (30–60s)
Loading skeletons
Error state si API falla


📈 2. DETAIL PAGE (Crypto individual)
🎯 Objetivo

Mostrar información completa de una moneda.

📊 Endpoints:
GET /api/market/price/:symbol → item
GET /api/market/details/:symbol → item
    🧱 UI debe incluir:
    1. Header coin
    Name + symbol
    Price actual
    % cambio 24h
    2. Stats panel
    Market cap
    Volume
    Price USD
    Price EUR (si existe)
    3. Actions (si quieres nivel pro)
    “Add alert”
    “Simulate investment”

📉 3. HISTORICAL VIEW (Gráficos)
🎯 Objetivo

Visualizar evolución del precio.

📊 Endpoint:
GET /api/market/history/:symbol

Respuesta:

{
  "series": [
    [timestamp, price],
    [timestamp, price]
  ]
}
🧱 UI debe mostrar:
    1. Chart principal
    Line chart precio vs tiempo
    Tooltip con fecha + precio
    2. Controls
    Selector de rango:
    7d / 30d / 90d / 1y
    Zoom opcional


🧾 4. MARKET OVERVIEW (Listado general)
🎯 Objetivo

Explorar criptos sin ranking fijo

    📊 Endpoint:
    GET /api/market/data/:symbols
    🧱 UI:
    Grid de cards
    Cada card:
    Name
    Price
    Change 24h
    Mini indicator (up/down)


📊 5. PRICE WIDGET (componente reutilizable)
Uso en toda la app

Consume:

item responses

Debe mostrar:
    Price
    Currency (USD/EUR)
    Change 24h

⚙️ 6. REGLAS IMPORTANTES (esto es clave para tus IA’s)
❌ NO hacer:
No inventar endpoints
No usar formatos distintos a item/items/series
No crear datos mock “realistas”
No duplicar lógica de transformación
✅ SI hacer:
Consumir exactamente la estructura del backend
Adaptar UI a item/items/series
Tratar backend como “source of truth”

🧠 7. Filosofía del frontend (muy importante)

Este frontend NO es:

“una app bonita de crypto”

Es:

“una capa visual sobre un motor de datos financiero”
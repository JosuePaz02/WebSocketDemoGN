const WebSocket = require('ws');
const db = require('./db');

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('📲 Cliente conectado por WebSocket');

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message); // Esperado: { userId, latitude, longitude }

        await db.query(
          'INSERT INTO location_logs (latitude, longitude, timestamp) VALUES ($1, $2, NOW())',
          [data.latitude, data.longitude]
        );

        console.log('✅ Ubicación guardada:', data);
      } catch (err) {
        console.error('❌ Error al guardar ubicación:', err.message);
      }
    });

    ws.on('close', () => {
      console.log('📴 Cliente desconectado');
    });
  });

  return wss;
}

module.exports = setupWebSocket;

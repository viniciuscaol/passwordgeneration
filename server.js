const express = require('express');
const path = require('path');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 80;

// Configuração das métricas Prometheus
client.collectDefaultMetrics();
const register = new client.Registry();
register.setDefaultLabels({
  app: 'gerador-de-senha'
});
client.collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duração dos pedidos HTTP em milissegundos',
  labelNames: ['method', 'route', 'code']
});
register.registerMetric(httpRequestDurationMicroseconds);

const collectMetrics = (req, res, next) => {
  res.locals.startEpoch = Date.now();
  res.on('finish', () => {
    const responseTimeInMs = Date.now() - res.locals.startEpoch;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route ? req.route.path : req.url, res.statusCode)
      .observe(responseTimeInMs);
  });
  next();
};

app.use(collectMetrics);

// Rota para servir a aplicação HTML
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para expor as métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

## pack_welcome

Projeto frontend com Vite/React preparado para deploy em AWS.

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

A saída é gerada em `dist/`.

---

## Deploy na AWS (opções recomendadas)

### 1) S3 + CloudFront (melhor custo para app estático)

1. Gere o build:
   ```bash
   npm run build
   ```
2. Crie um bucket S3 para hosting estático.
3. Suba os arquivos:
   ```bash
   aws s3 sync dist/ s3://SEU_BUCKET --delete
   ```
4. Crie uma distribuição CloudFront apontando para o bucket.
5. Para SPA, configure resposta padrão para redirecionar `404` para `/index.html`.
6. (Opcional) Configure domínio com Route 53 + ACM (SSL).

### 2) AWS App Runner com container (mais simples para CI/CD)

Este repositório já inclui:
- `Dockerfile` multi-stage para build do Vite + Nginx.
- `nginx.conf` com fallback de SPA (`try_files ... /index.html`).
- `apprunner.yaml` para facilitar deploy com source code.

Build local da imagem:

```bash
docker build -t pack-welcome:latest .
```

Teste local:

```bash
docker run --rm -p 8080:8080 pack-welcome:latest
```

Abrir em `http://localhost:8080`.

---

## CI/CD sugerido

Pipeline mínimo:
1. `npm ci`
2. `npm run lint`
3. `npm run build`
4. Deploy (S3 sync ou build/push de imagem para ECR)

Assim você consegue promover mudanças de forma previsível para ambientes AWS.

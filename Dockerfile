
# --- Estágio 1: Build (Construção da Aplicação) ---
# Usamos uma imagem oficial do Node.js como base.
# A tag 'alpine' resulta em uma imagem menor.
FROM node:20-alpine AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de definição de pacotes e instala as dependências
# Usa npm ci quando houver package-lock.json (build reprodutível); caso contrário npm install
COPY package*.json ./
RUN if [ -f package-lock.json ]; then \
			npm ci --silent; \
		else \
			npm install --silent; \
		fi

# Copia todo o resto do código-fonte da aplicação
COPY . .

# Executa o script de build do Vite, que gera a pasta /dist
RUN npm run build

# --- Estágio 2: Serve (Servidor de Produção) ---
# Usamos uma imagem leve do Nginx para servir os arquivos estáticos
FROM nginx:stable-alpine

# Copia os arquivos estáticos gerados no estágio de build para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuração personalizada do repositório (se existir)
# Substitui a config default do nginx para permitir SPA routing (try_files)
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# Instala curl para permitir healthchecks (pequena dependência de runtime)
RUN apk add --no-cache curl

# Expõe a porta 80 (padrão do Nginx)
EXPOSE 80

# Comando para iniciar o servidor Nginx quando o contêiner for executado
CMD ["nginx", "-g", "daemon off;"]
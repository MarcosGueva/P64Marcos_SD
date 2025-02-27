# Usamos una imagen de Node.js optimizada para producción
FROM node:18-alpine 

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /app 

# Copiamos los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalamos las dependencias de la aplicación
RUN npm install --only=production

# Copiamos el resto del código fuente
COPY . .

# Exponemos el puerto en el que corre la aplicación
EXPOSE 4000

# Comando de inicio de la aplicación
CMD ["node", "server.js"]

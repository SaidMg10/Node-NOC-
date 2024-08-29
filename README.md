# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript

# Dev
1. Clonar el archivo env.template a .env
2. Configurar las variables de entorno
```
PORT=

MAILER_SERVICE=
MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD= 

MONGO_URL=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=

POSTGRES_URL=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PASSWORD=

```
3. Ejecutar el comando ```npm install```
4. Levantar las bases de datos con el comando
```
docker compose up -d
```
5. Ejecutar el comando
```
npx prisma migrate dev
```
6. Ejecutar el comando ```npm run dev```

## Obtener Gmail Key
[Google AppPasswords](https://myaccount.google.com/u/0/apppasswords)
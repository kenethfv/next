# Development
Pasos para levantar la app en desarrollo

1. Levantar base de datos
```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar variables de entorno
4. Ejecutar el comando ``` npm install ```
5. Ejecutar el comando ``` npm run dev ```
6. Ejecutar Prisma
```
npx prisma init // Sirve para instalar prisma
npx prisma migrate dev // Sirve para migrar lo que esta en los modelos de prisma a la base de datos
npx prisma generate // Genera cliente para ejecuciones con la base de datos
```
7. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)

## Nota: Usuario por defecto
__usuario:__ test@google.com
__password:__ 123456

# Prisma Commands
```
npx prisma init // Sirve para instalar prisma
npx prisma migrate dev // Sirve para migrar lo que esta en los modelos de prisma a la base de datos
npx prisma generate // Genera cliente para ejecuciones con la base de datos

npx prisma db push // Sirve para subir todos los cambios a la base de datos borrando todos los datos, haciendolo de forma forzada
```

# Prod

# Stage
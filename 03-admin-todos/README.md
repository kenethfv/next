# Development
Pasos para levantar la app en desarrollo

1. Levantar base de datos
```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar variables de entorno
4. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)

# Prisma Commands
```
npx prisma init // Sirve para instalar prisma
npx prisma migrate dev // Sirve para migrar lo que esta en los modelos de prisma a la base de datos
npx prisma generate // Genera cliente para ejecuciones con la base de datos
```

# Prod

# Stage
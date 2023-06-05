# Next.js OpenJira app

para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d significa **detached** cuando el proceso termina en la terminal , puedo seguir exribiendo comandos

* Si no le pongo detached cancelo la terminal y cancelo la imagen
* MongoDB URL local:

```
  mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno

Renobrar el archivo **.env.template** a **.env**

## Llenar la base de datos con informacion de pruebas

Llamar a :

```
http://localhost:3000/api/seed
```

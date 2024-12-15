# Piggy-Edu Backend

## Descripción

API para **Piggy-Edu**

---

## Requisitos

- **Node.js** (16 o superior)
- **NPM** o **Yarn**
- Archivo .env con:

```env
SECRET_KEY=<clave_secreta_para_JWT>
PORT=3001
```

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/mili-cornidez/piggy-edu.git
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar el servidor:

```bash
npm start
```

Disponible por defecto en `http://localhost:3001`.

## Endpoints Disponibles

### POST /login

Inicia sesión con una wallet address.

**Body:**
```json
{
    "wallet": "0x1234567890abcdef"
}
```

**Respuesta:**
```json
{
    "message": "Login successful",
    "user": {
        "wallet": "0x1234567890abcdef"
    },
    "token": "<tu-token-jwt>"
}
```

### GET /levels/:levelId

Obtiene datos de un nivel.

**Headers:**
- Authorization: Bearer `<tu-token-jwt>`

**Respuesta:**
```json
{
    "id": 1,
    "name": "Nivel 1",
    "description": "Introducción a las finanzas",
    "questions": [...]
}
```

### GET /tokens/:tokenId

Obtiene el address de un token.

**Headers:**
- Authorization: Bearer `<tu-token-jwt>`

**Respuesta:**
```json
{
    "id": 1,
    "address": "0xabcdef1234567890"
}
```

#### Errores:
- 401 si no hay token válido
- 404 si el nivel no existe

### GET /user

Obtiene datos del usuario.

**Headers:**
- Authorization: Bearer `<tu-token-jwt>`

**Respuesta:**
```json
{
    "wallet": "0x1234567890abcdef"
}
```

#### Errores:
- 401 si no hay token válido
- 404 si el usuario no existe
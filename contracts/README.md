# PiggyEdu - Recompensas Niveladas con Paymaster en zkSync Era

## Descripción del Proyecto

* **MyERC20**: Un contrato ERC20 personalizado que se emplea para entregar recompensas a los usuarios.
* **LevelBadgeNFT (Nivel 1, Nivel 2, Nivel 3)**: Cada NFT representa el nivel alcanzado por el usuario. Si el usuario posee un NFT de mayor nivel, recibe más tokens.
* **LevelRewards**: Un contrato que libera ERC20 tokens a los usuarios según el nivel del NFT que posean.
   * Nivel 1: 100 tokens
   * Nivel 2: 200 tokens
   * Nivel 3: 300 tokens
* **MyPaymaster**: Un Paymaster que patrocina las transacciones, evitando que el usuario necesite ETH para pagar gas, mejorando la UX.

### Flujo Ejemplo:

1. El usuario completa una lección y obtiene un NFT de cierto nivel.
2. Llama a `claim()` en el contrato `LevelRewards`.
3. Según el NFT que posea, recibe la cantidad correspondiente de tokens ERC20.
4. El Paymaster puede cubrir el costo de gas, permitiendo al usuario obtener sus recompensas sin usar ETH.

## Tecnologías Utilizadas

* **Solidity**: Lenguaje para contratos inteligentes.
* **zkSync Era**: L2 con zkRollups que ofrece Account Abstraction.
* **Hardhat**: Entorno de desarrollo, compilación y pruebas.
* **OpenZeppelin**: Librerías estándar para ERC20, ERC721 y utilidades.

## Estructura del Repositorio

* `contracts/`
   * `MyERC20.sol`: Contrato ERC20 personalizado.
   * `LevelBadgeNFT.sol`: Contratos para NFT de distintos niveles.
   * `LevelRewards.sol`: Lógica de distribución de recompensas basada en la posesión de NFTs.
   * `MyPaymaster.sol`: Lógica del Paymaster para patrocinar transacciones.
* `deploy/`
   * `deploy-level-badges.ts`: Script para desplegar los NFTs.
   * `deploy-paymaster.ts`: Script para desplegar y financiar el Paymaster.
   * `deploy-level-rewards.ts`: Script para desplegar el contrato de recompensas usando las direcciones existentes.
* `test/`: Pruebas unitarias para los contratos.

## Pasos de Despliegue

1. **Instalación de dependencias:**

   ```bash
   yarn install
   ```


2. **Compilación de contratos:**

    ```bash
   yarn compile
   ```

3. **Desplegar NFTs de nivel:**

    ```bash
   yarn deploy-level-badges
   ```
    Esto mostrará las direcciones de Level 1, Level 2 y Level 3 NFTs.

4. **Desplegar Paymaster:**

    ```bash
   yarn deploy-paymaster
   ```
    Este script desplegará el Paymaster y lo financiará con ETH y tokens.

5. **Desplegar LevelRewards:** Ajusta las direcciones del ERC20 y los NFT en deploy-level-rewards.ts y luego:

    ```bash
   yarn deploy-level-rewards
   ```

## Uso

1. **Reclamar Recompensas:** Un usuario con un NFT llama a claim() en LevelRewards.
    Si tiene Level 1: recibe 100 tokens.
    Si tiene Level 2: recibe 200 tokens.
    Si tiene Level 3: recibe 300 tokens.

2. **Paymaster:** Si el Paymaster está configurado, las transacciones del usuario pueden ser patrocinadas. Esto significa que no necesita ETH, mejorando la experiencia.

## Variables de Entorno
Copia .env.example a .env y agrega tu clave privada:

    ```bash
    WALLET_PRIVATE_KEY=tu_clave_privada
    ```

    Esto asegura que las claves nunca se expongan directamente en el código.
    
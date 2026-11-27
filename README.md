# OndePassa

- Bruno Damasio Silva - 2040482423032
- Lucas Bortoline Chung - 2040482423019
- Luis Gustavo Souza Santos - 2040482423018


## Como executar

É preciso ter o [Node.js](https://nodejs.org) no computador e o app **Expo Go** no celular.

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

No arquivo `.env`, preencha `TMDB_TOKEN` com o **API Read Access Token** do [TMDB](https://www.themoviedb.org/settings/api) (começa com `eyJ`).

### Aplicativo

Em `mobile/src/utils/backendClient.js`, troque o IP da `baseURL` pelo IP do seu computador (aparece no terminal do Expo, na linha `exp://`).

```bash
cd mobile
npm install
npx expo start
```

Leia o QR Code com o Expo Go. O celular e o computador precisam estar na mesma rede.

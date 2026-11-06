# HelpDesk Lite 
Nome: Beatriz de Cassia Bettio - RA 25000311

Projeto com login, cadastro, listagem e criação de chamados (apenas admin) com a API apenas para estudo local.

## Estrutura

```
├── helpdesk-jrs/     # API (login, chamados) | Dart + JSON REST Server | http://127.0.0.1:5050 |
└── helpdesk-web/     # Interface (login, chamados) | React + Vite + Tailwind | http://localhost:5173 |
```

## Pré-requisitos

- [Dart SDK](https://dart.dev/get-dart) 
- [Node.js LTS](https://nodejs.org) 

## 1. Instalar o JSON REST Server 

```bash
dart pub global activate json_rest_server
```

## 2. Rodar a API

Abra um terminal:

```bash
cd helpdesk-jrs
dart pub global run json_rest_server run
```

Deverá aparecer: "HelpDesk API Server started on http://127.0.0.1:5050"

## 3. Rodar o site

Abra **outro** terminal:

```bash
cd helpdesk-web
npm install      # só na primeira vez
npm run dev
```

Acesse http://localhost:5173. Quem não estiver logado é enviado para `/login`.

O arquivo `helpdesk-web/.env` deve conter:

```
VITE_API_URL=http://localhost:5050
```

## Contas de teste

| Perfil | E-mail | Senha | Observação |
|---|---|---|---|
| Usuário | `usuario@helpdesk.local` | `Usuario@123` | Só consulta chamados |
| Admin | `admin@helpdesk.local` | `Admin@123` | Marque "Entrar como administrador" | Pode criar chamados |

Também é possível criar uma conta de usuário em `/register`.

## Print Telas de Login e Register
<img width="1365" height="637" alt="image" src="https://github.com/user-attachments/assets/c22f947c-f878-417d-a143-9e1ccbf3aa7c" />
<img width="988" height="721" alt="image" src="https://github.com/user-attachments/assets/4cdaef77-817d-4795-9b2d-49332c6c5d16" />
<img width="986" height="692" alt="image" src="https://github.com/user-attachments/assets/108d2051-7ab6-4272-9fe9-359b72209494" />
<img width="1257" height="511" alt="image" src="https://github.com/user-attachments/assets/2bc04e35-bd53-4f58-9978-8de47e410ae6" />
<img width="1256" height="623" alt="image" src="https://github.com/user-attachments/assets/f6963a25-788a-41a6-9464-c2e8793322f9" />
<img width="1298" height="412" alt="image" src="https://github.com/user-attachments/assets/b8c9322b-5046-4c96-bb41-24e92befbda0" />
<img width="969" height="657" alt="image" src="https://github.com/user-attachments/assets/ef4a0ab1-c83c-410d-8102-f820dbf7eb4f" />
<img width="1256" height="641" alt="image" src="https://github.com/user-attachments/assets/c902caf6-5003-4b6f-bfd2-ebeee33510c6" />













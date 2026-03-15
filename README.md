# E-Load Frontend 2.0

Interfaz de usuario para la plataforma de gestión de puntos de recarga eléctrica.

## Stack

- **React 18** + **Vite 5**
- **Redux Toolkit** (RTK) — reemplaza Redux manual + actions
- **React Router v6**
- **React Hook Form** — formularios
- **Framer Motion** — animaciones
- **React Leaflet** — mapas
- **React Icons** (Remix Icons) — iconografía
- **CSS Modules** — estilos encapsulados sin dependencia de UI libraries

## Estructura

```
src/
├── api/
│   ├── client.js          Axios con interceptores (token + 401)
│   └── endpoints.js       Todos los endpoints en un lugar
├── store/
│   └── slices/
│       ├── usersSlice.js
│       ├── stationsSlice.js
│       ├── spotsSlice.js
│       └── otherSlices.js  (comments + payments)
├── hooks/
│   └── index.js           useToast, useModal, useConfirm
├── components/
│   ├── ui/                Spinner, Toast, Modal, ConfirmDialog, Avatar, StateBadge
│   ├── layout/            Header, Footer, SideBar
│   ├── routing/           Routing, RoutingUser
│   ├── map/               MapPage, StationDrawer
│   ├── user/              LoginForm, RegisterForm, PersonalInformation
│   ├── payments/          Payments
│   └── admin/             Admin, AdminCreate, AdminStationDetail
└── pages/
    ├── Home/              Hero + Stats + Features + CTA
    ├── About/
    ├── Register/
    └── misc.jsx           User, Contact, LoyaltyPoints, MyRecharges
```

## Arranque

```bash
npm install
cp .env.example .env
# Editar .env con la URL del backend

npm run dev      # http://localhost:5173
npm run build    # build de producción
npm run lint
```

## Qué cambió respecto a la versión anterior

| Antes | Ahora |
|-------|-------|
| Chakra UI + MUI + FontAwesome (3 librerías UI) | CSS Modules con design tokens propios |
| Redux manual con `dispatch` importado del store | RTK slices con `createAsyncThunk` |
| `LOADING` compartido entre todos los reducers (bug) | Loading por slice independiente |
| `FormData` para endpoints JSON | JSON directo via axios |
| Tipografía Inter genérica | Syne (display) + Inter (body) |
| Tema claro con colores Chakra | Dark theme editorial consistente |
| framer-motion en versión antigua | framer-motion v11 |

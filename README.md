# CRM Nubihab

Este proyecto es una aplicación web de CRM inmobiliario construida con **Next.js 13+ (App Router)**, **TypeScript**, **TailwindCSS** y una arquitectura de componentes reutilizables. Incluye funcionalidades como chat en tiempo real, gestión de apartamentos, dashboard y formularios de cotización.

## Tecnologías y servicios utilizados

- **Next.js**: Framework principal para SSR/SSG y enrutamiento.
- **TypeScript**: Tipado estático para mayor robustez.
- **TailwindCSS**: Utilidades CSS para estilos rápidos y consistentes.
- **shadcn/ui**: Librería de componentes UI.
- **Lucide Icons**: Iconografía SVG.
- **react-markdown** + **remark-gfm**: Renderizado seguro de Markdown con soporte GFM (tablas, listas de tareas, etc).
- **n8n**: Webhook externo para procesamiento de mensajes del chat.
- **Azure AI Foundry**: Para procesamiento de lenguaje natural, usando los modelos **gpt-4o-mini** (chat) y **text-embedding-3-small** (embeddings).
- **PostgreSQL**: Base de datos relacional principal.
- **pnpm**: Gestor de paquetes.
- **.env**: Variables de entorno (por ejemplo, `NEXT_PUBLIC_WEBHOOK_N8N_URL`).

## Estructura de archivos

```
.
├── app/                        # Rutas y páginas principales (Next.js App Router)
│   ├── globals.css             # Estilos globales
│   ├── layout.tsx              # Layout raíz
│   ├── page.tsx                # Página principal
│   ├── apartments/             # Páginas relacionadas a apartamentos
│   ├── dashboard/              # Dashboard y subrutas (leads, users, etc)
│   └── quote/                  # Página de cotización
├── components/                 # Componentes reutilizables
│   ├── dashboard/              # Componentes específicos del dashboard (ej: chat-widget.tsx)
│   ├── apartment-listing.tsx   # Listado de apartamentos
│   ├── featured-apartments.tsx # Apartamentos destacados
│   ├── hero-section.tsx        # Sección principal
│   └── quote-form.tsx          # Formulario de cotización
├── hooks/                      # Custom React hooks
│   └── use-mobile.tsx          # Ejemplo: detección de mobile
├── lib/                        # Funciones utilitarias y helpers
├── public/                     # Archivos estáticos (imágenes, favicon, etc)
├── styles/                     # Archivos de estilos adicionales
├── .env                        # Variables de entorno
├── package.json                # Dependencias y scripts
├── tailwind.config.ts          # Configuración de TailwindCSS
├── tsconfig.json               # Configuración de TypeScript
└── components.json             # Configuración de shadcn/ui y aliases
```

## Componentes principales

- [`components/dashboard/chat-widget.tsx`](components/dashboard/chat-widget.tsx): Widget de chat con renderizado de Markdown y conexión a webhook externo.
- [`components/apartment-listing.tsx`](components/apartment-listing.tsx): Listado de apartamentos.
- [`components/featured-apartments.tsx`](components/featured-apartments.tsx): Apartamentos destacados.
- [`components/quote-form.tsx`](components/quote-form.tsx): Formulario para solicitar cotizaciones.

## Variables de entorno

Asegúrate de definir en tu archivo `.env`:

```
NEXT_PUBLIC_WEBHOOK_N8N_URL=https://tu-webhook-n8n-url
```

## Scripts útiles

- `pnpm install`: Instala dependencias.
- `pnpm dev`: Inicia el servidor de desarrollo.
- `pnpm build`: Compila la aplicación para producción.
- `pnpm start`: Inicia la app en modo producción.

## Cómo contribuír

1. Haz un fork del repositorio.
2. Crea una rama para tu feature/fix.
3. Haz tus cambios y abre un Pull Request.

---

**Nota:** Este README es una base y puede ampliarse con detalles sobre autenticación, despliegue, tests, etc., según evolucione el proyecto.

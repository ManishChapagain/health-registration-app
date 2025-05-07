# health-registration-app

minimal health registration app made using pglite

**[View Live Demo](https://health-registration-app.vercel.app/)**

# Setup Instructions

## Tested on following configs

- Node.js (v20.10.0)
- npm (v10.4.0)

### 1. Clone the repository

```bash
git clone https://github.com/ManishChapagain/health-registration-app.git
cd health-registration-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Your app will be available at [http://localhost:5173](http://localhost:5173)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally

# Challenges Faced
- had to use idb for persistance
- when using workers, there was a build issue related to output format of workers. had to change format to 'es' since default 'iife' was not supported


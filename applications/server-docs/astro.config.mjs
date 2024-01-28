import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'ProsperGuardAPI',
      social: {
        github: 'https://github.com/JaquesBoeno/ProsperGuard',
      },
      defaultLocale: 'en',
      locales: {
        // English docs in `src/content/docs/en/`
        en: {
          label: 'English',
          lang: 'en',
        },
        // Portuguese docs in `src/content/docs/pt-br/`
        'pt-br': {
          label: 'Português do Brasil',
        },
      },
      sidebar: [
        {
          label: 'Start Here',
          translations: { 'pt-BR': 'Comece Aqui' },
          items: [
            {
              label: 'Introduction',
              link: 'start-here/introduction',
              translations: { 'pt-BR': 'Introdução' },
            },
            {
              label: 'Quick Start',
              link: 'start-here/quick-start',
              translations: { 'pt-BR': 'Começo Rápido' },
            },
            {
              label: 'Patterns',
              link: 'start-here/patterns',
              translations: { 'pt-BR': 'Padrões' },
            },
          ],
        },
        {
          label: 'Routes',
          translations: { 'pt-BR': 'Rotas' },
          items: [
            {
              label: 'Transactions',
              translations: { 'pt-BR': 'Transações' },
              autogenerate: { directory: 'routes/transactions' },
            },
          ],
        },
        {
          label: 'Controllers',
          translations: { 'pt-BR': 'Controladores' },
          items: [
            {
              label: 'Transactions',
              translations: { 'pt-BR': 'Transações' },
              autogenerate: { directory: 'controllers/transactions' },
            },
            {
              label: 'Utils',
              translations: { 'pt-BR': 'Utilitários' },
              link: 'controllers/utils',
            },
          ],
        },
        {
          label: 'Security Package',
          translations: { 'pt-BR': 'Pacote "Security"' },
          autogenerate: { directory: 'security' },
        },
      ],
    }),
  ],
})

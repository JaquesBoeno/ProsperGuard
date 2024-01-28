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
          autogenerate: { directory: 'start-here' },
        },
        {
          label: 'Transactions',
          translations: { 'pt-BR': 'Transações' },
          autogenerate: { directory: 'transactions' },
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

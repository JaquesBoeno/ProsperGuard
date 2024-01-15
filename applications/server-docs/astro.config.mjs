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
          lang: 'pt-br',
        },
      },
      sidebar: [],
    }),
  ],
})

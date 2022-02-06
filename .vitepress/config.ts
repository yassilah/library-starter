import { defineConfig } from 'vitepress'
import { description, name, repository } from './../package.json'
import { resolve } from 'path'

const srcDir = resolve(__dirname, '../../src')
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
    title: name,
    description,
    srcDir,
    base: isProduction ? '/{repo}' : '/',
    themeConfig: {
        repo: repository.url,
        editLinks: true,
        nextLinks: true,
        prevLinks: true,
        nav: [
            {
                text: 'Home',
                link: '/'
            },
            {
                text: 'Guide',
                link: '/guide/'
            }
        ],
        sidebar: 'auto'
    }
})

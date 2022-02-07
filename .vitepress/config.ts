import { createSiderbarBuilder } from './utils/sidebar'
import { defineConfig } from 'vitepress'
import { description, name, repository } from './../package.json'
import { resolve } from 'path'
import WindiCSS from 'vite-plugin-windicss'

export const srcDir = resolve(__dirname, '../src')

export const isProduction = process.env.NODE_ENV === 'production'

const buildSideBar = createSiderbarBuilder()

export default defineConfig({
    title: name,
    description,
    srcDir,
    vite: {
        plugins: [
            WindiCSS({
                config: {
                    extract: {
                        include: ['**/*.md', '**/*.vue']
                    }
                }
            })
        ]
    },
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
            }
        ],
        sidebar: {
            '/': [
                {
                    text: 'Introduction',
                    link: '/',
                    children: []
                },
                ...buildSideBar('/')
            ]
        }
    }
})

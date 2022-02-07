import { join, resolve } from 'path'
import { readFileSync, utimesSync, watch } from 'fs'
import { srcDir } from '../config'
import { sync } from 'globby'
import parse from '@hackmd/meta-marked'

/**
 * Title case a string.
 */
export function titleCase(str: string) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase())
}

/**
 * Build nested sidebar.
 */
export function createSiderbarBuilder() {
    const configFile = resolve(__dirname, '../config.ts')

    // Watch for changes and update the
    watch(srcDir, { recursive: true }, () => {
        utimesSync(configFile, new Date(), new Date())
    })

    function buildSideBar(base: string) {
        return sync(join(srcDir, base, '*/*.md')).map(file => {
            const { meta } = parse(readFileSync(file, 'utf-8'))
            const name = file.split('/').slice(0, -1).pop()
            const text = meta?.title ?? titleCase(name)
            const link = `${base + name}/`
            const children = buildSideBar(link)

            return {
                text,
                link,
                children
            }
        })
    }

    return buildSideBar
}

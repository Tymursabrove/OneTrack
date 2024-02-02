import fs from 'fs';
import path from 'path';
import { Plugin } from 'vite';

export default function ImageEnumPlugin(options: {
    spriteDir: string;
    staticIconsDir: string;
    outputDir: string;
}): Plugin {
    return {
        name: 'sprite-export-symbols-enum',
        apply: 'serve',

        buildStart() {
            const spritePath = path.join(path.resolve(process.cwd(), options.spriteDir), 'sprite.svg');
            const staticIconsPath = path.join(path.resolve(process.cwd(), options.staticIconsDir));

            if (!fs.existsSync(spritePath)) {
                return console.warn('sprite.svg not found in specified directory:', path.resolve(process.cwd(), options.spriteDir));
            }

            if (!fs.existsSync(staticIconsPath)) {
                return console.warn('static icons directory not found:', path.resolve(process.cwd(), options.staticIconsDir));
            }

            const content = fs.readFileSync(spritePath, 'utf-8');
            const symbolTags = content.match(/<symbol[^>]*id="[^"]+"[^>]*>/g) || [];
            const symbolIds = symbolTags.map((tag: string) => tag.match(/id="([^"]+)"/)?.[1]).filter(Boolean) as string[];
            const staticIcons = fs.readdirSync(staticIconsPath).map(filename => filename.replace(/\.svg$/, ':static'));
            const icons = [...symbolIds, ...staticIcons];

            let enumString = `export type SpriteIconName = ${icons.map(id => JSON.stringify(id)).join('|')}`;
            enumString += `\nexport const Icons = ${JSON.stringify(icons)}`

            const outputDir = path.join(path.resolve(process.cwd(), options.outputDir), 'SpriteIcons.ts');
            fs.writeFileSync(outputDir, enumString);
        },
    };
}

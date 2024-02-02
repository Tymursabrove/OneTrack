import {sveltekit} from '@sveltejs/kit/vite';
import ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper';
import SpriteExportSymbolsEnum from './custom-vite-plugins/SpriteExportSymbolsEnum';
//import mkcert from 'vite-plugin-mkcert'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    ViteSvgSpriteWrapper({
      icons: './src/lib/svgs/*.svg',
      outputDir: './static',
      sprite: {
        dest: './static',
        shape: {
          transform: [{
            svgo: {
              plugins: [{
                name: 'removeScriptElement'
              },{
                name: 'removeStyleElement'
              },{
                name: 'removeRasterImages'
              },{
                name: 'removeAttrs',
                params: {
                  attrs: '(style|id|class|xmlns|data-name)'
                }
              }],
            },
          }],
        },
        svg: {
          transform: [
            function (svg) {
              return svg
              .replace(/(fill|stroke|filter|clip-path)="url\((.+?)\)"/gs, () => '')
              .replace(/<defs>(.+?)<\/defs>/gs, () => '')
              .replace(/<desc>(.+?)<\/desc>/gs, () => '')
              .replace(/<symbol (.+?)>/gs, (_, match) => {
                // TODO: Refactor all sprite icons, write a tutorial on how to add an icon to sprite
                if (match.includes('fill="none"') || match.includes('stroke=')) return _
                return _.replace(match, `stroke="none" ${match}`)
              })
            }
          ]
        }
      }
    }),
    SpriteExportSymbolsEnum({
      spriteDir: './static',
      staticIconsDir: './static/icons',
      outputDir: './src/lib/common',
    }),
    //mkcert()
  ],
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser'
    }
  }
};

export default config;

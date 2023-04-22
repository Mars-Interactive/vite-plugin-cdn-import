import { Module } from './type'

const modulesConfig = {
	'react': {
		var: 'React',
		jsdeliver: {
			path: 'umd/react.production.min.js'
		},
		mode: 'defer'
	},
	'react-dom': {
		var: 'ReactDOM',
		jsdeliver: {
			path: 'umd/react-dom.production.min.js'
		},
		mode: 'defer'
	},
	'react-router-dom': {
		var: 'ReactRouterDOM',
		jsdeliver: {
			path: 'umd/react-router-dom.min.js'
		},
		mode: 'defer'
	},
	'antd': {
		var: 'antd',
		jsdeliver: {
			path: 'dist/antd.min.js',
			css: 'dist/antd.min.css'
		},
		mode: 'defer'
	},
	'ahooks': {
		var: 'ahooks',
		jsdeliver: {
			path: 'dist/ahooks.js'
		},
		mode: 'defer'
	},
	'@ant-design/charts': {
		var: 'charts',
		jsdeliver: {
			path: 'dist/charts.min.js'
		},
		mode: 'defer'
	},
	'vue': {
		var: 'Vue',
		jsdeliver: {
			path: 'dist/vue.global.prod.js'
		},
		mode: 'defer'
	},
	'vue2': {
		var: 'Vue',
		jsdeliver: {
			name: 'vue',
			path: 'dist/vue.runtime.min.js'
		},
		mode: 'defer'
	},
	'@vueuse/shared': {
		var: 'VueUse',
		jsdeliver: {
			path: 'index.iife.min.js'
		},
		mode: 'defer'
	},
	'@vueuse/core': {
		var: 'VueUse',
		jsdeliver: {
			path: 'index.iife.min.js'
		},
		mode: 'defer'
	},
	'moment': {
		var: 'moment',
		jsdeliver: {
			path: 'moment.min.js'
		},
		mode: 'defer'
	},
	'eventemitter3': {
		var: 'EventEmitter3',
		jsdeliver: {
			path: 'umd/eventemitter3.min.js'
		},
		mode: 'defer'
	},
	'file-saver': {
		var: 'window',
		jsdeliver: {
			path: 'dist/FileSaver.min.js'
		},
		mode: 'defer'
	},
	'browser-md5-file': {
		var: 'browserMD5File',
		jsdeliver: {
			path: 'dist/index.umd.min.js'
		},
		mode: 'defer'
	},
	'xlsx': {
		var: 'XLSX',
		jsdeliver: {
			path: 'dist/xlsx.full.min.js'
		},
		mode: 'defer'
	},
	'axios': {
		var: 'axios',
		jsdeliver: {
			path: 'dist/axios.min.js'
		},
		mode: 'defer'
	},
    'lodash': {
        var: '_',
        jsdeliver: {
			path: 'lodash.min.js'
		},
		mode: 'defer'
    },
    'crypto-js': {
        var: 'crypto-js',
        jsdeliver: {
			path: 'crypto-js.min.js'
		},
		mode: 'defer'
    },
    'localforage': {
        var: 'localforage',
        jsdeliver: {
			path: 'dist/localforage.min.js'
		},
		mode: 'defer'
    },
	'mobx': {
        var: 'mobx',
        jsdeliver: {
			path: 'dist/mobx.umd.production.min.js'
		},
		mode: 'defer'
    },
	'mobx-react-lite': {
        var: 'mobxReactLite',
        jsdeliver: {
			path: 'dist/mobxreactlite.umd.production.min.js'
		},
		mode: 'defer'
    },
	'lottie-web': {
        var: 'lottie',
        jsdeliver: {
			path: 'build/player/lottie_light.min.js'
		},
		mode: 'defer'
    }
}

export type ModuleName = keyof typeof modulesConfig

function isJsdeliver(prodUrl: string) {
	return prodUrl.includes('//cdn.jsdelivr.net')
}

function isUnpkg(prodUrl: string) {
	return prodUrl.includes('//unpkg.com')
}

function isCdnjs(prodUrl: string) {
	return prodUrl.includes('//cdnjs.cloudflare.com')
}

export default function autoComplete(name: ModuleName) {
	const config = modulesConfig[name]
	if (!config) {
		throw new Error(`The configuration of module ${name} does not exist `)
	}
	return (prodUrl: string) => {
		if (isCdnjs(prodUrl)){
			throw new Error(`The configuration of module ${name} in ${prodUrl} does not exist `)
        } else {
            if (!(isJsdeliver(prodUrl) || isUnpkg(prodUrl))) {
                console.warn('Unknown prodUrl, using the jsdeliver rule')
            }
            return {
				name,
				mode: config.mode || '',
				var: config.var,
				...config.jsdeliver
			} as Module
        }
	}
}
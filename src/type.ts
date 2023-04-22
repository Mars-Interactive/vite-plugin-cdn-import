
export interface Module {
    name: string
    var: string
    path: string | string[]
    css?: string | string[]
    mode?: 'async' | 'defer' | ''
}

export interface Options {
    modules: (Module | ((prodUrl: string) => Module))[]
    prodUrl?: string
}

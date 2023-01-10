// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';

const config = [
    {
        input: './app.ts',
        output: {
            dir: 'output',
            format: 'iife',
            sourcemap: true,
            name: 'EventBus'
        },
        plugins: [
            resolve(),
            // babel({ babelHelpers: 'bundled', extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', 'tsx', 'ts']}),
            typescript({module: 'ESNext', tsconfig: './tsconfig.json'})
        ],
    }
];

export default config;
// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const config = [
    {
        input: './index.ts',
        output: {
            dir: 'output',
            format: 'cjs',
            sourcemap: true,
            // name: 'EventBus'
        },
        plugins: [
            resolve({extensions: [".js", ".ts"]}),
            commonjs(),
            typescript({module: 'ESNext', tsconfig: './tsconfig.json'}),
        ],
    },

];

export default config;
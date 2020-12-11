import path from 'path'
import { NodePlopAPI } from 'plop'

const helpers = require('handlebars-helpers')()

export default function (plop: NodePlopAPI) {
  plop.setHelper('eq', helpers.eq)
  plop.setGenerator('aoc', {
    description: 'Add the next Advent of Code day files',
    prompts: [],
    actions: () => {
      const d = new Date()
      const year = d.getFullYear()
      const day = ('0' + d.getDate()).slice(-2)

      return [
        {
          type: 'add',
          path: `${year}/${day}/index.js`,
          templateFile: 'templates/aoc.hbs',
        },
        {
          type: 'add',
          path: `${year}/${day}/input`,
        },
      ]
    },
  })
  plop.setGenerator('rc', {
    description: 'React component',
    prompts: [
      { type: 'input', name: 'name', message: 'Name?' },
      {
        type: 'input',
        name: 'path',
        message: 'Path?',
        default: 'src/component',
      },
      {
        type: 'list',
        name: 'css',
        message: 'Include CSS?',
        choices: [
          { name: 'CSS', value: 'css' },
          { name: 'CSS Module', value: 'module' },
          {
            name: 'CSS Module w/ Sass',
            value: 'scss-module',
          },
          {
            name: 'CSS Module w/ Sass + MDL',
            value: 'scss-module--mdl',
          },
        ],
      },
      { type: 'confirm', name: 'dumb', message: 'Dumb af?' },
    ],
    actions: (data) => {
      const actions = [
        {
          type: 'add',
          skipIfExists: true,
          path: path.join(
            path.relative(__dirname, '.'),
            '{{ path }}',
            '/{{name}}/index.tsx'
          ),
          templateFile: 'templates/react/fc.ts.hbs',
        },
        {
          type: 'add',
          skipIfExists: true,
          path: path.join(
            path.relative(__dirname, '.'),
            '{{ path }}',
            '/{{name}}/index.stories.tsx'
          ),
          templateFile: 'templates/react/stories.ts.hbs',
        },
      ]

      data?.css === 'scss-module--mdl' &&
        actions.push({
          type: 'add',
          skipIfExists: true,
          path: path.join(
            path.relative(__dirname, '.'),
            '{{ path }}',
            '/{{name}}/index.module.scss'
          ),
          templateFile: 'templates/react/scss.hbs',
        })

      return actions
    },
  })
}

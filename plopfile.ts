import { NodePlopAPI } from 'plop'

export default function (plop: NodePlopAPI) {
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
      { type: 'confirm', name: 'dumb', message: 'Dumb af?' },
    ],
    actions: () => {
      return [
        {
          type: 'add',
          path: 'src/components/{{name}}/index.js',
          templateFile: 'templates/aoc.hbs',
        },
      ]
    },
  })
}

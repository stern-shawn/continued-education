import fs from 'fs'
import { OutputTarget } from '../Summary'

export class HtmlReport implements OutputTarget {
  constructor(public path: string) {}

  print(report: string) {
    const html = `
      <div>
        <h1>Analysis Output</h1>
        <p>${report}</p>
      </div>
    `

    fs.writeFileSync(this.path, html)
  }
}

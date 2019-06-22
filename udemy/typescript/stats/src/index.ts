import { ConsoleReport } from './reportTargets/ConsoleReport'
import { CsvFileReader } from './CsvFileReader'
import { MatchReader } from './MatchReader'
import { Summary } from './Summary'
import { WinsAnalysis } from './analyzers/WinsAnalysis'
import { HtmlReport } from './reportTargets/HtmlReport'

const csvFileReader = new CsvFileReader('football.csv')
const matchReader = new MatchReader(csvFileReader)
matchReader.load()

const manUnitedSummary = new Summary(new WinsAnalysis('Man United'), new ConsoleReport())
manUnitedSummary.buildAndPrintReport(matchReader.matches)

const liverpoolSummary = new Summary(new WinsAnalysis('Liverpool'), new ConsoleReport())
liverpoolSummary.buildAndPrintReport(matchReader.matches)

const arsenalSummary = new Summary(new WinsAnalysis('Arsenal'), new HtmlReport('report.html'))
arsenalSummary.buildAndPrintReport(matchReader.matches)

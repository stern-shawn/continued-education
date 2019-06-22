import { ConsoleReport } from './reportTargets/ConsoleReport'
import { CsvFileReader } from './CsvFileReader'
import { MatchReader } from './MatchReader'
import { Summary } from './Summary'
import { WinsAnalysis } from './analyzers/WinsAnalysis'

const csvFileReader = new CsvFileReader('football.csv')
const matchReader = new MatchReader(csvFileReader)
matchReader.load()

const manUnitedSummary = new Summary(new WinsAnalysis('Man United'), new ConsoleReport())
manUnitedSummary.buildAndPrintReport(matchReader.matches)

const wolvesSummary = new Summary(new WinsAnalysis('Liverpool'), new ConsoleReport())
wolvesSummary.buildAndPrintReport(matchReader.matches)

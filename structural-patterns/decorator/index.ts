type data = any

interface DataSource {
  writeData(data: data): void
  readData(): data
}

class FileDataSource implements DataSource {
  constructor(filename: string) {
  }
  writeData(data: any): void { 
  }
  readData(): data {
  }
}

class DataSourceDecorator implements DataSource {
  protected wrappee: DataSource

  constructor(source: DataSource) {
    this.wrappee = source
  }

  writeData(data: any): void {
    this.wrappee.writeData(data)
  }

  readData(): data {
    return this.wrappee.readData()
  }
}

class EncryptionDecorator extends DataSourceDecorator {
  writeData(data: any): void {
    // 1. 데이터 암호화 로직 추가
    // 2. 암호화된 데이터로 wrappee의 writeData 메서드 호출
  }

  readData(): data {
    // 1. wrappee.readData() 실행
    // 2. 암호 해독 로직 추가
    // 3. 결과 반환
  }
}

class CompressionDecorator extends DataSourceDecorator {
  writeData(data: any): void {
   // 1. 데이터 압축
   // 2. wrappee.writeData 호출 
  }

  readData(): data {
    // 1. wrappee.readData 홀출
    // 2. 압축 풀기
    // 3. 결과 반환
  }
}

// 예시
class Application {
  dumbUsageExample() {
    let salaryRecords: string

    let source =  new FileDataSource("somefile.dat")
    source.writeData(salaryRecords)

    source = new CompressionDecorator(source)
    source.writeData(salaryRecords)

    source = new EncryptionDecorator(source)
    source.writeData(salaryRecords)
  }

}

// 클라이언트 클래스
class SalaryManager {
  public source: DataSource
  constructor(source:DataSource) {

  }
  
  load() {
    return this.source.readData()
  }

  save() {
    let salaryRecords: string
    this.source.writeData(salaryRecords)
  }
}

class ApplicationConfigurator {
  configurationExample() {
    let source = new FileDataSource("salary.dat")
    /* if (enabledEncryption()) {
      source = new EncryptionDecorator(source)
    }
    if (enabledCompression) {
      source = new CompressionDecorator(source)
    } */

    let logger = new SalaryManager(source)
    let salary = logger.load()
  }
}
//EXCEL KULLANDIGIMIZ ICIN XLSX INSTAL EDILDI
//BURADA EXCEL ICERISINDE DATALARI OKUMAYI YONETIYORUZ.
import XLSX from 'xlsx'

export default class FileUpload {
  static async handleFileUpload (files) {
    return await new Promise((resolve, reject) => {
      try {
        var reader = new FileReader()
        reader.onload = function (e) {
          var data = new Uint8Array(e.target.result)
          var workbook = XLSX.read(data, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          if (worksheet.A1.h === 'Phone' || worksheet.A1.h === 'Imei' || worksheet.A1.h === 'Tckn') {
            var dataArray = XLSX.utils.sheet_to_json(worksheet).map(({ __rowNum__, ...item }) => item)

            if (dataArray.length > 1000) {
              dataArray.splice(1000, dataArray.length - 1000)
            }

            if (worksheet.A1.h === 'Phone') {
              for (let i = 0; i < dataArray.length; i++) {
                // non digit karakterlei siler
                dataArray[i].Phone = dataArray[i].Phone.toString().replace(/\D/g, '')
              }
            } else if (worksheet.A1.h === 'Imei') {
              for (let i = 0; i < dataArray.length; i++) {
                dataArray[i].Imei = dataArray[i].Imei.toString().replace(/\D/g, '')
              }
            } else if (worksheet.A1.h === 'Tckn') {
              for (let i = 0; i < dataArray.length; i++) {
                dataArray[i].Tckn = dataArray[i].Tckn.toString().replace(/\D/g, '')
              }
            }

            resolve(dataArray)
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('Belirtici kolon adı hatalı girilmiştir.')
          }
        }

        reader.readAsArrayBuffer(files[0])
      } catch (error) {
        reject(error)
      }
    })
  }
}

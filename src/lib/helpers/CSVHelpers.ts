function ConvertToCSV(objArray: any[]) {
    var array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line !== '') line += ','

            line += array[i][index];
        }

        str += `${line}\r\n`;
    }

    return str;
}

function ExportCSVFile(fileTitle: string, csv: string) {
    let exportedFilename = fileTitle + '.csv';
    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    let link = document.createElement("a");
    if (link.download !== undefined) {
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
export function handleUpdatedCSVQue(source: any[], fileName: string) {
    if (!source || source.length == 0 || Object.keys(source[0]).length == 0) {
        return;
    }
    fileName = `${fileName}_data(${source.length})`;
    let headers = `${Object.keys(source[0]).join(',')}\r\n`;
    let csvString = ConvertToCSV(source);
    let completeCsv = `${headers}${csvString}`;
    ExportCSVFile(fileName, completeCsv);
}
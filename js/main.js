'use strict'
let sum = 0;
const initialData = {};
const resultData = {
    '001': 0,
    '003': 0,
    '004': 0,
    '005': 0,
    '006': 0,
    '007': 0,
    '011': 0,
    '013': 0,
    '014': 0,
    '015': 0,
    '016': 0,
    '017': 0,
    '058': 0,
    '060': 0,
    '061': 0,
    '062': 0,
    '064': 0,
    '065': 0,
    '020': 0,
    '022': 0,
    '023': 0,
    '024': 0,
    '026': 0,
    '027': 0,
    '070': 0,
    '071': 0,
};

function processFiles(files) {
    let file = files[0];

    let reader = new FileReader();

    reader.onload = function (e) {
        let loadedFile = String(e.target.result);
        // loadedFile = loadedFile.substring(7688);

        const arrayOfTr = loadedFile.match(/<tr class=r12>.+?<\/tr>/igms);

        for (let tr of arrayOfTr) {
            let vc = String(tr.match(/<td class="r13c0">\d{3}<\/td>/igms));
            vc = vc.match(/\d{3}/ig);

            if (vc === null) {
                continue;
            }
            else {
                let multiplicator = String(tr.match(/<td class="r13c2">.+?<\/td>/ims));
                multiplicator = multiplicator.match(/<span .+?>(.+?)<\/span>/i);
                multiplicator = multiplicator[1].replace(/\s/g, '');
                multiplicator = parseInt(multiplicator);

                initialData[vc] = multiplicator;
            }
        }

        console.log(initialData)

        for (let key in initialData) {
            //One-side print A4
            if (key === '001' || key === '101' || key === '201' || key === '301') {
                resultData['001'] += initialData[key];
            }
            else if (key === '003' || key === '103' || key === '203' || key === '303') {
                resultData['003'] += initialData[key];
            }
            else if (key === '004' || key === '104' || key === '204' || key === '304') {
                resultData['004'] += initialData[key];
            }
            else if (key === '005' || key === '105' || key === '205' || key === '305') {
                resultData['005'] += initialData[key];
            }
            else if (key === '006' || key === '106' || key === '206' || key === '306') {
                resultData['006'] += initialData[key];
            }
            else if (key === '007' || key === '107' || key === '207' || key === '307') {
                resultData['007'] += initialData[key];
            }
            //Two-side print A4
            else if (key === '011' || key === '111' || key === '211' || key === '311') {
                resultData['011'] += initialData[key];
            }
            else if (key === '013' || key === '113' || key === '213' || key === '313') {
                resultData['013'] += initialData[key];
            }
            else if (key === '014' || key === '114' || key === '214' || key === '314') {
                resultData['014'] += initialData[key];
            }
            else if (key === '015' || key === '115' || key === '215' || key === '315') {
                resultData['015'] += initialData[key];
            }
            else if (key === '016' || key === '116' || key === '216' || key === '316') {
                resultData['016'] += initialData[key];
            }
            else if (key === '017' || key === '117' || key === '217' || key === '317') {
                resultData['017'] += initialData[key];
            }
            //One-side print A3
            else if (key === '020' || key === '120' || key === '220' || key === '320') {
                resultData['020'] += initialData[key];
            }
            else if (key === '022' || key === '122' || key === '222' || key === '322') {
                resultData['022'] += initialData[key];
            }
            else if (key === '023' || key === '123' || key === '223' || key === '323') {
                resultData['023'] += initialData[key];
            }
            //Two-side print A3
            else if (key === '024' || key === '124' || key === '224' || key === '324') {
                resultData['024'] += initialData[key];
            }
            else if (key === '026' || key === '126' || key === '226' || key === '326') {
                resultData['026'] += initialData[key];
            }
            else if (key === '027' || key === '127' || key === '227' || key === '327') {
                resultData['027'] += initialData[key];
            }
            //Color print A4
            else if (key === '058' || key === '158' || key === '258' || key === '358') {
                resultData['058'] += initialData[key];
            }
            else if (key === '060' || key === '160' || key === '260' || key === '360') {
                resultData['060'] += initialData[key];
            }
            else if (key === '061' || key === '161' || key === '261' || key === '361') {
                resultData['061'] += initialData[key];
            }
            //Color print A3
            else if (key === '062' || key === '162' || key === '262' || key === '362') {
                resultData['062'] += initialData[key];
            }
            else if (key === '064' || key === '164' || key === '264' || key === '364') {
                resultData['064'] += initialData[key];
            }
            else if (key === '065' || key === '165' || key === '265' || key === '365') {
                resultData['065'] += initialData[key];
            }
            //BW wide format 070
            else if (key === '070' || key === '170') {
                resultData['070'] += initialData[key];
            }
            //BW wide format 071
            else if (key === '071' || key === '171') {
                resultData['071'] += initialData[key];
            }
            else {
                resultData[key] = initialData[key];
            }
        }

        for (let key in resultData) {
            if (resultData[key] === 0) {
                delete resultData[key]
            }
            else {
                continue;
            }
        }

        console.log(resultData)

        for (let key in resultData){
            sum += +resultData[key];
        } 

        const toRender = [];
        for (let key in resultData) {
            toRender.push(`[${key}];${resultData[key]};\n`);
        }
        toRender.push(`[sum];${sum};\n`);
        saveAs(new Blob(toRender, { type: 'text/csv;charset=utf-8' }), 'data.csv');
    };

    reader.readAsText(file);
}

let dropBox;

window.onload = function () {
    dropBox = document.getElementById("drag-wrapper");
    dropBox.ondragenter = ignoreDrag;
    dropBox.ondragover = ignoreDrag;
    dropBox.ondrop = drop;
}

function ignoreDrag(e) {
    // Обеспечиваем, чтобы никто другой не получил это событие, 
    // т.к. мы выполняем операцию перетаскивания
    e.stopPropagation();
    e.preventDefault();
}

function drop(e) {
    // Аннулируем это событие для всех других
    e.stopPropagation();
    e.preventDefault();

    // Получаем перемещенные файлы
    let data = e.dataTransfer;
    let files = data.files;

    // Передаем полученный файл функции для обработки файлов
    processFiles(files);
}
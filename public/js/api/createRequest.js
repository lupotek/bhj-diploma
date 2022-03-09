/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
let xhr = new XMLHttpRequest();
xhr.responseType = "json"
let url = options.url
let sendedData = null

if (options.method === "Get") {
    if (options.data) {
        url = sendedData.url+"?"
        for (let elem of options.data) {
            url += elem + "=" + options.data[elem]+"&"
        }
        url = url.substring(0, url.length - 1);
    } else {
        sendedData = new FormData();
        for(let elem of options.data) {
            sendedData.append(elem, options.data[elem]);
        }  
    }
    try {
        xhr.open(options.method, url)
        xhr.send(sendedData)
    } catch (err) {
        options.callback(err);
    }

    xhr.onload = () => { options.callback(null, xhr.response) }
}
}

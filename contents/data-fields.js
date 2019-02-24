function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function getDataField(string) {
    if ($('#title')[0].checked) 
        return replaceAll(string, "data-field", "document-title")
    return string;
}
/**
 * This array is a list of term digited by the user.
 * id -> position
 * show -> removed or not to user
 * */
var terms = [{ 'id': 1, 'show': true }];

/**
 * Returns the position of array based on id. The return is id - 1 because list is started with 0
 * @param {any} id (null is last position)
 */
function getPosition(id) {
    if (id === null)
        return terms.length - 1;
    return id - 1;
}

/**
 * This method only add new line to user insert new term
 * */
function addNewTerm() {
    var count = terms.length;
    terms.push({ 'id': count + 1, 'show': true });
    writeNewTerm();
}

/**
 * This method write new line
 * The id's and name's in input are generate automatic by the length list
 * */
function writeNewTerm() {
    var currentId = terms[terms.length - 1].id;
    var newId = currentId + 1;
    $(`#row-${currentId}`).append(
        `<div>
            <input onkeyup="updateString()" type="text" class="form-control col-sm-8" placeholder="Input term" name="term-${currentId}" style="float: left; margin-right: 5px" id="term-${currentId}"/>
            <select onchange="updateString()" class="form-control col-sm-3" id="operator-${currentId}" name="operator-${currentId}" style="float: left; margin-right: 5px">
                <option value="AND" selected>AND</option>
                <option value="OR">OR</option>
            </select>
            <button type="button" class="btn btn-danger btn-sm" style="float: left;" onclick="removeTerm(${currentId})">Remove</button>
        </div>
        <div class="clearfix"></div>
        <br/>`);
    $("#row-main").append(`<div id="row-${newId}"></div>`);
}

/**
 * This method remove row basead on position list of terms
 * @param {any} id
 */
function removeTerm(id) {
    if (terms[id - 1]) {
        terms[id - 1].show = false;
        $(`#row-${id}`).empty();
    }
    updateString();
}

/**
 * This method format terms with '"' if necessary. Example: micro task to "micro task"
 * @param {any} term
 */
function formatTerm(term) {
    if (isSpecialTerm(term))
        return `\"${term}\"`;
    return term;
}

/**
 * This method only check special term with ' ' or '-'
 * @param {any} term
 */
function isSpecialTerm(term) {
    return term.indexOf(" ") > 0 || term.indexOf("-") > 0;
}


function updateString() {
    var consult = '(';
    var last = terms.filter(f => f.show);
    for (var i = 0; i < terms.length; i++) {
        if (terms[i].show) {
            consult += `"data-field":` + " " + formatTerm($(`#term-${terms[i].id}`).val()) + " ";
            if (terms[i].id != last[last.length - 1].id)
                consult += $(`#operator-${terms[i].id}`).val() + " ";
        }
    }
    consult += ')';

    $("#string").html(getDataField(consult).trim());
}

let generateToast = (toastType, header, body) => {
    $('#toast-header-content').text(header);
    $('#toast-body-content').text(body);
    $('.toast').toast('show');
}

module.exports = {
    generateToast,
}
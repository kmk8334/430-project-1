// Set the header and body of the toast notification to the content,
// then show it in the top-right corner
let generateToast = (toastType, header, body) => {
    $('#toast-header-content').text(header);
    $('#toast-body-content').text(body);
    $('.toast').toast('show');
}

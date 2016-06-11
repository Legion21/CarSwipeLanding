function getUrlParamValue(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function() {
    var vinNumber = getUrlParamValue('vinNumber');
    if (vinNumber) {
        if (vinNumber.length > 15 && vinNumber.length <= 21) {

            var make = getUrlParamValue('make');
            var model = getUrlParamValue('model');
            var year = getUrlParamValue('carYear');
            var price = getUrlParamValue('price');
            var mileage = getUrlParamValue('mileage');
            var fromCity = getUrlParamValue('fromCity');
            var fromState = getUrlParamValue('fromState');

            // Open dialog share
            $('body').append("<!-- Share Modal -->" +
                '<div class="modal fade" id="shareDialog" tabindex="-1" role="dialog" aria-labelledby="shareDialogTitle">' +
                '<div class="modal-dialog" role="document">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                '<h4 class="modal-title" id="shareDialogTitle">Open in Application</h4></div>' +
                '<div class="modal-body"><p>Detected vin number (' + vinNumber + ') that can be found in our mobile app</p>' +
                make && model && year && price && mileage && (fromCity || fromState) ? '<p><b>Detail Information:</b></p>' : '' +
                make ? ('<p>Manufacturer: ' + make + '</p>') : '' +
                model ? ('<p>Model: ' + model + '</p>') : '' +
                year ? ('<p>Year: ' + year + '</p>') : '' +
                price ? ('<p><b>Price: ' + price + ' $</b></p>') : '' +
                mileage ? ('<p>Mileage: ' + mileage + ' miles</p>') : '' +
                fromCity || fromState ? ('<p><b>Location: ' + (fromCity ? fromCity : '') + (fromState ? (fromCity ? fromCity : ', ')+fromState : '') + '</b></p>') : '' +
                '<p><a class="btn btn-success" target="_blank" href="carswipe://' + vinNumber + '">Open in CarSwipe</a></p></div>' +
                '<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div>' +
                '</div></div></div></div>');

            $('#shareDialog').modal('show');
        }
    }
});
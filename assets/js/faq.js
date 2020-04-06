// remove name from twitter widget
window.onload = function() {
    let myiFrame = document.getElementById("twitter-widget-0");
    let doc = myiFrame.contentDocument;
    doc.body.innerHTML = doc.body.innerHTML + '<style>.timeline-Header{position:sticky;top:0;}.timeline-Header-subtitle{display: none !important;}.timeline-Header-description{display: none !important;}</style>';
} 
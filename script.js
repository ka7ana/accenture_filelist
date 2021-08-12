/*
 * I loaded the dumpsite up in Tor Browser and pasted this in the JS console...
 */

// Array to hold the results
var files = [];
// 2384 files listed, 14 results per page = 171 pages
for(var i=0; i<171; i++){
  $.ajax({
    type: 'POST',
    url: 'http://lockbitapt6vx57t3eeqjofwgcglmutr3a35nygvokja5uuccip4ykyd.onion/ajax/listing-post',
    // Got these from JS console POST params
    data: {
      explorer: true,
      sub_path: '',
      full_path: 'WIN-ENVD/Z/ddd/dec',
      split_idx: i, // split_idx is the page index
      folder_id: 284
    },
    dataType: 'json',
    success: function(resp) {
      for (var j=0; j<resp.file_list.length; j++) {
        var file = $(resp.file_list[j]);
        // Extract the info and add to array
        files.push({
          file_path: file.attr('data-dir'),
          file_name: $('.file-listing__name', file).text(),
          file_date: $('.file-listing__date', file).text(),
          file_size: $('.file-listing__size', file).text()
        });
      }
    }
  });
}

/*
After all the XHR requests complete (might take a while :)), paste the following into the JS console:

var lines = [];
for(var i=0; i<files.length; i++) {
  var file = files[i];
  lines.push(file.file_path+','+file.file_name+','+file.file_date+','+file.file_size);
}
console.log('Output: ' + lines.join('\n'));
*/

/*(function(document) {
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');

  document.addEventListener('click', function(e) {
    var target = e.target;

    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;

    checkbox.checked = false;
  }, false);
})(document);
*/
(function(document) {
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');

  // Set the checkbox state to true (checked) by default
  checkbox.checked = true;

  document.addEventListener('click', function(e) {
    var target = e.target;

    // Keep the sidebar open all the time
    if (sidebar.contains(target) || (target === checkbox || target === toggle)) return;

    checkbox.checked = true; // Ensure the checkbox stays checked
  }, false);
})(document);

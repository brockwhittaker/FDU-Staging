var $ = _;

window.onload = function () {
  var formSidebar = $("#form_sidebar"),
      form = $("form");

  if (form[0])
    formSidebar.css("height", form[0].clientHeight + "px");
};

var partials = {
  loadBanner: function ($node, path) {
    $.get(path, function (response) {
      $node.html(response);
    });
  }
};

partials.loadBanner($("#banner"), "public/partials/banner.html");


$("button[type=button]").click(function () {
  $("form").form({
    success: function () {
      this.style.backgroundColor = "#fff";
    },
    failure: function () {
      this.style.backgroundColor = "#E1CACA";
    },
    response: function (data, err, path) {
      if (!err) {
        $.ajax({
          type: "POST",
          url: path,
          data: data,
          callback: function (response) {
            console.log(response);
          },
          dataType: null
        });
      }
    }
  });
});
console.log();

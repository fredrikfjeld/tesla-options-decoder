////
// Show all options
////
$.getJSON("pricebook-3.5_MS_NO.json", function ( data ) {
  var items = [];
  $.each( data.tesla["configSetPrices"].options, function ( opt_code, opt_content ) {
    items.push( '<dt class="opt opt-code">' + opt_code + '</dt><dd id="' + opt_code + '" class="opt"><a class="listitem">' + opt_content.name + '</a><span class="opt-descr" style="display:none;" ><br/>' + opt_content.description + "</span></dd>" );
  });

  $( "<dl/>", {
    "class": "options-list dl-horizontal",
    html: items.join( "" )
  }).appendTo( "#optionslist_no" );
});

$.getJSON("pricebook-3.5_MS_US.json", function ( data ) {
  var items = [];
  $.each( data.tesla["configSetPrices"].options, function ( opt_code, opt_content ) {
    items.push( '<dt class="opt opt-code">' + opt_code + '</dt><dd id="' + opt_code + '" class="opt"><a class="listitem">' + opt_content.name + '</a><span class="opt-descr" style="display:none;" ><br/>' + opt_content.description + "</span></dd>" );
  });

  $( "<dl/>", {
    "class": "options-list dl-horizontal",
    html: items.join( "" )
  }).appendTo( "#optionslist_us" );
});



// Show/hide option description on click
$(document).on('click touchstart', '.opt', function() {
  var $this = $(this);
  $this.find("span.opt-descr").fadeToggle(0);
  $('.opt-descr').not($this.find("span.opt-descr")).fadeOut(0);
});

// Show instructions on how to find PDF-link
$(document).on('click touchstart', '#howFindLink', function() {
  $("#linkInstruction").toggle();
});

// Simulate click on button with return key
$("#pdflink").keyup(function(event){
  if(event.keyCode == 13){
    $("#submitPdfLink").click();
  }
});

// Check my options
$(document).on('click touchstart', '#submitPdfLink', function() {
  ////
  // Getting and displaying your options
  ////
  var pdfurl = $('#pdflink').val();
  var myurl_arr = pdfurl.split("options");
  var myurl = myurl_arr[1].split("=");
  var myoptions = myurl[1].split("&");
  myoptions = myoptions[0];
  var commaregex = new RegExp('\%2C', 'g');
  myoptions = myoptions.replace(commaregex, ',');
  var arrayOfOptions = myoptions.split(",");

  // Set jsonfile based on region
  var jsonfile = "pricebook-3.5_MS_US.json";

  switch(pdfurl.split("/")[3]) {
    case "no_NO":
      jsonfile = "pricebook-3.5_MS_US.json";
      break;
    case "en_GB":
      jsonfile = "pricebook-3.5_MS_US.json";
      break;
    default:
      jsonfile = "pricebook-3.5_MS_US.json";
  }

  // Parsing JSON data
  $.getJSON(jsonfile, function ( data ) {
    var items = [];

    $.each( data.tesla["configSetPrices"].options, function ( opt_code, opt_content ) {
      if( jQuery.inArray( opt_code, arrayOfOptions ) != -1 ) {
        items.push( '<dt class="opt opt-code">' + opt_code + '</dt><dd id="' + opt_code + '" class="opt"><a class="listitem">' + opt_content.name + '</a><span class="opt-descr" style="display:none;" ><br/>' + opt_content.description + "</span></dd>" );
      }
    });

    $( "<dl/>", {
      "class": "options-list dl-horizontal",
      html: items.join( "" )
    }).appendTo( "#list-my-options" );
  });
  $(".my-options").show();
});


////
// Clicking on the menu
////
$(function(){
  $('.nav li a').on('click touchstart', function(e) {
    e.preventDefault(); // prevent link click if necessary?
    var $thisLi = $(this).parent('li');
    var $ul = $thisLi.parent('ul');

    if (!$thisLi.hasClass('active')){
      $ul.find('li.active').removeClass('active');
      $thisLi.addClass('active');
    }

  });

  // Click my options
  $('#my-options-link').on('click touchstart', function() {
    $('#my-options-container').show();
    $('#all-options-container').hide();
    $('#about-container').hide();
  });
  // Click all options
  $('#all-options-link').on('click touchstart', function() {
    $('#my-options-container').hide();
    $('#all-options-container').show();
    $('#about-container').hide();
  });
  // Click about
  $('#about-link').on('click touchstart', function() {
    $('#my-options-container').hide();
    $('#all-options-container').hide();
    $('#about-container').show();
  });

});

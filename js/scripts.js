// Button handling for Experience Section, Hide Show Tiles-----
var currentProjectClass;

$("button").click(function(){

    currentProjectClass = $(this).attr('class');
    var isPressed = ($(this).attr('id') == "pressed");

    // console.log(currentProjectClass);
    // console.log($(this).attr('id'));
    // console.log(($(this).attr('id') == "pressed"));

    //hide all details
    $("#experience .left").css("width", "100%");
    $("#experience .extra").css("display", "none");

    if (isPressed) {
    //if button was pressed, 
    //then it's a button re-press, 
    //and things need to be UNDONE: 
    //  -show all content
        showAll();
    //  -remove pressed id from clicked button
        $("button."+currentProjectClass).removeAttr('id');
    //  -add pressed id to ALL-button (unless ALL-clicked)
        if (currentProjectClass != "all") {
            $("button.all").attr('id', "pressed");
        } else {
    //  if ALL-button was clicked, ALL need to be hidden
            hideAll();
        }
    }

    if (!isPressed) {
    //if the button wasn't pressed prior to being clicked, 
    //then things need to be done:
    //  -show selected content
        showSelected();
    //  -hide unclicked content
        hideUnSelected();
    //  -if ALL-button was clicked, show all content
        if (currentProjectClass == "all") {
            showAll();
        }
    //  -unpress unclicked buttons
        $("button:not(."+currentProjectClass+")").removeAttr('id');
    //  -add press id to clicked button
        $("button."+currentProjectClass).attr('id', "pressed");
    }

});
  
function hideUnSelected() {
    $(".exp:not(."+currentProjectClass+")").css("padding", "0");
    $(".exp:not(."+currentProjectClass+")").css("height", "0");
    $(".exp:not(."+currentProjectClass+")").css("flex-basis", "90%");
}

function showSelected() {
    $(".exp."+currentProjectClass).css("padding", "2rem");
    $(".exp."+currentProjectClass).css("height", "auto");
    $(".exp."+currentProjectClass).css("flex-basis", "90%");
}

function showAll() {
    $(".exp").css("padding", "2rem");
    $(".exp").css("height", "auto");
    $(".exp").css("flex-basis", "auto");
}

function hideAll() {
    $(".exp").css("padding", "0");
    $(".exp").css("height", "0");
    $(".exp").css("flex-basis", "90%");
}
// -----------------------------------------------------------

// Expand Tiles ----------------------------------------------
$(".exp").click(function(){

    var isBig = Boolean($(this).css("flex-basis") != "auto");
    var isDetailed = Boolean($(this).find('.extra').css("display") != "none" );
    var isFiltered = Boolean(currentProjectClass != "all" 
                   && typeof currentProjectClass != "undefined");
    
    // console.log(currentProjectClass);
    // console.log(isBig);
    // console.log(isDetailed);
    // console.log(isFiltered);

    if (!isBig){
    //--if small, make big
        $(this).css("flex-basis", "90%");
        $(this).children('.left').css("width", "35%");
        $(this).find('.extra').css("display", "block");

        $(this).children('i').removeAttr("class");
        $(this).children('i').addClass("fa fa-search-minus");

    } else if (isBig && isDetailed && isFiltered) {
    //--else if filtered+big and detailed, just hide details
        $(this).children('.left').css("width", "100%");
        $(this).find('.extra').css("display", "none");

        $(this).children('i').removeAttr("class");
        $(this).children('i').addClass("fa fa-search-plus");

    } else if (isBig && isDetailed){
    //--else if big AND detailed, make small
        $(this).css("flex-basis", "auto");
        $(this).children('.left').css("width", "100%");
        $(this).find('.extra').css("display", "none");

        $(this).children('i').removeAttr("class");
        $(this).children('i').addClass("fa fa-search-plus");

    } else if (isBig && !isDetailed) {
    //--else if big and not detailed, just show content
        $(this).children('.left').css("width", "35%");
        $(this).find('.extra').css("display", "block");

        $(this).children('i').removeAttr("class");
        $(this).children('i').addClass("fa fa-search-minus");
    }
});
// ------------------------------------------------------------

// Rotate Gears to mouse coords -------------------------------
$(document).mousemove(function (event) {
    var window_height = $( '#tiles' ).height();
    var window_width = $( window ).width();
    var mouse_coor_y = event.pageY - $(window).scrollTop();
    var mouse_coor_x = event.pageX;
    var max_travel = 90
    var x_to_deg = Math.ceil((mouse_coor_x / window_width)*max_travel);
    var y_to_deg = Math.ceil((mouse_coor_y / window_height)*max_travel);
    $('#header .clockwise').css("--cwRotation", x_to_deg);
    $('#header .counter-clockwise').css("--ccwRotation", y_to_deg);
});
// ------------------------------------------------------------

// Continue button logic------- -------------------------------
// Visibility
$(window).scroll(function() {
    var scrollPosition = $(window).scrollTop();
    dist_to_exp= $('#experience').offset().top
    if (scrollPosition > dist_to_exp) {
      // If scroll is past header, make nav button visible
      $('#continue-button').css('opacity', '1');
    } else {
      // else hide it
      $('#continue-button').css('opacity', '0');
    }

    //--check if at bottom, if so flip icon 180 and make it link to top

    var documentHeight = $(document).height();
    var viewportHeight = $(window).height();
    var scrollPosition = $(window).scrollTop();
    var distanceFromBottom = documentHeight - viewportHeight - scrollPosition;
    // Check if the user has reached the bottom of the page
    // console.log(distanceFromBottom);
    if (distanceFromBottom <= 0) {
        // If they have, rotate the #continue-button element 180 degrees
        $('#continue-button').css("--flip", 180);
    } else {
        $('#continue-button').css("--flip", 0);
    }
});
//Functionality
$("#continue-button").click(function(){
    dist_to_exp= $('#experience').offset().top
    dist_to_edu= $('#education').offset().top
    dist_to_cert= $('#certs').offset().top
    dist_to_foot= $('#footer').offset().top
    scroll_distance = $(document).scrollTop();

    if ($('#continue-button').css('--flip') == '180') {
        //go to top
        $(document).scrollTop(0);
    } else {
        //go down a section
        if (scroll_distance >= dist_to_cert) {
            $(document).scrollTop(dist_to_foot+1);
    
        } else if (scroll_distance >= dist_to_edu) {
            $(document).scrollTop(dist_to_cert+1);
    
        } else if (scroll_distance >= dist_to_exp) {
            $(document).scrollTop(dist_to_edu+1);
    
        } else if (scroll_distance >= 0) {
            $(document).scrollTop(dist_to_exp+1);
        }
    }
    

    
});
// Down button on Header
$("#header i.fa-angle-double-down").click(function(){
    dist_to_exp = $('#experience').offset().top;
    $(document).scrollTop(dist_to_exp+1);
});
// ------------------------------------------------------------
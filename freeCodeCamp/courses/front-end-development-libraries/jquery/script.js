// All animations on this page comes from the Animate.css library.

/**
 * All jQuery functions start with a dollar sign operator '$' (also called bling). 
 */

/**
 * The ready() function is used to make sure that the JavaScript code will run once the browser has loaded the page and not before which could trigger bugs and errors.
 */
$(document).ready(function() {
    // The addClass() function is used to add a class to an element.
    $("button").addClass("animate__animated animate__bounce");
    $("#title").addClass("animate__animated animate__flash");
    $(".well").addClass("animate__animated animate__swing");
    $("#left-well-title").addClass("animate__animated animate__backInRight");
    $("#right-well-title").addClass("animate__animated animate__backInLeft");
    $("#target1").addClass("btn-primary");
    $("#target4").addClass("btn-secondary");

    // The removeClass() function  is used to remove a class from an element
    $("button").removeClass("btn-default");

    // The css() function is used to change the css rules of an element.
    $("#left-well-title").css("background-color", "black");
    $("#left-well-title").css("color", "white");
    $("#right-well-title").css("background-color", "black");
    $("#right-well-title").css("color", "white");

    // The prop() function is used to modify a property of an element
    $("#target1").prop("disabled", true);

    /**
     * The html() and text() functions are used to add text inside an element. The difference between the two is that html() also evaluates tags passed as arguments, whereas text() does not and treats tags like normal text.
     */
    $("#target1").text("#target1 (disabled)");
    $("#target2").html("<em>#target2</em>");
    $("#target5").html("<b>#target5</b>");

    // The remove() function is used to remove an element from the document.
    $("#target3").remove();

    // The appendTo() function is used to append an element to another one.
    $("#target6").appendTo("#left-well");

    // The clone() function is used to duplicate an element.
    $("#target2").clone().appendTo("#right-well");

    /**
     * jQuery allows functions chaining where it's possible to easily call one function after another.
     */
    // The parent() function is used to select the parent of an element.
    $("#target6").parent().css("background-color", "lightblue");
    $("#target5").parent().css("background-color", "pink");

    // The children() function is used to select the children of an element.
    $("#left-well").children().css("padding", "1rem");
    $("#right-well").children().css("padding", "1rem");

    // The target:nth-child(n) selector is used to select the n child of an element
    $(".target:nth-child(3)").html("<b>#target6</b>");
    
    // :odd and :even selectors are used to select elements based on their positions
    $(".target:even").addClass("animate__animated animate__flip");
    $(".target:odd").addClass("animate__animated animate__rubberBand");

    // The curtain call must be dramatic...
    $("body").addClass("animate__animated animate__hinge");
});
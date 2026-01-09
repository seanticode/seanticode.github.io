// Sean Jabien B. Bergula
// Section G1L
// Exercise 10 - Javascript for the ITEA Order Form page

function toggleBedSize() { // Onclick function for Room Type form. Toggles the disabled attribute for Bed Size 
    var bedSizes = document.getElementsByName("bedsize");
    var bedroom = document.getElementById("bedroomType").checked;
    var childrensRoom = document.getElementById("childrensroomType").checked;

    for (var i = 0; i < bedSizes.length; i++) {
        bedSizes[i].disabled = false;
    }

    if (childrensRoom) { // checks if the childrensRoom radio being checked is true
        document.getElementById("queenSize").disabled = true;
        document.getElementById("kingSize").disabled = true;
    }

    if (!bedroom && !childrensRoom) { // if neither bedroom or children are selected, all radio inputs are disabled
        for (var i = 0; i < bedSizes.length; i++) {
            bedSizes[i].disabled = true;
        }
    }
}

function toggleShipping() { // Onclick function for Shipping. Toggles the disabled attribute for the delivery address, date and time inputs
    var delivery = document.getElementById("delivery").checked;
    var thirdParty = document.getElementById("thirdParty").checked;
    var address = document.getElementById("deliveryAddress");
    var date = document.getElementById("deliveryDate");
    var time = document.getElementById("deliveryTime");

    if (thirdParty) {
        address.disabled = true;
        date.disabled = true;
        time.disabled = true;
    } else if (delivery) {
        address.disabled = false;
        date.disabled = false;
        time.disabled = false;
    }
}

function userReceipt() { // An all-in-one function for the computation of the user's total sum and for the alert pop-up window
    // Customer Information
    var uname = document.getElementById("name").value;
    var mobile = document.getElementById("mobile").value;
    var email = document.getElementById("email").value;
    
    // ITEA Details
    var occupants = document.getElementById("numberofocc").value;

    var roomTypeList = document.getElementsByName("roomtype"); 
    var roomTypeFORPRINT = "";
    for (var i = 0; i < roomTypeList.length; i++) {
        if (roomTypeList[i].checked) {
            roomTypeFORPRINT = roomTypeList[i].title;
        }
    }

    var bedSizes = document.getElementsByName("bedsize");
    var bed_size = 0;
    var bed_sizeFORPRINT = "";
    var bedroom = document.getElementById("bedroomType").checked;
    var childrensRoom = document.getElementById("childrensroomType").checked;
    var bedSizeCounter = 0
    if (!bedroom && !childrensRoom) { // Checks if there's an option for the bed size in the first place, considering that there are two room types that can disable the bed size selection.
        bed_size = 0;
        bed_sizeFORPRINT = "N/A";
    } else {
    for (var i = 0; i < bedSizes.length; i++) { // Checks if there is a radio button toggled via a for-loop scrolling thru the bedSizes list. This algorithmm works for all the other ITEA details, which means all of this could've been one function :'D
        if (bedSizes[i].checked) {
            bed_size = parseFloat(bedSizes[i].value);
            bed_sizeFORPRINT = bedSizes[i].title;
            bedSizeCounter++;
            break;
        }
    }
    if (bedSizeCounter === 0) { bed_sizeFORPRINT = "N/A" }
    }

    var cabinets = document.getElementsByName("cabinets");
    var cabinet_type = 0;
    var cabinet_typeFORPRINT = "";
    var cabinetCounter = 0
    for (var i = 0; i < cabinets.length; i++) {
        if (cabinets[i].checked) {
            cabinet_type += parseFloat(cabinets[i].value);
            cabinet_typeFORPRINT = cabinets[i].title;
            cabinetCounter++
            break;
        }
    }
    if (cabinetCounter === 0) {cabinet_typeFORPRINT = "N/A"}

    var tableList = document.getElementsByName("tables");
    var tables = 0;
    var tableCounter = 0;
    var tablesFORPRINT = "";
    for (var i = 0; i < tableList.length; i++) {
        if (tableList[i].checked) {
            tables += parseFloat(tableList[i].value);
            tablesFORPRINT += "| " + tableList[i].title + " "
            tableCounter++;
        }
    }
    if (tableCounter === 0) {tablesFORPRINT = "N/A"} else {tablesFORPRINT += "|"}
    if (tableCounter == 2) {tables *= 0.9}
    else if (tableCounter == 3) {tables *= 0.85}
    else if (tableCounter == 4) {tables *= 0.75}

    var decorList = document.getElementsByName("decor")
    var decorative_additions = 0
    var decorsFORPRINT = ""
    var decorCounter = 0
    for (var i = 0; i < decorList.length; i++) {
        if (decorList[i].checked) {
            decorative_additions += parseFloat(decorList[i].value);
            decorsFORPRINT += "| " + decorList[i].title + " ";
            decorCounter++;
        }
    }
    if (decorCounter === 0) {decorsFORPRINT = "N/A"} else {decorsFORPRINT += "|"}
    

    var roomSizeSelect = document.getElementById("roomSize");
    var room_size = parseFloat(roomSizeSelect.options[roomSizeSelect.selectedIndex].value);
    var room_sizeFORPRINT = roomSizeSelect.options[roomSizeSelect.selectedIndex].text;

    var deliveryCost = 0;
    if (document.getElementById("delivery").checked) {
        deliveryCost = parseFloat(1000);
        deliveryFORPRINT = "With delivery, adding P1000\n"
    } else if (document.getElementById("thirdParty").checked) {
        deliveryCost = parseFloat(0);
        deliveryFORPRINT = ""
    }

    var room_setup = ((bed_size + cabinet_type + tables + decorative_additions) * room_size) + deliveryCost;

        alert(
        "[ Customer Information ]\n" +
        "Name: " + uname + "\n" +
        "Mobile: " + mobile + "\n" +
        "Email: " + email + "\n" +
        "\n" +
        "[ ITEA Room Setup Details ]\n" +
        "Number of occupants: " + occupants + "\n" +
        "Room type: " + roomTypeFORPRINT + "\n" +
        "Bed size: " + bed_sizeFORPRINT + "\n" +
        "Cabinet: " + cabinet_typeFORPRINT + "\n" +
        "Tables: " + tablesFORPRINT + "\n\n" +

        "Decor: " + decorsFORPRINT + "\n" +
        "Room Size: " + room_sizeFORPRINT + "\n\n" +
        
        deliveryFORPRINT +
        "Total cost of the room setup: P" + room_setup
        );
}

function correctDate() { // Onchange function for Deilvery Date. Uses the Date() object
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    var deliveryDateInput = document.getElementById("deliveryDate").value;
    var deliveryDate = new Date(deliveryDateInput);
    deliveryDate.setHours(0, 0, 0, 0); // Ignores time so that the user can input the same date as the current date.

    if (deliveryDate < currentDate) {
        document.getElementById("deliveryDateMSG").innerText = "Provide a future date.";
    } else {
        document.getElementById("deliveryDateMSG").innerText = "";
    }
}

function correctTime() { // Onchange function for Delivery Time.
    var timeInput = document.getElementById("deliveryTime").value;
    var timeMessage = document.getElementById("deliveryTimeMSG");

    if (timeInput) {
        var time = timeInput.split(":"); // the input type "time" returns a value in HH:MM format. You can split this so that you can obtain both the hour and minute value individually.
        var hours = parseInt(time[0], 10);
        var minutes = parseInt(time[1], 10);
        if (hours < 9 || hours > 18 || (hours === 18 && minutes > 0)) {timeMessage.innerText = "Select a time between 9AM to 6PM.";} 
            else {timeMessage.innerText = "";}
    } else {
        timeMessage.innerText = "";
    }
}

document.getElementById("form").addEventListener("submit", function(event) {event.preventDefault()})

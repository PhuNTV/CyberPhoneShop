function Validation() {

    this.checkEmpty = function(valueInput, spanID, message) {
        if (valueInput == "") {
            document.getElementById(spanID).style.display = "block";
            document.getElementById(spanID).innerHTML = message;
            return false
        }

        document.getElementById(spanID).style.display = "none";
        document.getElementById(spanID).innerHTML = "";
        return true
    }


    this.checkPrice = function(valueInput, spanID, message) {

        if (valueInput >= 1000000 && valueInput <= 50000000) {
            document.getElementById(spanID).style.display = "none";
            document.getElementById(spanID).innerHTML = "";
            return true
        }

        document.getElementById(spanID).style.display = "block";
        document.getElementById(spanID).innerHTML = message;
        return false
    }

    this.checkSelect = function(selectPosition, spanAcc, message) {
        var indexOption = document.getElementById(selectPosition).selectedIndex;

        if (indexOption !== 0) {
            document.getElementById(spanAcc).style.display = "none";
            document.getElementById(spanAcc).innerHTML = "";
            return true
        }

        document.getElementById(spanAcc).style.display = "block";
        document.getElementById(spanAcc).innerHTML = message;
        return false
    }
}
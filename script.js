const dataset = {
    opp: {
      1: 19670.16, 2: 16391.80, 3: 13659.83, 4: 11383.19, 5: 9486.00, 6: 7905.00,
      7: 6587.50, 8: 5489.58, 9: 4574.65, 10: 3812.21, 11: 3176.84, 12: 2647.37,
      13: 2206.14, 14: 1838.45, 15: 1532.04, 16: 1276.70, 17: 1063.92, 18: 886.60,
      19: 738.83, 20: 615.69, 21: 513.08, 22: 427.56, 23: 356.30, 24: 296.92, 25: 247.43,
      26: 206.19, 27: 171.83, 28: 143.19, 29: 119.33, 30: 99.44, 31: 82.86, 32: 69.05,
      33: 57.55, 34: 47.95, 35: 39.96, 36: 33.30, 37: 27.75, 38: 23.13, 39: 19.27,
      40: 16.06, 41: 13.38, 42: 11.15, 43: 9.29, 44: 7.74, 45: 6.45, 46: 5.38, 47: 4.48,
      48: 3.73, 49: 3.11,
    },
  };


function convertToInt() {
    console.log("Function called!");
    
    const puntersInput = document.getElementById("puntersBox");
    const receiversInput = document.getElementById("receiversBox");
    const distanceInput = document.getElementById("distanceBox");
    const locationInput = document.getElementById("locationBox");
    const quarterInput = document.getElementById("quarterBox");
    const timeBoxInput = document.getElementById("timeBox");

    const puntersInputValue = parseFloat(puntersInput.value);
    const receiversInputValue = parseFloat(receiversInput.value);
    const distanceInputValue = parseFloat(distanceInput.value);
    const locationInputValue = parseFloat(locationInput.value);
    const quarterInputValue = parseFloat(quarterInput.value);

    let errorMessage = "";

    if (isNaN(puntersInputValue)) {
        errorMessage += "Invalid input for Punters. Please enter a valid number.\n";
    }

    if (isNaN(receiversInputValue)) {
        errorMessage += "Invalid input for Receivers. Please enter a valid number.\n";
    }

    if (isNaN(distanceInputValue)) {
        errorMessage += "Invalid input for Distance. Please enter a valid number.\n";
    }

    if (isNaN(locationInputValue)) {
        errorMessage += "Invalid input for Location. Please enter a valid number.\n";
    }

    if (isNaN(quarterInputValue)) {
        errorMessage += "Invalid input for Quarter. Please enter a valid number.\n";
    }

    const resultElement = document.getElementById("result");

    if (errorMessage) {
        resultElement.textContent = errorMessage;
    } else {
        const timeBoxInputValue = convertTime(timeBoxInput.value);
        const fieldPosValue = loca();
        const marginFormula = receiversInputValue - puntersInputValue;
        const quarterResult = quarter(quarterInputValue, timeBoxInputValue);
        const margin = calculateMargin(marginFormula);
        const distanceToFD = calculateDistanceToFD(distanceInputValue);
        const finalResult = fieldPosValue * distanceToFD * margin * (((quarterResult * 0.001) ** 3) +1);

        console.log("fieldPosValue Target: 3.11")
        console.log("The Factors :")
        console.log("field pos value " + fieldPosValue);
        console.log("first down distance " + distanceToFD);
        console.log("margin " + margin);
        console.log("time remaning " + ((quarterResult * 0.001) ** 3) +1)
        console.log("loca function " + loca())
        const roundedResult = finalResult.toFixed(2);

        document.getElementById("finalResult").textContent = "Surrender Index Score: " + roundedResult;
    }


function fieldPos(locationInputValue) {
    const own = document.getElementById("Own");
    const opp = document.getElementById("Opp");
    
    if (own.checked === true && locationInputValue < 40) {
        return 1;
    } else if (own.checked === true && locationInputValue > 40) {
        return 1.1 ** (locationInputValue - 40);
    } else if (opp.checked === true) {
        return 1.2 ** (locationInputValue - 50);
    } else {
        return 0;
    }
        
    
}

function convertTime(timeBoxValue) {
    const [first, second] = timeBoxValue.split(":");
    if (second) {
        return parseFloat(first) * 60 + parseFloat(second);
    }
    return parseFloat(first);
}

function quarter(quarterInputValue, timeBoxInputValue) {
    if (quarterInputValue === 3) {
        return (900 - timeBoxInputValue);
    } else if (quarterInputValue === 4) {
        return (900 + (900 - timeBoxInputValue));
    } else if (quarterInputValue === 5) {
        return (1800 + (900 - timeBoxInputValue));
    } else {
        return 0;
    }
}


function calculateMargin(margin) {
    if (margin === 0) {
        return 2;
    } else if (margin > 0 && margin <= 8) {
        return 4;
    } else if (margin > 8) {
        return 3;
    } else (margin < 0) 
        return 1;
    
}


function calculateDistanceToFD(distance) {
    if (distance === 1) {
        return 1;
    } else if (distance === 2 || distance === 3) {
        return 0.8;
    } else if (distance >= 4 && distance <= 6) {
        return 0.6;
    } else if (distance >= 7 && distance <= 9) {
        return 0.4;
    } else {
        return 0.2;
    }
}

function loca() {
    const locaBox = locationInputValue;
    const own = document.getElementById("Own");
    const opp = document.getElementById("Opp");

    if (own.checked) {
        if (locationInputValue < 40) {
            return 1;
        } else {
            return 1.1 ** (locationInputValue - 40);
        }
    } else if (opp.checked) {
        if (locationInputValue >= 1 && locationInputValue <= 49) {
            // Check if locationInputValue is within the range of your dataset
            return dataset.opp[locationInputValue] 
        }
    }
 }
}  
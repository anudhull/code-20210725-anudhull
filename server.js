const http = require('http');

let data = [
    {"Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, 
    { "Gender": "Male", "HeightCm": 161, "WeightKg": 85 }, 
    { "Gender": "Male", "HeightCm": 180, "WeightKg": 77 }, 
    { "Gender": "Female", "HeightCm": 166, "WeightKg": 62}, 
    {"Gender": "Female", "HeightCm": 150, "WeightKg": 70}, 
    {"Gender": "Female",  "HeightCm": 167, "WeightKg": 82}
];
let flag = false;

module.exports.calculateBMI = (weightInKg, heightInM) => {
    if (weightInKg === undefined || weightInKg === null) {
        return "Value of weight not provided";
    } else if (heightInM === undefined || heightInM === null) {
        return "Value of height not provided";
    } else if (typeof weightInKg != 'number' || weightInKg <= 0) {
        return "Invalid weight provided";
    } else if (typeof heightInM != 'number' || heightInM <= 0) {
        return "Invalid height provided";
    } 
    const bmi = Number((weightInKg / (heightInM) ** 2).toFixed(2));
    return bmi;
}

module.exports.calculateBMICategoryAndHealthRisk = (bmi) => {
    const temp = {};
    if (bmi === undefined || bmi === null) {
        return "Bmi not provided";
    } else if (bmi <= 0) {
        return "Invalid bmi provided";
    } else {
        if (bmi <= 18.4) {
            temp.category = "Underweight";
            temp.helathRisk = "Malnutrition risk";
            return temp;
        }

        else if (bmi >= 18.5 && bmi <= 24.9) {
            temp.category = "Normal weight";
            temp.helathRisk = "Low risk";
            return temp;
        }

        else if (bmi >= 25 && bmi <= 29.9) {
            temp.category = "Overweight";
            temp.helathRisk = "Enhanced risk";
            return temp;
        }

        else if (bmi >= 30 && bmi <= 34.9) {
            temp.category = "Moderately obese";
            temp.helathRisk = "Medium risk";
            return temp;
        }

        else if (bmi >= 35 && bmi <= 39.9) {
            temp.category = "Severely obese";
            temp.helathRisk = "High risk";
            return temp;
        }

        else if (bmi >= 40){
            temp.category = "Very severely obese";
            temp.helathRisk = "Very high risk";
            return temp;
        }
    }
}

module.exports.calculateAll = (data) => {
    try {
        data.forEach((person) => {
            const WeightInKg = person["WeightKg"];
            const heightInCM = person["HeightCm"];
            const heightInM = heightInCM / 100;
            const bmi = this.calculateBMI(WeightInKg, heightInM);

            if (typeof bmi != 'number') {
                console.log('Coud not calculate bmi');
                console.log('Reason :- ', bmi);
                flag = true;
            } else {
                person["Bmi"] = bmi;

                const categoryAndHealthRisk = this.calculateBMICategoryAndHealthRisk(bmi);

                if (typeof categoryAndHealthRisk != 'object') {
                    console.log('Coud not calculate bmi category and health risk');
                    console.log('Reason :- ', categoryAndHealthRisk);
                    flag = true;
                } 

                if (categoryAndHealthRisk && Object.keys(categoryAndHealthRisk).length > 0) {
                    person["BmiCategory"] = categoryAndHealthRisk.category;
                    person["HealthRisk"] = categoryAndHealthRisk.helathRisk;
                }
            }
        });
    } catch (exception) {
        console.log('Error occured : ', exception);
    };
}

module.exports.countNoOfOverweightPeople = (data) => {
    if (!data) {
        return "Data not provided";
    }
    const overweight = data.filter((person) => person["BmiCategory"] === "Overweight").length;
    return overweight;
}

onRequest = (request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write('Vamstar Technical Assessment');

    this.calculateAll(data);

    if (flag === true) {
        response.write('\n\nError occured !!!!!\nYou can check logs for more info.');    
    } else {
        response.write('\n\nUpdated data :- '+ JSON.stringify(data));

        const overweightPeople = this.countNoOfOverweightPeople(data);
        
        if (overweightPeople && typeof overweightPeople === 'number') {
            response.write('\n\nNumber of overweight people in the given data :- '+ overweightPeople);
        } else {
            response.write('\n\nFailed to find number of overweight people as data is not provided, data : '+ data);
        }
    }

    response.end();
}

http.createServer(onRequest).listen(8000);
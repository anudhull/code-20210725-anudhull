import chai, { expect } from 'chai';
import {
    calculateBMI,
    calculateBMICategoryAndHealthRisk,
    countNoOfOverweightPeople
} from '../server';

let peopleData = [
    {"Gender":"Male","HeightCm":171,"WeightKg":96,"Bmi":32.83,"BmiCategory":"Moderately obese","HealthRisk":"Medium risk"},
    {"Gender":"Male","HeightCm":161,"WeightKg":85,"Bmi":32.79,"BmiCategory":"Moderately obese","HealthRisk":"Medium risk"},
    {"Gender":"Male","HeightCm":180,"WeightKg":77,"Bmi":23.77,"BmiCategory":"Normal weight","HealthRisk":"Low risk"},
    {"Gender":"Female","HeightCm":166,"WeightKg":62,"Bmi":22.5,"BmiCategory":"Normal weight","HealthRisk":"Low risk"}
    ,{"Gender":"Female","HeightCm":150,"WeightKg":70,"Bmi":31.11,"BmiCategory":"Moderately obese","HealthRisk":"Medium risk"},
    {"Gender":"Female","HeightCm":167,"WeightKg":82,"Bmi":29.4,"BmiCategory":"Overweight","HealthRisk":"Enhanced risk"}
];

describe('Tests for calculateBMI() function', function() {
    it('Not providing weight should show error', function() {
        const data = calculateBMI(undefined, 1.75);
        expect(data).to.equal('Value of weight not provided');
    });

    it('Not providing height should show error', function() {
        const data = calculateBMI(65, null);
        expect(data).to.equal('Value of height not provided');
    });

    it('Providing zero weight should show error', function() {
        const data = calculateBMI(0, 1.75);
        expect(data).to.equal('Invalid weight provided');
    });

    it('Providing zero height should show error', function() {
        const data = calculateBMI(65, 0);
        expect(data).to.equal('Invalid height provided');
    });

    it('Providing negative weight should show error', function() {
        const data = calculateBMI(-78, 1.75);
        expect(data).to.equal('Invalid weight provided');
    });

    it('Providing negative height should show error', function() {
        const data = calculateBMI(65, -1.65);
        expect(data).to.equal('Invalid height provided');
    });

    it('Providing non-numeric weight should show error', function() {
        const data = calculateBMI('abc', 1.75);
        expect(data).to.equal('Invalid weight provided');
    });

    it('Providing non-numeric height should show error', function() {
        const data = calculateBMI(65, false);
        expect(data).to.equal('Invalid height provided');
    });

    it('Providing correct value of height and weight should return correctly calculated bmi', function() {
        const data = calculateBMI(75, 1.75);
        expect(data).to.equal(24.49);
    });
});

describe('Tests for calculateBMICategoryAndHealthRisk() function', function() {
    it('Not providing bmi should show error', function() {
        const data = calculateBMICategoryAndHealthRisk(undefined);
        expect(data).to.equal('Bmi not provided');
    });

    it('Providing zero bmi should show error', function() {
        const data = calculateBMICategoryAndHealthRisk(0, 1.75);
        expect(data).to.equal('Invalid bmi provided');
    });

    it('Providing negative bmi should show error', function() {
        const data = calculateBMICategoryAndHealthRisk(-78, 1.75);
        expect(data).to.equal('Invalid bmi provided');
    });

    it('Providing bmi<=18.4 should return category as Underweight and health risk as Malnutrition risk', function() {
        const data = calculateBMICategoryAndHealthRisk(16);
        expect(data).to.be.a('object');
        expect(Object.keys(data).length).to.equal(2);
        expect(data.category).to.equal('Underweight');
        expect(data.helathRisk).to.equal('Malnutrition risk');
    });

    it('Providing 18.5<=bmi<=24.9 should return category as Normal weight and health risk as Low risk', function() {
        const data = calculateBMICategoryAndHealthRisk(20);
        expect(data).to.be.a('object');
        expect(Object.keys(data).length).to.equal(2);
        expect(data.category).to.equal('Normal weight');
        expect(data.helathRisk).to.equal('Low risk');
    });

    it('Providing 25<=bmi<=29.9 should return category as Overweight and health risk as Enhanced risk', function() {
        const data = calculateBMICategoryAndHealthRisk(27);
        expect(data).to.be.a('object');
        expect(Object.keys(data).length).to.equal(2);
        expect(data.category).to.equal('Overweight');
        expect(data.helathRisk).to.equal('Enhanced risk');
    });

    it('Providing 30<=bmi<=34.9 should return category as Moderately obese and health risk as Medium risk', function() {
        const data = calculateBMICategoryAndHealthRisk(31);
        expect(data).to.be.a('object');
        expect(Object.keys(data).length).to.equal(2);
        expect(data.category).to.equal('Moderately obese');
        expect(data.helathRisk).to.equal('Medium risk');
    });
    it('Providing 35<=bmi<=39.9 should return category as Severely obese and health risk as High risk', function() {
        const data = calculateBMICategoryAndHealthRisk(37.3);
        expect(data).to.be.a('object');
        expect(Object.keys(data).length).to.equal(2);
        expect(data.category).to.equal('Severely obese');
        expect(data.helathRisk).to.equal('High risk');
    });

    it('Providing bmi>=40 should return category as Very severely obese and health risk as Very high risk', function() {
        const data = calculateBMICategoryAndHealthRisk(45);
        expect(data).to.be.a('object');
        expect(Object.keys(data).length).to.equal(2);
        expect(data.category).to.equal('Very severely obese');
        expect(data.helathRisk).to.equal('Very high risk');
    });
});

describe('Tests for countNoOfOverweightPeople() function', function() {
    it('Not providing data should show error', function() {
        const data = countNoOfOverweightPeople(undefined);
        expect(data).to.equal('Data not provided');
    });

    it('Providing correct data should return the number of obese people in the data', function() {
        const data = countNoOfOverweightPeople(peopleData);
        expect(data).to.be.a('number');
        expect(data).to.equal(1);
    });
});
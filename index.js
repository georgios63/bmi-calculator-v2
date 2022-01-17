function calculateBMI(weight, height) {
  return weight / (height * height);
}

function calculateBMR(weight, height, ageOfUser, genderOfUser) {
  const heightInCm = height * 100;

  return genderOfUser === "m"
    ? 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50
    : 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150;
}

function calculateIdealWeight(height) {
  return 22.5 * (height * height);
}

function calculateDailyCalories(BMR, dailyExercise) {
  return dailyExercise === "yes" ? BMR * 1.6 : BMR * 1.4;
}

function calculateWeightToLose(weight, idealWeight) {
  return weight - idealWeight;
}

function calculateDietWeeks(weightToLose) {
  return Math.abs(weightToLose / 0.5);
}

function calculateDietCalories(weightToLose, dailyCalories) {
  return weightToLose < 0 ? dailyCalories + 500 : dailyCalories - 500;
}

function validateNumberOfInputs(argv) {
  if (argv.length !== 7) {
    console.log(`
      You gave ${argv.length - 2} argument(s) to the program
  
      Please provide 5 arguments for
      
      weight (kg), 
      height (m), 
      age (years), 
      wether you exercise daily (yes or no)
      and your gender (m or f)
      
      Example:
  
      $ node index.js 82 1.79 32 yes m
    `);

    process.exit();
  }
}

function validateWeightHeightAndAge(weight, height, ageOfUser, argv) {
  if (isNaN(weight) || isNaN(height) || isNaN(ageOfUser)) {
    console.log(`
      Please make sure weight, height and age are numbers:

      weight (kg) example: 82 | your input: ${argv[2]}
      height (m) example 1.79 | your input: ${argv[3]}
      age (years) example 32  | your input: ${argv[4]} 

      $ node index.js 82 1.79 32 yes m
    `);

    process.exit();
  }

  if (ageOfUser < 20) {
    console.log(`
      This BMI calculator was designed to be used by people older than 20
      Please provide an age of that range.
    `);

    process.exit();
  }

  if (weight < 30 || weight > 300) {
    console.log(`
      Please enter a weight in kgs that is higher than 30 and less than 300 kg.
    `);

    process.exit();
  }
}

function validateDailyExercise(doesUserExercise) {
  if (doesUserExercise !== "yes" && doesUserExercise !== "no") {
    console.log(`
      Please specify wether you exercise daily with yes or no
      $ node index.js 82 1.79 32 yes m
  `);

    process.exit();
  }
}

function validateGender(genderOfUser) {
  if (genderOfUser !== "m" && genderOfUser !== "f") {
    console.log(`
      Please specify wether you are a male "m" or female "f"
      $ node index.js 82 1.79 32 yes m
    `);

    process.exit();
  }
}

function formatOutput(userObject) {
  return `
      **************
      BMI CALCULATOR
      **************
  
      age: ${userObject.age} years
      gender: ${userObject.gender}
      height: ${userObject.heightInM} m
      weight: ${userObject.weightInKg} kg
      do you exercise daily? ${userObject.dailyExercise}
  
      ****************
      FACING THE FACTS
      ****************
  
      Your BMI is ${userObject.BMI}
  
      A BMI under 18.5 is considered underweight
      A BMI above 25 is considered overweight
  
      Your ideal weight is ${userObject.weightInKg} kg
      With a normal lifestyle you burn ${userObject.dailyCalories} calories a day
  
      **********
      DIET PLAN
      **********
  
      If you want to reach your ideal weight of ${Math.round(userObject.idealWeightKg)} kg:
  
      Eat ${userObject.dietCalories} calories a day
      For ${Math.round(userObject.dietWeeks)} weeks
      `;
}

function bmiCalculator() {
  validateNumberOfInputs(process.argv);

  const weightInKg = parseInt(process.argv[2]);
  const heightInM = parseFloat(process.argv[3]);
  const age = parseInt(process.argv[4]);
  const dailyExercise = process.argv[5];
  const gender = process.argv[6];

  validateWeightHeightAndAge(weightInKg, heightInM, age, process.argv);
  validateDailyExercise(dailyExercise);
  validateGender(gender);

  const BMI = calculateBMI(weightInKg, heightInM);
  const BMR = calculateBMR(weightInKg, heightInM, age, gender);
  const idealWeight = calculateIdealWeight(heightInM);
  const dailyCalories = calculateDailyCalories(BMR, dailyExercise);
  const weightToLose = calculateWeightToLose(weightInKg, idealWeight);
  const dietWeeks = calculateDietWeeks(weightToLose);
  const dietCalories = calculateDietCalories(weightToLose, dailyCalories);


  const user = {
    weightInKg: weightInKg,
    heightInM: heightInM,
    age: age,
    dailyExercise: dailyExercise,
    gender: gender,
    BMI: BMI,
    idealWeightKg: idealWeight,
    dailyCalories: dailyCalories,
    weightToLoseKg: weightToLose,
    dietWeeks: dietWeeks,
    dietCalories: dietCalories,
  };

  const output = formatOutput(user);
  console.log(output);
}

bmiCalculator();

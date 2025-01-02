import React, { useState, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Calculator = () => {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [activityLevel, setActivityLevel] = useState<string>("light");
  const [goalWeight, setGoalWeight] = useState<string>("");
  const [goalBodyFatPercentage, setGoalBodyFatPercentage] =
    useState<string>("");
  const [dailyCalorieLimit, setDailyCalorieLimit] = useState<string>("1500");
  const [bmi, setBMI] = useState<string | null>(null);
  const [bodyFat, setBodyFat] = useState<string | null>(null);
  const [goalBMI, setGoalBMI] = useState<string | null>(null);
  const [goalBodyFat, setGoalBodyFat] = useState<string | null>(null);
  const [isMetric, setIsMetric] = useState<boolean>(false);
  const [isBodyFatGoal, setIsBodyFatGoal] = useState<boolean>(false);
  const [feet, setFeet] = useState<string>("");
  const [inches, setInches] = useState<string>("");
  const [tdee, setTDEE] = useState<string | null>(null);
  const [timeToGoal, setTimeToGoal] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateBMI = (weightKg: number, heightM: number): number => {
    return weightKg / (heightM * heightM);
  };

  const calculateBodyFat = (
    bmi: number,
    age: number,
    sexFactor: number
  ): number => {
    return 1.39 * bmi + 0.16 * age - 10.34 * sexFactor - 9;
  };

  const calculateWeightFromBodyFat = (
    heightM: number,
    bodyFatPercentage: number,
    age: number,
    sexFactor: number
  ): number => {
    const bodyFatDecimal = bodyFatPercentage / 100;
    const bmi =
      (bodyFatDecimal * 100 + 9 + 10.34 * sexFactor - 0.16 * age) / 1.39;
    return bmi * (heightM * heightM);
  };

  const calculateBMR = (
    weightKg: number,
    heightCm: number,
    age: number,
    sex: string
  ): number => {
    if (sex === "male") {
      return 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
    } else {
      return 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
    }
  };

  const calculateTDEE = (bmr: number): number => {
    const activityFactors: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };
    return bmr * activityFactors[activityLevel];
  };

  const calculateProjections = () => {
    let heightM, currentWeightKg, goalWeightKg;

    if (isMetric) {
      heightM = parseFloat(height) / 100;
      currentWeightKg = parseFloat(weight);
    } else {
      heightM = ((parseInt(feet) * 12 + parseInt(inches)) * 2.54) / 100;
      currentWeightKg = parseFloat(weight) / 2.205;
    }

    const heightCm = heightM * 100;
    const sexFactor = sex === "male" ? 1 : 0;

    // Current BMI and Body Fat
    const currentBMI = calculateBMI(currentWeightKg, heightM);
    setBMI(currentBMI.toFixed(1));
    const currentBodyFat = calculateBodyFat(
      currentBMI,
      parseFloat(age),
      sexFactor
    );
    setBodyFat(currentBodyFat.toFixed(1));

    // Goal calculations
    if (isBodyFatGoal) {
      const bodyFatDecimal = parseFloat(goalBodyFatPercentage);
      goalWeightKg = calculateWeightFromBodyFat(
        heightM,
        bodyFatDecimal,
        parseFloat(age),
        sexFactor
      );
      setGoalWeight(
        isMetric ? goalWeightKg.toFixed(1) : (goalWeightKg * 2.205).toFixed(1)
      );
      setGoalBodyFat(goalBodyFatPercentage);
    } else {
      goalWeightKg = isMetric
        ? parseFloat(goalWeight)
        : parseFloat(goalWeight) / 2.205;
      const calculatedGoalBodyFat = calculateBodyFat(
        calculateBMI(goalWeightKg, heightM),
        parseFloat(age),
        sexFactor
      );
      setGoalBodyFat(calculatedGoalBodyFat.toFixed(1));
    }

    // Calculate and set goal BMI
    const calculatedGoalBMI = calculateBMI(goalWeightKg, heightM);
    setGoalBMI(calculatedGoalBMI.toFixed(1));

    // TDEE and time to goal calculations
    const bmr = calculateBMR(currentWeightKg, heightCm, parseFloat(age), sex);
    const calculatedTDEE = calculateTDEE(bmr);
    setTDEE(calculatedTDEE.toFixed(0));

    const weightToLoseKg = currentWeightKg - goalWeightKg;
    const dailyDeficit = calculatedTDEE - parseFloat(dailyCalorieLimit);
    const daysToGoal = Math.abs((weightToLoseKg * 7700) / dailyDeficit); // 7700 calories ≈ 1 kg of fat

    setTimeToGoal(daysToGoal.toFixed(0));
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;
    calculateProjections();
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void,
    field: string
  ) => {
    const value = e.target.value;
    setter(value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateNumber = (
    value: string,
    fieldName: string,
    min: number,
    max: number
  ): string | null => {
    const num = parseFloat(value);
    if (!value) return `${fieldName} is required`;
    if (isNaN(num)) return `${fieldName} must be a number`;
    if (num < min) return `${fieldName} must be at least ${min}`;
    if (num > max) return `${fieldName} must be less than ${max}`;
    return null;
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (isMetric) {
      const heightError = validateNumber(height, "Height", 100, 250);
      if (heightError) newErrors.height = heightError;
    } else {
      const feetError = validateNumber(feet, "Feet", 3, 8);
      if (feetError) newErrors.feet = feetError;
      const inchesError = validateNumber(inches, "Inches", 0, 11);
      if (inchesError) newErrors.inches = inchesError;
    }

    const weightError = validateNumber(
      weight,
      "Weight",
      isMetric ? 30 : 66,
      isMetric ? 300 : 660
    );
    if (weightError) newErrors.weight = weightError;

    const ageError = validateNumber(age, "Age", 18, 100);
    if (ageError) newErrors.age = ageError;

    if (isBodyFatGoal) {
      const bfError = validateNumber(
        goalBodyFatPercentage,
        "Goal body fat",
        5,
        50
      );
      if (bfError) newErrors.goalBodyFat = bfError;
    } else {
      const goalWeightError = validateNumber(
        goalWeight,
        "Goal weight",
        isMetric ? 30 : 66,
        isMetric ? 300 : 660
      );
      if (goalWeightError) newErrors.goalWeight = goalWeightError;
    }

    const calorieError = validateNumber(
      dailyCalorieLimit,
      "Daily calorie limit",
      1200,
      5000
    );
    if (calorieError) newErrors.dailyCalorieLimit = calorieError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Precision Health Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertDescription>
            This calculator has been calibrated for a specific body type (male,
            44 years old, 5&apos;10&quot;, 178.8 lbs) and may not be as accurate
            for significantly different body types.
          </AlertDescription>
        </Alert>
        <div className="grid w-full items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="unit-toggle"
              checked={isMetric}
              onCheckedChange={setIsMetric}
            />
            <Label htmlFor="unit-toggle">
              {isMetric ? "Metric (cm, kg)" : "Imperial (ft/in, lbs)"}
            </Label>
          </div>

          {isMetric ? (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                value={height}
                onChange={(e) => handleInputChange(e, setHeight, "height")}
                className={errors.height ? "border-red-500" : ""}
              />
              {errors.height && (
                <span className="text-sm text-red-500">{errors.height}</span>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="feet">Feet</Label>
                <Input
                  id="feet"
                  value={feet}
                  onChange={(e) => handleInputChange(e, setFeet, "feet")}
                  className={errors.feet ? "border-red-500" : ""}
                />
                {errors.feet && (
                  <span className="text-sm text-red-500">{errors.feet}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="inches">Inches</Label>
                <Input
                  id="inches"
                  value={inches}
                  onChange={(e) => handleInputChange(e, setInches, "inches")}
                  className={errors.inches ? "border-red-500" : ""}
                />
                {errors.inches && (
                  <span className="text-sm text-red-500">{errors.inches}</span>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="weight">
              Current {isMetric ? "Weight (kg)" : "Weight (lbs)"}
            </Label>
            <Input
              id="weight"
              value={weight}
              onChange={(e) => handleInputChange(e, setWeight, "weight")}
              className={errors.weight ? "border-red-500" : ""}
            />
            {errors.weight && (
              <span className="text-sm text-red-500">{errors.weight}</span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="goal-toggle"
              checked={isBodyFatGoal}
              onCheckedChange={setIsBodyFatGoal}
            />
            <Label htmlFor="goal-toggle">
              {isBodyFatGoal ? "Body Fat % Goal" : "Weight Goal"}
            </Label>
          </div>

          {isBodyFatGoal ? (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="goalBodyFat">Goal Body Fat %</Label>
              <Input
                id="goalBodyFat"
                value={goalBodyFatPercentage}
                onChange={(e) =>
                  handleInputChange(e, setGoalBodyFatPercentage, "goalBodyFat")
                }
                className={errors.goalBodyFat ? "border-red-500" : ""}
              />
              {errors.goalBodyFat && (
                <span className="text-sm text-red-500">
                  {errors.goalBodyFat}
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="goalWeight">
                Goal {isMetric ? "Weight (kg)" : "Weight (lbs)"}
              </Label>
              <Input
                id="goalWeight"
                value={goalWeight}
                onChange={(e) =>
                  handleInputChange(e, setGoalWeight, "goalWeight")
                }
                className={errors.goalWeight ? "border-red-500" : ""}
              />
              {errors.goalWeight && (
                <span className="text-sm text-red-500">
                  {errors.goalWeight}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              value={age}
              onChange={(e) => handleInputChange(e, setAge, "age")}
              className={errors.age ? "border-red-500" : ""}
            />
            {errors.age && (
              <span className="text-sm text-red-500">{errors.age}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>Sex</Label>
            <RadioGroup
              defaultValue="male"
              onValueChange={(value: "male" | "female") => setSex(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="activity-level">Activity Level</Label>
            <Select onValueChange={setActivityLevel} defaultValue="sedentary">
              <SelectTrigger>
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="light">Lightly Active</SelectItem>
                <SelectItem value="moderate">Moderately Active</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="veryActive">Very Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="calorie-limit">Daily Calorie Limit</Label>
            <Input
              id="calorie-limit"
              value={dailyCalorieLimit}
              onChange={(e) =>
                handleInputChange(e, setDailyCalorieLimit, "dailyCalorieLimit")
              }
              className={errors.dailyCalorieLimit ? "border-red-500" : ""}
            />
            {errors.dailyCalorieLimit && (
              <span className="text-sm text-red-500">
                {errors.dailyCalorieLimit}
              </span>
            )}
          </div>

          <Button onClick={handleCalculate}>Calculate</Button>

          {bmi && bodyFat && goalBodyFat && tdee && timeToGoal && (
            <div className="mt-4">
              <h3 className="font-bold">Current Metrics:</h3>
              <p>BMI: {bmi}</p>
              <p>Estimated Body Fat: {bodyFat}%</p>
              <h3 className="font-bold mt-2">Goal Metrics:</h3>
              <p>
                Weight: {goalWeight} {isMetric ? "kg" : "lbs"}
              </p>
              <p>Estimated BMI: {goalBMI}</p>
              <p>Estimated Body Fat: {goalBodyFat}%</p>
              <h3 className="font-bold mt-2">Projections:</h3>
              <p>TDEE: {tdee} calories/day</p>
              <p>Estimated time to goal: {timeToGoal} days</p>
              <p>
                Goal date:{" "}
                {new Date(
                  Date.now() + parseInt(timeToGoal) * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;

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
  const [activityLevel, setActivityLevel] = useState<string>("sedentary");
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
    const bmi = (bodyFatPercentage + 9 + 10.34 * sexFactor - 0.16 * age) / 1.39;
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
    const currentBodyFat = calculateBodyFat(currentBMI, age, sexFactor);
    setBodyFat(currentBodyFat.toFixed(1));

    // Goal calculations
    if (isBodyFatGoal) {
      goalWeightKg = calculateWeightFromBodyFat(
        heightM,
        goalBodyFatPercentage,
        age,
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
        age,
        sexFactor
      );
      setGoalBodyFat(calculatedGoalBodyFat.toFixed(1));
    }

    // Calculate and set goal BMI
    const calculatedGoalBMI = calculateBMI(goalWeightKg, heightM);
    setGoalBMI(calculatedGoalBMI.toFixed(1));

    // TDEE and time to goal calculations
    const bmr = calculateBMR(currentWeightKg, heightCm, age, sex);
    const calculatedTDEE = calculateTDEE(bmr);
    setTDEE(calculatedTDEE.toFixed(0));

    const weightToLoseKg = currentWeightKg - goalWeightKg;
    const dailyDeficit = calculatedTDEE - parseFloat(dailyCalorieLimit);
    const daysToGoal = Math.abs((weightToLoseKg * 7700) / dailyDeficit); // 7700 calories ≈ 1 kg of fat

    setTimeToGoal(daysToGoal.toFixed(0));
  };

  const handleCalculate = () => {
    calculateProjections();
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    setter(e.target.value);
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
            44 years old, 5'10", 178.8 lbs) and may not be as accurate for
            significantly different body types.
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
                onChange={(e) => handleInputChange(e, setHeight)}
              />
            </div>
          ) : (
            <div className="flex space-x-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="feet">Feet</Label>
                <Input
                  id="feet"
                  value={feet}
                  onChange={(e) => handleInputChange(e, setFeet)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="inches">Inches</Label>
                <Input
                  id="inches"
                  value={inches}
                  onChange={(e) => handleInputChange(e, setInches)}
                />
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
              onChange={(e) => handleInputChange(e, setWeight)}
            />
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
                onChange={(e) => handleInputChange(e, setGoalBodyFatPercentage)}
              />
            </div>
          ) : (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="goalWeight">
                Goal {isMetric ? "Weight (kg)" : "Weight (lbs)"}
              </Label>
              <Input
                id="goalWeight"
                value={goalWeight}
                onChange={(e) => handleInputChange(e, setGoalWeight)}
              />
            </div>
          )}

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              value={age}
              onChange={(e) => handleInputChange(e, setAge)}
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>Sex</Label>
            <RadioGroup defaultValue="male" onValueChange={setSex}>
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
              onChange={(e) => handleInputChange(e, setDailyCalorieLimit)}
            />
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
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;

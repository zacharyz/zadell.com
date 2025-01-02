"use client";

import YourExperimentComponent from "@/components/YourExperiment";

export default function ExperimentPage() {
  return (
    <div className="pt-16 px-4">
      <div className="max-w-7xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Experiment</h1>
        <div className="prose dark:prose-invert max-w-none">
          <YourExperimentComponent />
        </div>
      </div>
    </div>
  );
}

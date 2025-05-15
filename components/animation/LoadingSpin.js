"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import loaderLottie from "@/lotties/loader.json";

export default function LoadingSpinner() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <div className="loader-container">
      <Lottie
        animationData={loaderLottie}
        loop={true}
        style={{ width: 500, height: 500 }}
      />
    </div>
  ) : null;
}

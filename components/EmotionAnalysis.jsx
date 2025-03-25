"use client";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { db } from "@/utils/db";
import { Emotions } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import * as faceapi from "face-api.js";
import { eq, and } from "drizzle-orm";

const EmotionAnalysis = ({ interviewData = { mockId: null }, interviewEnded }) => {
  const { user, isLoaded } = useUser();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [collectedEmotions, setCollectedEmotions] = useState([]);
  const [mockId, setMockId] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      console.log("Models loaded successfully!");
      const mockData = await interviewData?.mockId;
      setMockId(mockData);
      console.log("MockId Set to", mockId)
    };
    loadModels();
  }, [interviewData]);

  const detectEmotions = async () => {
    if (!faceapi || !faceapi.nets || !faceapi.nets.tinyFaceDetector) {
      console.error("faceapi or models are not loaded yet.");
      return;
    }

    if (!isLoaded) {
      return <div>Loading user data...</div>;
    }

    if (!user) {
      return <div>Please sign in to continue.</div>;
    }



    if (webcamRef.current && canvasRef.current) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, detections);
      faceapi.draw.drawFaceExpressions(canvas, detections);

      if (detections.length > 0) {
        const emotionsData = detections[0].expressions;
        setCollectedEmotions((prev) => [...prev, emotionsData]);
      }
    }

    // Throttle the detection to run every 1 second (1000ms)
    setTimeout(detectEmotions, 1000);
  };

  const calculateAverages = (emotionsArray) => {
    const emotionSums = {};
    const emotionCounts = {};

    emotionsArray.forEach((emotions) => {
      for (const [emotion, percentage] of Object.entries(emotions)) {
        if (!emotionSums[emotion]) {
          emotionSums[emotion] = 0;
          emotionCounts[emotion] = 0;
        }
        emotionSums[emotion] += percentage;
        emotionCounts[emotion]++;
      }
    });

    const averages = {};
    for (const [emotion, sum] of Object.entries(emotionSums)) {
      averages[emotion] = sum / emotionCounts[emotion];
    }

    return averages;
  };

  const checkExistingRecords = async () => {
    try {
      const existingRecords = await db
        .select()
        .from(Emotions)
        .where(and(eq(Emotions.userId, user.id), eq(Emotions.mockIdRef, mockId)));

      return existingRecords.length > 0;
    } catch (error) {
      console.error("Error checking for existing emotion records:", error);
      return false;
    }
  };

  const removeExistingRecords = async () => {
    try {
      const exists = await checkExistingRecords();
      if (!exists) {
        console.log("No existing emotion records found. Skipping deletion.");
        return;
      }

      console.log("Existing records found. Deleting now...");
      await db
        .delete(Emotions)
        .where(and(eq(Emotions.userId, user.id), eq(Emotions.mockIdRef, mockId)));
      console.log("Existing emotion records deleted successfully.");
    } catch (error) {
      console.error("Error deleting existing emotion records:", error);
    }
  };



  const insertAverages = async (averages) => {
    try {
      await removeExistingRecords();

      for (const [emotion, percentage] of Object.entries(averages)) {
        await db.insert(Emotions).values({
          userId: user.id,
          mockIdRef: mockId,
          emotion,
          percentage: percentage.toString(),
        });
      }

      alert("Emotion Insert Success");
      console.log("New emotion data inserted successfully!");
    } catch (error) {
      alert("Emotion Insert Failed");
      console.error("Error inserting averages:", error);
    }
  };


  const handleInterviewEnd = async () => {
    const averages = calculateAverages(collectedEmotions);
    await insertAverages(averages);
    console.log("Interview ended. Averages:", averages);
  };

  useEffect(() => {
    if (webcamRef.current) {
      webcamRef.current.video.onplay = detectEmotions;
    }
  }, [user, mockId]);

  useEffect(() => {
    if (interviewEnded) {
      handleInterviewEnd();
    }
  }, [interviewEnded]);

  if (!isLoaded) {
    return <div>Loading user data...</div>;
  }

  if (!user) {
    return <div>Please sign in to continue.</div>;
  }

  return (
    <div style={{ position: "relative" }}>
      <Webcam ref={webcamRef} audio={false} mirrored={true} />
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
    </div>
  );
};

export default EmotionAnalysis;
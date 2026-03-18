import { useEffect, useRef, useState } from 'react';
import { FilesetResolver, ObjectDetector } from '@mediapipe/tasks-vision';

export const useMediaPipe = () => {
  const [detector, setDetector] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeDetector = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );
        
        const objectDetector = await ObjectDetector.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16.tflite',
            delegate: 'GPU'
          },
          scoreThreshold: 0.5,
          maxResults: 5,
          runningMode: 'VIDEO'
        });

        setDetector(objectDetector);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize MediaPipe:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    initializeDetector();

    return () => {
      if (detector) {
        detector.close();
      }
    };
  }, []);

  const detectObjects = async (videoElement) => {
    if (!detector || !videoElement) return null;

    try {
      const results = detector.detectForVideo(videoElement, performance.now());
      return results;
    } catch (err) {
      console.error('Detection error:', err);
      return null;
    }
  };

  return { detector, isLoading, error, detectObjects };
};

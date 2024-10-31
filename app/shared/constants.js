export const CONFIG = {
  RECORDING: {
    MAX_SEGMENTS: 5,
    SEGMENT_DURATION: 1200, // 20 minutes in seconds
    RESOLUTION: '1280x720', // Medium resolution
  },
  CONNECTIVITY: {
    RECONNECT_INTERVAL: 5000,
    DISCONNECT_TIMEOUT: 600000, // 10 minutes in milliseconds
  },
  SPEED_THRESHOLD: 5, // kmh
  WAZE_RETURN_DELAY: 60000, // 1 minute in milliseconds
};
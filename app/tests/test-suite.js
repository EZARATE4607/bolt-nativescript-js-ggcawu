import { assert } from '@nativescript/core/unit-testing';
import { IgnitionService } from '../slave/ignition-service';
import { RecordingService } from '../slave/recording-service';
import { ConnectivityService } from '../slave/connectivity-service';
import { WazeService } from '../slave/waze-service';
import { FocusService } from '../master/focus-service';
import { NotificationService } from '../master/notification-service';

export async function runTests() {
  console.log('Starting comprehensive test suite...');

  // Test Slave Device (iPhone 8)
  await testIgnitionDetection();
  await testRecording();
  await testConnectivity();
  await testWazeIntegration();

  // Test Master Device (iPhone 13)
  await testFocusMode();
  await testNotificationForwarding();

  console.log('Test suite completed.');
}

async function testIgnitionDetection() {
  console.log('Testing ignition detection...');
  const ignitionService = new IgnitionService();
  
  // Simulate ignition on
  await ignitionService.handleIgnitionOn();
  assert(ignitionService.isIgnitionOn === true, 'Ignition should be detected as ON');
  
  // Simulate ignition off
  await ignitionService.handleIgnitionOff();
  assert(ignitionService.isIgnitionOn === false, 'Ignition should be detected as OFF');
}

async function testRecording() {
  console.log('Testing recording functionality...');
  const recordingService = new RecordingService();
  
  await recordingService.startRecording();
  assert(recordingService.isRecording === true, 'Recording should be active');
  assert(recordingService.recordings.length <= 5, 'Should maintain max 5 recordings');
  
  recordingService.stopRecording();
  assert(recordingService.isRecording === false, 'Recording should stop');
}

async function testConnectivity() {
  console.log('Testing device connectivity...');
  const connectivityService = new ConnectivityService();
  
  await connectivityService.connect();
  assert(connectivityService.isConnected === true, 'Devices should be connected');
  
  connectivityService.disconnect();
  assert(connectivityService.isConnected === false, 'Devices should be disconnected');
}

async function testWazeIntegration() {
  console.log('Testing Waze integration...');
  const wazeService = new WazeService();
  
  await wazeService.launch();
  assert(wazeService.isWazeActive === true, 'Waze should be active');
  
  wazeService.close();
  assert(wazeService.isWazeActive === false, 'Waze should be closed');
}

async function testFocusMode() {
  console.log('Testing focus mode management...');
  const focusService = new FocusService();
  
  const initialMode = await focusService.getCurrentFocusMode();
  await focusService.enableMotoMode();
  assert(await focusService.getCurrentFocusMode() === 'moto', 'Moto focus mode should be active');
  
  await focusService.restorePreviousMode();
  assert(await focusService.getCurrentFocusMode() === initialMode, 'Previous focus mode should be restored');
}

async function testNotificationForwarding() {
  console.log('Testing notification forwarding...');
  const notificationService = new NotificationService();
  
  notificationService.startForwarding();
  
  // Simulate notification
  const testNotification = {
    title: 'Test Notification',
    body: 'This is a test notification'
  };
  
  await notificationService.forwardNotification(testNotification);
  // Add assertions based on your notification handling implementation
}
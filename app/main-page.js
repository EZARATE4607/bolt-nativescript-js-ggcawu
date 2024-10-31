import { createViewModel } from './main-view-model';
import { IgnitionService } from './slave/ignition-service';
import { FocusService } from './master/focus-service';
import { NotificationService } from './master/notification-service';
import { runTests } from './tests/test-suite';

const ignitionService = new IgnitionService();
const focusService = new FocusService();
const notificationService = new NotificationService();

export function onNavigatingTo(args) {
  const page = args.object;
  page.bindingContext = createViewModel();

  // Run tests in development mode
  if (__DEV__) {
    runTests().catch(error => {
      console.error('Test suite failed:', error);
    });
  }

  // Start services based on device role
  if (isSlaveDevice()) {
    ignitionService.startMonitoring();
  } else {
    focusService.enableMotoMode();
    notificationService.startForwarding();
  }
}

function isSlaveDevice() {
  // In real implementation, detect device model
  return Device.model.includes('iPhone 8');
}
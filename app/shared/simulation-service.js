import { Observable } from '@nativescript/core';
import { CONFIG } from './constants';

export class SimulationService extends Observable {
  constructor() {
    super();
    this.isSimulated = true;
    this.ignitionStatus = false;
    this.speed = 0;
    this.temperature = 25;
    this.location = { latitude: 40.7128, longitude: -74.0060 };
    this.deviceRole = 'slave'; // or 'master'
    this.isConnected = false;
  }

  toggleIgnition() {
    this.ignitionStatus = !this.ignitionStatus;
    this.notify({ eventName: 'ignitionChanged', value: this.ignitionStatus });
  }

  setSpeed(speed) {
    this.speed = speed;
    this.notify({ eventName: 'speedChanged', value: speed });
  }

  toggleDeviceRole() {
    this.deviceRole = this.deviceRole === 'slave' ? 'master' : 'slave';
    this.notify({ eventName: 'roleChanged', value: this.deviceRole });
  }

  toggleConnection() {
    this.isConnected = !this.isConnected;
    this.notify({ eventName: 'connectionChanged', value: this.isConnected });
  }
}
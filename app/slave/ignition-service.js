import { Device } from '@nativescript/core';
import { RecordingService } from './recording-service';
import { ConnectivityService } from './connectivity-service';
import { WazeService } from './waze-service';

export class IgnitionService {
  constructor() {
    this.recordingService = new RecordingService();
    this.connectivityService = new ConnectivityService();
    this.wazeService = new WazeService();
    this.isIgnitionOn = false;
  }

  async startMonitoring() {
    // Monitor ignition state changes
    // Note: This requires native iOS implementation for hardware monitoring
    Device.on('ignitionChanged', async (args) => {
      this.isIgnitionOn = args.value;
      
      if (this.isIgnitionOn) {
        await this.handleIgnitionOn();
      } else {
        await this.handleIgnitionOff();
      }
    });
  }

  async handleIgnitionOn() {
    await this.connectivityService.connect();
    await this.recordingService.startRecording();
    await this.wazeService.launch();
  }

  async handleIgnitionOff() {
    this.recordingService.stopRecording();
    this.connectivityService.disconnect();
    this.wazeService.close();
  }
}
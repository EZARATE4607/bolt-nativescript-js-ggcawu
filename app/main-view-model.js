import { Observable } from '@nativescript/core';
import { SimulationService } from './shared/simulation-service';

export function createViewModel() {
    const viewModel = new Observable();
    const simulator = new SimulationService();

    // Bind simulator properties
    viewModel.deviceRole = simulator.deviceRole;
    viewModel.ignitionStatus = simulator.ignitionStatus;
    viewModel.isConnected = simulator.isConnected;
    viewModel.speed = simulator.speed;
    viewModel.systemStatus = 'System Ready';
    viewModel.recordingStatus = 'Recording Stopped';
    viewModel.focusMode = 'Normal';

    // Bind simulator methods
    viewModel.toggleDeviceRole = () => {
        simulator.toggleDeviceRole();
        viewModel.set('deviceRole', simulator.deviceRole);
        updateStatus();
    };

    viewModel.toggleIgnition = () => {
        simulator.toggleIgnition();
        viewModel.set('ignitionStatus', simulator.ignitionStatus);
        updateStatus();
    };

    viewModel.toggleConnection = () => {
        simulator.toggleConnection();
        viewModel.set('isConnected', simulator.isConnected);
        updateStatus();
    };

    function updateStatus() {
        if (simulator.ignitionStatus) {
            viewModel.set('systemStatus', 'System Active');
            if (simulator.deviceRole === 'slave') {
                viewModel.set('recordingStatus', 
                    `Recording Active\nSegments: ${Math.floor(Math.random() * 5) + 1}/5\n` +
                    `GPS: ${simulator.location.latitude.toFixed(4)}, ${simulator.location.longitude.toFixed(4)}\n` +
                    `Temperature: ${simulator.temperature}°C`
                );
            } else {
                viewModel.set('focusMode', 'Moto Mode Active');
            }
        } else {
            viewModel.set('systemStatus', 'System Standby');
            viewModel.set('recordingStatus', 'Recording Stopped');
            viewModel.set('focusMode', 'Normal');
        }
    }

    return viewModel;
}
// ============================================================
// PROJECTLOOP - Comprehensive Demo Data
// ============================================================

import {
  User, Project, ProjectDNA, Failure, FailureAttempt, Solution,
  EvolutionEntry, ProjectSimilarity, WhatIfImpact, RiskPattern,
  Recommendation, InstitutionalStats, EvidenceItem
} from './types';

// ============================================================
// USERS
// ============================================================
export const demoUsers: User[] = [
  {
    id: 'user-1',
    name: 'Arjun Mehta',
    email: 'arjun@university.edu',
    role: 'student',
    department: 'Computer Science',
    createdAt: '2025-08-15T10:00:00Z'
  },
  {
    id: 'user-2',
    name: 'Priya Sharma',
    email: 'priya@university.edu',
    role: 'student',
    department: 'Electronics',
    createdAt: '2025-09-01T10:00:00Z'
  },
  {
    id: 'user-3',
    name: 'Dr. Raghav Iyer',
    email: 'raghav@university.edu',
    role: 'faculty',
    department: 'Computer Science',
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'user-4',
    name: 'Admin User',
    email: 'admin@university.edu',
    role: 'admin',
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: 'user-5',
    name: 'Kavitha Nair',
    email: 'kavitha@university.edu',
    role: 'student',
    department: 'Information Technology',
    createdAt: '2025-07-20T10:00:00Z'
  },
  {
    id: 'user-6',
    name: 'Rahul Desai',
    email: 'rahul@university.edu',
    role: 'student',
    department: 'Mechanical Engineering',
    createdAt: '2025-06-10T10:00:00Z'
  }
];

// ============================================================
// PROJECTS
// ============================================================
export const demoProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Smart Irrigation System',
    description: 'An IoT-based smart irrigation system that monitors soil moisture, temperature, and humidity to automate water supply for agricultural fields. Uses ESP32 microcontroller with multiple sensors and cloud-based dashboard for remote monitoring.',
    domain: 'Agriculture + IoT',
    ownerId: 'user-1',
    ownerName: 'Arjun Mehta',
    status: 'completed',
    teamMembers: [
      { id: 'tm-1', name: 'Arjun Mehta', role: 'Lead Developer' },
      { id: 'tm-2', name: 'Sneha Patel', role: 'Hardware Engineer' },
      { id: 'tm-3', name: 'Rohit Kumar', role: 'Frontend Developer' }
    ],
    technologies: ['ESP32', 'MQTT', 'Firebase', 'React', 'Node.js', 'Arduino IDE'],
    hardware: ['ESP32', 'Soil Moisture Sensor', 'DHT22', 'Relay Module', 'Water Pump', 'Solar Panel'],
    software: ['React Dashboard', 'Firebase Realtime DB', 'MQTT Broker', 'Node.js API'],
    problemStatement: 'Traditional irrigation systems waste water due to fixed schedules. Farmers lack real-time soil condition data.',
    expectedOutcome: 'Automated irrigation system that reduces water waste by 40% through sensor-driven decision making.',
    githubUrl: 'https://github.com/example/smart-irrigation',
    uploads: [
      { id: 'up-1', fileName: 'Project_Report.pdf', fileType: 'pdf', fileSize: 2400000, category: 'report', uploadedAt: '2026-03-15T10:00:00Z' },
      { id: 'up-2', fileName: 'Architecture_Diagram.png', fileType: 'image', fileSize: 450000, category: 'diagram', uploadedAt: '2026-03-15T10:00:00Z' },
      { id: 'up-3', fileName: 'Presentation.pptx', fileType: 'pptx', fileSize: 5200000, category: 'presentation', uploadedAt: '2026-03-15T10:00:00Z' },
      { id: 'up-4', fileName: 'source_code.zip', fileType: 'zip', fileSize: 8900000, category: 'code', uploadedAt: '2026-03-15T10:00:00Z' }
    ],
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-05-20T10:00:00Z'
  },
  {
    id: 'proj-2',
    name: 'Smart Campus Waste Management',
    description: 'IoT-based waste bin monitoring system for campus. Uses ultrasonic sensors to detect fill levels, optimizes collection routes, and provides analytics dashboard for waste reduction strategies.',
    domain: 'Smart Campus + IoT',
    ownerId: 'user-2',
    ownerName: 'Priya Sharma',
    status: 'completed',
    teamMembers: [
      { id: 'tm-4', name: 'Priya Sharma', role: 'Project Lead' },
      { id: 'tm-5', name: 'Anil Verma', role: 'IoT Developer' }
    ],
    technologies: ['Arduino Mega', 'LoRa', 'PostgreSQL', 'React', 'Python', 'Flask'],
    hardware: ['Arduino Mega', 'HC-SR04 Ultrasonic Sensor', 'LoRa Module', 'GPS Module', 'Battery Pack'],
    software: ['Flask API', 'React Dashboard', 'Route Optimization Algorithm', 'PostgreSQL'],
    problemStatement: 'Campus waste bins overflow before scheduled collection. No data-driven approach to waste management.',
    expectedOutcome: 'Real-time waste monitoring reducing overflow incidents by 80% and optimizing collection routes.',
    uploads: [
      { id: 'up-5', fileName: 'Waste_Management_Report.pdf', fileType: 'pdf', fileSize: 1800000, category: 'report', uploadedAt: '2026-02-20T10:00:00Z' }
    ],
    createdAt: '2025-09-15T10:00:00Z',
    updatedAt: '2026-04-10T10:00:00Z'
  },
  {
    id: 'proj-3',
    name: 'AI Crop Disease Detection',
    description: 'Mobile application using computer vision and deep learning to identify crop diseases from leaf images. Provides treatment recommendations and connects with local agricultural experts.',
    domain: 'Agriculture + AI',
    ownerId: 'user-5',
    ownerName: 'Kavitha Nair',
    status: 'completed',
    teamMembers: [
      { id: 'tm-6', name: 'Kavitha Nair', role: 'ML Engineer' },
      { id: 'tm-7', name: 'Deepak Raj', role: 'Mobile Developer' },
      { id: 'tm-8', name: 'Meera Das', role: 'Data Scientist' }
    ],
    technologies: ['TensorFlow', 'Flutter', 'Firebase', 'Python', 'OpenCV', 'FastAPI'],
    hardware: ['Smartphone Camera', 'Raspberry Pi (edge inference)'],
    software: ['TensorFlow Lite', 'Flutter App', 'FastAPI Backend', 'Firebase Auth'],
    problemStatement: 'Farmers cannot quickly identify crop diseases. Expert consultation is expensive and delayed.',
    expectedOutcome: 'Mobile app achieving 92% accuracy in detecting 15 common crop diseases with treatment suggestions.',
    githubUrl: 'https://github.com/example/crop-disease-ai',
    uploads: [
      { id: 'up-6', fileName: 'ML_Model_Report.pdf', fileType: 'pdf', fileSize: 3200000, category: 'report', uploadedAt: '2026-04-01T10:00:00Z' }
    ],
    createdAt: '2025-11-01T10:00:00Z',
    updatedAt: '2026-06-15T10:00:00Z'
  },
  {
    id: 'proj-4',
    name: 'IoT Air Quality Monitor',
    description: 'Distributed air quality monitoring network using custom sensor nodes. Measures PM2.5, PM10, CO2, VOCs, temperature, and humidity. Cloud-based analytics with predictive modeling.',
    domain: 'Environment + IoT',
    ownerId: 'user-1',
    ownerName: 'Arjun Mehta',
    status: 'completed',
    teamMembers: [
      { id: 'tm-9', name: 'Arjun Mehta', role: 'System Architect' },
      { id: 'tm-10', name: 'Nisha Gupta', role: 'Sensor Engineer' }
    ],
    technologies: ['ESP32', 'MQTT', 'InfluxDB', 'Grafana', 'Node.js', 'React'],
    hardware: ['ESP32', 'PMS5003 PM Sensor', 'MQ-135 Gas Sensor', 'BME280', 'OLED Display'],
    software: ['MQTT Broker', 'InfluxDB', 'Grafana Dashboard', 'Node.js API', 'React Web App'],
    problemStatement: 'No granular air quality data available for campus. Centralized monitoring stations are expensive.',
    expectedOutcome: 'Network of 10 sensor nodes providing real-time air quality data with 15-minute predictive capability.',
    uploads: [
      { id: 'up-7', fileName: 'AQM_Report.pdf', fileType: 'pdf', fileSize: 2100000, category: 'report', uploadedAt: '2026-01-15T10:00:00Z' }
    ],
    createdAt: '2025-08-20T10:00:00Z',
    updatedAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'proj-5',
    name: 'Smart Helmet for Workers',
    description: 'Safety helmet with embedded sensors for construction workers. Monitors environmental hazards, detects falls, tracks location, and sends emergency alerts.',
    domain: 'Safety + IoT + Wearable',
    ownerId: 'user-6',
    ownerName: 'Rahul Desai',
    status: 'completed',
    teamMembers: [
      { id: 'tm-11', name: 'Rahul Desai', role: 'Hardware Lead' },
      { id: 'tm-12', name: 'Vikram Singh', role: 'Firmware Developer' }
    ],
    technologies: ['ESP32', 'BLE', 'Firebase', 'React Native', 'MQTT'],
    hardware: ['ESP32', 'MPU6050 Accelerometer', 'MQ-2 Gas Sensor', 'GPS Module', 'Buzzer', 'Vibration Motor'],
    software: ['React Native App', 'Firebase Cloud Messaging', 'MQTT Alert System'],
    problemStatement: 'Construction site accidents go undetected. Workers lack real-time hazard warnings.',
    expectedOutcome: 'Wearable safety system reducing response time to incidents by 70%.',
    uploads: [
      { id: 'up-8', fileName: 'Smart_Helmet_Report.pdf', fileType: 'pdf', fileSize: 1900000, category: 'report', uploadedAt: '2026-05-01T10:00:00Z' }
    ],
    createdAt: '2025-10-01T10:00:00Z',
    updatedAt: '2026-05-30T10:00:00Z'
  },
  {
    id: 'proj-6',
    name: 'Flood Monitoring & Early Warning',
    description: 'River-level monitoring system using ultrasonic and pressure sensors. Provides early flood warnings to nearby communities via SMS and mobile app.',
    domain: 'Disaster Management + IoT',
    ownerId: 'user-2',
    ownerName: 'Priya Sharma',
    status: 'completed',
    teamMembers: [
      { id: 'tm-13', name: 'Priya Sharma', role: 'System Designer' },
      { id: 'tm-14', name: 'Karthik Rao', role: 'Backend Developer' }
    ],
    technologies: ['Raspberry Pi', 'MQTT', 'PostgreSQL', 'Django', 'React', 'Twilio'],
    hardware: ['Raspberry Pi 4', 'Ultrasonic Sensor', 'Pressure Sensor', 'Solar Panel', '4G Module'],
    software: ['Django Backend', 'React Dashboard', 'Twilio SMS API', 'PostgreSQL'],
    problemStatement: 'Flood-prone areas lack affordable early warning systems. Existing systems are expensive and complex.',
    expectedOutcome: 'Low-cost flood warning system providing 2-hour advance alerts with 85% accuracy.',
    uploads: [],
    createdAt: '2025-07-01T10:00:00Z',
    updatedAt: '2026-02-28T10:00:00Z'
  },
  {
    id: 'proj-7',
    name: 'Energy Monitoring System',
    description: 'Smart energy monitoring for campus buildings. Tracks electricity consumption per floor, identifies wastage patterns, and provides automated suggestions for energy saving.',
    domain: 'Energy + IoT',
    ownerId: 'user-5',
    ownerName: 'Kavitha Nair',
    status: 'active',
    teamMembers: [
      { id: 'tm-15', name: 'Kavitha Nair', role: 'Project Lead' },
      { id: 'tm-16', name: 'Suresh Kumar', role: 'Hardware Engineer' }
    ],
    technologies: ['ESP32', 'MQTT', 'MongoDB', 'Express', 'React', 'Chart.js'],
    hardware: ['ESP32', 'SCT-013 Current Sensor', 'ADS1115 ADC', 'OLED Display'],
    software: ['Express API', 'MongoDB', 'React Dashboard', 'MQTT Broker'],
    problemStatement: 'Campus energy bills are increasing. No visibility into floor-level consumption patterns.',
    expectedOutcome: 'Real-time energy monitoring reducing campus electricity consumption by 25%.',
    uploads: [],
    createdAt: '2026-06-01T10:00:00Z',
    updatedAt: '2026-09-15T10:00:00Z'
  },
  {
    id: 'proj-8',
    name: 'Campus Navigation System',
    description: 'Indoor navigation system for large campus buildings using BLE beacons. Provides turn-by-turn directions, room finding, and accessibility-aware routing.',
    domain: 'Navigation + IoT',
    ownerId: 'user-6',
    ownerName: 'Rahul Desai',
    status: 'active',
    teamMembers: [
      { id: 'tm-17', name: 'Rahul Desai', role: 'Lead Developer' },
      { id: 'tm-18', name: 'Anita Joshi', role: 'Mobile Developer' }
    ],
    technologies: ['ESP32', 'BLE', 'React Native', 'Node.js', 'MongoDB', 'Mapbox'],
    hardware: ['ESP32 BLE Beacons', 'Smartphone'],
    software: ['React Native App', 'Node.js API', 'MongoDB', 'Mapbox SDK'],
    problemStatement: 'New students and visitors struggle to find rooms in large campus buildings. No indoor navigation exists.',
    expectedOutcome: 'Indoor navigation app with 3-meter positioning accuracy and accessibility routing.',
    uploads: [],
    createdAt: '2026-07-01T10:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z'
  }
];

// ============================================================
// PROJECT DNA
// ============================================================
export const demoDNA: Record<string, ProjectDNA> = {
  'proj-1': {
    id: 'dna-1',
    projectId: 'proj-1',
    technologyDNA: {
      languages: ['C++', 'JavaScript', 'TypeScript'],
      frameworks: ['React', 'Node.js', 'Express'],
      platforms: ['ESP32', 'Web'],
      protocols: ['MQTT', 'HTTP', 'WiFi'],
      databases: ['Firebase Realtime Database'],
      cloud: ['Firebase'],
      tools: ['Arduino IDE', 'VS Code', 'Postman']
    },
    architectureDNA: {
      pattern: 'IoT Edge-Cloud',
      layers: [
        { name: 'Sensing Layer', components: ['Soil Moisture Sensor', 'DHT22', 'Light Sensor'], technology: 'Analog/Digital Sensors' },
        { name: 'Edge Processing', components: ['ESP32', 'Relay Module'], technology: 'ESP32 + Arduino' },
        { name: 'Communication', components: ['MQTT Client', 'WiFi Module'], technology: 'MQTT Protocol' },
        { name: 'Cloud Layer', components: ['MQTT Broker', 'Firebase DB', 'Node.js API'], technology: 'Firebase + Node.js' },
        { name: 'Presentation', components: ['React Dashboard', 'Mobile View'], technology: 'React + Chart.js' }
      ],
      dataFlow: ['Sensor', 'ESP32', 'MQTT', 'Cloud', 'Dashboard']
    },
    componentDNA: {
      hardware: [
        { name: 'ESP32', type: 'Microcontroller', purpose: 'Central processing and WiFi connectivity', reusable: true, dependencies: ['Power Supply', 'WiFi Network'] },
        { name: 'Soil Moisture Sensor', type: 'Sensor', purpose: 'Measure soil water content', reusable: true, dependencies: ['ESP32 ADC Pin'] },
        { name: 'DHT22', type: 'Sensor', purpose: 'Temperature and humidity measurement', reusable: true, dependencies: ['ESP32 GPIO'] },
        { name: 'Relay Module', type: 'Actuator', purpose: 'Control water pump', reusable: true, dependencies: ['ESP32 GPIO', 'External Power'] },
        { name: 'Water Pump', type: 'Actuator', purpose: 'Water delivery', reusable: false, dependencies: ['Relay Module', 'Water Source'] }
      ],
      software: [
        { name: 'MQTT Client Library', type: 'Library', purpose: 'Device-to-cloud communication', reusable: true, dependencies: ['WiFi Connection'] },
        { name: 'Sensor Reading Module', type: 'Firmware Module', purpose: 'Read and process sensor data', reusable: true, dependencies: ['Sensor Hardware'] },
        { name: 'React Dashboard', type: 'Web Application', purpose: 'Data visualization and control', reusable: true, dependencies: ['Node.js API'] }
      ],
      services: [
        { name: 'MQTT Broker', type: 'Message Broker', purpose: 'Message routing between devices and cloud', reusable: true, dependencies: ['Server Infrastructure'] },
        { name: 'Firebase Realtime DB', type: 'Database', purpose: 'Store sensor readings and settings', reusable: true, dependencies: ['Firebase Account'] }
      ]
    },
    decisionDNA: {
      decisions: [
        { id: 'dec-1', what: 'ESP32 over Arduino Uno', why: 'Built-in WiFi, more processing power, dual-core', alternatives: ['Arduino Uno + WiFi Shield', 'Raspberry Pi'], outcome: 'Good - sufficient for IoT tasks with lower power', confidence: 'high' },
        { id: 'dec-2', what: 'MQTT over HTTP', why: 'Low bandwidth, persistent connection, pub/sub pattern ideal for sensor data', alternatives: ['HTTP REST', 'WebSocket', 'CoAP'], outcome: 'Good for real-time but connectivity issues observed', confidence: 'high' },
        { id: 'dec-3', what: 'Firebase over custom backend', why: 'Rapid development, real-time sync, free tier sufficient', alternatives: ['Custom PostgreSQL', 'AWS IoT Core', 'Supabase'], outcome: 'Good for MVP, scalability concerns for production', confidence: 'medium' }
      ]
    },
    failureDNA: {
      failures: [],
      totalFailures: 3,
      resolvedFailures: 3
    },
    solutionDNA: {
      solutions: [],
      totalSolved: 3,
      verifiedSolutions: 2
    },
    riskDNA: {
      risks: [
        {
          id: 'risk-1',
          pattern: 'Sensor Data Noise',
          description: 'Soil moisture sensors produce noisy readings due to electrical interference',
          severity: 'medium',
          occurrences: 17,
          affectedDomains: ['Agriculture', 'Environment', 'Healthcare'],
          mitigation: 'Apply median filtering or Kalman filter to sensor readings',
          evidence: [
            { id: 'ev-1', type: 'project', sourceProjectId: 'proj-1', sourceProjectName: 'Smart Irrigation System', description: 'Resolved with median filtering', confidence: 'high' },
            { id: 'ev-2', type: 'project', sourceProjectId: 'proj-4', sourceProjectName: 'IoT Air Quality Monitor', description: 'Used Kalman filter for gas sensor readings', confidence: 'high' }
          ]
        },
        {
          id: 'risk-2',
          pattern: 'MQTT Connectivity Loss',
          description: 'MQTT connections frequently drop in areas with poor WiFi coverage',
          severity: 'high',
          occurrences: 12,
          affectedDomains: ['IoT', 'Agriculture', 'Smart Campus'],
          mitigation: 'Implement automatic reconnection with exponential backoff and local data buffering',
          evidence: [
            { id: 'ev-3', type: 'project', sourceProjectId: 'proj-1', sourceProjectName: 'Smart Irrigation System', description: 'Implemented reconnect with local buffer', confidence: 'high' }
          ]
        }
      ],
      overallRisk: 'medium'
    },
    dependencyDNA: {
      dependencies: [
        { from: 'Soil Moisture Sensor', to: 'ESP32', type: 'communicates', critical: true },
        { from: 'DHT22', to: 'ESP32', type: 'communicates', critical: false },
        { from: 'ESP32', to: 'MQTT Broker', type: 'communicates', critical: true },
        { from: 'MQTT Broker', to: 'Firebase', type: 'communicates', critical: true },
        { from: 'Firebase', to: 'React Dashboard', type: 'communicates', critical: true },
        { from: 'ESP32', to: 'Relay Module', type: 'communicates', critical: true },
        { from: 'Relay Module', to: 'Water Pump', type: 'communicates', critical: true }
      ],
      criticalPath: ['Sensor', 'ESP32', 'MQTT', 'Firebase', 'Dashboard']
    },
    evolutionHistory: [],
    reusabilityScore: 78,
    riskLevel: 'medium',
    version: 1,
    createdAt: '2026-03-20T10:00:00Z'
  }
};

// ============================================================
// FAILURES
// ============================================================
export const demoFailures: Failure[] = [
  {
    id: 'fail-1',
    projectId: 'proj-1',
    title: 'Unstable Soil Moisture Readings',
    description: 'Soil moisture sensor readings fluctuated wildly even in stable conditions, making it impossible to set reliable irrigation thresholds.',
    category: 'Sensor Data Quality',
    rootCause: 'Electrical noise from the relay module and water pump motor causing ADC interference on the ESP32.',
    severity: 'high',
    status: 'resolved',
    attempts: [
      {
        id: 'att-1', failureId: 'fail-1', attemptNumber: 1,
        approach: 'Simple averaging of 10 consecutive readings',
        result: 'failed',
        evidence: 'Averaging smoothed minor fluctuations but large spikes from motor noise persisted. Threshold crossings still triggered false irrigations.',
        lesson: 'Simple averaging cannot handle impulsive noise from electromagnetic interference.'
      },
      {
        id: 'att-2', failureId: 'fail-1', attemptNumber: 2,
        approach: 'Moving average filter with window size 20',
        result: 'partial',
        evidence: 'Reduced noise significantly but introduced a 2-second lag in readings. System responded too slowly to rapid soil changes after irrigation.',
        lesson: 'Moving average trades response time for smoothing. Need a filter that removes outliers without adding lag.'
      },
      {
        id: 'att-3', failureId: 'fail-1', attemptNumber: 3,
        approach: 'Median filtering with window size 11',
        result: 'success',
        evidence: 'Median filter effectively removed spike noise without introducing lag. Readings became stable and responsive. Successfully tested over 30-day period.',
        lesson: 'Median filtering is ideal for impulsive noise removal in sensor systems. It preserves signal edges while removing outliers.'
      }
    ],
    solution: {
      id: 'sol-1', failureId: 'fail-1',
      solution: 'Median filtering with window size 11 applied to raw ADC readings before threshold comparison.',
      effectiveness: 95,
      evidence: 'Tested over 30 days with zero false irrigations. Sensor readings matched reference moisture meter within 3% accuracy.',
      verified: true,
      verifiedBy: 'Dr. Raghav Iyer',
      confidence: 'high'
    },
    affectedProjects: 4,
    createdAt: '2026-02-10T10:00:00Z'
  },
  {
    id: 'fail-2',
    projectId: 'proj-1',
    title: 'MQTT Connection Drops Under Load',
    description: 'MQTT broker connection dropped every 30-45 minutes, causing data gaps in the dashboard and missed irrigation commands.',
    category: 'Network Connectivity',
    rootCause: 'ESP32 WiFi stack memory leak when MQTT keepalive packets conflicted with sensor reading tasks on the same core.',
    severity: 'high',
    status: 'resolved',
    attempts: [
      {
        id: 'att-4', failureId: 'fail-2', attemptNumber: 1,
        approach: 'Increased MQTT keepalive interval from 15s to 60s',
        result: 'failed',
        evidence: 'Connection still dropped but less frequently (every 90 minutes). Root cause was not keepalive timing.',
        lesson: 'Increasing keepalive interval masks the problem but doesn\'t solve the underlying memory issue.'
      },
      {
        id: 'att-5', failureId: 'fail-2', attemptNumber: 2,
        approach: 'Automatic reconnection with exponential backoff + local data buffer',
        result: 'success',
        evidence: 'System reconnects within 5 seconds after disconnect. Local buffer stores up to 100 readings during outage. No data loss observed over 45-day test.',
        lesson: 'Design for failure: assume connections will drop and implement robust reconnection with data buffering.'
      }
    ],
    solution: {
      id: 'sol-2', failureId: 'fail-2',
      solution: 'Implemented automatic MQTT reconnection with exponential backoff (1s, 2s, 4s, 8s, max 30s) and circular buffer storing 100 readings during disconnection.',
      effectiveness: 90,
      evidence: 'Zero data loss over 45-day test period despite 12 observed disconnections.',
      verified: true,
      verifiedBy: 'Dr. Raghav Iyer',
      confidence: 'high'
    },
    affectedProjects: 3,
    createdAt: '2026-02-20T10:00:00Z'
  },
  {
    id: 'fail-3',
    projectId: 'proj-1',
    title: 'Excessive Power Consumption',
    description: 'Battery-powered sensor nodes lasted only 18 hours instead of target 7 days. Solar panel insufficient for continuous operation.',
    category: 'Power Management',
    rootCause: 'ESP32 running at full clock speed continuously. WiFi and MQTT maintaining persistent connections.',
    severity: 'medium',
    status: 'resolved',
    attempts: [
      {
        id: 'att-6', failureId: 'fail-3', attemptNumber: 1,
        approach: 'Reduced sensor reading frequency from 1s to 30s',
        result: 'partial',
        evidence: 'Battery life extended to 48 hours but still far from 7-day target.',
        lesson: 'Reading frequency alone is not the main power consumer. The WiFi radio is the primary drain.'
      },
      {
        id: 'att-7', failureId: 'fail-3', attemptNumber: 2,
        approach: 'Deep sleep mode between readings with 5-minute wake cycles',
        result: 'success',
        evidence: 'Battery life extended to 12 days. Solar panel maintains continuous operation. Deep sleep current draw: 10µA vs 240mA active.',
        lesson: 'ESP32 deep sleep dramatically reduces power. Design firmware around sleep-wake cycles for battery-powered IoT.'
      }
    ],
    solution: {
      id: 'sol-3', failureId: 'fail-3',
      solution: 'Implemented deep sleep cycles: wake every 5 minutes, read sensors, connect WiFi, send MQTT, return to deep sleep. Added solar panel with 2000mAh LiPo battery.',
      effectiveness: 85,
      evidence: '12-day battery life without solar. Indefinite with solar panel in normal conditions.',
      verified: true,
      confidence: 'high'
    },
    affectedProjects: 5,
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'fail-4',
    projectId: 'proj-2',
    title: 'Ultrasonic Sensor False Readings in Rain',
    description: 'HC-SR04 ultrasonic sensors gave incorrect fill-level readings during rain, triggering unnecessary waste collection.',
    category: 'Sensor Data Quality',
    rootCause: 'Raindrops interfering with ultrasonic waves, creating false echo signals.',
    severity: 'medium',
    status: 'resolved',
    attempts: [
      {
        id: 'att-8', failureId: 'fail-4', attemptNumber: 1,
        approach: 'Added physical rain shield over sensor',
        result: 'partial',
        evidence: 'Reduced false readings by 60% but not eliminated. Heavy rain still caused issues.',
        lesson: 'Physical shielding helps but cannot fully protect ultrasonic sensors from environmental interference.'
      },
      {
        id: 'att-9', failureId: 'fail-4', attemptNumber: 2,
        approach: 'Statistical outlier rejection with humidity-aware calibration',
        result: 'success',
        evidence: 'Combined rain shield with software filtering that adjusts thresholds based on humidity readings from co-located BME280 sensor.',
        lesson: 'Multi-sensor fusion improves reliability. Use environmental context to adjust sensor interpretation.'
      }
    ],
    solution: {
      id: 'sol-4', failureId: 'fail-4',
      solution: 'Rain shield + humidity-aware outlier rejection. When BME280 reports >90% humidity, increase outlier threshold and require 3 consecutive consistent readings.',
      effectiveness: 88,
      evidence: '3-month test including monsoon season. False positive rate dropped from 35% to 2%.',
      verified: true,
      confidence: 'high'
    },
    affectedProjects: 2,
    createdAt: '2025-12-15T10:00:00Z'
  },
  {
    id: 'fail-5',
    projectId: 'proj-3',
    title: 'ML Model Accuracy Drop on Field Images',
    description: 'Crop disease detection model achieved 95% accuracy on lab images but only 72% on real field images taken by farmers.',
    category: 'AI/ML Performance',
    rootCause: 'Training data was mostly clean lab images. Field images had variable lighting, backgrounds, angles, and image quality.',
    severity: 'high',
    status: 'resolved',
    attempts: [
      {
        id: 'att-10', failureId: 'fail-5', attemptNumber: 1,
        approach: 'Data augmentation with rotation, flip, and color jitter',
        result: 'partial',
        evidence: 'Field accuracy improved to 81% but still below acceptable 90% threshold.',
        lesson: 'Standard augmentation helps but doesn\'t fully bridge the lab-to-field domain gap.'
      },
      {
        id: 'att-11', failureId: 'fail-5', attemptNumber: 2,
        approach: 'Collected 2000 field images + transfer learning with fine-tuning on field data',
        result: 'success',
        evidence: 'Field accuracy reached 92% after fine-tuning on mixed dataset. Model also became more robust to lighting variations.',
        lesson: 'Real-world data collection is essential. No amount of augmentation replaces actual field conditions.'
      }
    ],
    solution: {
      id: 'sol-5', failureId: 'fail-5',
      solution: 'Collected 2000 field images, mixed with lab data, applied domain-specific augmentation (varying backgrounds, lighting simulation), fine-tuned pre-trained MobileNetV2.',
      effectiveness: 92,
      evidence: 'Achieved 92% accuracy on field test set of 500 images across 15 disease classes.',
      verified: true,
      verifiedBy: 'Dr. Raghav Iyer',
      confidence: 'high'
    },
    affectedProjects: 1,
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'fail-6',
    projectId: 'proj-4',
    title: 'Gas Sensor Calibration Drift',
    description: 'MQ-135 gas sensor readings drifted significantly over 2 weeks, making CO2 and VOC measurements unreliable.',
    category: 'Sensor Calibration',
    rootCause: 'MQ-series sensors require periodic calibration and have known drift characteristics that worsen with temperature changes.',
    severity: 'medium',
    status: 'resolved',
    attempts: [
      {
        id: 'att-12', failureId: 'fail-6', attemptNumber: 1,
        approach: 'Manual calibration every 2 weeks',
        result: 'partial',
        evidence: 'Readings accurate after calibration but drift resumed within 3-4 days.',
        lesson: 'Manual calibration is not sustainable for distributed sensor networks.'
      },
      {
        id: 'att-13', failureId: 'fail-6', attemptNumber: 2,
        approach: 'Temperature-compensated auto-calibration using baseline tracking',
        result: 'success',
        evidence: 'Implemented automatic baseline calibration using overnight clean air readings as reference. Temperature compensation using BME280.',
        lesson: 'Auto-calibration with environmental compensation is essential for long-term sensor deployments.'
      }
    ],
    solution: {
      id: 'sol-6', failureId: 'fail-6',
      solution: 'Automatic baseline calibration using minimum readings during 2-4 AM (clean air period) with temperature compensation from co-located BME280.',
      effectiveness: 85,
      evidence: '6-month deployment maintaining accuracy within 10% of reference instrument.',
      verified: false,
      confidence: 'medium'
    },
    affectedProjects: 3,
    createdAt: '2025-11-20T10:00:00Z'
  },
  {
    id: 'fail-7',
    projectId: 'proj-5',
    title: 'Fall Detection False Alarms',
    description: 'MPU6050-based fall detection triggered alarms during normal activities like sitting down quickly or bending over.',
    category: 'Algorithm Accuracy',
    rootCause: 'Simple threshold-based fall detection cannot distinguish between falls and aggressive normal movements.',
    severity: 'high',
    status: 'resolved',
    attempts: [
      {
        id: 'att-14', failureId: 'fail-7', attemptNumber: 1,
        approach: 'Increased acceleration threshold from 2g to 3g',
        result: 'failed',
        evidence: 'Reduced false alarms but missed 40% of actual falls. Too many missed detections is dangerous.',
        lesson: 'Simple threshold adjustment trades false positives for false negatives. Need smarter detection.'
      },
      {
        id: 'att-15', failureId: 'fail-7', attemptNumber: 2,
        approach: 'Multi-phase detection: free-fall → impact → post-fall orientation check',
        result: 'success',
        evidence: 'Three-phase detection checks for: 1) brief free-fall (low-g), 2) impact spike (high-g), 3) horizontal orientation sustained for 3 seconds. False alarms dropped to <5%.',
        lesson: 'Falls have a distinctive signature: free-fall → impact → lying still. Multi-phase detection dramatically improves accuracy.'
      }
    ],
    solution: {
      id: 'sol-7', failureId: 'fail-7',
      solution: 'Three-phase fall detection algorithm: detect free-fall (<0.5g for >100ms), detect impact (>3g), verify post-fall orientation (horizontal for >3s). User confirmation timeout of 30 seconds.',
      effectiveness: 93,
      evidence: '200 simulated falls and 500 normal activities. 95% detection rate with <5% false alarm rate.',
      verified: true,
      confidence: 'high'
    },
    affectedProjects: 2,
    createdAt: '2026-01-05T10:00:00Z'
  }
];

// ============================================================
// EVOLUTION ENTRIES
// ============================================================
export const demoEvolutions: EvolutionEntry[] = [
  {
    id: 'evo-1',
    parentProjectId: 'proj-1',
    childProjectId: 'proj-3',
    parentProjectName: 'Smart Irrigation System',
    childProjectName: 'AI Crop Disease Detection',
    mutationReason: 'Extended agriculture domain with AI capabilities for disease detection alongside irrigation management.',
    changes: ['Added computer vision pipeline', 'Introduced TensorFlow ML model', 'Added mobile application for field use', 'Retained sensor data processing patterns'],
    outcome: 'Successfully combined IoT monitoring with AI diagnostics for comprehensive agriculture solution.',
    createdBy: 'Kavitha Nair',
    createdAt: '2025-11-15T10:00:00Z'
  },
  {
    id: 'evo-2',
    parentProjectId: 'proj-4',
    childProjectId: 'proj-6',
    parentProjectName: 'IoT Air Quality Monitor',
    childProjectName: 'Flood Monitoring & Early Warning',
    mutationReason: 'Applied distributed sensor network architecture from air quality to water level monitoring.',
    changes: ['Replaced air quality sensors with water level sensors', 'Added SMS alert system via Twilio', 'Upgraded from ESP32 to Raspberry Pi for 4G connectivity', 'Added predictive modeling for flood forecasting'],
    outcome: 'Successfully adapted the distributed monitoring pattern for disaster management.',
    createdBy: 'Priya Sharma',
    createdAt: '2025-07-15T10:00:00Z'
  }
];

// ============================================================
// SIMILARITY DATA
// ============================================================
export function getSimilarProjects(projectId: string): ProjectSimilarity[] {
  const similarities: Record<string, ProjectSimilarity[]> = {
    'proj-1': [
      {
        projectId: 'proj-4',
        projectName: 'IoT Air Quality Monitor',
        domain: 'Environment + IoT',
        overallScore: 82,
        reasons: [
          { factor: 'Technology', match: 'ESP32 + MQTT + Cloud Dashboard', weight: 0.35 },
          { factor: 'Architecture', match: 'Sensor → Edge → Cloud → Dashboard', weight: 0.30 },
          { factor: 'Component', match: 'ESP32, MQTT, Environmental Sensors', weight: 0.20 },
          { factor: 'Failure', match: 'Sensor noise, MQTT connectivity', weight: 0.15 }
        ],
        sharedTechnologies: ['ESP32', 'MQTT', 'Node.js', 'React'],
        sharedComponents: ['ESP32', 'Environmental Sensor', 'MQTT Broker', 'Cloud Dashboard'],
        sharedFailures: ['Sensor Data Noise', 'MQTT Connection Drops'],
        sharedSolutions: ['Median Filtering', 'Auto Reconnection']
      },
      {
        projectId: 'proj-7',
        projectName: 'Energy Monitoring System',
        domain: 'Energy + IoT',
        overallScore: 75,
        reasons: [
          { factor: 'Technology', match: 'ESP32 + MQTT + React', weight: 0.35 },
          { factor: 'Architecture', match: 'Sensor → Edge → Cloud → Dashboard', weight: 0.30 },
          { factor: 'Domain', match: 'IoT Monitoring System', weight: 0.20 }
        ],
        sharedTechnologies: ['ESP32', 'MQTT', 'React'],
        sharedComponents: ['ESP32', 'Current Sensor', 'MQTT Broker'],
        sharedFailures: ['Sensor Calibration'],
        sharedSolutions: []
      },
      {
        projectId: 'proj-2',
        projectName: 'Smart Campus Waste Management',
        domain: 'Smart Campus + IoT',
        overallScore: 62,
        reasons: [
          { factor: 'Architecture', match: 'Sensor → Edge → Cloud → Dashboard', weight: 0.30 },
          { factor: 'Component', match: 'Microcontroller, Sensors, Dashboard', weight: 0.20 },
          { factor: 'Failure', match: 'Sensor reliability issues', weight: 0.12 }
        ],
        sharedTechnologies: ['React'],
        sharedComponents: ['Microcontroller', 'Environmental Sensor', 'Dashboard'],
        sharedFailures: ['Sensor False Readings'],
        sharedSolutions: ['Statistical Outlier Rejection']
      },
      {
        projectId: 'proj-5',
        projectName: 'Smart Helmet for Workers',
        domain: 'Safety + IoT',
        overallScore: 55,
        reasons: [
          { factor: 'Technology', match: 'ESP32 + MQTT', weight: 0.25 },
          { factor: 'Architecture', match: 'Sensor → Edge → Cloud', weight: 0.20 }
        ],
        sharedTechnologies: ['ESP32', 'MQTT', 'Firebase'],
        sharedComponents: ['ESP32', 'MQTT Broker'],
        sharedFailures: [],
        sharedSolutions: []
      },
      {
        projectId: 'proj-3',
        projectName: 'AI Crop Disease Detection',
        domain: 'Agriculture + AI',
        overallScore: 48,
        reasons: [
          { factor: 'Domain', match: 'Agriculture', weight: 0.25 },
          { factor: 'Technology', match: 'Firebase', weight: 0.15 }
        ],
        sharedTechnologies: ['Firebase'],
        sharedComponents: [],
        sharedFailures: [],
        sharedSolutions: []
      },
      {
        projectId: 'proj-6',
        projectName: 'Flood Monitoring & Early Warning',
        domain: 'Disaster Management + IoT',
        overallScore: 70,
        reasons: [
          { factor: 'Technology', match: 'MQTT + Sensors + Dashboard', weight: 0.30 },
          { factor: 'Architecture', match: 'Distributed sensor network', weight: 0.25 },
          { factor: 'Failure', match: 'Network connectivity', weight: 0.15 }
        ],
        sharedTechnologies: ['MQTT', 'React'],
        sharedComponents: ['MQTT Broker', 'Environmental Sensor', 'Dashboard'],
        sharedFailures: ['Connectivity Issues'],
        sharedSolutions: ['Data Buffering']
      },
      {
        projectId: 'proj-8',
        projectName: 'Campus Navigation System',
        domain: 'Navigation + IoT',
        overallScore: 38,
        reasons: [
          { factor: 'Technology', match: 'ESP32', weight: 0.20 },
          { factor: 'Component', match: 'ESP32, Mobile App', weight: 0.18 }
        ],
        sharedTechnologies: ['ESP32'],
        sharedComponents: ['ESP32'],
        sharedFailures: [],
        sharedSolutions: []
      }
    ]
  };
  return similarities[projectId] || [];
}

// ============================================================
// WHAT-IF SIMULATIONS
// ============================================================
export function getWhatIfResult(projectId: string, from: string, to: string): WhatIfImpact {
  const key = `${from}→${to}`.toLowerCase();

  const results: Record<string, WhatIfImpact> = {
    'mqtt→http': {
      architectureImpact: {
        level: 'medium',
        affectedComponents: ['ESP32 Communication Layer', 'Cloud Ingestion Endpoint', 'Real-time Dashboard'],
        description: 'Replacing MQTT with HTTP changes the communication pattern from publish-subscribe to request-response. This affects real-time data streaming and requires restructuring the cloud ingestion pipeline.',
        changes: [
          'Replace MQTT client library with HTTP client on ESP32',
          'Create REST API endpoints for sensor data submission',
          'Replace MQTT broker with HTTP server/load balancer',
          'Implement polling or SSE for dashboard real-time updates',
          'Add request queuing for offline scenarios'
        ]
      },
      dependencyImpact: {
        level: 'medium',
        affectedComponents: ['ESP32 firmware', 'Cloud message broker', 'Dashboard real-time feed'],
        description: 'MQTT broker dependency removed but HTTP server required. Dashboard loses native real-time push capability.',
        changes: [
          'Remove MQTT broker infrastructure',
          'Add HTTP server / API gateway',
          'Implement Server-Sent Events or polling for real-time updates',
          'Update ESP32 firmware networking layer'
        ]
      },
      historicalEvidence: [
        {
          projectId: 'proj-6',
          projectName: 'Flood Monitoring System',
          description: 'Used HTTP for sensor data with Raspberry Pi. Worked well for 5-minute intervals but higher latency than MQTT.',
          outcome: 'Successful with trade-offs',
          year: '2025'
        },
        {
          projectId: 'proj-2',
          projectName: 'Smart Campus Waste Management',
          description: 'Initially tried HTTP but switched to LoRa+MQTT for lower power consumption.',
          outcome: 'HTTP abandoned due to power concerns',
          year: '2025'
        }
      ],
      potentialRisks: [
        'Increased power consumption due to HTTP overhead (headers, TLS handshake)',
        'Loss of real-time push notification capability',
        'Higher latency for sensor data delivery',
        'More complex error handling for request failures',
        'ESP32 SSL/TLS implementation may be resource-intensive'
      ],
      knownSuccesses: [
        'HTTP works well for low-frequency data (>1 minute intervals)',
        'Simpler debugging with standard HTTP tools',
        'Better compatibility with web infrastructure',
        'Easier to add authentication and rate limiting'
      ],
      knownFailures: [
        'HTTP over ESP32 with TLS consumes ~40% more power than MQTT',
        'Request-response pattern not ideal for real-time sensor streaming',
        'Connection setup overhead significant for frequent small payloads'
      ],
      suggestedMitigation: [
        'Use HTTP/2 to reduce connection overhead',
        'Implement batch sending (collect 10 readings, send as batch)',
        'Use Server-Sent Events (SSE) for dashboard real-time updates',
        'Implement local buffer with retry queue for failed requests',
        'Consider HTTPS with session resumption to reduce TLS overhead'
      ],
      overallRisk: 'medium',
      confidence: 'high'
    },
    'firebase→supabase': {
      architectureImpact: {
        level: 'low',
        affectedComponents: ['Database Layer', 'Authentication', 'API Layer'],
        description: 'Supabase provides PostgreSQL-based backend with similar features to Firebase. Migration is relatively straightforward.',
        changes: [
          'Replace Firebase SDK with Supabase client',
          'Migrate Realtime Database to PostgreSQL tables',
          'Switch from Firebase Auth to Supabase Auth',
          'Update real-time subscriptions to Supabase Realtime',
          'Migrate Cloud Functions to Supabase Edge Functions'
        ]
      },
      dependencyImpact: {
        level: 'low',
        affectedComponents: ['Frontend data layer', 'Authentication flow', 'Real-time subscriptions'],
        description: 'Both services provide similar capabilities. Supabase offers SQL queries which may be advantageous for complex data analysis.',
        changes: [
          'Replace Firebase imports with Supabase client',
          'Rewrite database queries from NoSQL to SQL',
          'Update authentication providers configuration'
        ]
      },
      historicalEvidence: [
        {
          projectId: 'proj-2',
          projectName: 'Smart Campus Waste Management',
          description: 'Used PostgreSQL backend. SQL queries enabled complex waste pattern analysis that would be difficult with NoSQL.',
          outcome: 'Successful - SQL was advantageous',
          year: '2025'
        }
      ],
      potentialRisks: [
        'Learning curve for SQL if team only knows NoSQL',
        'Supabase free tier has different limits than Firebase',
        'Real-time performance may differ from Firebase RTDB'
      ],
      knownSuccesses: [
        'SQL enables complex queries for analytics dashboards',
        'Supabase Row Level Security provides fine-grained access control',
        'PostgreSQL extensions (PostGIS) useful for location-based features',
        'Open-source: can self-host for full control'
      ],
      knownFailures: [
        'Supabase real-time has occasional delays under heavy load'
      ],
      suggestedMitigation: [
        'Use Supabase migration tools for structured data migration',
        'Implement database connection pooling for ESP32 connections',
        'Test real-time performance under expected sensor data load'
      ],
      overallRisk: 'low',
      confidence: 'medium'
    },
    'esp32→raspberry pi': {
      architectureImpact: {
        level: 'high',
        affectedComponents: ['Edge Processing Layer', 'Firmware', 'Power System', 'Communication Layer'],
        description: 'Raspberry Pi is a full Linux SBC vs ESP32 microcontroller. Enables edge AI but dramatically increases power consumption and cost.',
        changes: [
          'Rewrite firmware from Arduino/C++ to Python/Linux',
          'Add Linux OS management and updates',
          'Implement edge AI processing capabilities',
          'Redesign power system for higher consumption',
          'Add proper shutdown handling',
          'Implement containerized services'
        ]
      },
      dependencyImpact: {
        level: 'high',
        affectedComponents: ['Power supply', 'Firmware stack', 'Deployment process', 'Cost structure'],
        description: 'Complete platform change affecting power, cost, deployment, and firmware architecture.',
        changes: [
          'Replace Arduino IDE toolchain with Python/Linux development',
          'Add OS-level dependency management',
          'Implement OTA updates for Linux',
          'Redesign PCB/housing for Raspberry Pi form factor'
        ]
      },
      historicalEvidence: [
        {
          projectId: 'proj-6',
          projectName: 'Flood Monitoring System',
          description: 'Used Raspberry Pi 4 for 4G connectivity and edge processing. Higher power consumption required larger solar panels.',
          outcome: 'Successful but expensive',
          year: '2025'
        },
        {
          projectId: 'proj-3',
          projectName: 'AI Crop Disease Detection',
          description: 'Used Raspberry Pi for edge inference of TensorFlow Lite model. Enabled offline disease detection.',
          outcome: 'Successful for AI edge computing',
          year: '2025'
        }
      ],
      potentialRisks: [
        '5-10x increase in power consumption',
        '3-4x increase in hardware cost per node',
        'SD card corruption risk in field deployments',
        'Longer boot time (30-60s vs instant)',
        'Linux security updates required'
      ],
      knownSuccesses: [
        'Enables edge AI/ML inference',
        'Full Linux ecosystem available',
        'Camera and GPU support for computer vision',
        'Better connectivity options (4G, Ethernet)',
        'Easier remote management via SSH'
      ],
      knownFailures: [
        'SD card failures in 3 IoT projects within 6 months',
        'Power supply issues in solar-powered deployments'
      ],
      suggestedMitigation: [
        'Use industrial eMMC storage instead of SD card',
        'Implement UPS with graceful shutdown',
        'Use Raspberry Pi Zero 2 W for lower power if full Pi not needed',
        'Implement read-only filesystem with overlay for reliability',
        'Use Docker for reproducible deployment'
      ],
      overallRisk: 'high',
      confidence: 'high'
    }
  };

  return results[key] || {
    architectureImpact: {
      level: 'medium',
      affectedComponents: ['Component being replaced', 'Connected components'],
      description: `Replacing ${from} with ${to} would affect the system architecture. Limited historical evidence available.`,
      changes: [`Replace ${from} implementation with ${to}`, 'Update dependent components', 'Test integration points']
    },
    dependencyImpact: {
      level: 'medium',
      affectedComponents: ['Direct dependencies of ' + from],
      description: 'Dependencies need to be re-evaluated for compatibility with the new component.',
      changes: ['Review API compatibility', 'Update configuration', 'Test data flow']
    },
    historicalEvidence: [],
    potentialRisks: ['Insufficient historical data for accurate risk assessment', 'Integration complexity unknown'],
    knownSuccesses: [],
    knownFailures: [],
    suggestedMitigation: ['Conduct thorough testing before deployment', 'Implement changes incrementally', 'Maintain rollback capability'],
    overallRisk: 'medium',
    confidence: 'low'
  };
}

// ============================================================
// RECOMMENDATIONS
// ============================================================
export const demoRecommendations: Record<string, Recommendation[]> = {
  'proj-1': [
    {
      id: 'rec-1',
      type: 'warning',
      title: 'Sensor Noise Risk',
      description: '17 previous projects experienced sensor data noise issues. Median filtering has been the most successful solution.',
      evidence: [
        { id: 'ev-r1', type: 'failure', sourceProjectId: 'proj-1', sourceProjectName: 'Smart Irrigation System', description: 'Resolved with median filtering', confidence: 'high' },
        { id: 'ev-r2', type: 'failure', sourceProjectId: 'proj-4', sourceProjectName: 'IoT Air Quality Monitor', description: 'Used Kalman filter', confidence: 'high' }
      ],
      confidence: 'high',
      priority: 'high'
    },
    {
      id: 'rec-2',
      type: 'component',
      title: 'Reusable MQTT Reconnect Module',
      description: 'An MQTT auto-reconnect module from the Smart Irrigation project can be reused. It includes exponential backoff and local data buffering.',
      evidence: [
        { id: 'ev-r3', type: 'solution', sourceProjectId: 'proj-1', sourceProjectName: 'Smart Irrigation System', description: 'Auto-reconnect with exponential backoff', confidence: 'high' }
      ],
      confidence: 'high',
      priority: 'medium'
    },
    {
      id: 'rec-3',
      type: 'technology',
      title: 'Consider Edge AI for Anomaly Detection',
      description: 'Adding TensorFlow Lite on ESP32 could enable on-device anomaly detection for sensor readings.',
      evidence: [
        { id: 'ev-r4', type: 'project', sourceProjectId: 'proj-3', sourceProjectName: 'AI Crop Disease Detection', description: 'Successfully used TensorFlow Lite on Raspberry Pi for edge inference', confidence: 'medium' }
      ],
      confidence: 'medium',
      priority: 'low'
    }
  ]
};

// ============================================================
// RISK PATTERNS (Global)
// ============================================================
export const globalRiskPatterns: RiskPattern[] = [
  {
    id: 'grisk-1',
    pattern: 'Sensor Data Noise',
    description: 'Analog sensor readings affected by electrical noise from motors, relays, and other electromagnetic sources.',
    severity: 'medium',
    occurrences: 17,
    affectedDomains: ['Agriculture', 'Environment', 'Healthcare', 'Industrial IoT'],
    mitigation: 'Apply digital filtering (median, Kalman) to raw readings. Isolate sensor wiring from power lines. Use shielded cables.',
    evidence: [
      { id: 'ev-g1', type: 'failure', sourceProjectId: 'proj-1', sourceProjectName: 'Smart Irrigation System', description: 'Median filtering solved unstable moisture readings', confidence: 'high' },
      { id: 'ev-g2', type: 'failure', sourceProjectId: 'proj-4', sourceProjectName: 'IoT Air Quality Monitor', description: 'Kalman filter for gas sensor drift', confidence: 'high' },
      { id: 'ev-g3', type: 'failure', sourceProjectId: 'proj-2', sourceProjectName: 'Smart Campus Waste Management', description: 'Ultrasonic sensor false readings in rain', confidence: 'medium' }
    ]
  },
  {
    id: 'grisk-2',
    pattern: 'MQTT Connectivity Loss',
    description: 'MQTT broker connections drop under poor WiFi conditions, causing data gaps and missed commands.',
    severity: 'high',
    occurrences: 12,
    affectedDomains: ['IoT', 'Agriculture', 'Smart Campus', 'Industrial'],
    mitigation: 'Implement automatic reconnection with exponential backoff. Buffer data locally during disconnection. Use QoS 1 or 2.',
    evidence: [
      { id: 'ev-g4', type: 'failure', sourceProjectId: 'proj-1', sourceProjectName: 'Smart Irrigation System', description: 'Auto-reconnect with local buffer solved data gaps', confidence: 'high' },
      { id: 'ev-g5', type: 'failure', sourceProjectId: 'proj-5', sourceProjectName: 'Smart Helmet', description: 'BLE fallback when MQTT unavailable', confidence: 'medium' }
    ]
  },
  {
    id: 'grisk-3',
    pattern: 'IoT Power Management',
    description: 'Battery-powered IoT devices drain too quickly due to always-on WiFi and continuous sensor reading.',
    severity: 'medium',
    occurrences: 8,
    affectedDomains: ['Agriculture', 'Environment', 'Wearable', 'Remote Monitoring'],
    mitigation: 'Use deep sleep modes between readings. Batch sensor data before transmission. Use solar panels with LiPo batteries.',
    evidence: [
      { id: 'ev-g6', type: 'failure', sourceProjectId: 'proj-1', sourceProjectName: 'Smart Irrigation System', description: 'Deep sleep extended battery from 18h to 12 days', confidence: 'high' }
    ]
  },
  {
    id: 'grisk-4',
    pattern: 'ML Model Domain Gap',
    description: 'Machine learning models trained on clean/lab data perform poorly on real-world inputs.',
    severity: 'high',
    occurrences: 5,
    affectedDomains: ['AI/ML', 'Agriculture', 'Healthcare', 'Computer Vision'],
    mitigation: 'Collect real-world training data. Use domain adaptation techniques. Apply aggressive data augmentation matching deployment conditions.',
    evidence: [
      { id: 'ev-g7', type: 'failure', sourceProjectId: 'proj-3', sourceProjectName: 'AI Crop Disease Detection', description: 'Field image accuracy improved from 72% to 92% with real data', confidence: 'high' }
    ]
  },
  {
    id: 'grisk-5',
    pattern: 'False Alarm in Detection Systems',
    description: 'Detection algorithms (fall, intrusion, anomaly) produce excessive false positives from threshold-based logic.',
    severity: 'high',
    occurrences: 6,
    affectedDomains: ['Safety', 'Security', 'Healthcare', 'Industrial'],
    mitigation: 'Use multi-phase detection algorithms. Combine multiple sensor modalities. Add confirmation timeouts.',
    evidence: [
      { id: 'ev-g8', type: 'failure', sourceProjectId: 'proj-5', sourceProjectName: 'Smart Helmet', description: 'Multi-phase fall detection reduced false alarms to <5%', confidence: 'high' }
    ]
  }
];

// ============================================================
// INSTITUTIONAL STATS
// ============================================================
export const institutionalStats: InstitutionalStats = {
  totalProjects: 8,
  totalKnowledgeChunks: 247,
  totalFailuresResolved: 7,
  totalEvolutions: 2,
  totalReusableComponents: 23,
  totalTechnologies: 42,
  topDomains: [
    { name: 'IoT', count: 6 },
    { name: 'Agriculture', count: 3 },
    { name: 'Smart Campus', count: 2 },
    { name: 'AI/ML', count: 2 },
    { name: 'Environment', count: 2 },
    { name: 'Safety', count: 1 },
    { name: 'Energy', count: 1 },
    { name: 'Navigation', count: 1 }
  ],
  topTechnologies: [
    { name: 'ESP32', count: 6 },
    { name: 'MQTT', count: 5 },
    { name: 'React', count: 5 },
    { name: 'Node.js', count: 4 },
    { name: 'Firebase', count: 3 },
    { name: 'Python', count: 3 },
    { name: 'PostgreSQL', count: 2 },
    { name: 'TensorFlow', count: 1 }
  ],
  failurePatterns: [
    { pattern: 'Sensor Data Noise', count: 17 },
    { pattern: 'MQTT Connectivity', count: 12 },
    { pattern: 'Power Management', count: 8 },
    { pattern: 'False Detection Alarms', count: 6 },
    { pattern: 'ML Domain Gap', count: 5 },
    { pattern: 'Sensor Calibration Drift', count: 3 }
  ],
  monthlyProjects: [
    { month: 'Jan', count: 2 },
    { month: 'Feb', count: 1 },
    { month: 'Mar', count: 3 },
    { month: 'Apr', count: 2 },
    { month: 'May', count: 4 },
    { month: 'Jun', count: 2 },
    { month: 'Jul', count: 3 },
    { month: 'Aug', count: 5 },
    { month: 'Sep', count: 3 },
    { month: 'Oct', count: 2 },
    { month: 'Nov', count: 4 },
    { month: 'Dec', count: 1 }
  ]
};

// ============================================================
// AI CHAT RESPONSES
// ============================================================
export function getAIChatResponse(query: string): { content: string; evidence: EvidenceItem[] } {
  const q = query.toLowerCase();

  if (q.includes('similar') || q.includes('related')) {
    return {
      content: `Based on ProjectLoop's institutional knowledge, I found **7 related projects** in our database.\n\n**Closest match:** IoT Air Quality Monitor (82% similarity)\n- Shares: ESP32, MQTT, Node.js, React\n- Common architecture: Sensor → Edge → Cloud → Dashboard\n- Common failures: Sensor noise, MQTT connectivity\n\n**Agriculture domain projects:** 3 found\n- Smart Irrigation System\n- AI Crop Disease Detection  \n- Flood Monitoring (related sensor patterns)\n\n**Key insight:** Projects using ESP32 + MQTT architecture appear in 5 of 8 projects. This is a well-tested pattern with known solutions for common problems.`,
      evidence: [
        { id: 'ai-ev-1', type: 'project', sourceProjectId: 'proj-4', sourceProjectName: 'IoT Air Quality Monitor', description: '82% similarity score', confidence: 'high' },
        { id: 'ai-ev-2', type: 'project', sourceProjectId: 'proj-1', sourceProjectName: 'Smart Irrigation System', description: 'Same domain: Agriculture', confidence: 'high' }
      ]
    };
  }

  if (q.includes('fail') || q.includes('problem') || q.includes('issue')) {
    return {
      content: `Here are the most common failure patterns from ProjectLoop's institutional memory:\n\n1. **Sensor Data Noise** — 17 occurrences\n   - Root cause: Electrical interference from motors/relays\n   - Best solution: Median filtering (95% effective)\n   - Affected domains: Agriculture, Environment, Healthcare\n\n2. **MQTT Connectivity Loss** — 12 occurrences\n   - Root cause: WiFi instability, memory leaks\n   - Best solution: Auto-reconnect with exponential backoff + local buffer\n   - Affected domains: IoT, Agriculture, Smart Campus\n\n3. **Power Management** — 8 occurrences\n   - Root cause: Always-on WiFi, continuous sensor reading\n   - Best solution: Deep sleep cycles (18h → 12 days battery life)\n\nAll solutions are backed by verified project evidence.`,
      evidence: [
        { id: 'ai-ev-3', type: 'failure', sourceProjectId: 'proj-1', sourceProjectName: 'Smart Irrigation System', description: 'Sensor noise, MQTT drops, power issues - all resolved', confidence: 'high' },
        { id: 'ai-ev-4', type: 'failure', sourceProjectId: 'proj-4', sourceProjectName: 'IoT Air Quality Monitor', description: 'Gas sensor calibration drift resolved', confidence: 'high' }
      ]
    };
  }

  if (q.includes('mqtt')) {
    return {
      content: `**MQTT in ProjectLoop's Knowledge Base:**\n\n**Used in 5 projects:**\n- Smart Irrigation System\n- IoT Air Quality Monitor\n- Smart Helmet\n- Energy Monitoring System\n- Flood Monitoring System\n\n**Known issues (12 occurrences across projects):**\n- Connection drops under poor WiFi\n- Memory leaks on ESP32 with persistent connections\n- QoS trade-offs between reliability and performance\n\n**Proven solutions:**\n- Auto-reconnect with exponential backoff (verified, high confidence)\n- Local circular buffer for data during disconnection\n- QoS 1 for critical commands, QoS 0 for sensor data\n\n**Recommendation:** If your deployment area has unreliable WiFi, implement the reconnection pattern from the Smart Irrigation project. It achieved zero data loss over 45 days despite 12 disconnections.`,
      evidence: [
        { id: 'ai-ev-5', type: 'solution', sourceProjectId: 'proj-1', sourceProjectName: 'Smart Irrigation System', description: 'MQTT auto-reconnect implementation', confidence: 'high' }
      ]
    };
  }

  if (q.includes('reuse') || q.includes('component')) {
    return {
      content: `**Reusable Components in ProjectLoop:**\n\n**Hardware Components (frequently reused):**\n- ESP32 Sensor Node — used in 6 projects\n- DHT22/BME280 Environmental Sensor — used in 4 projects\n- Relay Module for actuator control — used in 3 projects\n\n**Software Components:**\n- MQTT Client with Auto-reconnect — verified, high reusability\n- Median Filter Module — drop-in solution for sensor noise\n- React Dashboard Template — adaptable for any IoT monitoring\n- Deep Sleep Power Manager — ESP32 power optimization module\n\n**Architecture Patterns:**\n- Sensor → ESP32 → MQTT → Cloud → Dashboard (5 projects)\n- Multi-phase Detection Algorithm (2 projects)\n- Humidity-aware Sensor Calibration (2 projects)\n\nAll components have been tested in production projects and have associated documentation.`,
      evidence: [
        { id: 'ai-ev-6', type: 'project', sourceProjectId: 'proj-1', sourceProjectName: 'Smart Irrigation System', description: 'Multiple reusable components available', confidence: 'high' }
      ]
    };
  }

  if (q.includes('risk') || q.includes('warning')) {
    return {
      content: `**Risk Analysis from ProjectLoop's Institutional Knowledge:**\n\n⚠️ **High Risk Patterns:**\n1. MQTT Connectivity Loss (12 occurrences) — Implement auto-reconnect early\n2. ML Model Domain Gap (5 occurrences) — Collect real-world training data\n3. False Detection Alarms (6 occurrences) — Use multi-phase detection\n\n⚡ **Medium Risk Patterns:**\n1. Sensor Data Noise (17 occurrences) — Plan for filtering from day one\n2. IoT Power Management (8 occurrences) — Design for deep sleep\n3. Sensor Calibration Drift (3 occurrences) — Implement auto-calibration\n\nAll risk assessments are based on historical evidence from ProjectLoop projects. Mitigation strategies have been verified by faculty.`,
      evidence: [
        { id: 'ai-ev-7', type: 'failure', sourceProjectId: 'proj-1', sourceProjectName: 'Smart Irrigation System', description: 'Multiple risk patterns documented', confidence: 'high' }
      ]
    };
  }

  if (q.includes('evolve') || q.includes('evolution') || q.includes('improve')) {
    return {
      content: `**Project Evolution Paths in ProjectLoop:**\n\n**Existing Evolutions:**\n1. Smart Irrigation → AI Crop Disease Detection\n   - Added: Computer vision, ML model, mobile app\n   - Retained: Sensor processing patterns, cloud architecture\n\n2. IoT Air Quality Monitor → Flood Monitoring\n   - Adapted: Distributed sensor network for water levels\n   - Added: SMS alerts, predictive modeling\n   - Upgraded: ESP32 → Raspberry Pi for 4G\n\n**Suggested Evolution Paths:**\n- Smart Irrigation + AI Disease Detection → **Predictive Agriculture Platform**\n- Energy Monitor + Air Quality → **Smart Building Management**\n- Smart Helmet + Navigation → **Worker Safety & Tracking**\n\nTo create an evolution, select a parent project and describe the mutation you want to make.`,
      evidence: [
        { id: 'ai-ev-8', type: 'project', sourceProjectId: 'proj-1', sourceProjectName: 'Smart Irrigation System', description: 'Evolved to AI Crop Disease Detection', confidence: 'high' }
      ]
    };
  }

  if (q.includes('sensor noise') || q.includes('sensor reading')) {
    return {
      content: `**Sensor Noise — Complete Institutional Knowledge:**\n\n**Occurrences:** 17 projects across multiple domains\n\n**Root Causes Identified:**\n- Electrical interference from motors/relays (most common)\n- Poor wiring and grounding\n- Environmental factors (rain, temperature)\n- ADC resolution limitations\n\n**Solutions Ranked by Effectiveness:**\n1. **Median Filtering** — 95% effective (Smart Irrigation System) ✅ Verified\n2. **Kalman Filtering** — 90% effective (IoT Air Quality Monitor) ✅ Verified\n3. **Hardware shielding + software filtering** — 88% effective (Waste Management)\n4. **Simple averaging** — 60% effective (multiple projects) ❌ Not recommended alone\n\n**Recommendation:** Start with median filtering (window size 11). If your application requires prediction, consider Kalman filter. Always combine with proper hardware shielding.`,
      evidence: [
        { id: 'ai-ev-9', type: 'solution', sourceProjectId: 'proj-1', sourceProjectName: 'Smart Irrigation System', description: 'Median filtering - verified solution', confidence: 'high' },
        { id: 'ai-ev-10', type: 'solution', sourceProjectId: 'proj-4', sourceProjectName: 'IoT Air Quality Monitor', description: 'Kalman filter implementation', confidence: 'high' }
      ]
    };
  }

  return {
    content: `I searched ProjectLoop's institutional knowledge for "${query}" but couldn't find enough specific historical evidence to provide a confident answer.\n\n**What I can help with:**\n- Finding similar projects\n- Historical failure patterns and solutions\n- Technology comparisons from past projects\n- Reusable components\n- Risk analysis for your architecture\n- Project evolution suggestions\n\nTry asking about specific technologies (ESP32, MQTT, Firebase), problems (sensor noise, connectivity), or domains (Agriculture, IoT, AI).`,
    evidence: []
  };
}

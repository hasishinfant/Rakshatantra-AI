# Design Document: RakshaTantra AI Worker Safety Experience System

## Overview

The RakshaTantra AI Worker Safety Experience System is a real-time, event-driven web application that provides workers with an engaging, gamified safety monitoring interface. The system architecture follows a modular design with clear separation between data management, UI components, camera integration, and AI services.

The system operates on an event-driven architecture where camera detection events trigger a cascade of updates: risk score calculations, credit adjustments, alert generation, voice notifications, and UI updates. All state changes are persisted immediately to ensure data integrity.

Key design principles:
- **Real-time responsiveness**: All updates must occur within 500ms of detection
- **Multilingual by default**: All text and voice outputs support English, Hindi, and Kannada
- **Gamification-first**: Credit system motivates positive behavior
- **Accessibility**: Voice alerts ensure workers don't need to watch screens constantly
- **Resilience**: Graceful degradation when services fail

## Architecture

The system follows a layered architecture with the following components:

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Worker Cards │  │  AI Assistant │  │ Alerts Panel │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                   Application Layer                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │Credit Manager│  │ Alert Manager│  │ Voice Service│  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                      Data Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │Worker Store  │  │  Alert Store │  │  Event Log   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                   Integration Layer                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │Camera System │  │  AI Service  │  │  TTS Engine  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Component Responsibilities

**Presentation Layer:**
- Worker Cards: Display worker information with flip animations
- AI Assistant: Chat interface for worker queries
- Alerts Panel: Display recent notifications
- Dashboard: Orchestrate layout and real-time updates

**Application Layer:**
- Credit Manager: Calculate and update safety credits based on violations
- Alert Manager: Create, queue, and manage alerts
- Voice Service: Generate and play multilingual voice alerts
- Risk Calculator: Compute risk scores from violation events

**Data Layer:**
- Worker Store: Persist worker state (credits, risk scores, preferences)
- Alert Store: Persist alert history
- Event Log: Record all camera detection events

**Integration Layer:**
- Camera System: Interface with AI camera detection
- AI Service: Process natural language queries
- TTS Engine: Convert text to speech in multiple languages

## Components and Interfaces

### 1. Worker Card Component

**Purpose:** Display worker safety information with interactive flip animation

**Interface:**
```typescript
interface WorkerCardProps {
  workerId: string;
  name: string;
  riskScore: number;
  safetyCredits: number;
  status: 'Safe' | 'Warning' | 'Risk';
  lastAlert: Alert | null;
  riskHistory: RiskHistoryEntry[];
  behaviorInsights: string[];
}

interface WorkerCardComponent {
  render(): HTMLElement;
  flip(): void;
  updateRiskScore(newScore: number): void;
  updateCredits(newCredits: number): void;
  updateStatus(newStatus: 'Safe' | 'Warning' | 'Risk'): void;
}
```

**Behavior:**
- Renders front side by default showing name, ID, status, risk score, credits
- Flips to back side on click/hover showing history and insights
- Animates score and credit changes with smooth transitions
- Color-codes status: green (Safe), yellow (Warning), red (Risk)
- Updates within 500ms of state changes

### 2. Credit Manager

**Purpose:** Manage safety credit calculations and updates

**Interface:**
```typescript
interface CreditManager {
  initializeWorker(workerId: string): void;
  awardSafeBehaviorCredits(workerId: string): void;
  deductCredits(workerId: string, violationType: ViolationType): void;
  getCredits(workerId: string): number;
}

enum ViolationType {
  HelmetMissing = 'helmet_missing',
  Fatigue = 'fatigue',
  Inactivity = 'inactivity'
}

const CREDIT_RULES = {
  INITIAL_CREDITS: 100,
  SAFE_BEHAVIOR_REWARD: 10,  // per hour
  HELMET_MISSING_PENALTY: 15,
  FATIGUE_PENALTY: 10,
  INACTIVITY_PENALTY: 5,
  MINIMUM_CREDITS: 0
};
```

**Behavior:**
- Initializes new workers with 100 credits
- Awards 10 credits per hour of safe behavior
- Deducts credits based on violation type
- Prevents credits from going below 0
- Persists credit changes immediately
- Emits events on credit changes for UI updates

### 3. Alert Manager

**Purpose:** Create, queue, and manage safety alerts

**Interface:**
```typescript
interface Alert {
  id: string;
  workerId: string;
  timestamp: Date;
  violationType: ViolationType;
  severity: 'Warning' | 'Risk';
  message: string;
  language: Language;
}

interface AlertManager {
  createAlert(workerId: string, violation: ViolationType, severity: 'Warning' | 'Risk'): Alert;
  getAlertHistory(workerId: string, limit: number): Alert[];
  getRecentAlerts(limit: number): Alert[];
  markAlertAsRead(alertId: string): void;
}
```

**Behavior:**
- Creates alerts with unique IDs and timestamps
- Color-codes alerts: yellow (Warning), red (Risk)
- Stores alerts in persistent storage
- Returns alerts in reverse chronological order
- Limits history queries to prevent performance issues

### 4. Voice Service

**Purpose:** Generate and play multilingual voice alerts

**Interface:**
```typescript
interface VoiceService {
  playAlert(alert: Alert): Promise<void>;
  setVolume(level: number): void;
  getVolume(): number;
  queueAlert(alert: Alert): void;
  clearQueue(): void;
}

interface TTSEngine {
  synthesize(text: string, language: Language): Promise<AudioBuffer>;
  play(audio: AudioBuffer): Promise<void>;
}
```

**Behavior:**
- Generates speech from alert text in worker's language
- Queues multiple alerts to prevent overlap
- Plays alerts sequentially with 500ms gap
- Allows volume adjustment (0-100)
- Handles TTS failures gracefully (falls back to visual-only alerts)

### 5. AI Assistant

**Purpose:** Provide multilingual chat interface for worker queries

**Interface:**
```typescript
interface AIAssistant {
  sendMessage(workerId: string, message: string, language: Language): Promise<string>;
  getConversationHistory(workerId: string): Message[];
  clearHistory(workerId: string): void;
}

interface Message {
  id: string;
  sender: 'worker' | 'assistant';
  text: string;
  timestamp: Date;
  language: Language;
}

interface AIService {
  processQuery(query: string, context: WorkerContext, language: Language): Promise<string>;
}
```

**Behavior:**
- Accepts queries in English, Hindi, or Kannada
- Responds within 2 seconds
- Maintains conversation history per worker session
- Provides context-aware responses using worker's current state
- Handles queries about: safety status, risk explanation, improvement suggestions

**Query Handling:**
- Safety status queries: Return current risk score and status with explanation
- Risk explanation queries: Detail recent violations and contributing factors
- Improvement queries: Provide actionable safety recommendations

### 6. Camera Integration Handler

**Purpose:** Process camera detection events and trigger system updates

**Interface:**
```typescript
interface CameraEvent {
  workerId: string;
  eventType: 'ppe_violation' | 'fatigue_detected' | 'inactivity_detected';
  timestamp: Date;
  confidence: number;
  metadata: Record<string, any>;
}

interface CameraIntegrationHandler {
  onDetectionEvent(event: CameraEvent): void;
  subscribeToEvents(callback: (event: CameraEvent) => void): void;
  logEvent(event: CameraEvent): void;
}
```

**Behavior:**
- Subscribes to camera system detection events
- Processes events within 500ms
- Updates risk scores based on violation type
- Triggers credit deductions
- Creates alerts
- Initiates voice notifications
- Logs all events for audit trail
- Handles multiple simultaneous events independently

### 7. Risk Calculator

**Purpose:** Calculate and update worker risk scores

**Interface:**
```typescript
interface RiskCalculator {
  calculateRiskScore(workerId: string, violations: Violation[]): number;
  updateRiskScore(workerId: string, newViolation: Violation): number;
  getRiskLevel(score: number): 'Safe' | 'Warning' | 'Risk';
}

interface Violation {
  type: ViolationType;
  timestamp: Date;
  severity: number;
}

const RISK_THRESHOLDS = {
  SAFE_MAX: 30,
  WARNING_MAX: 70,
  RISK_MIN: 71
};
```

**Behavior:**
- Calculates risk scores from 0-100
- Weights recent violations more heavily (exponential decay)
- Maps scores to status levels: Safe (0-30), Warning (31-70), Risk (71-100)
- Triggers high risk alerts when score exceeds 70
- Persists score updates immediately

### 8. Dashboard Orchestrator

**Purpose:** Coordinate layout and real-time updates across all components

**Interface:**
```typescript
interface Dashboard {
  initialize(): void;
  addWorkerCard(worker: Worker): void;
  removeWorkerCard(workerId: string): void;
  updateWorkerCard(workerId: string, updates: Partial<WorkerCardProps>): void;
  showAlert(alert: Alert): void;
  updateCameraFeed(stream: MediaStream): void;
}
```

**Behavior:**
- Renders responsive grid layout for worker cards
- Displays live camera feed panel
- Shows alerts panel with recent notifications
- Embeds AI assistant chat panel
- Updates all components without page refresh
- Maintains 60 FPS animation performance
- Allows panel expansion/collapse

## Data Models

### Worker Model

```typescript
interface Worker {
  id: string;
  name: string;
  riskScore: number;
  safetyCredits: number;
  status: 'Safe' | 'Warning' | 'Risk';
  languagePreference: Language;
  lastAlertId: string | null;
  riskHistory: RiskHistoryEntry[];
  behaviorInsights: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface RiskHistoryEntry {
  timestamp: Date;
  score: number;
  status: 'Safe' | 'Warning' | 'Risk';
}

enum Language {
  English = 'en',
  Hindi = 'hi',
  Kannada = 'kn'
}
```

**Validation Rules:**
- `id`: Required, unique, non-empty string
- `name`: Required, non-empty string
- `riskScore`: Required, number between 0-100
- `safetyCredits`: Required, number >= 0
- `status`: Required, one of 'Safe', 'Warning', 'Risk'
- `languagePreference`: Required, one of Language enum values

**Storage:**
- Persisted to browser localStorage or IndexedDB
- Serialized as JSON
- Indexed by worker ID for fast lookups

### Alert Model

```typescript
interface Alert {
  id: string;
  workerId: string;
  timestamp: Date;
  violationType: ViolationType;
  severity: 'Warning' | 'Risk';
  message: string;
  language: Language;
  isRead: boolean;
}
```

**Validation Rules:**
- `id`: Required, unique, non-empty string
- `workerId`: Required, must reference existing worker
- `timestamp`: Required, valid Date object
- `violationType`: Required, one of ViolationType enum values
- `severity`: Required, one of 'Warning', 'Risk'
- `message`: Required, non-empty string
- `language`: Required, one of Language enum values

**Storage:**
- Persisted to browser localStorage or IndexedDB
- Stored in reverse chronological order
- Limited to most recent 1000 alerts per worker

### Camera Event Model

```typescript
interface CameraEvent {
  id: string;
  workerId: string;
  eventType: 'ppe_violation' | 'fatigue_detected' | 'inactivity_detected';
  timestamp: Date;
  confidence: number;
  metadata: {
    violationDetails?: string;
    imageSnapshot?: string;
    cameraId?: string;
  };
}
```

**Validation Rules:**
- `id`: Required, unique, non-empty string
- `workerId`: Required, must reference existing worker
- `eventType`: Required, one of specified event types
- `timestamp`: Required, valid Date object
- `confidence`: Required, number between 0-1

**Storage:**
- Persisted to event log
- Retained for audit purposes
- Indexed by workerId and timestamp

### Conversation Model

```typescript
interface Conversation {
  workerId: string;
  messages: Message[];
  createdAt: Date;
  lastMessageAt: Date;
}

interface Message {
  id: string;
  sender: 'worker' | 'assistant';
  text: string;
  timestamp: Date;
  language: Language;
}
```

**Validation Rules:**
- `workerId`: Required, must reference existing worker
- `messages`: Required, array of Message objects
- `text`: Required, non-empty string
- `sender`: Required, one of 'worker', 'assistant'

**Storage:**
- Persisted per session
- Cleared on dashboard reload
- Limited to most recent 50 messages per conversation

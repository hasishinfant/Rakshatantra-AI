# RakshaTantra AI – Worker Safety Experience System
## Requirements Document

## 1. Overview

RakshaTantra AI is a modern, futuristic web application module that serves as the worker-side interface of a camera-based AI safety platform. The system focuses on real-time monitoring, intelligent alerts, and worker engagement through gamification.

### 1.1 Purpose

Create a system where each worker has a real-time digital safety identity that:
- Monitors their behavior continuously
- Alerts them instantly to safety violations
- Guides them to improve safety practices
- Rewards them through a credit system

### 1.2 Target Users

- Industrial workers in safety-critical environments
- Workers who need PPE compliance monitoring
- Multilingual workforce (English, Hindi, Kannada speakers)

## 2. User Stories

### 2.1 Worker Card Management

**As a** worker  
**I want to** see my personal safety card with real-time status  
**So that** I can monitor my safety performance and credits

**Acceptance Criteria:**
- 2.1.1 Each worker has a unique flip-style card displaying their information
- 2.1.2 Card front shows: Name, Worker ID, Safety status (Safe/Warning/Risk), Live risk score, Safety credit points
- 2.1.3 Card back shows: Risk history summary, Last alert received, Behavior insights
- 2.1.4 Cards can be flipped with smooth animation
- 2.1.5 Safety status updates in real-time based on camera detection
- 2.1.6 Risk score is calculated and displayed as a percentage (0-100)

### 2.2 Credit System

**As a** worker  
**I want to** earn and lose credits based on my safety behavior  
**So that** I am motivated to maintain safe practices

**Acceptance Criteria:**
- 2.2.1 Each worker starts with an initial credit balance (e.g., 100 points)
- 2.2.2 Credits increase for safe behavior periods
- 2.2.3 Credits decrease for helmet missing violations
- 2.2.4 Credits decrease for fatigue detection
- 2.2.5 Credits decrease for inactivity periods
- 2.2.6 Credit changes are reflected immediately on the worker card
- 2.2.7 Credit history is maintained for reporting

### 2.3 AI Assistant

**As a** worker  
**I want to** interact with an AI assistant in my preferred language  
**So that** I can get safety guidance and understand my status

**Acceptance Criteria:**
- 2.3.1 Chat interface is accessible from the dashboard
- 2.3.2 Assistant supports English, Hindi, and Kannada languages
- 2.3.3 Assistant can answer queries about current safety status
- 2.3.4 Assistant provides risk explanations when violations occur
- 2.3.5 Assistant offers improvement suggestions based on behavior patterns
- 2.3.6 Chat history is maintained during the session
- 2.3.7 Language can be switched dynamically

### 2.4 Voice Alert System

**As a** worker  
**I want to** receive spoken alerts in my language  
**So that** I am immediately aware of safety violations without looking at the screen

**Acceptance Criteria:**
- 2.4.1 Voice alerts trigger for helmet missing detection
- 2.4.2 Voice alerts trigger for fatigue detection
- 2.4.3 Voice alerts trigger for high risk situations
- 2.4.4 Alerts are spoken in the worker's selected language (English/Hindi/Kannada)
- 2.4.5 Alert volume is audible but not disruptive
- 2.4.6 Alerts do not overlap (queued if multiple occur)

### 2.5 Notification System

**As a** worker  
**I want to** see visual notifications alongside voice alerts  
**So that** I have multiple ways to be informed of safety issues

**Acceptance Criteria:**
- 2.5.1 Visual alerts appear with color coding (green=safe, yellow=warning, red=risk)
- 2.5.2 Notifications display the violation type and timestamp
- 2.5.3 Alert history is stored and viewable
- 2.5.4 Notifications auto-dismiss after a configurable duration
- 2.5.5 Critical alerts require acknowledgment before dismissing

### 2.6 Camera Integration

**As a** system  
**I want to** process camera feed to detect safety violations  
**So that** workers can be alerted in real-time

**Acceptance Criteria:**
- 2.6.1 System detects PPE violations (helmet missing)
- 2.6.2 System detects worker fatigue indicators
- 2.6.3 Risk score updates based on detection results
- 2.6.4 Worker status changes based on violations (Safe → Warning → Risk)
- 2.6.5 Alerts trigger instantly upon detection
- 2.6.6 Camera feed displays in real-time on dashboard
- 2.6.7 Detection confidence scores are tracked

### 2.7 Dashboard Layout

**As a** worker  
**I want to** view all safety information in a unified dashboard  
**So that** I can monitor my status and interact with the system efficiently

**Acceptance Criteria:**
- 2.7.1 Dashboard displays a grid of worker cards
- 2.7.2 Live camera feed is visible on the dashboard
- 2.7.3 Alerts panel shows recent and active notifications
- 2.7.4 AI assistant panel is accessible from the dashboard
- 2.7.5 Layout is responsive and adapts to different screen sizes
- 2.7.6 All panels update in real-time without page refresh

### 2.8 UI Design

**As a** worker  
**I want to** use a modern, intuitive interface  
**So that** the system is engaging and easy to use

**Acceptance Criteria:**
- 2.8.1 Dark futuristic theme is applied throughout
- 2.8.2 Smooth animations enhance user interactions
- 2.8.3 Cards are interactive with hover and flip effects
- 2.8.4 Real-time updates occur smoothly without jarring transitions
- 2.8.5 Typography is clear and readable
- 2.8.6 Color scheme follows safety conventions (green/yellow/red)

## 3. Non-Functional Requirements

### 3.1 Performance
- Camera feed processing should occur with < 500ms latency
- UI updates should render within 100ms of data changes
- Voice alerts should trigger within 1 second of detection

### 3.2 Usability
- System should be operable by workers with minimal training
- Multilingual support must be seamless and accurate
- Interface should work on tablets and desktop displays

### 3.3 Reliability
- System should handle camera feed interruptions gracefully
- Alert system must not miss critical safety violations
- Credit calculations must be accurate and auditable

### 3.4 Scalability
- Dashboard should support monitoring 10-50 workers simultaneously
- System should handle continuous operation during work shifts

## 4. Technical Constraints

- Built using React and modern web technologies
- Must integrate with existing camera/MediaPipe infrastructure
- Should work in industrial environments with standard network connectivity
- Browser-based speech synthesis for voice alerts

## 5. Future Enhancements

- Mobile app version for workers
- Biometric authentication
- Advanced analytics and trend reporting
- Integration with wearable safety devices
- Supervisor override and intervention features

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  MessageSquare, Send, Sparkles, AlertTriangle, CheckCircle2,
  FolderKanban, Dna, ArrowRight, RefreshCw, Zap, Shield,
  Bot, User, ExternalLink, Lightbulb, HelpCircle, ChevronRight
} from 'lucide-react';
import { demoProjects, demoFailures, demoDNA } from '@/lib/demo-data';
import { EvidenceItem } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  evidence?: EvidenceItem[];
  recommendations?: string[];
  risks?: string[];
  timestamp: string;
}

const presetQueries = [
  {
    title: 'Why did ESP32 camera streaming fail?',
    query: 'Why did the ESP32 camera streaming fail in past projects, and what solution worked?',
    icon: AlertTriangle,
    category: 'Failures & Solutions'
  },
  {
    title: 'Best stack for Smart Agriculture IoT',
    query: 'What is the proven institutional architecture and sensor stack for Smart Agriculture / Hydroponics?',
    icon: Dna,
    category: 'Architecture DNA'
  },
  {
    title: 'LoRaWAN packet loss prevention',
    query: 'What solutions succeeded when students faced high packet drop rates in long-range LoRa networks?',
    icon: Shield,
    category: 'Networking & Risks'
  },
  {
    title: 'Reusable Auth & Microservices',
    query: 'Which projects have production-ready reusable auth services and Docker compose setups?',
    icon: Zap,
    category: 'Reusability'
  }
];

export default function AssistantPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Hello! I am **ProjectLoop Intelligence** — your institutional co-pilot grounded in years of student engineering journeys, documented failure memory, and verified architectural decisions.

How can I help accelerate your project today? You can ask about prior failures, proven technology stacks, reusable modules, or simulate risks before you write code.`,
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate grounded response generation based on the query
    setTimeout(() => {
      let botResponse: ChatMessage;
      const lower = query.toLowerCase();

      if (lower.includes('esp32') || lower.includes('camera') || lower.includes('streaming')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: `Based on **Project Loop Institutional Memory**, 2 previous cohorts attempted live video streaming using the OV2640 camera on ESP32-CAM boards:

### ⚠️ Documented Failure Analysis:
- **Root Cause:** ESP32 internal SRAM (520KB) experienced buffer overrun when capturing JPEG frames higher than QVGA (320x240) at >10 FPS while concurrently managing WiFi TCP sockets.
- **Failed Approaches:** Increasing frame rate to 15 FPS caused brownout resets due to sudden 350mA current spikes on the 3.3V rail.
- **Verified Working Solution:** 
  1. Downsample resolution to **QVGA with JPEG quality index 12**.
  2. Implement an on-device circular ring buffer with FreeRTOS semaphore synchronization.
  3. Offload stream relaying to an intermediate lightweight Go WebSocket bridge.`,
          evidence: [
            {
              id: 'ev-1',
              type: 'failure',
              sourceProjectId: 'proj-1',
              sourceProjectName: 'Smart Hydroponics IoT System',
              description: 'ESP32 Camera Buffer Overrun during live stream broadcast',
              confidence: 'high'
            },
            {
              id: 'ev-2',
              type: 'solution',
              sourceProjectId: 'proj-1',
              sourceProjectName: 'Smart Hydroponics IoT System',
              description: 'Resolution throttling + FreeRTOS ring-buffer queue',
              confidence: 'high'
            }
          ],
          recommendations: [
            'Add 1000uF electrolytic capacitor on the 5V power supply rail close to the ESP32-CAM module to prevent voltage drop.',
            'Use dual-core task pinning (xTaskCreatePinnedToCore) to dedicate Core 0 exclusively to WiFi stack.'
          ],
          risks: [
            'Do not use HTTP MJPEG streaming directly to multiple browser clients; ESP32 cannot handle concurrent sockets.'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (lower.includes('agriculture') || lower.includes('hydroponic') || lower.includes('sensor')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: `Here is the **Institutional Consensus Architecture** extracted from successful AgriTech & IoT projects across 2024–2025:

### 🏛️ Proven Stack & Hardware:
- **Sensors:** Analog pH (DFRobot Industrial Pro) with isolated DC-DC converter, EC meter with temperature compensation, DHT22 (avoid DHT11 due to humidity drift).
- **Controller:** ESP32-WROOM-32E (built-in Bluetooth/WiFi) + external ADS1115 16-bit ADC for precision analog reads.
- **Ingestion & Messaging:** MQTT protocol with QoS 1 over TLS 1.3 sending telemetry packets to EMQX or Mosquitto broker.
- **Backend:** Node.js / Express microservice or FastAPI with TimescaleDB for time-series sensor data.`,
          evidence: [
            {
              id: 'ev-3',
              type: 'project',
              sourceProjectId: 'proj-1',
              sourceProjectName: 'Smart Hydroponics IoT System',
              description: 'Evolution V2 achieved 99.4% sensor telemetry uptime over 90 days',
              confidence: 'high'
            }
          ],
          recommendations: [
            'Isolate the pH and EC probes electrically using an optoisolator or separate power rails; ground loops cause noisy swings in EC values.',
            'Reuse the SensorTelemetryParser module from project Smart Hydroponics IoT System.'
          ],
          risks: [
            'DHT11 sensors degrade within 30 days in high humidity (>85%) greenhouse environments. Use BME280 or SHT31 instead.'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else if (lower.includes('lora') || lower.includes('packet') || lower.includes('network')) {
        botResponse = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: `Analyzing historical data for **LoRa / LoRaWAN packet reliability**:

### 📊 Historical Findings:
Across 3 campus-wide sensor networks, student teams initially observed **38% packet drop rates** during peak hours due to duty-cycle collisions and incorrect Spreading Factor (SF) settings.

### ✅ Institutional Resolution:
1. **Dynamic Adaptive Data Rate (ADR):** Adjusted Spreading Factor dynamically between SF7 (nearby nodes, low latency) and SF10 (distant nodes).
2. **Jittered Backoff:** Implemented exponential backoff with pseudo-random millisecond jitter to avoid synchronized broadcast collisions.
3. **Gateway Placement:** Moving the SX1302 8-channel gateway to the 4th-floor terrace improved RSSI by 22 dBm and dropped packet loss under 1.2%.`,
          evidence: [
            {
              id: 'ev-4',
              type: 'solution',
              sourceProjectId: 'proj-4',
              sourceProjectName: 'Campus Wildlife & Environmental Monitor',
              description: 'LoRaWAN ADR protocol optimization and antenna ground-plane installation',
              confidence: 'high'
            }
          ],
          recommendations: [
            'Ensure SMA antenna connector is firmly torqued with 50Ω impedance matching.',
            'Check local regulatory limits on sub-band transmission frequency (865-867 MHz or 915 MHz).'
          ],
          risks: [
            'Operating LoRa at SF12 exhausts allowable airtime duty cycle in under 100 packets per 24-hour cycle.'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: `I analyzed the repository across **${demoProjects.length} institutional projects**, **${demoFailures.length} documented failure records**, and cross-referenced your query:

> "${query}"

### 💡 Key Institutional Insights:
- **Relevant Domain:** We have precedent in both embedded IoT, cloud architectures, and machine learning pipelines.
- **Architectural Precedents:** Projects with similar scopes achieved highest completion rates by adopting clean event-driven decoupled services rather than monolithic script files.
- **Available DNA Modules:** You can import verified configuration profiles, database schemas, and hardware pinouts directly from the **Project DNA** and **Projects** tabs.`,
          evidence: [
            {
              id: 'ev-gen-1',
              type: 'project',
              sourceProjectId: demoProjects[0].id,
              sourceProjectName: demoProjects[0].name,
              description: 'Architectural match for real-time sensor processing',
              confidence: 'medium'
            },
            {
              id: 'ev-gen-2',
              type: 'failure',
              sourceProjectId: demoProjects[1].id,
              sourceProjectName: demoProjects[1].name,
              description: 'Prior memory management pattern recorded',
              confidence: 'high'
            }
          ],
          recommendations: [
            'Run the What-If Simulator before finalizing external dependencies to preview potential failure ripple effects.',
            'Document every intermediate trial in the Failure Memory tab to preserve institutional karma.'
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }

      setIsTyping(false);
      setMessages(prev => [...prev, botResponse]);
    }, 900);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-6 max-w-7xl mx-auto space-y-4">
      {/* Top Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#06b6d4] flex items-center justify-center text-white shadow-lg shadow-[#7c5cfc]/20">
              <Sparkles size={18} />
            </div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">Institutional AI Copilot</h1>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#7c5cfc]/15 text-[#7c5cfc] border border-[#7c5cfc]/30">
              Grounded in {demoProjects.length} Projects
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Answers verified by real student project attempts, historical failure memory, and benchmarked architectures.
          </p>
        </div>

        {/* Project Context Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">Context Filter:</span>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="text-xs bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-primary)] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#7c5cfc]"
          >
            <option value="all">Entire Institutional Library</option>
            {demoProjects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Chat Flow Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
        
        {/* Messages Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex gap-3 max-w-4xl',
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white shadow-md text-xs font-semibold',
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-[#3b82f6] to-[#06b6d4]'
                    : 'bg-gradient-to-br from-[#7c5cfc] to-[#a855f7]'
                )}
              >
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>

              {/* Message Box */}
              <div className="flex-1 space-y-3">
                <div
                  className={cn(
                    'p-4 rounded-2xl text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-[#7c5cfc] text-white rounded-tr-none ml-auto'
                      : 'bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-primary)] rounded-tl-none'
                  )}
                >
                  <div className="whitespace-pre-wrap font-sans text-sm space-y-2">
                    {msg.content.split('\n\n').map((paragraph, idx) => {
                      if (paragraph.startsWith('### ')) {
                        return <h3 key={idx} className="font-bold text-base mt-2 mb-1 text-[var(--text-primary)]">{paragraph.replace('### ', '')}</h3>;
                      }
                      return <p key={idx}>{paragraph}</p>;
                    })}
                  </div>

                  <div className="text-[10px] text-right mt-2 opacity-60">
                    {msg.timestamp}
                  </div>
                </div>

                {/* Grounded Evidence Citations */}
                {msg.evidence && msg.evidence.length > 0 && (
                  <div className="bg-[#7c5cfc]/5 border border-[#7c5cfc]/20 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#7c5cfc]">
                      <Sparkles size={14} />
                      <span>Grounded Institutional Citations ({msg.evidence.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.evidence.map((item, i) => (
                        <Link
                          key={i}
                          href={item.type === 'failure' ? '/failures' : `/projects/${item.sourceProjectId}`}
                          className="flex items-start gap-2 p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[#7c5cfc]/40 hover:bg-[#7c5cfc]/5 transition-colors group"
                        >
                          {item.type === 'failure' ? (
                            <AlertTriangle size={15} className="text-amber-400 mt-0.5 flex-shrink-0" />
                          ) : (
                            <FolderKanban size={15} className="text-[#3b82f6] mt-0.5 flex-shrink-0" />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-[var(--text-primary)] group-hover:text-[#7c5cfc] transition-colors truncate">
                              {item.sourceProjectName}
                            </p>
                            <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                          <ExternalLink size={12} className="text-[var(--text-muted)] group-hover:text-[#7c5cfc] flex-shrink-0 mt-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations Callout */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 size={14} />
                      <span>Verified Recommendations</span>
                    </div>
                    <ul className="text-xs space-y-1 text-[var(--text-secondary)] list-disc list-inside">
                      {msg.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Risk Alerts */}
                {msg.risks && msg.risks.length > 0 && (
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                      <AlertTriangle size={14} />
                      <span>Avoid Known Pitfall</span>
                    </div>
                    <ul className="text-xs space-y-1 text-rose-200 list-disc list-inside">
                      {msg.risks.map((risk, i) => (
                        <li key={i}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 max-w-md"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#a855f7] flex items-center justify-center text-white shadow-md">
                <Bot size={16} />
              </div>
              <div className="bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl rounded-tl-none p-3.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#7c5cfc] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#7c5cfc] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#7c5cfc] animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs text-[var(--text-muted)] ml-2">Cross-referencing institutional records...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Preset Prompt Suggestions */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--surface)]/50">
            <p className="text-[11px] font-semibold text-[var(--text-muted)] mb-2 flex items-center gap-1">
              <Lightbulb size={12} className="text-amber-400" />
              Suggested Institutional Questions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presetQueries.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.query)}
                  className="text-left p-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] hover:border-[#7c5cfc]/50 hover:bg-[#7c5cfc]/5 transition-all flex items-center justify-between group"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-medium text-[var(--text-primary)] group-hover:text-[#7c5cfc] transition-colors truncate">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)]">{item.category}</p>
                  </div>
                  <ChevronRight size={14} className="text-[var(--text-muted)] group-hover:text-[#7c5cfc] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 border-t border-[var(--border)] bg-[var(--surface)]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about project solutions, failure root causes, component reuse..."
                disabled={isTyping}
                className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#7c5cfc] focus:ring-1 focus:ring-[#7c5cfc] transition-all disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={isTyping || !inputQuery.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#7c5cfc] to-[#3b82f6] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-md shadow-[#7c5cfc]/20"
            >
              <span>Ask</span>
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

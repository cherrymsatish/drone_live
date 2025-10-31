document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Simulated Telemetry Logic ---
    const altitudeEl = document.getElementById('altitude');
    const speedEl = document.getElementById('speed');
    const batteryEl = document.getElementById('battery');
    const signalEl = document.getElementById('signal');
    const statusEl = document.getElementById('status');
    const flightTimeEl = document.getElementById('flight-time');

    let startTime = Date.now();
    let currentBattery = 98.5;
    let currentAltitude = 120.0;
    const flightStatuses = ['Operational', 'Scanning Area', 'Returning to Base', 'Holding Position'];

    // Update telemetry every 2 seconds
    setInterval(() => {
        // Simulate altitude changes
        currentAltitude += (Math.random() - 0.5) * 10;
        if (currentAltitude < 50) currentAltitude = 50;
        if (currentAltitude > 200) currentAltitude = 200;
        altitudeEl.textContent = `${currentAltitude.toFixed(1)} m`;

        // Simulate speed changes
        speedEl.textContent = `${(Math.random() * 20 + 15).toFixed(1)} km/h`;

        // Simulate slow battery drain
        currentBattery -= 0.05;
        if (currentBattery < 20) currentBattery = 99.0; // Recharge
        batteryEl.textContent = `${currentBattery.toFixed(1)} %`;
        batteryEl.className = `font-mono ${currentBattery < 30 ? 'text-red-400' : 'text-green-400'}`;

        // Simulate signal fluctuation
        signalEl.textContent = `${(Math.random() * 10 + 85).toFixed(1)} %`;

        // Simulate status changes
        statusEl.textContent = flightStatuses[Math.floor(Math.random() * flightStatuses.length)];
        
        // Update flight time
        const elapsed = new Date(Date.now() - startTime);
        const minutes = String(elapsed.getUTCMinutes()).padStart(2, '0');
        const seconds = String(elapsed.getUTCSeconds()).padStart(2, '0');
        flightTimeEl.textContent = `${minutes}:${seconds}`;

    }, 2000);
    
    // --- 2. Chatbot Logic ---
    const chatLog = document.getElementById('chat-log');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    // Function to handle chat submission
    function handleChatSubmit() {
        const message = chatInput.value.trim();
        if (message === '') return; // <-- Fixed: Removed the extra period here

        appendMessage(message, 'user');
        chatInput.value = '';

        // Simulate bot "thinking"
        appendTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            const botResponse = getBotResponse(message);
            appendMessage(botResponse, 'bot');
        }, 1000 + Math.random() * 500);
    }
    
    // Function to add a message to the chat log
    function appendMessage(message, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}-msg`;
        msgDiv.textContent = message;
        chatLog.appendChild(msgDiv);
        // Scroll to bottom
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    // Function to add a "typing..." indicator
    function appendTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'bot-msg chat-msg opacity-75';
        typingDiv.innerHTML = '<span class="animate-pulse">Bot is typing...</span>';
        chatLog.appendChild(typingDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    // Function to remove the "typing..." indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            chatLog.removeChild(indicator);
        }
    }

    // Function to generate a bot response
    function getBotResponse(text) {
        const lowerText = text.toLowerCase();

        if (lowerText.includes('hello') || lowerText.includes('hi')) {
            return 'Hello! How can I assist with drone operations today?';
        }
        
        if (lowerText.includes('help')) {
            return 'I can report on: \n- status\n- battery\n- altitude\n- speed\nI can also execute commands like "drone 2 status" (simulated).';
        }

        // --- Pulling "live" data from telemetry panel ---
        if (lowerText.includes('status')) {
            const currentStatus = document.getElementById('status').textContent;
            const currentDrone = document.getElementById('drone-id').textContent;
            return `Drone ${currentDrone} is currently ${currentStatus}.`;
        }
        
        if (lowerText.includes('battery')) {
            const currentBattery = document.getElementById('battery').textContent;
            return `Current battery level is ${currentBattery}.`;
        }
        
        if (lowerText.includes('altitude')) {
            const currentAltitude = document.getElementById('altitude').textContent;
            return `Current altitude is ${currentAltitude}.`;
        }

        if (lowerText.includes('speed')) {
            const currentSpeed = document.getElementById('speed').textContent;
            return `Current speed is ${currentSpeed}.`;
        }

        // --- Simulated commands ---
        if (lowerText.includes('drone 2') || lowerText.includes('drone 3')) {
            return `Command acknowledged. Switching to ${lowerText.includes('drone 2') ? 'Drone 2' : 'Drone 3'}... (Simulation)`;
        }
        
        if (lowerText.includes('return to base') || lowerText.includes('rtb')) {
            return 'Command acknowledged. Initiating Return-to-Base (RTB) protocol for DRN-108X... (Simulation)';
        }

        // Default response
        return 'Sorry, I did not understand that command. Type "help" for a list of options.';
    }

    // Event Listeners
    sendBtn.addEventListener('click', handleChatSubmit);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleChatSubmit();
        }
    });
});


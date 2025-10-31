document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Simulated Telemetry Logic ---
    const altitudeEl = document.getElementById('altitude');
    const speedEl = document.getElementById('speed');
    const batteryEl = document.getElementById('battery');
    const signalEl = document.getElementById('signal');
    const statusEl = document.getElementById('status');
    const flightTimeEl = document.getElementById('flight-time');
    const droneIdEl = document.getElementById('drone-id');

    let startTime = Date.now();
    let currentBattery = 98.5;
    let currentAltitude = 120.0;
    const flightStatuses = ['Operational', 'Scanning Area', 'Returning to Base', 'Holding Position'];

    // Update telemetry every 2 seconds
    setInterval(() => {
        // ... (telemetry update logic) ...
        currentAltitude += (Math.random() - 0.5) * 10;
        if (currentAltitude < 50) currentAltitude = 50;
        if (currentAltitude > 200) currentAltitude = 200;
        altitudeEl.textContent = `${currentAltitude.toFixed(1)} m`;

        speedEl.textContent = `${(Math.random() * 20 + 15).toFixed(1)} km/h`;

        currentBattery -= 0.05;
        if (currentBattery < 20) currentBattery = 99.0;
        batteryEl.textContent = `${currentBattery.toFixed(1)} %`;
        
        // Use custom classes instead of hard-coded Tailwind
        if (currentBattery < 30) {
            batteryEl.className = 'font-mono text-status-danger';
        } else {
            batteryEl.className = 'font-mono text-status-ok';
        }

        signalEl.textContent = `${(Math.random() * 10 + 85).toFixed(1)} %`;
        statusEl.textContent = flightStatuses[Math.floor(Math.random() * flightStatuses.length)];
        
        const elapsed = new Date(Date.now() - startTime);
        const minutes = String(elapsed.getUTCMinutes()).padStart(2, '0');
        const seconds = String(elapsed.getUTCSeconds()).padStart(2, '0');
        flightTimeEl.textContent = `${minutes}:${seconds}`;

    }, 2000);
    
    // --- 2. Chatbot Logic ---
    const chatLog = document.getElementById('chat-log');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    function handleChatSubmit() {
        const message = chatInput.value.trim();
        if (message === '') return; 

        appendMessage(message, 'user');
        chatInput.value = '';

        appendTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            const botResponse = getBotResponse(message);
            appendMessage(botResponse, 'bot');
        }, 1000 + Math.random() * 500);
    }
    
    function appendMessage(message, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-msg ${sender}-msg`;
        // Use textContent to prevent HTML injection
        msgDiv.textContent = message; 
        chatLog.appendChild(msgDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function appendTypingIndicator() {
        // Prevent multiple typing indicators
        if (document.getElementById('typing-indicator')) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'bot-msg chat-msg opacity-75';
        typingDiv.innerHTML = '<span class="animate-pulse">Bot is typing...</span>';
        chatLog.appendChild(typingDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            chatLog.removeChild(indicator);
        }
    }

    function getBotResponse(text) {
        const lowerText = text.toLowerCase();

        if (lowerText.includes('hello') || lowerText.includes('hi')) {
            return 'Hello! How can I assist with drone operations today?';
        }
        
        if (lowerText.includes('help')) {
            return 'I can report on: \n- status\n- battery\n- altitude\n- speed\nI can also execute commands like "drone 2 status" (simulated).';
        }

        if (lowerText.includes('status')) {
            const currentStatus = statusEl.textContent;
            const currentDrone = droneIdEl.textContent;
            return `Drone ${currentDrone} is currently ${currentStatus}.`;
        }
        
        if (lowerText.includes('battery')) {
            const currentBattery = batteryEl.textContent;
            return `Current battery level is ${currentBattery}.`;
        }
        
        if (lowerText.includes('altitude')) {
            const currentAltitude = altitudeEl.textContent;
            return `Current altitude is ${currentAltitude}.`;
        }

        if (lowerText.includes('speed')) {
            const currentSpeed = speedEl.textContent;
            return `Current speed is ${currentSpeed}.`;
        }

        if (lowerText.includes('drone 2') || lowerText.includes('drone 3')) {
            return `Command acknowledged. Switching to ${lowerText.includes('drone 2') ? 'Drone 2' : 'Drone 3'}... (Simulation)`;
        }
        
        if (lowerText.includes('return to base') || lowerText.includes('rtb')) {
            return 'Command acknowledged. Initiating Return-to-Base (RTB) protocol for DRN-108X... (Simulation)';
        }

        return 'Sorry, I did not understand that command. Type "help" for a list of options.';
    }

    sendBtn.addEventListener('click', handleChatSubmit);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleChatSubmit();
        }
    });

    // --- 3. NEW: Theme Switcher Logic ---
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add 'active' class to the clicked button
            button.classList.add('active');
            
            // Set the theme on the <body> tag
            const theme = button.id.replace('theme-btn-', 'theme-');
            document.body.className = theme;
        });
    });

});


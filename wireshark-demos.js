/**
 * Wireshark Demo Animations
 * This file contains functions to simulate Wireshark output and enhance the interactive experience
 */

// Sample packet data for demonstrations
const packetData = {
  tcp: [
    { time: '0.000000', source: '192.168.1.100', dest: '216.58.212.78', proto: 'TCP', info: 'SYN Seq=0 Win=64240' },
    { time: '0.023481', source: '216.58.212.78', dest: '192.168.1.100', proto: 'TCP', info: 'SYN, ACK Seq=0 Ack=1 Win=65535' },
    { time: '0.023762', source: '192.168.1.100', dest: '216.58.212.78', proto: 'TCP', info: 'ACK Seq=1 Ack=1 Win=64240' },
    { time: '0.024102', source: '192.168.1.100', dest: '216.58.212.78', proto: 'HTTP', info: 'GET / HTTP/1.1' },
    { time: '0.045234', source: '216.58.212.78', dest: '192.168.1.100', proto: 'HTTP', info: 'HTTP/1.1 200 OK (text/html)' },
    { time: '0.045839', source: '192.168.1.100', dest: '216.58.212.78', proto: 'TCP', info: 'ACK Seq=1 Ack=1501 Win=63680' }
  ],
  dns: [
    { time: '0.000000', source: '192.168.1.100', dest: '8.8.8.8', proto: 'DNS', info: 'Standard query A example.com' },
    { time: '0.035692', source: '8.8.8.8', dest: '192.168.1.100', proto: 'DNS', info: 'Standard query response A 93.184.216.34' }
  ],
  https: [
    { time: '0.000000', source: '192.168.1.100', dest: '216.58.212.78', proto: 'TCP', info: 'SYN Seq=0 Win=64240' },
    { time: '0.023481', source: '216.58.212.78', dest: '192.168.1.100', proto: 'TCP', info: 'SYN, ACK Seq=0 Ack=1 Win=65535' },
    { time: '0.023762', source: '192.168.1.100', dest: '216.58.212.78', proto: 'TCP', info: 'ACK Seq=1 Ack=1 Win=64240' },
    { time: '0.024102', source: '192.168.1.100', dest: '216.58.212.78', proto: 'TLSv1.2', info: 'Client Hello' },
    { time: '0.045234', source: '216.58.212.78', dest: '192.168.1.100', proto: 'TLSv1.2', info: 'Server Hello, Certificate' },
    { time: '0.045839', source: '192.168.1.100', dest: '216.58.212.78', proto: 'TLSv1.2', info: 'Client Key Exchange, Change Cipher Spec' }
  ]
};

// Live capture simulation
function simulateLiveCapture(elementId, duration = 10000) {
  const output = document.getElementById(elementId);
  const baseContent = output.innerHTML;
  output.innerHTML = "# Starting Wireshark capture...\n";
  
  setTimeout(() => {
    output.innerHTML += "# Interface: eth0\n# Filter: none\n\n";
    output.innerHTML += "No.     Time           Source                Destination           Protocol Length Info\n";
    
    let packetCount = 1;
    const interval = setInterval(() => {
      // Randomly select a protocol group
      const protocols = Object.keys(packetData);
      const randomProto = protocols[Math.floor(Math.random() * protocols.length)];
      const packets = packetData[randomProto];
      
      // Get a random packet from the selected protocol
      const packet = packets[Math.floor(Math.random() * packets.length)];
      
      // Add the packet to the output
      output.innerHTML += `${packetCount}       ${packet.time}    ${packet.source.padEnd(20)}${packet.dest.padEnd(20)}${packet.proto.padEnd(8)}${Math.floor(Math.random() * 200) + 50}     ${packet.info}\n`;
      
      // Auto-scroll to bottom
      output.scrollTop = output.scrollHeight;
      
      packetCount++;
    }, 1000);
    
    // Stop after duration
    setTimeout(() => {
      clearInterval(interval);
      output.innerHTML += "\n# Capture complete - " + packetCount + " packets captured";
      
      // Reset after a while
      setTimeout(() => {
        output.innerHTML = baseContent;
        simulateLiveCapture(elementId, duration);
      }, 5000);
    }, duration);
  }, 1000);
}

// Initialize the demo when document is ready
document.addEventListener('DOMContentLoaded', () => {
  // Start the capture simulation if the element exists
  const captureOutput = document.getElementById('capture-output');
  if (captureOutput) {
    simulateLiveCapture('capture-output');
  }
  
  // Add interactive packet visualization
  initPacketVisualizer();
});

// Packet visualizer
function initPacketVisualizer() {
  const container = document.querySelector('.packet-animation');
  if (!container) return;
  
  // Clear existing packets
  const existingPackets = container.querySelectorAll('.packet');
  existingPackets.forEach(p => p.remove());
  
  // Create animated packets
  for (let i = 0; i < 20; i++) {
    createPacket(container);
  }
  
  // Continue creating packets at intervals
  setInterval(() => {
    createPacket(container);
  }, 1000);
}

function createPacket(container) {
  const packet = document.createElement('div');
  packet.className = 'packet';
  
  // Random size for variety
  const size = Math.random() * 6 + 4;
  packet.style.width = size + 'px';
  packet.style.height = size + 'px';
  
  // Random starting position
  packet.style.top = (Math.random() * 80 + 10) + '%';
  
  // Random protocol (color)
  const protocols = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
  const color = protocols[Math.floor(Math.random() * protocols.length)];
  packet.style.backgroundColor = color;
  packet.style.boxShadow = `0 0 10px ${color}`;
  
  // Add to container
  container.appendChild(packet);
  
  // Remove after animation completes
  setTimeout(() => {
    packet.remove();
  }, 8000);
}

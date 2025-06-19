// Tool properties data
const toolProperties = {
    "Battery Disc Saw": { setupTime: "Low", skillLevel: "Basic", portability: "High" },
    "Corded Disc Saw": { setupTime: "Low", skillLevel: "Basic", portability: "Medium" },
    "Petrol Ring Saw": { setupTime: "Low", skillLevel: "Intermediate", portability: "High" },
    "Corded Ring Saw": { setupTime: "Low", skillLevel: "Intermediate", portability: "Medium" },
    "Petrol Chain Saw": { setupTime: "Low", skillLevel: "Intermediate", portability: "High" },
    "Corded Chain Saw": { setupTime: "Low", skillLevel: "Intermediate", portability: "Medium" },
    "Walk behind floor saw": { setupTime: "Low", skillLevel: "Intermediate", portability: "Medium" },
    "Automated Wall Saw": { setupTime: "High", skillLevel: "Intermediate", portability: "Very Low" },
    "Hydro blast": { setupTime: "High", skillLevel: "Advanced", portability: "Low" },
    "Blow torch": { setupTime: "Moderate", skillLevel: "Intermediate", portability: "High" },
    "Demolition Hammer": { setupTime: "Low", skillLevel: "Basic", portability: "Medium" },
    "Torque Wrench": { setupTime: "Low", skillLevel: "Basic", portability: "High" },
    "Angle Grinder": { setupTime: "Low", skillLevel: "Basic", portability: "High" },
    "Hydraulic Piston": { setupTime: "Low", skillLevel: "Basic", portability: "High" },
    "Welder": { setupTime: "Moderate", skillLevel: "Intermediate", portability: "High" },
    "Diamond Drill": { setupTime: "Low", skillLevel: "Basic", portability: "High" },
    "Impact Wrench": { setupTime: "Low", skillLevel: "Basic", portability: "High" },
    "Rotary Hammer": { setupTime: "Low", skillLevel: "Intermediate", portability: "High" }
};

// Score mappings
const setupTimeScores = { "Low": 1, "Moderate": 0.5, "High": 0 };
const skillLevelScores = { "Basic": 1, "Intermediate": 0.5, "Advanced": 0 };
const portabilityScores = { "High": 1, "Medium": 0.66, "Low": 0.33, "Very Low": 0 };

// Selected tools storage
let selectedTools = {};

// Initialize tool selection grid on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeToolSelection();
});

// Initialize tool selection grid
function initializeToolSelection() {
    const grid = document.getElementById('toolSelectionGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    const toolList = Object.keys(toolProperties);
    
    toolList.forEach(tool => {
        const id = tool.replace(/\s+/g, '_').toLowerCase();
        const toolItem = document.createElement('div');
        toolItem.className = 'tool-item';
        toolItem.innerHTML = `
            <div class="tool-header">
                <input type="checkbox" id="tool_${id}" class="tool-checkbox" />
                <label for="tool_${id}" class="tool-label">${tool}</label>
            </div>
            <div class="tool-properties">
                Setup: ${toolProperties[tool].setupTime} |
                Skill: ${toolProperties[tool].skillLevel} |
                Portability: ${toolProperties[tool].portability}
            </div>
            <div id="time_input_${id}" class="time-input hidden">
                <label>Time (minutes):</label>
                <input type="number" id="time_${id}" min="0" step="0.1">
            </div>
        `;
        
        grid.appendChild(toolItem);
        
        // Add event listener to checkbox
        const checkbox = document.getElementById('tool_' + id);
        checkbox.addEventListener('change', () => toggleTool(tool));
    });
}

// Toggle tool selection
function toggleTool(tool) {
    const id = tool.replace(/\s+/g, '_').toLowerCase();
    const checkbox = document.getElementById('tool_' + id);
    const timeInputDiv = document.getElementById('time_input_' + id);
    const toolItem = checkbox.closest('.tool-item');
    
    if (checkbox.checked) {
        selectedTools[tool] = {
            time: 0,
            properties: toolProperties[tool]
        };
        timeInputDiv.classList.remove('hidden');
        toolItem.classList.add('selected');
    } else {
        delete selectedTools[tool];
        timeInputDiv.classList.add('hidden');
        toolItem.classList.remove('selected');
        document.getElementById('time_' + id).value = '';
    }
    
    updateSelectedToolsDisplay();
}

// Update selected tools display
function updateSelectedToolsDisplay() {
    const propertiesDisplay = document.getElementById('toolPropertiesDisplay');
    const propertiesList = document.getElementById('toolPropertiesList');
    
    if (Object.keys(selectedTools).length > 0) {
        propertiesDisplay.classList.remove('hidden');
        let html = '<div><strong>Selected Tools:</strong></div>';
        
        Object.keys(selectedTools).forEach(tool => {
            const properties = selectedTools[tool].properties;
            html += `
                <div class="tool-property-item">
                    <strong>${tool}</strong><br>
                    Setup: ${properties.setupTime} (${setupTimeScores[properties.setupTime]}) | 
                    Skill: ${properties.skillLevel} (${skillLevelScores[properties.skillLevel]}) | 
                    Portability: ${properties.portability} (${portabilityScores[properties.portability]})
                </div>
            `;
        });
        
        propertiesList.innerHTML = html;
    } else {
        propertiesDisplay.classList.add('hidden');
    }
}

// Update disassembly parameters
function updateDisassemblyParameters() {
    const connectionType = document.getElementById('disassemblyConnectionType').value;
    const connectorsGroup = document.getElementById('connectorsGroup');
    const subParametersDisplay = document.getElementById('disassemblySubParameters');
    const subParametersList = document.getElementById('subParametersList');
    
    if (connectionType) {
        subParametersDisplay.classList.remove('hidden');
        
        if (connectionType === 'Cementitious') {
            connectorsGroup.style.display = 'none';
            subParametersList.innerHTML = `
                <div><strong>Setup Time:</strong> Weight 0.22</div>
                <div><strong>Skill Level:</strong> Weight 0.50</div>
                <div><strong>Portability:</strong> Weight 0.28</div>
                <div style="margin-top: 10px; color: #666; font-style: italic;">
                    Formula: Σ(score × time) / Σ(time) for each parameter
                </div>
            `;
        } else {
            connectorsGroup.style.display = 'flex';
            subParametersList.innerHTML = `
                <div><strong>Setup Time:</strong> Weight 0.15</div>
                <div><strong>Skill Level:</strong> Weight 0.48</div>
                <div><strong>Portability:</strong> Weight 0.22</div>
                <div><strong>Number of Connectors:</strong> Weight 0.15</div>
                <div style="margin-top: 10px; color: #666; font-style: italic;">
                    Formula: Σ(score × time) / Σ(time) for each parameter
                </div>
            `;
        }
    } else {
        connectorsGroup.style.display = 'none';
        subParametersDisplay.classList.add('hidden');
    }
}

// Calculate ease of disassembly
function calculateEaseOfDisassembly() {
    try {
        const connectionType = document.getElementById('disassemblyConnectionType').value;
        const numberOfConnectors = parseFloat(document.getElementById('numberOfConnectors').value) || 0;
        
        if (!connectionType || Object.keys(selectedTools).length === 0) {
            alert('Please select at least one tool and connection type');
            return;
        }
        
        // Collect tool times
        let totalTime = 0;
        let weightedSetupTime = 0;
        let weightedSkillLevel = 0;
        let weightedPortability = 0;
        
        Object.keys(selectedTools).forEach(tool => {
            const id = tool.replace(/\s+/g, '_').toLowerCase();
            const time = parseFloat(document.getElementById('time_' + id).value) || 0;
            
            if (time <= 0) {
                alert(`Please enter time for ${tool}`);
                throw new Error('Missing time input');
            }
            
            selectedTools[tool].time = time;
            totalTime += time;
            
            const props = selectedTools[tool].properties;
            weightedSetupTime += setupTimeScores[props.setupTime] * time;
            weightedSkillLevel += skillLevelScores[props.skillLevel] * time;
            weightedPortability += portabilityScores[props.portability] * time;
        });
        
        // Calculate weighted averages
        const avgSetupTime = weightedSetupTime / totalTime;
        const avgSkillLevel = weightedSkillLevel / totalTime;
        const avgPortability = weightedPortability / totalTime;
        
        let score = 0;
        let details = '';
        
        if (connectionType === 'Cementitious') {
            // Weights for cementitious: 0.22, 0.50, 0.28
            score = (avgSetupTime * 0.22) + (avgSkillLevel * 0.50) + (avgPortability * 0.28);
            
            details = `
                <div><strong>Calculation (Cementitious Connection):</strong></div>
                <div>Score = (Setup Time × 0.22) + (Skill Level × 0.50) + (Portability × 0.28)</div>
                <div>Score = (${avgSetupTime.toFixed(3)} × 0.22) + (${avgSkillLevel.toFixed(3)} × 0.50) + (${avgPortability.toFixed(3)} × 0.28)</div>
                <div>Score = ${score.toFixed(4)}</div>
                <div style="margin-top: 10px;">
                    <strong>Tools Used:</strong><br>
            `;
            
            Object.keys(selectedTools).forEach(tool => {
                details += `${tool}: ${selectedTools[tool].time} minutes<br>`;
            });
            
            details += `
                    <strong>Total Time:</strong> ${totalTime} minutes<br>
                    <strong>Weighted Averages:</strong><br>
                    Setup Time: ${avgSetupTime.toFixed(3)}<br>
                    Skill Level: ${avgSkillLevel.toFixed(3)}<br>
                    Portability: ${avgPortability.toFixed(3)}
                </div>
            `;
        } else {
            // Calculate connector score
            let connectorScore = 1;
            if (connectionType === 'Other') {
                connectorScore = 1;
            } else if (connectionType === 'Screw' || connectionType === 'Bolt') {
                if (numberOfConnectors <= 2) {
                    connectorScore = 1;
                } else if (numberOfConnectors === 3 || numberOfConnectors === 5) {
                    connectorScore = 0.95;
                } else {
                    connectorScore = 0.9;
                }
            }
            
            // Weights for screw/bolt/other: 0.15, 0.48, 0.22, 0.15
            score = (avgSetupTime * 0.15) + (avgSkillLevel * 0.48) + (avgPortability * 0.22) + (connectorScore * 0.15);
            
            details = `
                <div><strong>Calculation (${connectionType} Connection):</strong></div>
                <div>Score = (Setup Time × 0.15) + (Skill Level × 0.48) + (Portability × 0.22) + (Connectors × 0.15)</div>
                <div>Score = (${avgSetupTime.toFixed(3)} × 0.15) + (${avgSkillLevel.toFixed(3)} × 0.48) + (${avgPortability.toFixed(3)} × 0.22) + (${connectorScore} × 0.15)</div>
                <div>Score = ${score.toFixed(4)}</div>
                <div style="margin-top: 10px;">
                    <strong>Tools Used:</strong><br>
            `;
            
            Object.keys(selectedTools).forEach(tool => {
                details += `${tool}: ${selectedTools[tool].time} minutes<br>`;
            });
            
            details += `
                    <strong>Total Time:</strong> ${totalTime} minutes<br>
                    <strong>Number of Connectors:</strong> ${numberOfConnectors} (Score: ${connectorScore})<br>
                    <strong>Weighted Averages:</strong><br>
                    Setup Time: ${avgSetupTime.toFixed(3)}<br>
                    Skill Level: ${avgSkillLevel.toFixed(3)}<br>
                    Portability: ${avgPortability.toFixed(3)}
                </div>
            `;
        }
        
        // Ensure score is between 0 and 1
        score = Math.max(0, Math.min(1, score));
        
        // Display results
        const resultDiv = document.getElementById('disassemblyResult');
        const scoreDiv = document.getElementById('disassemblyScore');
        const detailsDiv = document.getElementById('disassemblyDetails');
        
        resultDiv.classList.remove('hidden');
        scoreDiv.innerHTML = `Score: <span style="color: ${getRatingColor(score)}">${(score * 100).toFixed(1)}%</span>`;
        detailsDiv.innerHTML = details;
        
        // Scroll to results
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error calculating ease of disassembly:', error);
    }
}

// Get rating color based on score
function getRatingColor(score) {
    if (score >= 0.75) return "#4CAF50";
    if (score >= 0.5) return "#FFC107";
    if (score >= 0.25) return "#FF9800";
    return "#F44336";
}

// Make functions globally accessible
window.toggleTool = toggleTool;
window.updateDisassemblyParameters = updateDisassemblyParameters;
window.calculateEaseOfDisassembly = calculateEaseOfDisassembly;

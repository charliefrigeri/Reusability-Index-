// Construction Connection Reusability Assessment Calculator v3.2
// Fixed implementation to resolve all syntax and reference errors

console.log('Loading calculator-v3.js - Version 3.2');

// Score mappings (DEFINED FIRST)
const setupTimeScores = { "Low": 1, "Moderate": 0.5, "High": 0 };
const skillLevelScores = { "Basic": 1, "Intermediate": 0.5, "Advanced": 0 };
const portabilityScores = { "High": 1, "Medium": 0.66, "Low": 0.33, "Very Low": 0 };

// Tool properties for disassembly
const toolProperties = {
    "Battery Disc Saw": { setupTime: "Low", skillLevel: "Basic", portability: "High", minorDamage: "Moderate", majorDamage: "Moderate", precision: "High" },
    "Corded Disc Saw": { setupTime: "Low", skillLevel: "Basic", portability: "Medium", minorDamage: "Moderate", majorDamage: "Moderate", precision: "High" },
    "Petrol Ring Saw": { setupTime: "Low", skillLevel: "Intermediate", portability: "High", minorDamage: "Moderate", majorDamage: "High", precision: "Moderate" },
    "Corded Ring Saw": { setupTime: "Low", skillLevel: "Intermediate", portability: "Medium", minorDamage: "Moderate", majorDamage: "High", precision: "Moderate" },
    "Petrol Chain Saw": { setupTime: "Low", skillLevel: "Intermediate", portability: "High", minorDamage: "Moderate", majorDamage: "High", precision: "Low" },
    "Corded Chain Saw": { setupTime: "Low", skillLevel: "Intermediate", portability: "Medium", minorDamage: "Moderate", majorDamage: "High", precision: "Low" },
    "Walk behind floor saw": { setupTime: "Low", skillLevel: "Intermediate", portability: "Medium", minorDamage: "Low", majorDamage: "Moderate", precision: "Moderate" },
    "Automated Wall Saw": { setupTime: "High", skillLevel: "Intermediate", portability: "Very Low", minorDamage: "Low", majorDamage: "Low", precision: "High" },
    "Hydro blast": { setupTime: "High", skillLevel: "Advanced", portability: "Low", minorDamage: "High", majorDamage: "Low", precision: "Low" },
    "Blow torch": { setupTime: "Moderate", skillLevel: "Intermediate", portability: "High", minorDamage: "Low", majorDamage: "Low", precision: "Moderate" },
    "Demolition Hammer": { setupTime: "Low", skillLevel: "Basic", portability: "Medium", minorDamage: "High", majorDamage: "Moderate", precision: "Low" },
    "Torque Wrench": { setupTime: "Low", skillLevel: "Basic", portability: "High", minorDamage: "Low", majorDamage: "Low", precision: "High" },
    "Angle Grinder": { setupTime: "Low", skillLevel: "Basic", portability: "High", minorDamage: "Moderate", majorDamage: "High", precision: "Moderate" },
    "Hydraulic Piston": { setupTime: "Low", skillLevel: "Basic", portability: "High", minorDamage: "High", majorDamage: "Low", precision: "High" },
    "Welder": { setupTime: "Moderate", skillLevel: "Intermediate", portability: "High", minorDamage: "Low", majorDamage: "Low", precision: "Moderate" },
    "Diamond Drill": { setupTime: "Low", skillLevel: "Basic", portability: "High", minorDamage: "Very High", majorDamage: "High", precision: "Moderate" },
    "Impact Wrench": { setupTime: "Low", skillLevel: "Basic", portability: "High", minorDamage: "Very High", majorDamage: "Low", precision: "High" },
    "Rotary Hammer": { setupTime: "Low", skillLevel: "Intermediate", portability: "High", minorDamage: "Very High", majorDamage: "Moderate", precision: "Low" }
};

// Tools for reassembly (subset)
const reassemblyToolProperties = {
    "Demolition Hammer": { setupTime: "Low", skillLevel: "Basic", portability: "Medium", minorDamage: "High", majorDamage: "Moderate", precision: "Low" },
    "Torque Wrench": { setupTime: "Low", skillLevel: "Basic", portability: "High", minorDamage: "Low", majorDamage: "Low", precision: "High" },
    "Angle Grinder": { setupTime: "Low", skillLevel: "Basic", portability: "High", minorDamage: "Moderate", majorDamage: "High", precision: "Moderate" },
    "Hydraulic Piston": { setupTime: "Low", skillLevel: "Basic", portability: "High", minorDamage: "High", majorDamage: "Low", precision: "High" },
    "Welder": { setupTime: "Moderate", skillLevel: "Intermediate", portability: "High", minorDamage: "Low", majorDamage: "Low", precision: "Moderate" },
    "Diamond Drill": { setupTime: "Low", skillLevel: "Basic", portability: "High", minorDamage: "Very High", majorDamage: "High", precision: "Moderate" },
    "Impact Wrench": { setupTime: "Low", skillLevel: "Basic", portability: "High", minorDamage: "Very High", majorDamage: "Low", precision: "High" },
    "Rotary Hammer": { setupTime: "Low", skillLevel: "Intermediate", portability: "High", minorDamage: "Very High", majorDamage: "Moderate", precision: "Low" }
};

// Reduction factors for materials
const reductionFactors = {
    "C12/15": { "IIIA": 2.03, "IIIB": 2.29, "IIIC": 2.50, "I": 1.82 },
    "C20/25": { "IIIA": 1.98, "IIIB": 2.23, "IIIC": 2.44, "I": 1.69 },
    "C30/37": { "IIIA": 1.85, "IIIB": 2.09, "IIIC": 2.30, "I": 1.57 },
    "C40/50": { "IIIA": 1.74, "IIIB": 1.96, "IIIC": 1.00, "I": 1.46 },
    "C45/55": { "IIIA": 1.70, "IIIB": 1.90, "IIIC": 2.10, "I": 1.44 },
    "C50/60": { "IIIA": 1.53, "IIIB": 1.75, "IIIC": 1.00, "I": 1.28 },
    "C55/67": { "IIIA": 1.58, "IIIB": 1.60, "IIIC": 1.00, "I": 1.38 },
    "C60/76": { "IIIA": 1.52, "IIIB": 1.64, "IIIC": 1.00, "I": 1.29 },
    "C70/85": { "IIIA": 1.27, "IIIB": 1.37, "IIIC": 1.00, "I": 1.10 },
    "C80/95": { "IIIA": 1.15, "IIIB": 1.08, "IIIC": 1.00, "I": 1.04 },
    "C90/105": { "IIIA": 1.08, "IIIB": 1.04, "IIIC": 1.00, "I": 1.04 }
};

// Damage probability data
const minorDamageLambda = { "Low": 0.0074, "Moderate": 0.0170, "High": 0.0305, "Very High": 0.0536 };
const majorDamageLambda = { "Low": 0.0035, "Moderate": 0.0074, "High": 0.0119 };
const precisionLambda = { "High": 0.0035, "Moderate": 0.0170, "Low": 0.0402 };
const damageWeights = { minor: 0.28, major: 0.52, precision: 0.20 };

// Global variables
let selectedTools = {};
let selectedReassemblyTools = {};
let calculationResults = {};

console.log('All variables initialized successfully');

// Utility functions
function getDamageClass(level) {
    switch(level) {
        case 'Low': return 'damage-low';
        case 'Moderate': return 'damage-moderate';
        case 'High': return 'damage-high';
        case 'Very High': return 'damage-very-high';
        default: return 'damage-moderate';
    }
}

// Connection Complexity scoring functions
function calculateConnectionTypeScore(connectionType) {
    const scores = {
        'Pinned': 1.0,
        'Semi-Rigid': 0.5,
        'Rigid': 0.0
    };
    return scores[connectionType] || 0;
}

function calculateIndustryPreferenceScore(preference) {
    const scores = {
        'Common': 1.0,
        'Less Common': 0.5,
        'Not Common': 0.0
    };
    return scores[preference] || 0;
}

function calculateTimeScore(totalTime) {
    if (totalTime <= 120) return 1.0;
    if (totalTime >= 240) return 0.0;
    return (240 - totalTime) / 120; // Linear interpolation between 120 and 240
}

function calculateTotalTime() {
    const disassemblyTime = parseFloat(document.getElementById('disassemblyTime').value) || 0;
    const reassemblyTime = parseFloat(document.getElementById('reassemblyTime').value) || 0;
    const totalTime = disassemblyTime + reassemblyTime;
    
    const totalTimeDisplay = document.getElementById('totalTimeDisplay');
    const timeScoreDisplay = document.getElementById('timeScoreDisplay');
    
    if (totalTimeDisplay) {
        totalTimeDisplay.textContent = totalTime.toFixed(1) + ' minutes';
    }
    
    if (timeScoreDisplay) {
        const timeScore = calculateTimeScore(totalTime);
        timeScoreDisplay.textContent = timeScore.toFixed(3);
    }
    
    return totalTime;
}

function updateConnectionComplexityScores() {
    // Update Connection Type Score
    const connectionType = document.getElementById('complexityConnectionType').value;
    const connectionTypeScore = calculateConnectionTypeScore(connectionType);
    const connectionTypeScoreDisplay = document.getElementById('connectionTypeScoreDisplay');
    
    if (connectionTypeScoreDisplay) {
        connectionTypeScoreDisplay.textContent = connectionType ? connectionTypeScore.toFixed(3) : '--';
    }
    
    // Update Industry Preference Score
    const industryPreference = document.getElementById('industryPreference').value;
    const industryPreferenceScore = calculateIndustryPreferenceScore(industryPreference);
    const industryPreferenceScoreDisplay = document.getElementById('industryPreferenceScoreDisplay');
    
    if (industryPreferenceScoreDisplay) {
        industryPreferenceScoreDisplay.textContent = industryPreference ? industryPreferenceScore.toFixed(3) : '--';
    }
    
    // Update Combined Skill Level Score
    updateCombinedSkillLevelScore();
}

function updateCombinedSkillLevelScore() {
    const combinedSkillLevelDisplay = document.getElementById('combinedSkillLevelDisplay');
    
    if (!combinedSkillLevelDisplay) return;
    
    // Check if we have tools selected with times
    const hasDisassemblyTools = Object.keys(selectedTools).length > 0;
    const hasReassemblyTools = Object.keys(selectedReassemblyTools).length > 0;
    
    if (!hasDisassemblyTools || !hasReassemblyTools) {
        combinedSkillLevelDisplay.textContent = '-- (Select tools first)';
        return;
    }
    
    // Calculate weighted skill level for disassembly tools
    let disassemblySkillScore = 0;
    let disassemblyTotalTime = 0;
    let hasDisassemblyTimes = true;
    
    Object.keys(selectedTools).forEach(tool => {
        const id = tool.replace(/\s+/g, '_').toLowerCase();
        const timeInput = document.getElementById('time_input_' + id);
        const time = timeInput ? parseFloat(timeInput.value) || 0 : 0;
        
        if (time <= 0) {
            hasDisassemblyTimes = false;
            return;
        }
        
        disassemblyTotalTime += time;
        const props = selectedTools[tool].properties;
        disassemblySkillScore += skillLevelScores[props.skillLevel] * time;
    });
    
    // Calculate weighted skill level for reassembly tools
    let reassemblySkillScore = 0;
    let reassemblyTotalTime = 0;
    let hasReassemblyTimes = true;
    
    Object.keys(selectedReassemblyTools).forEach(tool => {
        const id = tool.replace(/\s+/g, '_').toLowerCase() + '_reassembly';
        const timeInput = document.getElementById('time_input_' + id);
        const time = timeInput ? parseFloat(timeInput.value) || 0 : 0;
        
        if (time <= 0) {
            hasReassemblyTimes = false;
            return;
        }
        
        reassemblyTotalTime += time;
        const props = selectedReassemblyTools[tool];
        reassemblySkillScore += skillLevelScores[props.skillLevel] * time;
    });
    
    if (!hasDisassemblyTimes || !hasReassemblyTimes || disassemblyTotalTime === 0 || reassemblyTotalTime === 0) {
        combinedSkillLevelDisplay.textContent = '-- (Enter tool times)';
        return;
    }
    
    // Calculate weighted averages
    const avgDisassemblySkill = disassemblySkillScore / disassemblyTotalTime;
    const avgReassemblySkill = reassemblySkillScore / reassemblyTotalTime;
    
    // Combined skill level (average of disassembly and reassembly)
    const combinedSkillLevel = (avgDisassemblySkill + avgReassemblySkill) / 2;
    
    combinedSkillLevelDisplay.textContent = combinedSkillLevel.toFixed(3);
}

function calculateConnectionComplexity() {
    try {
        const connectionType = document.getElementById('complexityConnectionType').value;
        const industryPreference = document.getElementById('industryPreference').value;
        const disassemblyTime = parseFloat(document.getElementById('disassemblyTime').value) || 0;
        const reassemblyTime = parseFloat(document.getElementById('reassemblyTime').value) || 0;
        
        // Validate inputs
        if (!connectionType) {
            alert('Please select a connection type');
            return;
        }
        
        if (!industryPreference) {
            alert('Please select an industry preference');
            return;
        }
        
        if (disassemblyTime <= 0 || reassemblyTime <= 0) {
            alert('Please enter valid disassembly and reassembly times');
            return;
        }
        
        if (Object.keys(selectedTools).length === 0 || Object.keys(selectedReassemblyTools).length === 0) {
            alert('Please select tools in Sections 3 & 4 and enter their times first');
            return;
        }
        
        // Calculate component scores
        const connectionTypeScore = calculateConnectionTypeScore(connectionType);
        const industryPreferenceScore = calculateIndustryPreferenceScore(industryPreference);
        const totalTime = disassemblyTime + reassemblyTime;
        const timeScore = calculateTimeScore(totalTime);
        
        // Get combined skill level score
        const combinedSkillLevelDisplay = document.getElementById('combinedSkillLevelDisplay');
        const combinedSkillLevelText = combinedSkillLevelDisplay.textContent;
        
        if (combinedSkillLevelText.includes('--')) {
            alert('Combined skill level not calculated. Please ensure tools are selected with times in Sections 3 & 4');
            return;
        }
        
        const skillLevelScore = parseFloat(combinedSkillLevelText);
        
        // Calculate weighted final score
        const finalScore = (connectionTypeScore * 0.30) + 
                          (industryPreferenceScore * 0.30) + 
                          (skillLevelScore * 0.30) + 
                          (timeScore * 0.10);
        
        // Ensure score is between 0 and 1
        const boundedScore = Math.max(0, Math.min(1, finalScore));
        
        calculationResults.connectionComplexity = boundedScore;
        
        const resultDiv = document.getElementById('connectionComplexityResult');
        const scoreDiv = document.getElementById('connectionComplexityScore');
        const detailsDiv = document.getElementById('connectionComplexityDetails');
        
        resultDiv.classList.remove('hidden');
        scoreDiv.innerHTML = `Score: <span style="color: ${getRatingColor(boundedScore)}">${(boundedScore * 100).toFixed(1)}%</span>`;
        
        detailsDiv.innerHTML = `
            <div><strong>Connection Complexity Calculation:</strong></div>
            <div style="margin-top: 15px;"><strong>Component Scores:</strong></div>
            <div>• Connection Type (${connectionType}): ${connectionTypeScore.toFixed(3)} × 0.30 = ${(connectionTypeScore * 0.30).toFixed(3)}</div>
            <div>• Industry Preference (${industryPreference}): ${industryPreferenceScore.toFixed(3)} × 0.30 = ${(industryPreferenceScore * 0.30).toFixed(3)}</div>
            <div>• Specialized Tools/Skill Level: ${skillLevelScore.toFixed(3)} × 0.30 = ${(skillLevelScore * 0.30).toFixed(3)}</div>
            <div>• Time (${totalTime.toFixed(1)} min): ${timeScore.toFixed(3)} × 0.10 = ${(timeScore * 0.10).toFixed(3)}</div>
            
            <div style="margin-top: 15px;"><strong>Time Breakdown:</strong></div>
            <div>• Disassembly Time: ${disassemblyTime.toFixed(1)} minutes</div>
            <div>• Reassembly Time: ${reassemblyTime.toFixed(1)} minutes</div>
            <div>• Total Time: ${totalTime.toFixed(1)} minutes</div>
            
            <div style="margin-top: 15px;"><strong>Final Calculation:</strong></div>
            <div>Score = ${(connectionTypeScore * 0.30).toFixed(3)} + ${(industryPreferenceScore * 0.30).toFixed(3)} + ${(skillLevelScore * 0.30).toFixed(3)} + ${(timeScore * 0.10).toFixed(3)}</div>
            <div><strong>Final Score = ${(boundedScore * 100).toFixed(1)}%</strong></div>
        `;
        
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error calculating connection complexity:', error);
        alert('Error in connection complexity calculation. Please check your inputs.');
    }
}

function getRatingColor(score) {
    if (score >= 0.75) return "#4CAF50";
    if (score >= 0.5) return "#FFC107";
    if (score >= 0.25) return "#FF9800";
    return "#F44336";
}

function showTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => tab.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Initialize disassembly tools
function initializeToolSelection() {
    const grid = document.getElementById('toolSelectionGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    Object.keys(toolProperties).forEach(tool => {
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
            <div class="tool-damage-info">
                <div class="damage-indicator ${getDamageClass(toolProperties[tool].minorDamage)}">Minor: ${toolProperties[tool].minorDamage}</div>
                <div class="damage-indicator ${getDamageClass(toolProperties[tool].majorDamage)}">Major: ${toolProperties[tool].majorDamage}</div>
                <div class="damage-indicator ${getDamageClass(toolProperties[tool].precision)}">Precision: ${toolProperties[tool].precision}</div>
            </div>
            <div id="time_${id}" class="time-input hidden">
                <label>Time (minutes):</label>
                <input type="number" id="time_input_${id}" min="0" step="0.1" placeholder="Enter time">
            </div>
        `;
        
        grid.appendChild(toolItem);
        
        const checkbox = document.getElementById('tool_' + id);
        checkbox.addEventListener('change', () => toggleTool(tool));
    });
}

// Initialize reassembly tools
function initializeReassemblyToolSelection() {
    const grid = document.getElementById('reassemblyToolSelectionGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    Object.keys(reassemblyToolProperties).forEach(tool => {
        const id = tool.replace(/\s+/g, '_').toLowerCase() + '_reassembly';
        const toolItem = document.createElement('div');
        toolItem.className = 'tool-item';
        
        toolItem.innerHTML = `
            <div class="tool-header">
                <input type="checkbox" id="tool_${id}" class="tool-checkbox" />
                <label for="tool_${id}" class="tool-label">${tool}</label>
            </div>
            <div class="tool-properties">
                Setup: ${reassemblyToolProperties[tool].setupTime} | Skill: ${reassemblyToolProperties[tool].skillLevel} | Portability: ${reassemblyToolProperties[tool].portability}
            </div>
            <div class="tool-damage-info">
                <div class="damage-indicator ${getDamageClass(reassemblyToolProperties[tool].minorDamage)}">Minor: ${reassemblyToolProperties[tool].minorDamage}</div>
                <div class="damage-indicator ${getDamageClass(reassemblyToolProperties[tool].majorDamage)}">Major: ${reassemblyToolProperties[tool].majorDamage}</div>
                <div class="damage-indicator ${getDamageClass(reassemblyToolProperties[tool].precision)}">Precision: ${reassemblyToolProperties[tool].precision}</div>
            </div>
            <div id="time_${id}" class="time-input hidden">
                <label>Time (minutes):</label>
                <input type="number" id="time_input_${id}" min="0" step="0.1" placeholder="Enter time">
            </div>
        `;
        
        grid.appendChild(toolItem);
    });
    
    setTimeout(() => {
        Object.keys(reassemblyToolProperties).forEach(tool => {
            const id = tool.replace(/\s+/g, '_').toLowerCase() + '_reassembly';
            const checkbox = document.getElementById('tool_' + id);
            if (checkbox) {
                checkbox.addEventListener('change', () => toggleReassemblyTool(tool));
            }
        });
    }, 100);
}

// Toggle tool selection
function toggleTool(tool) {
    const id = tool.replace(/\s+/g, '_').toLowerCase();
    const checkbox = document.getElementById('tool_' + id);
    const timeInputDiv = document.getElementById('time_' + id);
    const toolItem = checkbox.closest('.tool-item');
    
    if (checkbox.checked) {
        selectedTools[tool] = { time: 0, properties: toolProperties[tool] };
        timeInputDiv.classList.remove('hidden');
        toolItem.classList.add('selected');
    } else {
        delete selectedTools[tool];
        timeInputDiv.classList.add('hidden');
        toolItem.classList.remove('selected');
        document.getElementById('time_input_' + id).value = '';
    }
    
    updateSelectedToolsDisplay();
}

// Toggle reassembly tool selection
function toggleReassemblyTool(tool) {
    const id = tool.replace(/\s+/g, '_').toLowerCase() + '_reassembly';
    const checkbox = document.getElementById('tool_' + id);
    const timeInputDiv = document.getElementById('time_' + id);
    const toolItem = checkbox.closest('.tool-item');
    
    if (checkbox.checked) {
        selectedReassemblyTools[tool] = reassemblyToolProperties[tool];
        timeInputDiv.classList.remove('hidden');
        toolItem.classList.add('selected');
    } else {
        delete selectedReassemblyTools[tool];
        timeInputDiv.classList.add('hidden');
        toolItem.classList.remove('selected');
        document.getElementById('time_input_' + id).value = '';
    }
    
    updateSelectedReassemblyToolsDisplay();
}

// Update selected tools display
function updateSelectedToolsDisplay() {
    const propertiesDisplay = document.getElementById('toolPropertiesDisplay');
    const propertiesList = document.getElementById('toolPropertiesList');
    
    if (!propertiesDisplay || !propertiesList) return;
    
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

// Update selected reassembly tools display
function updateSelectedReassemblyToolsDisplay() {
    const propertiesDisplay = document.getElementById('reassemblyToolPropertiesDisplay');
    const propertiesList = document.getElementById('reassemblyToolPropertiesList');
    
    if (!propertiesDisplay || !propertiesList) return;
    
    if (Object.keys(selectedReassemblyTools).length > 0) {
        propertiesDisplay.classList.remove('hidden');
        let html = '<div><strong>Selected Reassembly Tools:</strong></div>';
        
        Object.keys(selectedReassemblyTools).forEach(tool => {
            const properties = selectedReassemblyTools[tool];
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

// Calculate Ease of Disassembly Score
function calculateEaseOfDisassembly() {
    try {
        const connectionType = document.getElementById('disassemblyConnectionType').value;
        const numberOfConnectors = parseFloat(document.getElementById('numberOfConnectors').value) || 0;
        
        if (!connectionType) {
            alert('Please select a connection type for disassembly');
            return;
        }
        
        if (Object.keys(selectedTools).length === 0) {
            alert('Please select at least one disassembly tool');
            return;
        }
        
        let totalTime = 0;
        let weightedSetupTime = 0;
        let weightedSkillLevel = 0;
        let weightedPortability = 0;
        let allToolsHaveTime = true;
        let missingTimeTools = [];
        
        Object.keys(selectedTools).forEach(tool => {
            const id = tool.replace(/\s+/g, '_').toLowerCase();
            const timeInput = document.getElementById('time_input_' + id);
            
            if (!timeInput) {
                allToolsHaveTime = false;
                missingTimeTools.push(tool);
                return;
            }
            
            const time = parseFloat(timeInput.value) || 0;
            
            if (time <= 0) {
                allToolsHaveTime = false;
                missingTimeTools.push(tool);
                return;
            }
            
            selectedTools[tool].time = time;
            totalTime += time;
            
            const props = selectedTools[tool].properties;
            weightedSetupTime += setupTimeScores[props.setupTime] * time;
            weightedSkillLevel += skillLevelScores[props.skillLevel] * time;
            weightedPortability += portabilityScores[props.portability] * time;
        });
        
        if (!allToolsHaveTime) {
            alert('Please enter time for the following disassembly tools: ' + missingTimeTools.join(', '));
            return;
        }
        
        const avgSetupTime = weightedSetupTime / totalTime;
        const avgSkillLevel = weightedSkillLevel / totalTime;
        const avgPortability = weightedPortability / totalTime;
        
        let score = 0;
        let connectorScore = 1;
        
        if (connectionType === 'Cementitious') {
            score = (avgSetupTime * 0.22) + (avgSkillLevel * 0.50) + (avgPortability * 0.28);
        } else {
            if (connectionType === 'Other') {
                connectorScore = 1;
            } else if (connectionType === 'Screw' || connectionType === 'Bolt') {
                if (numberOfConnectors <= 2) connectorScore = 1;
                else if (numberOfConnectors === 3 || numberOfConnectors === 5) connectorScore = 0.95;
                else connectorScore = 0.9;
            }
            
            score = (avgSetupTime * 0.15) + (avgSkillLevel * 0.48) + (avgPortability * 0.22) + (connectorScore * 0.15);
        }
        
        score = Math.max(0, Math.min(1, score));
        calculationResults.easeOfDisassembly = score;
        
        const resultDiv = document.getElementById('disassemblyResult');
        const scoreDiv = document.getElementById('disassemblyScore');
        const detailsDiv = document.getElementById('disassemblyDetails');
        
        resultDiv.classList.remove('hidden');
        scoreDiv.innerHTML = 'Score: <span style="color: ' + getRatingColor(score) + '">' + (score * 100).toFixed(1) + '%</span>';
        
        let details = '<div><strong>Calculation (' + connectionType + ' Connection):</strong></div>' +
                     '<div>Tools Used: ' + Object.keys(selectedTools).map(tool => tool + ': ' + selectedTools[tool].time + 'min').join(', ') + '</div>' +
                     '<div>Total Time: ' + totalTime + ' minutes</div>' +
                     '<div>Weighted Averages: Setup: ' + avgSetupTime.toFixed(3) + ', Skill: ' + avgSkillLevel.toFixed(3) + ', Portability: ' + avgPortability.toFixed(3) + '</div>' +
                     '<div><strong>Final Score: ' + (score * 100).toFixed(1) + '%</strong></div>';
        
        detailsDiv.innerHTML = details;
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error calculating ease of disassembly:', error);
        alert('Error in disassembly calculation');
    }
}

// Calculate Ease of Reassembly Score
function calculateEaseOfReassembly() {
    try {
        const connectionType = document.getElementById('reassemblyConnectionType').value;
        const numberOfConnectors = parseFloat(document.getElementById('reassemblyNumberOfConnectors').value) || 0;
        
        if (!connectionType) {
            alert('Please select a connection type for reassembly');
            return;
        }
        
        if (Object.keys(selectedReassemblyTools).length === 0) {
            alert('Please select at least one reassembly tool');
            return;
        }
        
        let totalTime = 0;
        let weightedSetupTime = 0;
        let weightedSkillLevel = 0;
        let weightedPortability = 0;
        let allToolsHaveTime = true;
        let missingTimeTools = [];
        
        Object.keys(selectedReassemblyTools).forEach(tool => {
            const id = tool.replace(/\s+/g, '_').toLowerCase() + '_reassembly';
            const timeInput = document.getElementById('time_input_' + id);
            
            if (!timeInput) {
                allToolsHaveTime = false;
                missingTimeTools.push(tool);
                return;
            }
            
            const time = parseFloat(timeInput.value) || 0;
            
            if (time <= 0) {
                allToolsHaveTime = false;
                missingTimeTools.push(tool);
                return;
            }
            
            selectedReassemblyTools[tool].time = time;
            totalTime += time;
            
            const props = selectedReassemblyTools[tool];
            weightedSetupTime += setupTimeScores[props.setupTime] * time;
            weightedSkillLevel += skillLevelScores[props.skillLevel] * time;
            weightedPortability += portabilityScores[props.portability] * time;
        });
        
        if (!allToolsHaveTime) {
            alert('Please enter time for the following reassembly tools: ' + missingTimeTools.join(', '));
            return;
        }
        
        const avgSetupTime = weightedSetupTime / totalTime;
        const avgSkillLevel = weightedSkillLevel / totalTime;
        const avgPortability = weightedPortability / totalTime;
        
        let score = 0;
        let connectorScore = 1;
        
        if (connectionType === 'Cementitious') {
            score = (avgSetupTime * 0.22) + (avgSkillLevel * 0.50) + (avgPortability * 0.28);
        } else {
            if (connectionType === 'Other') {
                connectorScore = 1;
            } else if (connectionType === 'Screw' || connectionType === 'Bolt') {
                if (numberOfConnectors <= 2) connectorScore = 1;
                else if (numberOfConnectors === 3 || numberOfConnectors === 5) connectorScore = 0.95;
                else connectorScore = 0.9;
            }
            
            score = (avgSetupTime * 0.15) + (avgSkillLevel * 0.48) + (avgPortability * 0.22) + (connectorScore * 0.15);
        }
        
        score = Math.max(0, Math.min(1, score));
        calculationResults.easeOfReassembly = score;
        
        const resultDiv = document.getElementById('reassemblyResult');
        const scoreDiv = document.getElementById('reassemblyScore');
        const detailsDiv = document.getElementById('reassemblyDetails');
        
        resultDiv.classList.remove('hidden');
        scoreDiv.innerHTML = 'Score: <span style="color: ' + getRatingColor(score) + '">' + (score * 100).toFixed(1) + '%</span>';
        
        let details = '<div><strong>Calculation (' + connectionType + ' Connection):</strong></div>' +
                     '<div>Tools Used: ' + Object.keys(selectedReassemblyTools).map(tool => tool + ': ' + selectedReassemblyTools[tool].time + 'min').join(', ') + '</div>' +
                     '<div>Total Time: ' + totalTime + ' minutes</div>' +
                     '<div>Weighted Averages: Setup: ' + avgSetupTime.toFixed(3) + ', Skill: ' + avgSkillLevel.toFixed(3) + ', Portability: ' + avgPortability.toFixed(3) + '</div>' +
                     '<div><strong>Final Score: ' + (score * 100).toFixed(1) + '%</strong></div>';
        
        detailsDiv.innerHTML = details;
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error calculating ease of reassembly:', error);
        alert('Error in reassembly calculation');
    }
}

// Additional calculation functions (simplified versions)
function updateJointArea() {
    const connectionType = document.getElementById('connectionType').value;
    const length = parseFloat(document.getElementById('length').value) || 0;
    const width = parseFloat(document.getElementById('width').value) || 0;
    const height = parseFloat(document.getElementById('height').value) || 0;
    const heightGroup = document.getElementById('heightGroup');
    
    if (connectionType === 'Other') {
        heightGroup.style.display = 'flex';
        document.getElementById('height').required = true;
    } else {
        heightGroup.style.display = 'none';
        document.getElementById('height').required = false;
    }
    
    let jointArea = 0;
    if (connectionType && length && width) {
        if (connectionType === 'Wall-Wall Horizontal' || connectionType === 'Column-Column') {
            jointArea = length * width;
        } else if (connectionType === 'Other' && height) {
            jointArea = Math.min(length, width) * height;
        }
    }
    
    const display = document.getElementById('jointAreaDisplay');
    const display2 = document.getElementById('jointAreaDisplay2');
    
    if (display) display.textContent = jointArea.toFixed(2) + ' cm²';
    if (display2) display2.textContent = jointArea.toFixed(2) + ' cm²';
    
    updateReinforcementType();
    return jointArea;
}

function updateReductionFactor() {
    const strengthClass = document.getElementById('strengthClass').value;
    const mortarType = document.getElementById('mortarType').value;
    
    let reductionFactor = '--';
    
    if (strengthClass && mortarType) {
        if (reductionFactors[strengthClass] && reductionFactors[strengthClass][mortarType] !== undefined) {
            reductionFactor = reductionFactors[strengthClass][mortarType];
        } else {
            reductionFactor = 1.00;
        }
    }
    
    const display = document.getElementById('reductionFactorDisplay');
    if (display) display.textContent = reductionFactor;
    
    return reductionFactor;
}

function updateConnectionTypeOptions() {
    const connectionType = document.getElementById('connectionType');
    if (!connectionType) return;
    
    connectionType.addEventListener('change', function() {
        updateJointArea();
        updateReinforcementType();
    });
}

function updateReinforcementType() {
    const connectionType = document.getElementById('connectionType').value;
    const reinforcementTypeDisplay = document.getElementById('reinforcementTypeDisplay');
    const reinforcementNumberGroup = document.getElementById('reinforcementNumberGroup');
    const reinforcementLengthGroup = document.getElementById('reinforcementLengthGroup');
    const reinforcementOtherLengthGroup = document.getElementById('reinforcementOtherLengthGroup');
    const reinforcementDiameterGroup = document.getElementById('reinforcementDiameterGroup');
    
    if (!reinforcementTypeDisplay) return;
    
    if (reinforcementNumberGroup) reinforcementNumberGroup.style.display = 'none';
    if (reinforcementLengthGroup) reinforcementLengthGroup.style.display = 'none';
    if (reinforcementOtherLengthGroup) reinforcementOtherLengthGroup.style.display = 'none';
    
    if (connectionType === 'Column-Column') {
        reinforcementTypeDisplay.textContent = 'Number of Reinforcement Bars';
        if (reinforcementNumberGroup) reinforcementNumberGroup.style.display = 'flex';
        if (reinforcementDiameterGroup) reinforcementDiameterGroup.style.display = 'flex';
    } else if (connectionType === 'Wall-Wall Horizontal') {
        reinforcementTypeDisplay.textContent = 'Length of Reinforcement';
        if (reinforcementLengthGroup) reinforcementLengthGroup.style.display = 'flex';
        if (reinforcementDiameterGroup) reinforcementDiameterGroup.style.display = 'flex';
    } else if (connectionType === 'Other') {
        reinforcementTypeDisplay.textContent = 'Length and Number of Reinforcement';
        if (reinforcementNumberGroup) reinforcementNumberGroup.style.display = 'flex';
        if (reinforcementOtherLengthGroup) reinforcementOtherLengthGroup.style.display = 'flex';
        if (reinforcementDiameterGroup) reinforcementDiameterGroup.style.display = 'flex';
    } else {
        reinforcementTypeDisplay.textContent = '--';
        if (reinforcementDiameterGroup) reinforcementDiameterGroup.style.display = 'none';
    }
    
    calculateReinforcementArea();
}

function calculateReinforcementArea() {
    const connectionType = document.getElementById('connectionType').value;
    const diameter = parseFloat(document.getElementById('reinforcementDiameter').value) || 8;
    const noWaste = document.getElementById('noReinforcementWaste').checked;
    const reinforcementAreaDisplay = document.getElementById('reinforcementAreaDisplay');
    
    if (!reinforcementAreaDisplay) return 0;
    
    if (noWaste) {
        reinforcementAreaDisplay.textContent = '0 cm² (No waste)';
        return 0;
    }
    
    let reinforcementArea = 0;
    
    if (connectionType === 'Column-Column') {
        const numberOfBars = parseFloat(document.getElementById('reinforcementNumber').value) || 0;
        if (numberOfBars > 0) {
            const diameterCm = diameter / 10;
            reinforcementArea = Math.PI * Math.pow(diameterCm, 2) / 4 * numberOfBars;
        }
    } else if (connectionType === 'Wall-Wall Horizontal') {
        const length = parseFloat(document.getElementById('reinforcementLength').value) || 0;
        if (length > 0) {
            const diameterCm = diameter / 10;
            reinforcementArea = Math.PI * Math.pow(diameterCm, 2) / 4;
        }
    } else if (connectionType === 'Other') {
        const length = parseFloat(document.getElementById('reinforcementOtherLength').value) || 0;
        const numberOfBars = parseFloat(document.getElementById('reinforcementNumber').value) || 0;
        if (length > 0 && numberOfBars > 0) {
            const diameterCm = diameter / 10;
            reinforcementArea = length * numberOfBars * diameterCm;
        }
    }
    
    reinforcementAreaDisplay.textContent = reinforcementArea.toFixed(2) + ' cm²';
    return reinforcementArea;
}

function toggleNoWaste() {
    const noWaste = document.getElementById('noReinforcementWaste').checked;
    
    const reinforcementNumber = document.getElementById('reinforcementNumber');
    const reinforcementLength = document.getElementById('reinforcementLength');
    const reinforcementOtherLength = document.getElementById('reinforcementOtherLength');
    const reinforcementDiameter = document.getElementById('reinforcementDiameter');
    
    if (reinforcementNumber) reinforcementNumber.disabled = noWaste;
    if (reinforcementLength) reinforcementLength.disabled = noWaste;
    if (reinforcementOtherLength) reinforcementOtherLength.disabled = noWaste;
    if (reinforcementDiameter) reinforcementDiameter.disabled = noWaste;
    
    calculateReinforcementArea();
}

function calculateEndOfCycleWaste() {
    try {
        const jointArea = updateJointArea();
        const wasteArea = parseFloat(document.getElementById('wasteArea').value) || 0;
        const reductionFactor = updateReductionFactor();
        const reinforcementArea = calculateReinforcementArea();
        
        if (!jointArea || wasteArea < 0 || reductionFactor === '--') {
            alert('Please fill in all required fields correctly');
            return;
        }
        
        const reinforcementReductionFactor = 0.21;
        const materialWasteComponent = (wasteArea / reductionFactor) / jointArea;
        const reinforcementWasteComponent = (reinforcementArea / jointArea) / reinforcementReductionFactor;
        const score = Math.max(0, Math.min(1, 1 - (materialWasteComponent + reinforcementWasteComponent)));
        
        calculationResults.endOfCycleWaste = score;
        
        const resultDiv = document.getElementById('endOfCycleResult');
        const scoreDiv = document.getElementById('endOfCycleScore');
        const detailsDiv = document.getElementById('endOfCycleDetails');
        
        resultDiv.classList.remove('hidden');
        scoreDiv.innerHTML = `Score: <span style="color: ${getRatingColor(score)}">${(score * 100).toFixed(1)}%</span>`;
        
        detailsDiv.innerHTML = `
            <div><strong>Calculation Details:</strong></div>
            <div>Joint Area: ${jointArea.toFixed(2)} cm², Waste Area: ${wasteArea.toFixed(2)} cm², Reinforcement Area: ${reinforcementArea.toFixed(2)} cm²</div>
            <div>Material Reduction Factor: ${reductionFactor}, Reinforcement Reduction Factor: ${reinforcementReductionFactor}</div>
            <div><strong>Final Score: ${(score * 100).toFixed(1)}%</strong></div>
        `;
        
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error calculating end of cycle waste:', error);
        alert('Error in calculation. Please check your inputs.');
    }
}

function calculatePrefabricationDegree() {
    try {
        const jointArea = updateJointArea();
        const prefabricatedArea = parseFloat(document.getElementById('prefabricatedArea').value) || 0;
        
        if (!jointArea || prefabricatedArea < 0) {
            alert('Please fill in all required fields correctly');
            return;
        }
        
        const score = Math.max(0, Math.min(1, prefabricatedArea / jointArea));
        calculationResults.prefabricationDegree = score;
        
        const resultDiv = document.getElementById('prefabricationResult');
        const scoreDiv = document.getElementById('prefabricationScore');
        const detailsDiv = document.getElementById('prefabricationDetails');
        
        resultDiv.classList.remove('hidden');
        scoreDiv.innerHTML = `Score: <span style="color: ${getRatingColor(score)}">${(score * 100).toFixed(1)}%</span>`;
        
        detailsDiv.innerHTML = `
            <div><strong>Calculation Details:</strong></div>
            <div>Joint Area: ${jointArea.toFixed(2)} cm², Prefabricated Area: ${prefabricatedArea.toFixed(2)} cm²</div>
            <div>Formula: Prefabricated Area / Joint Area</div>
            <div><strong>Score: ${(score * 100).toFixed(1)}%</strong></div>
        `;
        
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error calculating prefabrication degree:', error);
        alert('Error in calculation. Please check your inputs.');
    }
}

function updateDisassemblyParameters() {
    const connectionType = document.getElementById('disassemblyConnectionType').value;
    const connectorsGroup = document.getElementById('connectorsGroup');
    const subParametersDisplay = document.getElementById('disassemblySubParameters');
    const subParametersList = document.getElementById('subParametersList');
    
    if (!subParametersDisplay || !subParametersList) return;
    
    if (connectionType) {
        subParametersDisplay.classList.remove('hidden');
        
        if (connectionType === 'Cementitious') {
            if (connectorsGroup) connectorsGroup.style.display = 'none';
            subParametersList.innerHTML = `
                <div><strong>Parameters for Cementitious Connections:</strong></div>
                <div>• <strong>Setup Time:</strong> Weight 0.22</div>
                <div>• <strong>Skill Level:</strong> Weight 0.50</div>
                <div>• <strong>Portability:</strong> Weight 0.28</div>
            `;
        } else {
            if (connectorsGroup) connectorsGroup.style.display = 'flex';
            subParametersList.innerHTML = `
                <div><strong>Parameters for ${connectionType} Connections:</strong></div>
                <div>• <strong>Setup Time:</strong> Weight 0.15</div>
                <div>• <strong>Skill Level:</strong> Weight 0.48</div>
                <div>• <strong>Portability:</strong> Weight 0.22</div>
                <div>• <strong>Number of Connectors:</strong> Weight 0.15</div>
            `;
        }
    } else {
        if (connectorsGroup) connectorsGroup.style.display = 'none';
        subParametersDisplay.classList.add('hidden');
    }
}

function setupReassemblyConnectionTypeListener() {
    const reassemblyConnectionType = document.getElementById('reassemblyConnectionType');
    const reassemblyConnectorsGroup = document.getElementById('reassemblyConnectorsGroup');
    
    if (reassemblyConnectionType && reassemblyConnectorsGroup) {
        reassemblyConnectionType.addEventListener('change', function() {
            if (this.value === 'Cementitious' || this.value === '') {
                reassemblyConnectorsGroup.style.display = 'none';
            } else {
                reassemblyConnectorsGroup.style.display = 'flex';
            }
        });
    }
}

function calculateDamageProbabilityForTools(tools, damageType) {
    let totalScore = 1;
    
    tools.forEach(toolData => {
        const time = toolData.time;
        let lambda = 0;
        
        if (damageType === 'minor') {
            lambda = minorDamageLambda[toolData.properties.minorDamage] || 0;
            const probability = 1 - Math.exp(-lambda * time);
            totalScore *= (1 - probability);
        } else if (damageType === 'major') {
            lambda = majorDamageLambda[toolData.properties.majorDamage] || 0;
            const probability = 1 - Math.exp(-lambda * time);
            totalScore *= (1 - probability);
        } else if (damageType === 'precision') {
            lambda = precisionLambda[toolData.properties.precision] || 0;
            const probability = Math.exp(-lambda * time);
            totalScore *= probability;
        }
    });
    
    return totalScore;
}

function calculateDamageProbability() {
    try {
        if (Object.keys(selectedTools).length === 0) {
            alert('Please select disassembly tools and enter their times first');
            return;
        }
        
        if (Object.keys(selectedReassemblyTools).length === 0) {
            alert('Please select reassembly tools and enter their times first');
            return;
        }
        
        // Prepare disassembly tools data
        const disassemblyToolsData = [];
        let allDisassemblyToolsHaveTime = true;
        
        Object.keys(selectedTools).forEach(tool => {
            const id = tool.replace(/\s+/g, '_').toLowerCase();
            const timeInput = document.getElementById('time_input_' + id);
            const time = parseFloat(timeInput.value) || 0;
            
            if (time <= 0) {
                allDisassemblyToolsHaveTime = false;
                return;
            }
            
            disassemblyToolsData.push({
                name: tool,
                time: time,
                properties: selectedTools[tool].properties
            });
        });
        
        // Prepare reassembly tools data
        const reassemblyToolsData = [];
        let allReassemblyToolsHaveTime = true;
        
        Object.keys(selectedReassemblyTools).forEach(tool => {
            const id = tool.replace(/\s+/g, '_').toLowerCase() + '_reassembly';
            const timeInput = document.getElementById('time_input_' + id);
            const time = parseFloat(timeInput.value) || 0;
            
            if (time <= 0) {
                allReassemblyToolsHaveTime = false;
                return;
            }
            
            reassemblyToolsData.push({
                name: tool,
                time: time,
                properties: selectedReassemblyTools[tool]
            });
        });
        
        if (!allDisassemblyToolsHaveTime) {
            alert('Please enter time for all selected disassembly tools');
            return;
        }
        
        if (!allReassemblyToolsHaveTime) {
            alert('Please enter time for all selected reassembly tools');
            return;
        }
        
        // Calculate damage probabilities
        const minorDisassembly = calculateDamageProbabilityForTools(disassemblyToolsData, 'minor');
        const majorDisassembly = calculateDamageProbabilityForTools(disassemblyToolsData, 'major');
        const precisionDisassembly = calculateDamageProbabilityForTools(disassemblyToolsData, 'precision');
        
        const minorReassembly = calculateDamageProbabilityForTools(reassemblyToolsData, 'minor');
        const majorReassembly = calculateDamageProbabilityForTools(reassemblyToolsData, 'major');
        const precisionReassembly = calculateDamageProbabilityForTools(reassemblyToolsData, 'precision');
        
        // Combined scores
        const minorCombined = (minorDisassembly + minorReassembly) / 2;
        const majorCombined = (majorDisassembly + majorReassembly) / 2;
        const precisionCombined = (precisionDisassembly + precisionReassembly) / 2;
        
        // Weighted final score
        const finalScore = (minorCombined * damageWeights.minor) + 
                          (majorCombined * damageWeights.major) + 
                          (precisionCombined * damageWeights.precision);
        
        calculationResults.damageProbability = finalScore;
        
        const resultDiv = document.getElementById('damageProbabilityResult');
        const scoreDiv = document.getElementById('damageProbabilityScore');
        const detailsDiv = document.getElementById('damageProbabilityDetails');
        
        resultDiv.classList.remove('hidden');
        scoreDiv.innerHTML = `Score: <span style="color: ${getRatingColor(finalScore)}">${(finalScore * 100).toFixed(1)}%</span>`;
        
        detailsDiv.innerHTML = `
            <div><strong>Damage Probability Calculation:</strong></div>
            <div>Disassembly Tools: ${disassemblyToolsData.map(tool => `${tool.name}(${tool.time}min)`).join(', ')}</div>
            <div>Reassembly Tools: ${reassemblyToolsData.map(tool => `${tool.name}(${tool.time}min)`).join(', ')}</div>
            <div>Combined Scores: Minor: ${(minorCombined * 100).toFixed(1)}%, Major: ${(majorCombined * 100).toFixed(1)}%, Precision: ${(precisionCombined * 100).toFixed(1)}%</div>
            <div><strong>Final Score: ${(finalScore * 100).toFixed(1)}%</strong></div>
        `;
        
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error calculating damage probability:', error);
        alert('Error in calculation. Please check your inputs.');
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - initializing calculator v3.2...');
    
    initializeToolSelection();
    updateConnectionTypeOptions();
    setupReassemblyConnectionTypeListener();
    setupConnectionComplexityListeners();
    
    setTimeout(() => {
        initializeReassemblyToolSelection();
        console.log('All initialization complete v3.2');
    }, 300);
});

function setupConnectionComplexityListeners() {
    // Connection Type dropdown
    const complexityConnectionType = document.getElementById('complexityConnectionType');
    if (complexityConnectionType) {
        complexityConnectionType.addEventListener('change', updateConnectionComplexityScores);
    }
    
    // Industry Preference dropdown
    const industryPreference = document.getElementById('industryPreference');
    if (industryPreference) {
        industryPreference.addEventListener('change', updateConnectionComplexityScores);
    }
    
    // Time inputs
    const disassemblyTime = document.getElementById('disassemblyTime');
    const reassemblyTime = document.getElementById('reassemblyTime');
    
    if (disassemblyTime) {
        disassemblyTime.addEventListener('input', calculateTotalTime);
    }
    
    if (reassemblyTime) {
        reassemblyTime.addEventListener('input', calculateTotalTime);
    }
}

// Make functions globally accessible
window.showTab = showTab;
window.updateJointArea = updateJointArea;
window.updateReductionFactor = updateReductionFactor;
window.calculateReinforcementArea = calculateReinforcementArea;
window.toggleNoWaste = toggleNoWaste;
window.calculateEndOfCycleWaste = calculateEndOfCycleWaste;
window.calculatePrefabricationDegree = calculatePrefabricationDegree;
window.updateDisassemblyParameters = updateDisassemblyParameters;
window.calculateEaseOfDisassembly = calculateEaseOfDisassembly;
window.calculateEaseOfReassembly = calculateEaseOfReassembly;
window.calculateDamageProbability = calculateDamageProbability;
window.calculateTotalTime = calculateTotalTime;
window.calculateConnectionComplexity = calculateConnectionComplexity;

console.log('Calculator JavaScript v3.2 loaded successfully - All variables properly defined');
console.log('setupTimeScores check:', typeof setupTimeScores, setupTimeScores);
console.log('Available tools:', Object.keys(toolProperties).length);
console.log('Available reassembly tools:', Object.keys(reassemblyToolProperties).length);

// Construction Connection Reusability Assessment Calculator
// Complete JavaScript implementation

// Tool properties data with damage and precision classifications
const toolProperties = {
    "Battery Disc Saw": { 
        setupTime: "Low", 
        skillLevel: "Basic", 
        portability: "High",
        minorDamage: "Moderate",
        majorDamage: "Moderate", 
        precision: "High"
    },
    "Corded Disc Saw": { 
        setupTime: "Low", 
        skillLevel: "Basic", 
        portability: "Medium",
        minorDamage: "Moderate",
        majorDamage: "Moderate", 
        precision: "High"
    },
    "Petrol Ring Saw": { 
        setupTime: "Low", 
        skillLevel: "Intermediate", 
        portability: "High",
        minorDamage: "Moderate",
        majorDamage: "High", 
        precision: "Moderate"
    },
    "Corded Ring Saw": { 
        setupTime: "Low", 
        skillLevel: "Intermediate", 
        portability: "Medium",
        minorDamage: "Moderate",
        majorDamage: "High", 
        precision: "Moderate"
    },
    "Petrol Chain Saw": { 
        setupTime: "Low", 
        skillLevel: "Intermediate", 
        portability: "High",
        minorDamage: "Moderate",
        majorDamage: "High", 
        precision: "Low"
    },
    "Corded Chain Saw": { 
        setupTime: "Low", 
        skillLevel: "Intermediate", 
        portability: "Medium",
        minorDamage: "Moderate",
        majorDamage: "High", 
        precision: "Low"
    },
    "Walk behind floor saw": { 
        setupTime: "Low", 
        skillLevel: "Intermediate", 
        portability: "Medium",
        minorDamage: "Low",
        majorDamage: "Moderate", 
        precision: "Moderate"
    },
    "Automated Wall Saw": { 
        setupTime: "High", 
        skillLevel: "Intermediate", 
        portability: "Very Low",
        minorDamage: "Low",
        majorDamage: "Low", 
        precision: "High"
    },
    "Hydro blast": { 
        setupTime: "High", 
        skillLevel: "Advanced", 
        portability: "Low",
        minorDamage: "High",
        majorDamage: "Low", 
        precision: "Low"
    },
    "Blow torch": { 
        setupTime: "Moderate", 
        skillLevel: "Intermediate", 
        portability: "High",
        minorDamage: "Low",
        majorDamage: "Low", 
        precision: "Moderate"
    },
    "Demolition Hammer": { 
        setupTime: "Low", 
        skillLevel: "Basic", 
        portability: "Medium",
        minorDamage: "High",
        majorDamage: "Moderate", 
        precision: "Low"
    },
    "Torque Wrench": { 
        setupTime: "Low", 
        skillLevel: "Basic", 
        portability: "High",
        minorDamage: "Low",
        majorDamage: "Low", 
        precision: "High"
    },
    "Angle Grinder": { 
        setupTime: "Low", 
        skillLevel: "Basic", 
        portability: "High",
        minorDamage: "Moderate",
        majorDamage: "High", 
        precision: "Moderate"
    },
    "Hydraulic Piston": { 
        setupTime: "Low", 
        skillLevel: "Basic", 
        portability: "High",
        minorDamage: "High",
        majorDamage: "Low", 
        precision: "High"
    },
    "Welder": { 
        setupTime: "Moderate", 
        skillLevel: "Intermediate", 
        portability: "High",
        minorDamage: "Low",
        majorDamage: "Low", 
        precision: "Moderate"
    },
    "Diamond Drill": { 
        setupTime: "Low", 
        skillLevel: "Basic", 
        portability: "High",
        minorDamage: "Very High",
        majorDamage: "High", 
        precision: "Moderate"
    },
    "Impact Wrench": { 
        setupTime: "Low", 
        skillLevel: "Basic", 
        portability: "High",
        minorDamage: "Very High",
        majorDamage: "Low", 
        precision: "High"
    },
    "Rotary Hammer": { 
        setupTime: "Low", 
        skillLevel: "Intermediate", 
        portability: "High",
        minorDamage: "Very High",
        majorDamage: "Moderate", 
        precision: "Low"
    }
}

// Calculate damage probability using exponential distribution
function calculateDamageProbabilityForTools(tools, damageType) {
    let totalScore = 1; // Start with 1 (no damage probability)
    
    tools.forEach(toolData => {
        const time = toolData.time;
        let lambda = 0;
        
        if (damageType === 'minor') {
            lambda = minorDamageLambda[toolData.properties.minorDamage] || 0;
            const probability = 1 - Math.exp(-lambda * time);
            totalScore *= (1 - probability); // Probability of NO damage
        } else if (damageType === 'major') {
            lambda = majorDamageLambda[toolData.properties.majorDamage] || 0;
            const probability = 1 - Math.exp(-lambda * time);
            totalScore *= (1 - probability); // Probability of NO damage
        } else if (damageType === 'precision') {
            lambda = precisionLambda[toolData.properties.precision] || 0;
            const probability = Math.exp(-lambda * time); // For precision, higher is better
            totalScore *= probability;
        }
    });
    
    return totalScore;
}

// Calculate overall damage probability score
function calculateDamageProbability() {
    try {
        // Check if we have tools selected for both disassembly and reassembly
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
        
        // Calculate damage probabilities for each type
        // Disassembly probabilities
        const minorDisassembly = calculateDamageProbabilityForTools(disassemblyToolsData, 'minor');
        const majorDisassembly = calculateDamageProbabilityForTools(disassemblyToolsData, 'major');
        const precisionDisassembly = calculateDamageProbabilityForTools(disassemblyToolsData, 'precision');
        
        // Reassembly probabilities
        const minorReassembly = calculateDamageProbabilityForTools(reassemblyToolsData, 'minor');
        const majorReassembly = calculateDamageProbabilityForTools(reassemblyToolsData, 'major');
        const precisionReassembly = calculateDamageProbabilityForTools(reassemblyToolsData, 'precision');
        
        // Combined scores: (Disassembly + Reassembly) / 2
        const minorCombined = (minorDisassembly + minorReassembly) / 2;
        const majorCombined = (majorDisassembly + majorReassembly) / 2;
        const precisionCombined = (precisionDisassembly + precisionReassembly) / 2;
        
        // Weighted final score
        const finalScore = (minorCombined * damageWeights.minor) + 
                          (majorCombined * damageWeights.major) + 
                          (precisionCombined * damageWeights.precision);
        
        // Store result
        calculationResults.damageProbability = finalScore;
        
        // Display results
        const resultDiv = document.getElementById('damageProbabilityResult');
        const scoreDiv = document.getElementById('damageProbabilityScore');
        const detailsDiv = document.getElementById('damageProbabilityDetails');
        
        resultDiv.classList.remove('hidden');
        scoreDiv.innerHTML = `Score: <span style="color: ${getRatingColor(finalScore)}">${(finalScore * 100).toFixed(1)}%</span>`;
        
        detailsDiv.innerHTML = `
            <div><strong>Damage Probability Calculation:</strong></div>
            <div style="margin-top: 15px;"><strong>Disassembly Tools Analysis:</strong></div>
            ${disassemblyToolsData.map(tool => `<div>• ${tool.name}: ${tool.time} minutes</div>`).join('')}
            
            <div style="margin-top: 15px;"><strong>Reassembly Tools Analysis:</strong></div>
            ${reassemblyToolsData.map(tool => `<div>• ${tool.name}: ${tool.time} minutes</div>`).join('')}
            
            <div style="margin-top: 15px;"><strong>Individual Scores:</strong></div>
            <div>Minor Damage - Disassembly: ${(minorDisassembly * 100).toFixed(1)}%, Reassembly: ${(minorReassembly * 100).toFixed(1)}%</div>
            <div>Major Damage - Disassembly: ${(majorDisassembly * 100).toFixed(1)}%, Reassembly: ${(majorReassembly * 100).toFixed(1)}%</div>
            <div>Precision - Disassembly: ${(precisionDisassembly * 100).toFixed(1)}%, Reassembly: ${(precisionReassembly * 100).toFixed(1)}%</div>
            
            <div style="margin-top: 15px;"><strong>Combined Scores:</strong></div>
            <div>Minor Combined: ${(minorCombined * 100).toFixed(1)}% (Weight: ${damageWeights.minor})</div>
            <div>Major Combined: ${(majorCombined * 100).toFixed(1)}% (Weight: ${damageWeights.major})</div>
            <div>Precision Combined: ${(precisionCombined * 100).toFixed(1)}% (Weight: ${damageWeights.precision})</div>
            
            <div style="margin-top: 15px;"><strong>Final Calculation:</strong></div>
            <div>Score = (${(minorCombined * 100).toFixed(1)}% × ${damageWeights.minor}) + (${(majorCombined * 100).toFixed(1)}% × ${damageWeights.major}) + (${(precisionCombined * 100).toFixed(1)}% × ${damageWeights.precision})</div>
            <div><strong>Final Score = ${(finalScore * 100).toFixed(1)}%</strong></div>
        `;
        
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error calculating damage probability:', error);
        alert('Error in calculation. Please check your inputs.');
    }
}

// Calculate Ease of Reassembly Score
function calculateEaseOfReassembly() {
    try {
        const connectionType = document.getElementById('reassemblyConnectionType').value;
        const numberOfConnectors = parseFloat(document.getElementById('reassemblyNumberOfConnectors').value) || 0;
        
        if (!connectionType || Object.keys(selectedReassemblyTools).length === 0) {
            alert('Please select at least one tool and connection type for reassembly');
            return;
        }
        
        let totalTime = 0;
        let weightedSetupTime = 0;
        let weightedSkillLevel = 0;
        let weightedPortability = 0;
        let allToolsHaveTime = true;
        
        Object.keys(selectedReassemblyTools).forEach(tool => {
            const id = tool.replace(/\s+/g, '_').toLowerCase() + '_reassembly';
            const timeInput = document.getElementById('time_input_' + id);
            const time = parseFloat(timeInput.value) || 0;
            
            if (time <= 0) {
                allToolsHaveTime = false;
                return;
            }
            
            selectedReassemblyTools[tool].time = time;
            totalTime += time;
            
            const props = selectedReassemblyTools[tool].properties;
            weightedSetupTime += setupTimeScores[props.setupTime] * time;
            weightedSkillLevel += skillLevelScores[props.skillLevel] * time;
            weightedPortability += portabilityScores[props.portability] * time;
        });
        
        if (!allToolsHaveTime) {
            alert('Please enter time for all selected reassembly tools');
            return;
        }
        
        const avgSetupTime = weightedSetupTime / totalTime;
        const avgSkillLevel = weightedSkillLevel / totalTime;
        const avgPortability = weightedPortability / totalTime;
        
        let score = 0;
        let details = '';
        let connectorScore = 1;
        
        if (connectionType === 'Cementitious') {
            score = (avgSetupTime * 0.22) + (avgSkillLevel * 0.50) + (avgPortability * 0.28);
            
            details = `
                <div><strong>Calculation (Cementitious Connection):</strong></div>
                <div>Score = (Setup Time × 0.22) + (Skill Level × 0.50) + (Portability × 0.28)</div>
                <div>Score = (${avgSetupTime.toFixed(3)} × 0.22) + (${avgSkillLevel.toFixed(3)} × 0.50) + (${avgPortability.toFixed(3)} × 0.28)</div>
                <div><strong>Score = ${score.toFixed(4)}</strong></div>
            `;
        } else {
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
            
            score = (avgSetupTime * 0.15) + (avgSkillLevel * 0.48) + (avgPortability * 0.22) + (connectorScore * 0.15);
            
            details = `
                <div><strong>Calculation (${connectionType} Connection):</strong></div>
                <div>Score = (Setup Time × 0.15) + (Skill Level × 0.48) + (Portability × 0.22) + (Connectors × 0.15)</div>
                <div>Score = (${avgSetupTime.toFixed(3)} × 0.15) + (${avgSkillLevel.toFixed(3)} × 0.48) + (${avgPortability.toFixed(3)} × 0.22) + (${connectorScore} × 0.15)</div>
                <div><strong>Score = ${score.toFixed(4)}</strong></div>
            `;
        }
        
        details += `
            <div style="margin-top: 15px;">
                <strong>Tools Used:</strong><br>
        `;
        
        Object.keys(selectedReassemblyTools).forEach(tool => {
            details += `• ${tool}: ${selectedReassemblyTools[tool].time} minutes<br>`;
        });
        
        details += `
                <strong>Total Time:</strong> ${totalTime} minutes<br>
                <strong>Number of Connectors:</strong> ${numberOfConnectors} (Score: ${connectorScore})<br>
                <strong>Weighted Averages:</strong><br>
                • Setup Time: ${avgSetupTime.toFixed(3)}<br>
                • Skill Level: ${avgSkillLevel.toFixed(3)}<br>
                • Portability: ${avgPortability.toFixed(3)}
            </div>
        `;
        
        score = Math.max(0, Math.min(1, score));
        
        calculationResults.easeOfReassembly = score;
        
        const resultDiv = document.getElementById('reassemblyResult');
        const scoreDiv = document.getElementById('reassemblyScore');
        const detailsDiv = document.getElementById('reassemblyDetails');
        
        resultDiv.classList.remove('hidden');
        scoreDiv.innerHTML = `Score: <span style="color: ${getRatingColor(score)}">${(score * 100).toFixed(1)}%</span>`;
        detailsDiv.innerHTML = details;
        
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error calculating ease of reassembly:', error);
        alert('Error in calculation. Please check your inputs.');
    }
};

// Damage probability lambda values (per minute)
const minorDamageLambda = { "Low": 0.0074, "Moderate": 0.0170, "High": 0.0305, "Very High": 0.0536 };
const majorDamageLambda = { "Low": 0.0035, "Moderate": 0.0074, "High": 0.0119 };
const precisionLambda = { "High": 0.0035, "Moderate": 0.0170, "Low": 0.0402 };

// Damage probability weights
const damageWeights = {
    minor: 0.28,
    major: 0.52,
    precision: 0.20
};
const skillLevelScores = { "Basic": 1, "Intermediate": 0.5, "Advanced": 0 };
const portabilityScores = { "High": 1, "Medium": 0.66, "Low": 0.33, "Very Low": 0 };

// Reduction factors for materials (from Table 1)
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

// Tools available for reassembly (subset of disassembly tools)
const reassemblyToolProperties = {
    "Demolition Hammer": { 
        setupTime: "Low", 
        skillLevel: "Basic", 
        portability: "Medium",
        minorDamage: "High",
        majorDamage: "Moderate", 
        precision: "Low"
    },
    "Torque Wrench": { 
        setupTime: "Low", 
        skillLevel: "Basic", 
        portability: "High",
        minorDamage: "Low",
        majorDamage: "Low", 
        precision: "High"
    },
    "Angle Grinder": { 
        setupTime: "Low", 
        skillLevel: "Basic", 
        portability: "High",
        minorDamage: "Moderate",
        majorDamage: "High", 
        precision: "Moderate"
    },
    "Hydraulic Piston": { 
        setupTime: "Low", 
        skillLevel: "Basic", 
        portability: "High",
        minorDamage: "High",
        majorDamage: "Low", 
        precision: "High"
    },
    "Welder": { 
        setupTime: "Moderate", 
        skillLevel: "Intermediate", 
        portability: "High",
        minorDamage: "Low",
        majorDamage: "Low", 
        precision: "Moderate"
    },
    "Diamond Drill": { 
        setupTime: "Low", 
        skillLevel: "Basic", 
        portability: "High",
        minorDamage: "Very High",
        majorDamage: "High", 
        precision: "Moderate"
    },
    "Impact Wrench": { 
        setupTime: "Low", 
        skillLevel: "Basic", 
        portability: "High",
        minorDamage: "Very High",
        majorDamage: "Low", 
        precision: "High"
    },
    "Rotary Hammer": { 
        setupTime: "Low", 
        skillLevel: "Intermediate", 
        portability: "High",
        minorDamage: "Very High",
        majorDamage: "Moderate", 
        precision: "Low"
    }
};

// Global variables
let selectedTools = {};
let selectedReassemblyTools = {};
let calculationResults = {};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - initializing...');
    initializeToolSelection();
    setupReassemblyConnectionTypeListener();
    updateConnectionTypeOptions();
    
    // Initialize reassembly tools with a delay to ensure DOM is ready
    setTimeout(() => {
        initializeReassemblyToolSelection();
    }, 500);
});

// Alternative initialization function for manual trigger
function forceInitializeReassemblyTools() {
    console.log('=== FORCE INITIALIZE REASSEMBLY TOOLS ===');
    console.log('Current reassemblyToolProperties:', reassemblyToolProperties);
    console.log('Available functions:', {
        initializeReassemblyToolSelection: typeof initializeReassemblyToolSelection,
        getDamageClass: typeof getDamageClass,
        toggleReassemblyTool: typeof toggleReassemblyTool
    });
    
    initializeReassemblyToolSelection();
    
    // Also test if the grid exists
    const grid = document.getElementById('reassemblyToolSelectionGrid');
    console.log('Grid element check:', grid ? 'FOUND' : 'NOT FOUND');
    if (grid) {
        console.log('Grid current content length:', grid.innerHTML.length);
    }
}

// Tab switching functionality
function showTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => tab.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Get damage indicator class
function getDamageClass(level) {
    switch(level) {
        case 'Low': return 'damage-low';
        case 'Moderate': return 'damage-moderate';
        case 'High': return 'damage-high';
        case 'Very High': return 'damage-very-high';
        default: return 'damage-moderate';
    }
}

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
        
        // Add event listener to checkbox
        const checkbox = document.getElementById('tool_' + id);
        checkbox.addEventListener('change', () => toggleTool(tool));
    });
}

// Initialize reassembly tool selection grid
function initializeReassemblyToolSelection() {
    console.log('=== REASSEMBLY TOOLS INITIALIZATION START ===');
    
    const grid = document.getElementById('reassemblyToolSelectionGrid');
    if (!grid) {
        console.error('ERROR: reassemblyToolSelectionGrid element not found!');
        return;
    }
    
    console.log('Grid element found:', grid);
    console.log('Reassembly tool properties object:', reassemblyToolProperties);
    console.log('Available tools:', Object.keys(reassemblyToolProperties));
    
    // Clear existing content
    grid.innerHTML = '';
    
    const toolList = Object.keys(reassemblyToolProperties);
    
    if (toolList.length === 0) {
        console.error('ERROR: No tools found in reassemblyToolProperties!');
        grid.innerHTML = '<div style="padding: 20px; color: red;">Error: No reassembly tools available</div>';
        return;
    }
    
    console.log(`Creating ${toolList.length} tool items...`);
    
    toolList.forEach((tool, index) => {
        console.log(`Creating tool ${index + 1}/${toolList.length}: ${tool}`);
        
        const id = tool.replace(/\s+/g, '_').toLowerCase() + '_reassembly';
        const properties = reassemblyToolProperties[tool];
        
        if (!properties) {
            console.error(`ERROR: No properties found for tool: ${tool}`);
            return;
        }
        
        const toolItem = document.createElement('div');
        toolItem.className = 'tool-item';
        toolItem.innerHTML = `
            <div class="tool-header">
                <input type="checkbox" id="tool_${id}" class="tool-checkbox" />
                <label for="tool_${id}" class="tool-label">${tool}</label>
            </div>
            <div class="tool-properties">
                Setup: ${properties.setupTime} |
                Skill: ${properties.skillLevel} |
                Portability: ${properties.portability}
            </div>
            <div class="tool-damage-info">
                <div class="damage-indicator ${getDamageClass(properties.minorDamage)}">Minor: ${properties.minorDamage}</div>
                <div class="damage-indicator ${getDamageClass(properties.majorDamage)}">Major: ${properties.majorDamage}</div>
                <div class="damage-indicator ${getDamageClass(properties.precision)}">Precision: ${properties.precision}</div>
            </div>
            <div id="time_${id}" class="time-input hidden">
                <label>Time (minutes):</label>
                <input type="number" id="time_input_${id}" min="0" step="0.1" placeholder="Enter time">
            </div>
        `;
        
        grid.appendChild(toolItem);
        console.log(`Tool item created and added for: ${tool}`);
        
        // Add event listener to checkbox
        setTimeout(() => {
            const checkbox = document.getElementById('tool_' + id);
            if (checkbox) {
                checkbox.addEventListener('change', () => toggleReassemblyTool(tool));
                console.log(`Event listener added for: ${tool}`);
            } else {
                console.error(`ERROR: Checkbox not found for tool: ${tool}`);
            }
        }, 10);
    });
    
    console.log('=== REASSEMBLY TOOLS INITIALIZATION COMPLETE ===');
    console.log('Final grid content:', grid.innerHTML.substring(0, 200) + '...');
}

// Toggle reassembly tool selection
function toggleReassemblyTool(tool) {
    const id = tool.replace(/\s+/g, '_').toLowerCase() + '_reassembly';
    const checkbox = document.getElementById('tool_' + id);
    const timeInputDiv = document.getElementById('time_' + id);
    const toolItem = checkbox.closest('.tool-item');
    
    if (checkbox.checked) {
        selectedReassemblyTools[tool] = {
            time: 0,
            properties: reassemblyToolProperties[tool]
        };
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

// Setup reassembly connection type listener
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

// Toggle tool selection
function toggleTool(tool) {
    const id = tool.replace(/\s+/g, '_').toLowerCase();
    const checkbox = document.getElementById('tool_' + id);
    const timeInputDiv = document.getElementById('time_' + id);
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
        document.getElementById('time_input_' + id).value = '';
    }
    
    updateSelectedToolsDisplay();
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
            const properties = selectedReassemblyTools[tool].properties;
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

// Joint area calculation with proper field visibility
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

// Update reduction factor based on strength class and mortar type
function updateReductionFactor() {
    const strengthClass = document.getElementById('strengthClass').value;
    const mortarType = document.getElementById('mortarType').value;
    
    let reductionFactor = '--';
    
    if (strengthClass && mortarType) {
        if (reductionFactors[strengthClass] && reductionFactors[strengthClass][mortarType] !== undefined) {
            reductionFactor = reductionFactors[strengthClass][mortarType];
        } else {
            // If undefined, return 1.00 as default
            reductionFactor = 1.00;
        }
    }
    
    const display = document.getElementById('reductionFactorDisplay');
    if (display) display.textContent = reductionFactor;
    
    return reductionFactor;
}

// Update connection type options
function updateConnectionTypeOptions() {
    const connectionType = document.getElementById('connectionType');
    if (!connectionType) return;
    
    connectionType.addEventListener('change', function() {
        updateJointArea();
        updateReinforcementType();
    });
}

// Update reinforcement type based on connection type
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

// Calculate reinforcement area based on connection type and inputs
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

// Toggle no waste option
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

// Calculate End of Cycle Waste Score
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
            <div>Joint Area: ${jointArea.toFixed(2)} cm²</div>
            <div>Material Waste Area: ${wasteArea.toFixed(2)} cm²</div>
            <div>Reinforcement Waste Area: ${reinforcementArea.toFixed(2)} cm²</div>
            <div>Material Reduction Factor: ${reductionFactor}</div>
            <div>Reinforcement Reduction Factor: ${reinforcementReductionFactor}</div>
            <div style="margin-top: 15px;"><strong>Formula:</strong></div>
            <div>Score = 1 - (Material Waste Component + Reinforcement Waste Component)</div>
            <div style="margin-top: 10px;"><strong>Material Waste Component:</strong></div>
            <div>(${wasteArea.toFixed(2)} / ${reductionFactor}) / ${jointArea.toFixed(2)} = ${materialWasteComponent.toFixed(6)}</div>
            <div style="margin-top: 10px;"><strong>Reinforcement Waste Component:</strong></div>
            <div>(${reinforcementArea.toFixed(2)} / ${jointArea.toFixed(2)}) / ${reinforcementReductionFactor} = ${reinforcementWasteComponent.toFixed(6)}</div>
            <div style="margin-top: 10px;"><strong>Final Score:</strong></div>
            <div>Score = 1 - (${materialWasteComponent.toFixed(6)} + ${reinforcementWasteComponent.toFixed(6)}) = ${score.toFixed(4)}</div>
        `;
        
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error calculating end of cycle waste:', error);
        alert('Error in calculation. Please check your inputs.');
    }
}

// Calculate Prefabrication Degree Score
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
            <div>Joint Area: ${jointArea.toFixed(2)} cm²</div>
            <div>Prefabricated Area: ${prefabricatedArea.toFixed(2)} cm²</div>
            <div>Formula: Prefabricated Area / Joint Area</div>
            <div>Score = ${prefabricatedArea.toFixed(2)} / ${jointArea.toFixed(2)} = ${score.toFixed(4)}</div>
        `;
        
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error calculating prefabrication degree:', error);
        alert('Error in calculation. Please check your inputs.');
    }
}

// Update disassembly parameters based on connection type
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
                <div style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                    <strong>Formula:</strong> Σ(score × time) / Σ(time) for each parameter<br>
                    <strong>Final Score:</strong> (Setup × 0.22) + (Skill × 0.50) + (Portability × 0.28)
                </div>
            `;
        } else {
            if (connectorsGroup) connectorsGroup.style.display = 'flex';
            subParametersList.innerHTML = `
                <div><strong>Parameters for ${connectionType} Connections:</strong></div>
                <div>• <strong>Setup Time:</strong> Weight 0.15</div>
                <div>• <strong>Skill Level:</strong> Weight 0.48</div>
                <div>• <strong>Portability:</strong> Weight 0.22</div>
                <div>• <strong>Number of Connectors:</strong> Weight 0.15</div>
                <div style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px;">
                    <strong>Formula:</strong> Σ(score × time) / Σ(time) for setup, skill, portability<br>
                    <strong>Connector Scoring:</strong> ≤2 connectors = 1.0, 3 or 5 = 0.95, others = 0.9<br>
                    <strong>Final Score:</strong> (Setup × 0.15) + (Skill × 0.48) + (Portability × 0.22) + (Connectors × 0.15)
                </div>
            `;
        }
    } else {
        if (connectorsGroup) connectorsGroup.style.display = 'none';
        subParametersDisplay.classList.add('hidden');
    }
}

// Calculate Ease of Disassembly Score
function calculateEaseOfDisassembly() {
    try {
        const connectionType = document.getElementById('disassemblyConnectionType').value;
        const numberOfConnectors = parseFloat(document.getElementById('numberOfConnectors').value) || 0;
        
        if (!connectionType || Object.keys(selectedTools).length === 0) {
            alert('Please select at least one tool and connection type');
            return;
        }
        
        let totalTime = 0;
        let weightedSetupTime = 0;
        let weightedSkillLevel = 0;
        let weightedPortability = 0;
        let allToolsHaveTime = true;
        
        Object.keys(selectedTools).forEach(tool => {
            const id = tool.replace(/\s+/g, '_').toLowerCase();
            const timeInput = document.getElementById('time_input_' + id);
            const time = parseFloat(timeInput.value) || 0;
            
            if (time <= 0) {
                allToolsHaveTime = false;
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
            alert('Please enter time for all selected tools');
            return;
        }
        
        const avgSetupTime = weightedSetupTime / totalTime;
        const avgSkillLevel = weightedSkillLevel / totalTime;
        const avgPortability = weightedPortability / totalTime;
        
        let score = 0;
        let details = '';
        let connectorScore = 1;
        
        if (connectionType === 'Cementitious') {
            score = (avgSetupTime * 0.22) + (avgSkillLevel * 0.50) + (avgPortability * 0.28);
            
            details = `
                <div><strong>Calculation (Cementitious Connection):</strong></div>
                <div>Score = (Setup Time × 0.22) + (Skill Level × 0.50) + (Portability × 0.28)</div>
                <div>Score = (${avgSetupTime.toFixed(3)} × 0.22) + (${avgSkillLevel.toFixed(3)} × 0.50) + (${avgPortability.toFixed(3)} × 0.28)</div>
                <div><strong>Score = ${score.toFixed(4)}</strong></div>
            `;
        } else {
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
            
            score = (avgSetupTime * 0.15) + (avgSkillLevel * 0.48) + (avgPortability * 0.22) + (connectorScore * 0.15);
            
            details = `
                <div><strong>Calculation (${connectionType} Connection):</strong></div>
                <div>Score = (Setup Time × 0.15) + (Skill Level × 0.48) + (Portability × 0.22) + (Connectors × 0.15)</div>
                <div>Score = (${avgSetupTime.toFixed(3)} × 0.15) + (${avgSkillLevel.toFixed(3)} × 0.48) + (${avgPortability.toFixed(3)} × 0.22) + (${connectorScore} × 0.15)</div>
                <div><strong>Score = ${score.toFixed(4)}</strong></div>
            `;
        }
        
        details += `
            <div style="margin-top: 15px;">
                <strong>Tools Used:</strong><br>
        `;
        
        Object.keys(selectedTools).forEach(tool => {
            details += `• ${tool}: ${selectedTools[tool].time} minutes<br>`;
        });
        
        details += `
                <strong>Total Time:</strong> ${totalTime} minutes<br>
                <strong>Number of Connectors:</strong> ${numberOfConnectors} (Score: ${connectorScore})<br>
                <strong>Weighted Averages:</strong><br>
                • Setup Time: ${avgSetupTime.toFixed(3)}<br>
                • Skill Level: ${avgSkillLevel.toFixed(3)}<br>
                • Portability: ${avgPortability.toFixed(3)}
            </div>
        `;
        
        score = Math.max(0, Math.min(1, score));
        
        calculationResults.easeOfDisassembly = score;
        
        const resultDiv = document.getElementById('disassemblyResult');
        const scoreDiv = document.getElementById('disassemblyScore');
        const detailsDiv = document.getElementById('disassemblyDetails');
        
        resultDiv.classList.remove('hidden');
        scoreDiv.innerHTML = `Score: <span style="color: ${getRatingColor(score)}">${(score * 100).toFixed(1)}%</span>`;
        detailsDiv.innerHTML = details;
        
        resultDiv.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error calculating ease of disassembly:', error);
        alert('Error in calculation. Please check your inputs.');
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
window.forceInitializeReassemblyTools = forceInitializeReassemblyTools;

console.log('Construction Reusability Calculator loaded successfully');
console.log('Available tools:', Object.keys(toolProperties));
console.log('Reduction factors loaded:', Object.keys(reductionFactors));

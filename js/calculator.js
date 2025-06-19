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
};

// Score mappings for ease of disassembly/reassembly
const setupTimeScores = { "Low": 1, "Moderate": 0.5, "High": 0 };
const skillLevelScores = { "Basic": 1, "Intermediate": 0.5, "Advanced": 0 };
const portabilityScores = { "High": 1, "Medium": 0.66, "Low": 0.33, "Very Low": 0 };

// Damage probability lambda values (per minute)
const minorDamageLambda = { "Low": 0.0074, "Moderate": 0.0170, "High": 0.0305, "Very High": 0.0536 };
const majorDamageLambda = { "Low": 0.0035, "Moderate": 0.0074, "High": 0.0119 };
const precisionLambda = { "High": 0.0035, "Moderate": 0.0170, "Low": 0.0402 };

// Reduction factors for materials (from Table 1)
const reductionFactors = {
    "C12/15": { "IIIA": 2.03, "IIIB": 2.29, "IIIC": 2.50, "I": 1.82 },
    "C20/25": { "IIIA": 1.98, "IIIB": 2.23, "IIIC": 2.44, "I": 1.69 },
    "C30/37": { "IIIA": 1.85, "IIIB": 2.09, "IIIC": 2.30, "I": 1.57 },
    "C40/50": { "IIIA": 1.74, "IIIB": 1.96, "I": 1.46 },
    "C45/55": { "IIIA": 1.70, "IIIB": 1.90, "IIIC": 2.10, "I": 1.44 },
    "C50/60": { "IIIA": 1.53, "IIIB": 1.75, "I": 1.28 },
    "C55/67": { "IIIA": 1.58, "IIIB": 1.60, "I": 1.38 },
    "C60/76": { "IIIA": 1.52, "IIIB": 1.64, "I": 1.29 },
    "C70/85": { "IIIA": 1.27, "IIIB": 1.37, "I": 1.10 },
    "C80/95": { "IIIA": 1.15, "IIIB": 1.08, "I": 1.04 },
    "C90/105": { "IIIA": 1.08, "IIIB": 1.04, "I": 1.04 }
};

// Global variables
let selectedTools = {};
let calculationResults = {};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeToolSelection();
    updateConnectionTypeOptions();
});

// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
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

// Static tool toggle function (for HTML-defined tools)
function toggleToolStatic(toolName, checkbox) {
    const id = toolName.replace(/\s+/g, '_').toLowerCase();
    const timeInputDiv = document.getElementById('time_' + id);
    const toolItem = checkbox.closest('.tool-item');
    
    if (checkbox.checked) {
        selectedTools[toolName] = {
            time: 0,
            properties: toolProperties[toolName]
        };
        timeInputDiv.classList.remove('hidden');
        toolItem.classList.add('selected');
    } else {
        delete selectedTools[toolName];
        timeInputDiv.classList.add('hidden');
        toolItem.classList.remove('selected');
        const timeInput = document.getElementById('time_input_' + id);
        if (timeInput) timeInput.value = '';
    }
    
    updateSelectedToolsDisplay();
}

// Toggle tool selection (for dynamically generated tools)
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

// Joint area calculation
function updateJointArea() {
    const connectionType = document.getElementById('connectionType').value;
    const length = parseFloat(document.getElementById('length').value) || 0;
    const width = parseFloat(document.getElementById('width').value) || 0;
    const height = parseFloat(document.getElementById('height').value) || 0;
    
    let jointArea = 0;
    
    if (connectionType && length && width) {
        if (connectionType === 'Wall-Wall Horizontal') {
            jointArea = length * width;
        } else if (connectionType === 'Column-Column') {
            jointArea = length * width;
        } else if (connectionType === 'Other' && height) {
            jointArea = Math.min(length, width) * height;
        }
    }
    
    const display = document.getElementById('jointAreaDisplay');
    const display2 = document.getElementById('jointAreaDisplay2');
    
    if (display) display.textContent = jointArea.toFixed(2) + ' cm²';
    if (display2) display2.textContent = jointArea.toFixed(2) + ' cm²';
    
    return jointArea;
}

// Update reduction factor based on strength class and mortar type
function updateReductionFactor() {
    const strengthClass = document.getElementById('strengthClass').value;
    const mortarType = document.getElementById('mortarType').value;
    
    let reductionFactor = '--';
    
    if (strengthClass && mortarType && reductionFactors[strengthClass] && reductionFactors[strengthClass][mortarType]) {
        reductionFactor = reductionFactors[strengthClass][mortarType];
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
    const reinforcementLabel = document.getElementById('reinforcementLabel');
    const reinforcementLengthGroup = document.getElementById('reinforcementLengthGroup');
    
    if (!reinforcementTypeDisplay || !reinforcementLabel) return;
    
    if (connectionType === 'Column-Column') {
        reinforcementTypeDisplay.textContent = 'Number of Reinforcement Bars';
        reinforcementLabel.textContent = 'Number of Reinforcement Bars:';
        if (reinforcementLengthGroup) reinforcementLengthGroup.style.display = 'none';
    } else if (connectionType === 'Wall-Wall Horizontal') {
        reinforcementTypeDisplay.textContent = 'Length of Reinforcement';
        reinforcementLabel.textContent = 'Reinforcement Length (cm):';
        if (reinforcementLengthGroup) reinforcementLengthGroup.style.display = 'flex';
    } else if (connectionType === 'Other') {
        reinforcementTypeDisplay.textContent = 'Number of Reinforcement Bars';
        reinforcementLabel.textContent = 'Number of Reinforcement Bars:';
        if (reinforcementLengthGroup) reinforcementLengthGroup.style.display = 'none';
    }
}

// Calculate End of Cycle Waste Score
function calculateEndOfCycleWaste() {
    try {
        const jointArea = updateJointArea();
        const wasteArea = parseFloat(document.getElementById('wasteArea').value) || 0;
        const reductionFactor = updateReductionFactor();
        
        if (!jointArea || wasteArea < 0 || reductionFactor === '--') {
            alert('Please fill in all required fields correctly');
            return;
        }
        
        const reusableArea = jointArea - wasteArea;
        const score = Math.max(0, Math.min(1, (reusableArea / jointArea) * (1 / reductionFactor)));
        
        // Store result
        calculationResults.endOfCycleWaste = score;
        
        // Display results
        const resultDiv = document.getElementById('endOfCycleResult');
        const scoreDiv = document.getElementById('endOfCycleScore');
        const detailsDiv = document.getElementById('endOfCycleDetails');
        
        resultDiv.classList.remove('hidden');
        scoreDiv.innerHTML = `Score: <span style="color: ${getRatingColor(score)}">${(score * 100).toFixed(1)}%</span>`;
        
        detailsDiv.innerHTML = `
            <div><strong>Calculation Details:</strong></div>
            <div>Joint Area: ${jointArea.toFixed(2)} cm²</div>
            <div>Waste Area: ${wasteArea.toFixed(2)} cm²</div>
            <div>Reusable Area: ${reusableArea.toFixed(2)} cm²</div>
            <div>Reduction Factor: ${reductionFactor}</div>
            <div>Formula: (Reusable Area / Joint Area) × (1 / RF)</div>
            <div>Score = (${reusableArea.toFixed(2)} / ${jointArea.toFixed(2)}) × (1 / ${reductionFactor}) = ${score.toFixed(4)}</div>
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
        
        // Store result
        calculationResults.prefabricationDegree = score;
        
        // Display results
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

// Update disassembly parameters
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
                <div><strong>Setup Time:</strong> Weight 0.22</div>
                <div><strong>Skill Level:</strong> Weight 0.50</div>
                <div><strong>Portability:</strong> Weight 0.28</div>
                <div style="margin-top: 10px; color: #666; font-style: italic;">
                    Formula: Σ(score × time) / Σ(time) for each parameter
                </div>
            `;
        } else {
            if (connectorsGroup) connectorsGroup.style.display = 'flex';
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
        
        // Collect tool times and calculate weighted averages
        let totalTime = 0;
        let weightedSetupTime = 0;
        let weightedSkillLevel = 0;
        let weightedPortability = 0;
        
        Object.keys(selectedTools).forEach(tool => {
            const id = tool.replace(/\s+/g, '_').toLowerCase();
            let timeInput = document.getElementById('time_' + id) || document.getElementById('time_input_' + id);
            const time = parseFloat(timeInput.value) || 0;
            
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
        
        // Store result
        calculationResults.easeOfDisassembly = score;
        
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

// Calculate damage probability using exponential distribution
function calculateDamageProbability(tools, damageType) {
    let totalScore = 1;
    
    tools.forEach(tool => {
        const time = tool.time;
        let lambda = 0;
        
        if (damageType === 'minor') {
            lambda = minorDamageLambda[tool.properties.minorDamage] || 0;
            const probability = 1 - Math.exp(-lambda * time);
            totalScore *= (1 - probability);
        } else if (damageType === 'major') {
            lambda = majorDamageLambda[tool.properties.majorDamage] || 0;
            const probability = 1 - Math.exp(-lambda * time);
            totalScore *= (1 - probability);
        } else if (damageType === 'precision') {
            lambda = precisionLambda[tool.properties.precision] || 0;
            const probability = Math.exp(-lambda * time);
            totalScore *= probability;
        }
    });
    
    return totalScore;
}

// Get rating color based on score
function getRatingColor(score) {
    if (score >= 0.75) return "#4CAF50";  // Green
    if (score >= 0.5) return "#FFC107";   // Yellow
    if (score >= 0.25) return "#FF9800";  // Orange
    return "#F44336";                     // Red
}

// Utility functions for additional parameters

// Calculate number of steps score
function calculateStepsScore(steps) {
    if (steps <= 15) return 1;
    if (steps >= 60) return 0;
    return (60 - steps) / 45;
}

// Calculate time score for connection complexity and number of steps
function calculateTimeScore(totalTime) {
    if (totalTime <= 120) return 1;
    if (totalTime > 240) return 0;
    return 2 - (totalTime / 120);
}

// Calculate tolerance score
function calculateToleranceScore(tolerance) {
    if (tolerance < 10) return 0;
    if (tolerance > 50) return 1;
    return (tolerance - 10) / 40;
}

// Calculate size score based on joint area
function calculateSizeScore(jointArea) {
    if (jointArea <= 600) return 1;
    if (jointArea >= 2500) return 0;
    return (2500 - jointArea) / 1900;
}

// Calculate structural strength score
function calculateStructuralStrengthScore(strengthRatio, consequenceClass, connectionType) {
    const thresholds = {
        'CC3': { 'Fixed': { strong: 1.35, moderate: 1.25 }, 'Partially Fixed': { strong: 1.30, moderate: 1.20 }, 'Pinned': { strong: 1.25, moderate: 1.15 } },
        'CC2': { 'Fixed': { strong: 1.30, moderate: 1.20 }, 'Partially Fixed': { strong: 1.25, moderate: 1.15 }, 'Pinned': { strong: 1.20, moderate: 1.10 } },
        'CC1': { 'Fixed': { strong: 1.25, moderate: 1.15 }, 'Partially Fixed': { strong: 1.20, moderate: 1.10 }, 'Pinned': { strong: 1.15, moderate: 1.05 } }
    };
    
    const threshold = thresholds[consequenceClass][connectionType];
    if (strengthRatio >= threshold.strong) return 1.0;
    if (strengthRatio >= threshold.moderate) return 0.5;
    return 0.0;
}

// Calculate accessibility score
function calculateAccessibilityScore(accessibilityType) {
    const scores = {
        'Non-accessible standard connections': 0,
        'Partially accessible standard connections': 0.25,
        'Non-accessible DFD connections': 0.5,
        'Partially accessible DFD connections': 0.75,
        'Accessible DFD connection': 1
    };
    return scores[accessibilityType] || 0;
}

// Calculate design documentation score
function calculateDesignDocumentationScore(documentationType) {
    const scores = {
        'Full Digital Availability': 1.0,
        'Full Paper Availability': 0.9,
        'High Digital Availability': 0.8,
        'High Paper Availability': 0.7,
        'Moderate Digital Availability': 0.6,
        'Moderate Paper Availability': 0.5,
        'Low Digital Availability': 0.4,
        'Low Paper Availability': 0.3,
        'No Availability': 0.0
    };
    return scores[documentationType] || 0;
}

// Connection complexity sub-parameter calculations
function calculateConnectionTypeScore(connectionType) {
    const scores = {
        'Pinned': 1,
        'Semi-Rigid': 0.5,
        'Rigid': 0
    };
    return scores[connectionType] || 0;
}

function calculateIndustryPreferenceScore(preference) {
    const scores = {
        'Common': 1,
        'Less Common': 0.5,
        'Not Common': 0
    };
    return scores[preference] || 0;
}

// Complete damage probability calculation for all selected tools
function calculateCompleteDamageProbability() {
    if (Object.keys(selectedTools).length === 0) return { minor: 0, major: 0, precision: 0 };
    
    const toolsArray = Object.keys(selectedTools).map(toolName => ({
        time: selectedTools[toolName].time,
        properties: selectedTools[toolName].properties
    }));
    
    const minorScore = calculateDamageProbability(toolsArray, 'minor');
    const majorScore = calculateDamageProbability(toolsArray, 'major');
    const precisionScore = calculateDamageProbability(toolsArray, 'precision');
    
    // Combined damage probability score (weighted average)
    const combinedScore = (minorScore * 0.28) + (majorScore * 0.52) + (precisionScore * 0.20);
    
    return {
        minor: minorScore,
        major: majorScore,
        precision: precisionScore,
        combined: combinedScore
    };
}

// Calculate ease of reassembly (similar to disassembly but may use different tools)
function calculateEaseOfReassembly(tools, connectionType, numberOfConnectors = 0) {
    // This would follow the same logic as disassembly but with potentially different tool selections
    // For now, we'll use the same calculation as disassembly
    return calculateEaseOfDisassembly();
}

// Calculate connection complexity score
function calculateConnectionComplexity(connectionType, industryPreference, skillLevel, totalTime) {
    const connectionTypeScore = calculateConnectionTypeScore(connectionType);
    const preferenceScore = calculateIndustryPreferenceScore(industryPreference);
    const skillScore = skillLevelScores[skillLevel] || 0;
    const timeScore = calculateTimeScore(totalTime);
    
    // Weighted combination: 0.10, 0.30, 0.30, 0.30
    const score = (connectionTypeScore * 0.10) + (preferenceScore * 0.30) + (skillScore * 0.30) + (timeScore * 0.30);
    
    return Math.max(0, Math.min(1, score));
}

// Calculate number of steps and time combined score
function calculateNumberOfStepsAndTime(steps, totalTime) {
    const stepsScore = calculateStepsScore(steps);
    const timeScore = calculateTimeScore(totalTime);
    
    // Equal weighting: 0.50, 0.50
    const score = (stepsScore * 0.50) + (timeScore * 0.50);
    
    return Math.max(0, Math.min(1, score));
}

// Calculate overall reusability score using all parameters
function calculateOverallReusabilityScore() {
    const weights = {
        endOfCycleWaste: 2.40,
        damageProbability: 2.65,
        easeOfDisassembly: 3.06,
        easeOfReassembly: 2.70,
        connectionComplexity: 2.80,
        numberOfStepsAndTime: 2.41,
        accessibilityOfConnection: 1.50,
        tolerance: 1.49,
        prefabricationDegree: 1.26,
        size: 1.06,
        structuralStrength: 1.00,
        designDocumentation: 3.68
    };
    
    let totalScore = 0;
    let totalWeight = 0;
    
    // Only include parameters that have been calculated
    Object.keys(calculationResults).forEach(parameter => {
        if (weights[parameter]) {
            totalScore += calculationResults[parameter] * weights[parameter];
            totalWeight += weights[parameter];
        }
    });
    
    if (totalWeight === 0) return 0;
    
    return totalScore / totalWeight;
}

// Export calculation results
function exportResults() {
    const results = {
        timestamp: new Date().toISOString(),
        calculationResults: calculationResults,
        selectedTools: selectedTools,
        overallScore: calculateOverallReusabilityScore()
    };
    
    const jsonString = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `reusability_assessment_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Import calculation results
function importResults(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const results = JSON.parse(e.target.result);
            calculationResults = results.calculationResults || {};
            selectedTools = results.selectedTools || {};
            
            // Update UI to reflect imported data
            updateSelectedToolsDisplay();
            
            // Show imported results
            alert('Results imported successfully!');
        } catch (error) {
            alert('Error importing results: Invalid file format');
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);
}

// Generate detailed report
function generateDetailedReport() {
    const overallScore = calculateOverallReusabilityScore();
    const damageProb = calculateCompleteDamageProbability();
    
    const report = `
# Construction Connection Reusability Assessment Report

**Generated:** ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

## Overall Reusability Score: ${(overallScore * 100).toFixed(1)}%

## Parameter Scores:

${Object.keys(calculationResults).map(param => 
    `- **${param.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:** ${(calculationResults[param] * 100).toFixed(1)}%`
).join('\n')}

## Tool Analysis:

${Object.keys(selectedTools).map(tool => `
### ${tool}
- **Time Used:** ${selectedTools[tool].time} minutes
- **Setup Time:** ${selectedTools[tool].properties.setupTime}
- **Skill Level:** ${selectedTools[tool].properties.skillLevel}
- **Portability:** ${selectedTools[tool].properties.portability}
`).join('\n')}

## Damage Probability Analysis:
- **Minor Damage Probability:** ${(damageProb.minor * 100).toFixed(1)}%
- **Major Damage Probability:** ${(damageProb.major * 100).toFixed(1)}%
- **Precision Score:** ${(damageProb.precision * 100).toFixed(1)}%
- **Combined Damage Score:** ${(damageProb.combined * 100).toFixed(1)}%

## Recommendations:

${generateRecommendations(overallScore, calculationResults)}
    `;
    
    return report;
}

// Generate recommendations based on scores
function generateRecommendations(overallScore, results) {
    let recommendations = [];
    
    if (overallScore < 0.5) {
        recommendations.push("- Overall reusability is low. Consider design modifications to improve connection reusability.");
    }
    
    if (results.endOfCycleWaste && results.endOfCycleWaste < 0.6) {
        recommendations.push("- High end-of-cycle waste detected. Consider using more reusable materials or reducing waste area.");
    }
    
    if (results.easeOfDisassembly && results.easeOfDisassembly < 0.6) {
        recommendations.push("- Disassembly is challenging. Consider using tools with better portability and lower skill requirements.");
    }
    
    if (results.prefabricationDegree && results.prefabricationDegree < 0.7) {
        recommendations.push("- Low prefabrication degree. Increasing factory production can improve reusability.");
    }
    
    if (recommendations.length === 0) {
        recommendations.push("- Good reusability potential. Continue with current design approach.");
    }
    
    return recommendations.join('\n');
}

// Save report as file
function saveReport() {
    const report = generateDetailedReport();
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `reusability_report_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Make functions globally accessible
window.showTab = showTab;
window.toggleTool = toggleTool;
window.toggleToolStatic = toggleToolStatic;
window.updateJointArea = updateJointArea;
window.updateReductionFactor = updateReductionFactor;
window.updateDisassemblyParameters = updateDisassemblyParameters;
window.calculateEndOfCycleWaste = calculateEndOfCycleWaste;
window.calculatePrefabricationDegree = calculatePrefabricationDegree;
window.calculateEaseOfDisassembly = calculateEaseOfDisassembly;
window.exportResults = exportResults;
window.importResults = importResults;
window.saveReport = saveReport;

// Console logging for debugging
console.log('Construction Reusability Calculator loaded successfully');
console.log('Available tools:', Object.keys(toolProperties));
console.log('Reduction factors loaded:', Object.keys(reductionFactors));

// Construction Connection Reusability Assessment Calculator v3.5
// Completely fixed version with all syntax errors resolved

console.log('Loading calculator-v3.js - Version 3.5');

// Score mappings
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

// Tools for reassembly
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

// Joint area calculation
function updateJointArea() {
    const connectionType = document.getElementById('connectionType');
    const length = document.getElementById('length');
    const width = document.getElementById('width');
    const height = document.getElementById('height');
    const heightGroup = document.getElementById('heightGroup');
    
    if (!connectionType || !length || !width) {
        console.warn('Required elements not found for joint area calculation');
        return 0;
    }
    
    const connectionValue = connectionType.value;
    const lengthValue = parseFloat(length.value) || 0;
    const widthValue = parseFloat(width.value) || 0;
    const heightValue = parseFloat(height.value) || 0;
    
    if (connectionValue === 'Other') {
        if (heightGroup) heightGroup.style.display = 'flex';
        if (height) height.required = true;
    } else {
        if (heightGroup) heightGroup.style.display = 'none';
        if (height) height.required = false;
    }
    
    let jointArea = 0;
    if (connectionValue && lengthValue && widthValue) {
        if (connectionValue === 'Wall-Wall Horizontal' || connectionValue === 'Column-Column') {
            jointArea = lengthValue * widthValue;
        } else if (connectionValue === 'Other' && heightValue) {
            jointArea = Math.min(lengthValue, widthValue) * heightValue;
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
    const strengthClass = document.getElementById('strengthClass');
    const mortarType = document.getElementById('mortarType');
    
    if (!strengthClass || !mortarType) {
        console.warn('Required elements not found for reduction factor calculation');
        return '--';
    }
    
    const strengthValue = strengthClass.value;
    const mortarValue = mortarType.value;
    
    let reductionFactor = '--';
    
    if (strengthValue && mortarValue) {
        if (reductionFactors[strengthValue] && reductionFactors[strengthValue][mortarValue] !== undefined) {
            reductionFactor = reductionFactors[strengthValue][mortarValue];
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
    const connectionType = document.getElementById('connectionType');
    const reinforcementTypeDisplay = document.getElementById('reinforcementTypeDisplay');
    const reinforcementNumberGroup = document.getElementById('reinforcementNumberGroup');
    const reinforcementLengthGroup = document.getElementById('reinforcementLengthGroup');
    const reinforcementOtherLengthGroup = document.getElementById('reinforcementOtherLengthGroup');
    const reinforcementDiameterGroup = document.getElementById('reinforcementDiameterGroup');
    
    if (!connectionType || !reinforcementTypeDisplay) return;
    
    const connectionValue = connectionType.value;
    
    if (reinforcementNumberGroup) reinforcementNumberGroup.style.display = 'none';
    if (reinforcementLengthGroup) reinforcementLengthGroup.style.display = 'none';
    if (reinforcementOtherLengthGroup) reinforcementOtherLengthGroup.style.display = 'none';
    
    if (connectionValue === 'Column-Column') {
        reinforcementTypeDisplay.textContent = 'Number of Reinforcement Bars';
        if (reinforcementNumberGroup) reinforcementNumberGroup.style.display = 'flex';
        if (reinforcementDiameterGroup) reinforcementDiameterGroup.style.display = 'flex';
    } else if (connectionValue === 'Wall-Wall Horizontal') {
        reinforcementTypeDisplay.textContent = 'Length of Reinforcement';
        if (reinforcementLengthGroup) reinforcementLengthGroup.style.display = 'flex';
        if (reinforcementDiameterGroup) reinforcementDiameterGroup.style.display = 'flex';
    } else if (connectionValue === 'Other') {
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
    const connectionType = document.getElementById('connectionType');
    const diameter = document.getElementById('reinforcementDiameter');
    const noWaste = document.getElementById('noReinforcementWaste');
    const reinforcementAreaDisplay = document.getElementById('reinforcementAreaDisplay');
    
    if (!connectionType || !diameter || !noWaste || !reinforcementAreaDisplay) {
        console.warn('Required elements not found for reinforcement area calculation');
        return 0;
    }
    
    const connectionValue = connectionType.value;
    const diameterValue = parseFloat(diameter.value) || 8;
    const noWasteValue = noWaste.checked;
    
    if (noWasteValue) {
        reinforcementAreaDisplay.textContent = '0 cm² (No waste)';
        return 0;
    }
    
    let reinforcementArea = 0;
    
    if (connectionValue === 'Column-Column') {
        const numberOfBars = document.getElementById('reinforcementNumber');
        if (numberOfBars) {
            const numberOfBarsValue = parseFloat(numberOfBars.value) || 0;
            if (numberOfBarsValue > 0) {
                const diameterCm = diameterValue / 10;
                reinforcementArea = Math.PI * Math.pow(diameterCm, 2) / 4 * numberOfBarsValue;
            }
        }
    } else if (connectionValue === 'Wall-Wall Horizontal') {
        const length = document.getElementById('reinforcementLength');
        if (length) {
            const lengthValue = parseFloat(length.value) || 0;
            if (lengthValue > 0) {
                const diameterCm = diameterValue / 10;
                reinforcementArea = Math.PI * Math.pow(diameterCm, 2) / 4;
            }
        }
    } else if (connectionValue === 'Other') {
        const length = document.getElementById('reinforcementOtherLength');
        const numberOfBars = document.getElementById('reinforcementNumber');
        if (length && numberOfBars) {
            const lengthValue = parseFloat(length.value) || 0;
            const numberOfBarsValue = parseFloat(numberOfBars.value) || 0;
            if (lengthValue > 0 && numberOfBarsValue > 0) {
                const diameterCm = diameterValue / 10;
                reinforcementArea = lengthValue * numberOfBarsValue * diameterCm;
            }
        }
    }
    
    reinforcementAreaDisplay.textContent = reinforcementArea.toFixed(2) + ' cm²';
    return reinforcementArea;
}

function toggleNoWaste() {
    const noWaste = document.getElementById('noReinforcementWaste');
    
    if (!noWaste) return;
    
    const noWasteValue = noWaste.checked;
    
    const reinforcementNumber = document.getElementById('reinforcementNumber');
    const reinforcementLength = document.getElementById('reinforcementLength');
    const reinforcementOtherLength = document.getElementById('reinforcementOtherLength');
    const reinforcementDiameter = document.getElementById('reinforcementDiameter');
    
    if (reinforcementNumber) reinforcementNumber.disabled = noWasteValue;
    if (reinforcementLength) reinforcementLength.disabled = noWasteValue;
    if (reinforcementOtherLength) reinforcementOtherLength.disabled = noWasteValue;
    if (reinforcementDiameter) reinforcementDiameter.disabled = noWasteValue;
    
    calculateReinforcementArea();
}

// Main calculation functions
function calculateEndOfCycleWaste() {
    try {
        const jointArea = updateJointArea();
        const wasteAreaElement = document.getElementById('wasteArea');
        
        if (!wasteAreaElement) {
            alert('Waste area input not found');
            return;
        }
        
        const wasteArea = parseFloat(wasteAreaElement.value) || 0;
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
        
        if (resultDiv) resultDiv.classList.remove('hidden');
        if (scoreDiv) scoreDiv.innerHTML = 'Score: <span style="color: ' + getRatingColor(score) + '">' + (score * 100).toFixed(1) + '%</span>';
        
        if (detailsDiv) {
            const detailsHTML = '<div><strong>Calculation Details:</strong></div>' +
                '<div>Joint Area: ' + jointArea.toFixed(2) + ' cm², Waste Area: ' + wasteArea.toFixed(2) + ' cm², Reinforcement Area: ' + reinforcementArea.toFixed(2) + ' cm²</div>' +
                '<div>Material Reduction Factor: ' + reductionFactor + ', Reinforcement Reduction Factor: ' + reinforcementReductionFactor + '</div>' +
                '<div><strong>Final Score: ' + (score * 100).toFixed(1) + '%</strong></div>';
            
            detailsDiv.innerHTML = detailsHTML;
        }
        
        if (resultDiv) resultDiv.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error calculating end of cycle waste:', error);
        alert('Error in calculation. Please check your inputs.');
    }
}

function calculatePrefabricationDegree() {
    try {
        const jointArea = updateJointArea();
        const prefabricatedAreaElement = document.getElementById('prefabricatedArea');
        
        if (!prefabricatedAreaElement) {
            alert('Prefabricated area input not found');
            return;
        }
        
        const prefabricatedArea = parseFloat(prefabricatedAreaElement.value) || 0;
        
        if (!jointArea || prefabricatedArea < 0) {
            alert('Please fill in all required fields correctly');
            return;
        }
        
        const score = Math.max(0, Math.min(1, prefabricatedArea / jointArea));
        calculationResults.prefabricationDegree = score;
        
        const resultDiv = document.getElementById('prefabricationResult');
        const scoreDiv = document.getElementById('prefabricationScore');
        const detailsDiv = document.getElementById('prefabricationDetails');
        
        if (resultDiv) resultDiv.classList.remove('hidden');
        if (scoreDiv) scoreDiv.innerHTML = 'Score: <span style="color: ' + getRatingColor(score) + '">' + (score * 100).toFixed(1) + '%</span>';
        
        if (detailsDiv) {
            const detailsHTML = '<div><strong>Calculation Details:</strong></div>' +
                '<div>Joint Area: ' + jointArea.toFixed(2) + ' cm², Prefabricated Area: ' + prefabricatedArea.toFixed(2) + ' cm²</div>' +
                '<div>Formula: Prefabricated Area / Joint Area</div>' +
                '<div><strong>Score: ' + (score * 100).toFixed(1) + '%</strong></div>';
            
            detailsDiv.innerHTML = detailsHTML;
        }
        
        if (resultDiv) resultDiv.scrollIntoView({ behavior: 'smooth' });
        
    } catch (error) {
        console.error('Error calculating prefabrication degree:', error);
        alert('Error in calculation. Please check your inputs.');
    }
}

// Placeholder functions for sections not yet implemented
function updateDisassemblyParameters() {
    console.log('updateDisassemblyParameters called - placeholder function');
}

function calculateEaseOfDisassembly() {
    alert('Ease of Disassembly calculation will be implemented in the next version.');
}

function calculateEaseOfReassembly() {
    alert('Ease of Reassembly calculation will be implemented in the next version.');
}

function calculateDamageProbability() {
    alert('Damage Probability calculation will be implemented in the next version.');
}

function calculateTotalTime() {
    console.log('calculateTotalTime called - placeholder function');
}

function calculateConnectionComplexity() {
    alert('Connection Complexity calculation will be implemented in the next version.');
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - initializing calculator v3.5...');
    
    updateConnectionTypeOptions();
    
    console.log('Basic initialization complete v3.5');
});

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

console.log('Calculator JavaScript v3.5 loaded successfully - All syntax errors fixed');
console.log('setupTimeScores check:', typeof setupTimeScores, setupTimeScores);
console.log('Available tools:', Object.keys(toolProperties).length);
console.log('Available reassembly tools:', Object.keys(reassemblyToolProperties).length);

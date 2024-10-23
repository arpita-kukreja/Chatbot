let currentStep = 0;
let userInfo = {
    healthCondition: '',
    age: '',
    gender: '',
    weightHeight: '',
    allergies: ''
};

// Toggle chat window visibility
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const chatIcon = document.getElementById('chatbot-icon');

    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
        chatIcon.style.display = 'none';
    } else {
        chatWindow.style.display = 'none';
        chatIcon.style.display = 'block';
    }
}

// Send user message
function sendMessage() {
    const inputField = document.getElementById('userInput');
    const chatBody = document.getElementById('chat-body');
    const userMessage = inputField.value.trim();

    if (userMessage === "") return;

    // Display user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'user-message';
    userMessageDiv.innerHTML = `<p>${userMessage}</p>`;
    chatBody.appendChild(userMessageDiv);

    inputField.value = ''; // Clear input field

    // Show typing dots animation
    const typingDots = document.createElement('div');
    typingDots.className = 'bot-message typing';
    typingDots.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(typingDots);

    chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom

    // Simulate bot response after a delay
    setTimeout(() => {
        chatBody.removeChild(typingDots); // Remove typing dots

        processUserResponse(userMessage); // Process user response based on current step

        chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom
    }, 2000);
}

function processUserResponse(response) {
    let botResponse = '';
    switch (currentStep) {
        case 0:
            // Initial Options
                botResponse = askHealthCondition();
                currentStep = 1;
            break;
        case 1:
            // Ask health condition
            userInfo.healthCondition = response.toLowerCase();
            botResponse = askAge();
            currentStep = 2;
            break;
        case 2:
            // Ask age
            userInfo.age = response;
            botResponse = askGender();
            currentStep = 3;
            break;
        case 3:
            // Ask gender
            userInfo.gender = response === '1' ? 'Male' : response === '2' ? 'Female' : 'Other';
            botResponse = askWeightHeight();
            currentStep = 4;
            break;
        case 4:
            // Ask weight and height
            userInfo.weightHeight = response;
            botResponse = askAllergies();
            currentStep = 5;
            break;
        case 5:
            // Ask allergies
            userInfo.allergies = response;
            botResponse = generateRecommendation(userInfo.healthCondition);
            currentStep = 0;  // Reset to start
            break;
        default:
            botResponse = getInitialOptions();
            currentStep = 0;
    }

    // Display bot's message
    const messagesContainer = document.getElementById('chat-body');
    const botMessage = document.createElement('div');
    botMessage.classList.add('bot-message');
    botMessage.innerHTML = `<p>${botResponse}</p>`;
    messagesContainer.appendChild(botMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Bot question functions
function askHealthCondition() {
    return "Please specify your health condition (e.g., diabetes, hypertension, thyroid, heart disease, etc.).";
}

function askAge() {
    return "What is your age?";
}

function askGender() {
    return `Please select your gender:<br>
      1. Male<br>
      2. Female<br>
      3. Other.`;
}

function askWeightHeight() {
    return "What is your current weight (in kg) and height (in cm)?";
}

function askAllergies() {
    return "Do you have any known food allergies (e.g., nuts, dairy, gluten)? Please list them or write no.";
}

// Function to generate diet and food prohibitions based on health condition
function generateRecommendation(healthCondition) {
    switch (healthCondition) {
        case 'diabetes':
      return `✔️ <strong>Recommended Diet for Diabetes</strong>:<br>
      - <strong>Focus on:</strong><br>
      • Whole grains, lean proteins, and vegetables.<br>
      • Fiber-rich foods like lentils, beans, and oats.<br>
      • Low-glycemic index foods to help control blood sugar levels.<br><br>
      - <strong>Limit:</strong><br>
      • Sugary and refined carbohydrate-rich foods.<br>
      • Saturated fats and fried foods.<br><br>
      ⚠️ <strong>Foods to Avoid for Diabetes</strong>:<br>
      • Sugary snacks, sodas, and pastries.<br>
      • High-fat meals, including fried and processed foods.`;

    case 'hypertension':
      return `✔️ <strong>Recommended Diet for Hypertension</strong>:<br>
      - <strong>Focus on:</strong><br>
      • Potassium-rich foods like bananas, leafy greens, and beans.<br>
      • Low-sodium meals, including whole grains, fish, and vegetables.<br>
      • DASH (Dietary Approaches to Stop Hypertension) diet guidelines.<br><br>
      - <strong>Limit:</strong><br>
      • High-sodium foods, especially processed snacks and meals.<br><br>
      ⚠️ <strong>Foods to Avoid for Hypertension</strong>:<br>
      • Salty snacks, canned soups, and processed meats.<br>
      • High-fat dairy products and fried foods.<br>
      • Excessive alcohol and caffeinated beverages.`;

    case 'thyroid':
      return `✔️ <strong>Recommended Diet for Thyroid Health</strong>:<br>
      - <strong>Focus on:</strong><br>
      • Iodine-rich foods like fish and dairy (for hypothyroidism).<br>
      • Selenium and zinc-rich foods like nuts and seeds.<br>
      • Lean proteins, fruits, and vegetables.<br><br>
      - <strong>Limit:</strong><br>
      • Soy products and cruciferous vegetables in excess (for hypothyroidism).<br><br>
      ⚠️ <strong>Foods to Avoid for Thyroid Health</strong>:<br>
      • Processed foods and excessive intake of soy products.<br>
      • Cruciferous vegetables like cabbage and broccoli (in large quantities, for hypothyroidism).`;

    case 'heart disease':
      return `✔️ <strong>Recommended Diet for Heart Disease</strong>:<br>
      - <strong>Focus on:</strong><br>
      • Heart-healthy fats like olive oil, nuts, and avocados.<br>
      • Fiber-rich foods from whole grains, fruits, and vegetables.<br>
      • Lean proteins like fish, legumes, and poultry.<br><br>
      - <strong>Limit:</strong><br>
      • Foods high in saturated and trans fats.<br><br>
      ⚠️ <strong>Foods to Avoid for Heart Disease</strong>:<br>
      • Fried foods, red meat, and trans fats.<br>
      • Sugary drinks and highly processed snacks.`;
      case 'cbc':
      return `✔️ <strong>Recommended Diet for Improving CBC (Complete Blood Count)</strong>:<br>
      - <strong>Focus on:</strong><br>
      • Iron-rich foods like lean meats, spinach, and lentils.<br>
      • Vitamin C-rich foods to enhance iron absorption (citrus fruits, berries).<br>
      • Folate-rich foods like beans, peas, and fortified grains.<br><br>
      - <strong>Limit:</strong><br>
      • Alcohol and excessive intake of processed foods.<br><br>
      ⚠️ <strong>Foods to Avoid for CBC Issues</strong>:<br>
      • Excessive alcohol, which can lower red blood cell count.<br>
      • Junk food and foods with little nutritional value.`;

    case 'cirrhosis':
      return `✔️ <strong>Recommended Diet for Cirrhosis</strong>:<br>
      - <strong>Focus on:</strong><br>
      • High-protein foods like lean meat, fish, and legumes.<br>
      • Fresh fruits and vegetables to boost nutrition.<br>
      • Adequate hydration with low-sodium fluids.<br><br>
      - <strong>Limit:</strong><br>
      • Salt intake and avoid alcohol.<br><br>
      ⚠️ <strong>Foods to Avoid for Cirrhosis</strong>:<br>
      • Processed foods, high-sodium snacks.<br>
      • Alcohol and sugary drinks.`;

    case 'fatty liver':
      return `✔️ <strong>Recommended Diet for Fatty Liver</strong>:<br>
      - <strong>Focus on:</strong><br>
      • Whole grains, lean proteins, and fiber-rich vegetables.<br>
      • Healthy fats from olive oil, nuts, and avocados.<br><br>
      - <strong>Limit:</strong><br>
      • Saturated fats and refined sugars.<br><br>
      ⚠️ <strong>Foods to Avoid for Fatty Liver</strong>:<br>
      • Sugary beverages, fried foods, and alcohol.<br>
      • High-fat and high-sugar processed snacks.`;

    case 'hepatitis':
      return `✔️ <strong>Recommended Diet for Hepatitis</strong>:<br>
      - <strong>Focus on:</strong><br>
      • High-protein foods like lean meats, legumes, and eggs.<br>
      • Fiber-rich foods like fruits, vegetables, and whole grains.<br><br>
      - <strong>Limit:</strong><br>
      • Foods high in saturated fats and processed foods.<br><br>
      ⚠️ <strong>Foods to Avoid for Hepatitis</strong>:<br>
      • Alcohol and high-fat foods.<br>
      • Sugary snacks and drinks.`;

    case 'chronic kidney disease':
      return `✔️ <strong>Recommended Diet for Chronic Kidney Disease (CKD)</strong>:<br>
      - <strong>Focus on:</strong><br>
      • Low-potassium foods like apples, berries, and cabbage.<br>
      • Low-sodium meals with lean proteins (chicken, fish).<br><br>
      - <strong>Limit:</strong><br>
      • Phosphorus-rich foods like dairy and beans.<br><br>
      ⚠️ <strong>Foods to Avoid for CKD</strong>:<br>
      • High-sodium foods, processed snacks.<br>
      • High-potassium foods like bananas and tomatoes.`;

    case 'diabetic nephropathy':
      return `✔️ <strong>Recommended Diet for Diabetic Nephropathy</strong>:<br>
      - <strong>Focus on:</strong><br>
      • Low-protein diet to reduce kidney workload.<br>
      • Whole grains, vegetables, and low-sodium foods.<br><br>
      - <strong>Limit:</strong><br>
      • Foods high in sodium and potassium.<br><br>
      ⚠️ <strong>Foods to Avoid for Diabetic Nephropathy</strong>:<br>
      • Processed meats, high-sodium foods.<br>
      • Potassium-rich foods like oranges and potatoes.`;
        default:
            return "I don't have a specific recommendation for that condition. Please consult a healthcare provider.";
    }
}

function getInitialOptions() {
    return "Welcome to Diagnify! Please choose an option:<br>1. Get a diet recommendation<br>2. Learn more about a health condition.";
}

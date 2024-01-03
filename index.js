const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

var ans={

    "who are you?":"Hello,I am SciAstra Bot",

    "what is sciastra":"SciAstra is the biggest community of science scholars in India for IISER Aptitude test (IAT), National Entrance Screening Test (NEST), ISI, CMI, and IACS. and is the best student startup in Odisha Won the Global Student Entrepreneurship Award by EO Odisha",

    "how sciastra can help me ?":"Here you will learn and will be in love with science & can prepare all 4 subjects- PCMB. You can crack IAT, NEST, JEE, NEET, Boards & so on.",

    "how classes will be conducted ?":"Both Live and Recorded Classes Interaction sessions, Doubt classes, Discussions everything you will get in one App" ,

    "what are the batches sciastra offering?":"Vikram 2.0(12th & droppers), HOMI(class 11th) , ISI & CMI Course(11th & 12th) , Vikram Batch(12th & droppers) and many more..",

    "what results are produced by sciastra":"Our students are studying in premier institutes like IISER Pune , IISC Bengaluru and produced single and double digit ranks in exam like NEST , IAST etc",

    "is sciastra a part of any colloge fest?":"Yes,SciAstra is now the official sponsor of Anvesha- the Science Fest of IISER Thiruvananthapuram",

    "how can i reach to sciastra":"You can visit Address : SciAstra Education Pvt Ltd, Bhubaneswar, Odisha or can contact at support@sciastra.com",

    "is their an app also?":"Yes,you can download it from App Store or Play Store",

    "what about the teachers who will teach?":"Here you can learn from Scientists, Research Scholars from the top Institutes in the world like University of Sheffield, UK, University of Oxford, University of Massachusetts Amherst",

    "do you provide demo?":"Yes, you can also access the demo classes from our mentors" 
}

const generateResponse = (chatElement) =>{
    const messageElement = chatElement.querySelector("p");
   userMessage=userMessage.toLowerCase();
    if(userMessage in ans)
    messageElement.textContent=ans[userMessage];
   else{
    messageElement.textContent="Sorry,I have no idea";
   }
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        const incomingChatLi = createChatLi("", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 400);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
document.addEventListener("DOMContentLoaded", () => {
    const accountBtn = document.getElementById('accountBtn');
    if (accountBtn) {
        accountBtn.addEventListener("click", () => {
            window.location.href = 'account.html';
        });
    }
});

function displayChat(chat) {
    const chatWindow = document.querySelector('.chat-window');
    const defaultTxt = document.querySelector('.welcome-msg');

    if (defaultTxt) {
        defaultTxt.style.display = "none";
    }

    chatWindow.innerHTML = "";

    const chatHeader = document.createElement("div");
    chatHeader.className = "chat-header";
    const chatHeaderText = document.createElement("h3");
    chatHeaderText.className = 'chat-header-text';
    chatHeaderText.textContent = chat;

    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.className = "back-btn"; 
    backButton.addEventListener("click", () => {
        chatWindow.style.display = "none";
        defaultTxt.style.display = "block";
    });

    chatHeader.appendChild(backButton);
    chatHeader.appendChild(chatHeaderText);

    const chatArea = document.createElement('div');
    chatArea.className = 'chat-area';
    chatArea.style.backgroundColor = '#f1f1f1';


    const inputWrapper = document.createElement("div");
    inputWrapper.className = "input-wrapper";

    const textInp = document.createElement("input");
    textInp.placeholder = "Type a message";
    textInp.className = "message-input";

    const sendButton = document.createElement("button");
    sendButton.className = "send-btn";
    sendButton.textContent = "Send";

    const attachFile = document.createElement("button");
    attachFile.type = "button";
    attachFile.id = "attach-file";
    attachFile.textContent = "Attach File";

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "file-upload";
    fileInput.multiple = true;
    fileInput.style.display = "none";


    function handleFileChange() {
        for (const file of fileInput.files) {
            const reader = new FileReader();
    
            if (file.type.startsWith("image")) {
                reader.readAsDataURL(file); 
    
                reader.onload = function (e) {
                    const url = e.target.result;
    
                    const msgContainer = document.createElement('div');
                    msgContainer.className = 'msg-div';
    
                    const img = document.createElement("img");
                    img.src = url;
                    img.className = "img-file";
                    img.height = 100;
                    img.style.display = "block";
    
                    const msg = document.createElement("span");
                    msg.className = "msg-span";
                    msg.appendChild(img);
    
                    msgContainer.appendChild(msg);
                    chatArea.appendChild(msgContainer);
                    chatArea.scrollTop = chatArea.scrollHeight;
                };
            } else {
                const fileURL = URL.createObjectURL(file);
    
                const msgContainer = document.createElement('div');
                msgContainer.className = 'msg-div';
    
                const preview = document.createElement('a');
                preview.href = fileURL;
                preview.className = "file-preview";
                preview.textContent = "📄" + file.name;
                preview.style.display = "block";
                preview.target = "_blank";
    
                msgContainer.appendChild(preview);
                chatArea.appendChild(msgContainer);
                chatArea.scrollTop = chatArea.scrollHeight;

                preview.addEventListener('click', () => {
                    setTimeout(() => URL.revokeObjectURL(fileURL), 5000); 
                });
            }
        }
    }
    
    attachFile.addEventListener("click", () => {
        fileInput.value = "";
        fileInput.removeEventListener("change", handleFileChange);
        fileInput.addEventListener("change", handleFileChange);
        fileInput.click();
    });


    inputWrapper.appendChild(attachFile);
    inputWrapper.appendChild(textInp);
    inputWrapper.appendChild(sendButton);

    chatWindow.appendChild(chatHeader);
    chatWindow.appendChild(chatArea);
    chatWindow.appendChild(inputWrapper);

    textInp.focus();

    sendButton.addEventListener("click", function() {
        if (textInp.value.trim() !== "") {
            const msgContainer = document.createElement('div');
            msgContainer.className = 'msg-div';
            const msg = document.createElement('span');
            msg.className = 'msg-span';
            msg.textContent = textInp.value;
            msgContainer.appendChild(msg);
            chatArea.appendChild(msgContainer);
            textInp.value = "";
            chatArea.scrollTop = chatArea.scrollHeight;
        }
    });

    textInp.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });

    chatWindow.style.display = "block";
}

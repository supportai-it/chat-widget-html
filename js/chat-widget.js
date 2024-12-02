function createChatWidget({
    chatUrl = '/example',
    buttonColor = '#e74266',
    buttonHoverColor = '#d6365d',
    buttonSize = '64px',
    getContext = () => "",
} = {}) {
    const updateContext = () => {
        const context = getContext();
        if (context) {
            const url = new URL(chatUrl);
            url.searchParams.set('context', context);
            iframe.src = url.toString();
        }
    };

    const chatFrame = document.createElement('div');
    const iframe = document.createElement('iframe');
    const chatButton = document.createElement('div');
    const buttonContent = document.createElement('div');

    // Set IDs and attributes
    chatFrame.id = 'chat-frame';
    chatFrame.style.display = 'none';
    iframe.src = chatUrl;
    chatButton.id = 'chat-btn';
    buttonContent.innerHTML = `
        <svg viewBox="0 0 24 24" width="32" height="32">
            <path fill="currentColor" d="M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8"/>
        </svg>
    `;

    chatButton.appendChild(buttonContent);
    chatFrame.appendChild(iframe);

    // Add styles for layout and interactions
    const style = document.createElement('style');
    style.textContent = `
        #chat-frame {
            position: fixed;
            bottom: calc(${buttonSize} + 1.5rem);
            right: 1rem;
            z-index: 999;
            display: none;
            justify-content: flex-end;
            align-items: flex-end;
        }

        #chat-frame iframe {
            position: absolute;
            width: 90vw;
            max-width: 400px;
            height: 80vh;
            max-height: 600px;
            border: none;
            overflow: hidden;
            transform-origin: bottom right;
        }

        #chat-btn {
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            z-index: 9999;
            cursor: pointer;
        }

        #chat-btn div {
            background: ${buttonColor};
            color: #fff;
            width: ${buttonSize};
            height: ${buttonSize};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.15s ease, background 0.15s ease;
        }

        #chat-btn div:hover {
            transform: scale(1.05);
            background: ${buttonHoverColor};
        }

        #chat-btn svg {
            fill: currentColor;
        }
    `;

    document.body.appendChild(style);
    document.body.appendChild(chatFrame);
    document.body.appendChild(chatButton);

    updateContext();

    // Update the context when triggered
    window.addEventListener('chat-widget/updateContext', updateContext);

    // Toggle the chat frame visibility when button is clicked
    chatButton.addEventListener('click', () => {
        chatFrame.style.display = chatFrame.style.display === 'none' ? 'flex' : 'none';
    });
}

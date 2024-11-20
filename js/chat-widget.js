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
    }

    const chatFrame = document.createElement('div');
    chatFrame.id = 'chat-frame';
    chatFrame.style.position = 'fixed';
    chatFrame.style.bottom = `calc(${buttonSize} + 1.5rem)`;
    chatFrame.style.right = '1rem';
    chatFrame.style.zIndex = '999';
    chatFrame.style.display = 'none';
    chatFrame.style.justifyContent = 'flex-end';
    chatFrame.style.alignItems = 'flex-end';

    const iframe = document.createElement('iframe');
    iframe.src = chatUrl;
    iframe.style.position = 'absolute';
    iframe.style.width = '90vw';
    iframe.style.maxWidth = '400px';
    iframe.style.height = '80vh';
    iframe.style.maxHeight = '600px';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.style.transformOrigin = 'bottom right';
    chatFrame.appendChild(iframe);

    const chatButton = document.createElement('div');
    chatButton.id = 'chat-btn';
    chatButton.style.position = 'fixed';
    chatButton.style.bottom = '1rem';
    chatButton.style.right = '1rem';
    chatButton.style.zIndex = '9999';
    chatButton.style.cursor = 'pointer';

    const buttonContent = document.createElement('div');
    buttonContent.style.background = buttonColor;
    buttonContent.style.color = '#fff';
    buttonContent.style.width = buttonSize;
    buttonContent.style.height = buttonSize;
    buttonContent.style.borderRadius = '50%';
    buttonContent.style.display = 'flex';
    buttonContent.style.alignItems = 'center';
    buttonContent.style.justifyContent = 'center';
    buttonContent.style.transition = 'transform 0.15s ease, background 0.15s ease';

    buttonContent.addEventListener('mouseenter', () => {
        buttonContent.style.transform = 'scale(1.05)';
        buttonContent.style.background = buttonHoverColor;
    });
    buttonContent.addEventListener('mouseleave', () => {
        buttonContent.style.transform = 'scale(1)';
        buttonContent.style.background = buttonColor;
    });

    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.setAttribute('viewBox', '0 0 24 24');
    svgIcon.setAttribute('width', '32');
    svgIcon.setAttribute('height', '32');

    const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svgPath.setAttribute('fill', 'currentColor');
    svgPath.setAttribute('d', 'M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8');
    svgIcon.appendChild(svgPath);
    buttonContent.appendChild(svgIcon);

    chatButton.appendChild(buttonContent);

    document.body.appendChild(chatFrame);
    document.body.appendChild(chatButton);

    updateContext();

    window.addEventListener('chat-widget/updateContext', () => {
        updateContext();
    });

    chatButton.addEventListener('click', () => {
        chatFrame.style.display = chatFrame.style.display === 'none' ? 'flex' : 'none';
    });
}

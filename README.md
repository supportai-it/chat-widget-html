# SupportAI Chat Widget

## Usage
Add the following script inside your html file.

```html
<body>
  <!-- your code here -->

  <script src="https://chat.supportai.it/js/chat-widget.js"></script>
  <script>
    createChatWidget({
      chatUrl: '<charUrl>'
    });
  </script>
</body>
```

## Customization
| **Attribute**    | **Description**                                     | **Required** | **Example** |
|------------------|-----------------------------------------------------|--------------|-------------|
| chatUrl          | The link given by SupportAI to connect to the chat. | true         |             |
| buttonColor      | Custom color of the open chat button.               | false        | #e74266     |
| buttonHoverColor | Custom color on hover of the open chat button.      | false        | #d6365d     |
| buttonSize       | Size of the chat button.                            | false        | 64px        |
| frameWidth       | Width of the chat frame.                            | false        | 400         |
| frameHeight      | Height of the chat frame.                           | false        | 600         |
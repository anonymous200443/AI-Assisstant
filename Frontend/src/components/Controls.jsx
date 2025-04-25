

import { Button,Flex } from "antd";


export default function Controls({ voiceOutput, setVoiceOutput, toggleVoice, clearChat }) {
    return (
      <>
      <Flex gap="small">
        <Button
          onClick={toggleVoice}
          style={{ marginLeft: 10 ,width:100}}
        >
          {voiceOutput ? "🔊 Voice ON" : "🔇 Voice OFF"}
        </Button>
  
        
  
        <Button
          onClick={clearChat}
          type="primary"
          variant="outlined"
          size="small"
          style={{width:100}}
         
        >
          🧹 Clear Chat
        </Button>
        </Flex>
      </>
    );
  }
  
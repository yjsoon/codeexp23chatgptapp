import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useState } from "react";
import axios from "axios";

const CHATGPT_API_URL = "https://api.openai.com/v1/completions";
const OPENAI_KEY = "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";

const generateResponse = async (text) => {
  let response = null;
  try {
    response = await axios.post(
      CHATGPT_API_URL,
      {
        model: "text-davinci-002",
        prompt: `This is a conversation with an AI assistant. 
    This AI assistant likes to talk in Hokkien and Singlish and 
    always calls the user unker and is a bit grumpy. 
    Human: ${text}
    AI:`,
        max_tokens: 150,
        temperature: 2.0,
        n: 1,
        stop: "Human:"
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_KEY}`
        }
      }
    );
  } catch (error) {
    console.log(error);
  }

  console.log("We have a response");
  console.log(response);
  const { choices } = response.data;
  const { text: generatedText } = choices[0];
  return generatedText.trim();
};

export default function App() {
  const [messages, setMessages] = useState([]);

  async function onSend(newMessages) {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    const reply = await generateResponse(newMessages);
    const botReply = {
      _id: Math.round(Math.random() * 100000),
      text: reply,
      createdAt: new Date(),
      user: 2
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, botReply)
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        style={styles.giftedChat}
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%"
  },
  giftedChat: {
    width: "100%"
  }
});

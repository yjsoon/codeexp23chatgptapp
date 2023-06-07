import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);

  function onSend(newMessages) {
    setMessages(GiftedChat.append(messages, newMessages));
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

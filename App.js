import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, ScrollView } from "react-native";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState([]);

  const handleTextChange = (text) => {
    setInputValue(text);
  };

  const handleButtonPress = () => {
    setSubmittedValue([...submittedValue, inputValue]);
    setInputValue("");
  };

  const handleInputSubmit = () => {
    if (inputValue !== '') {
      setSubmittedValue([...submittedValue, inputValue]);
      setInputValue('');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="아무거나 입력해주세요."
          onChangeText={handleTextChange}
          value={inputValue}
          onSubmitEditing={handleInputSubmit}
        />
        <Button style={styles.btn} title="submit" onPress={handleButtonPress} />
        {/* {submittedValue !== "" && (
          <Text style={styles.subText}></Text>
        )} */}
        <ScrollView style={styles.scrollView}>
          {submittedValue.map((value, index) => (
            <Text key={index} style={styles.submittedText}>
              {value}
            </Text>
          ))}
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 5,
    paddingHorizontal: 10,
  },
  btn: {
    marginTop: 5,
    color: "red",
    borderRadius: 5,
  },
  subText: {
    textAlign: "center",
    marginTop: 10,
  },
  scrollView: {
    marginTop: 10, // 위쪽 여백 추가
    width: "100%", // 가로 너비 100%
  },
  submittedText: {
    textAlign: "center",
    marginVertical: 5, // 텍스트 아이템 간의 세로 간격 조절
    borderColor: 'yellow',
    borderWidth: 5,
    borderRadius: 5,
    padding: 5,
  },
});

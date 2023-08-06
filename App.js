import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

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
    if (inputValue !== "") {
      setSubmittedValue([...submittedValue, inputValue]);
      setInputValue("");
    }
  };

  const removeTodo = (index) => {
    setSubmittedValue((prevSubmittedValue) => {
      const updatedValues = [...prevSubmittedValue];
      updatedValues.splice(index, 1);
      return updatedValues;
    });
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
            <View key={index} style={styles.submittedItem}>
              <View style={styles.submittedTextContainer}>
                <Text style={styles.submittedText}>{value}</Text>
              </View>
              <TouchableOpacity onPress={() => removeTodo(index)}>
                <Text style={styles.deleteButton}>X</Text>
              </TouchableOpacity>
            </View>
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
  submittedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    textAlign: "center",
    marginVertical: 5, // 텍스트 아이템 간의 세로 간격 조절
    borderColor: "yellow",
    borderWidth: 5,
    borderRadius: 5,
    padding: 5,

  },
  submittedTextContainer: {
    flex: 1, // View 컴포넌트가 남은 공간을 모두 차지하도록 설정
  },
  submittedText: {
    textAlign: "center",
  },
  deleteButton: {
    color: "red",
  },
});

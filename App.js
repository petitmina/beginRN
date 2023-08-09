import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  CheckBox,
} from "react-native";

export default function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    loadToDos();
  }, []);

  const handleTextChange = (text) => {
    setToDo(text);
  };

  const handleButtonPress = () => {
    if(toDos !== "") {
      const newToDo = { value: toDo, checked: false};
      setToDos([...toDos, newToDo]);
      saveToDo(newToDo);
      setToDo("");
    }
  };

  const removeTodo = async (index) => {
    const updatedToDos = [...toDos];
    const removedTodo = updatedToDos.splice(index, 1)[0];
    setToDos(updatedToDos);
    await removeToDoFromStorage(removedTodo);
  };

  const handleCheckBoxToggle = async (index) => {
    const updatedToDos = [...toDos];
    updatedToDos[index].checked =!updatedToDos[index].checked;
    setToDos(updatedToDos);
    await updatedToDoInStorage(updatedToDos[index]);
  };

  const saveToDo = async (todo) => {
    try {
      const savedToDos = [...toDos, todo];
      await AsyncStorage.setItem("todos", JSON.stringify(savedToDos));
    }catch (error) {
      console.error("Error saving ToDo:", error);
    }
  };

  const loadToDos = async () => {
    try {
      const todos = await AsyncStorage.getItem("todos");
      if(todos !== null) {
        setToDos(JSON.parse(todos));
      }
    } catch(error){
      console.error("Error loading ToDos:", error);
    }
  };

  const removedToDoFromStorage = async (todo) => {
    try {
      const todos = [...toDos];
      const updatedToDos = todos.filter((item) => item.value !== todo.value);
      await AsyncStorage.setItem("todos", JSON.stringify(updatedToDos));
    } catch (error) {
      console.error("Error removing ToDo from storage:", error);
    }
  };

  const updatedToDoInStorage = async (todo) => {
    try {
      const todos = [...toDos];
      const index = todos.findIndex((item) => item.value === todo.value);
      todos[index] = todo;
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error updating ToDo in storage:", error);
    }
  }


  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="아무거나 입력해주세요."
          onChangeText={handleTextChange}
          value={toDo}
          onSubmitEditing={handleButtonPress}
        />
        <Button style={styles.btn} title="submit" onPress={handleButtonPress} />
        <ScrollView style={styles.scrollView}>
          {toDos.map((item, index) => (
            <View key={index} style={styles.submittedItem}>
              <CheckBox
                value={item.checked}
                onValueChange={() => handleCheckBoxToggle(index)}
              />
              <View style={styles.submittedTextContainer}>
                <Text style={styles.submittedText}>{item.value}</Text>
              </View>
              <Text
                style={styles.deleteButton}
                onPress={() => removeTodo(index)}
              >
                X
              </Text>
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
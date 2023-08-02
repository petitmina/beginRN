import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  
  return (
    <View style={styles.container}>
      <View >
        <TextInput style={styles.input} placeholder="아무거나 입력해주세요." />
        <Button title='제출'/>
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 5,
    paddingHorizontal: 10,
  },
});

import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, input, FlatList, Modal, TouchableOpacity } from 'react-native';
import { styles } from './styles';





export default function App() {
  const [task, setTask] =useState('');
  const [taskList, setTaskList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const onHandleTask = () => {
    setTaskList((prevTaskList) => [... prevTaskList, {id: Math.random().toString(), value: task, background: getRandomBackgroundColor() }]);
    setTask('');
  }

  const getRandomBackgroundColor = () => {
    const colors = ['blue', 'red', '#212121'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const onHandleSelected = (item) => {
    setSelectedTask(item);
    setModalVisible(!modalVisible);
  }

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.listItemContainer} onPress={() => onHandleSelected(item)}>
      <Text style={styles.listItem}>{item.value}</Text>
    </TouchableOpacity>
  )

  const onHandleCancel = () => {
    setModalVisible(!modalVisible);
  }

  const onHandleDeleteItem = () => {
    setTaskList((prevTaskList) => prevTaskList.filter((item) => item.id !== selectedTask.id))
    setModalVisible(!modalVisible);
  }

    

  return (
    <View style={styles.container}>
      <View Style={styles.inputContainer}>
        <TextInput 
        style={styles.input} 
        value={task} 
        placeholder="Enter Task"
        onChangeText={text => setTask(text)}
        />
        <Button disabled={!task} title='add' color='#9A848F' onPress={onHandleTask} />
      </View>
      <View style={styles.listContainer}>
      <Text style={styles.listTitle}>Todo List</Text>
      </View>
      <FlatList 
        style={styles.listContainer}
        data={taskList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        
      />
      
      <CustomModal
        modalVisible={modalVisible}
        selectedTask={selectedTask}
        onHandleCancel={onHandleCancel}
        onHandleDeleteItem={onHandleDeleteItem}
        ></CustomModal>

        </View>

     
    




      
  );
}



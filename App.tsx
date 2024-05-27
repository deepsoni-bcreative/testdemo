import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  FlatList,
  Alert,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [isActive, setIsActive] = useState(null);
  const [selectSeat, setSelectSeat] = useState<string[]>([]);
  const [amount, setAmount] = useState(0);

  type SeatType = {
    id: string;
    name: string;
    seatTotal: number;
    cost: number;
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const seats = [
    { id: "1", name: "Premium", seatTotal: 15, cost: 250 },
    { id: "2", name: "Club", seatTotal: 30, cost: 150 },
    { id: "3", name: "Diamond", seatTotal: 25, cost: 170 },
    { id: "4", name: "Gold", seatTotal: 20, cost: 170 },
  ];

  function handleClick(seatNumber: any, seatAmount: any, seatName: any) {
    Alert.alert(`${seatNumber} ${seatAmount} ${seatName}`);
    setIsActive(seatNumber);
    setAmount(oldAmt => oldAmt + seatAmount);
    if (!selectSeat.includes(seatName)) {
      setSelectSeat(oldArray => [...oldArray, seatName]);
    }
    console.log(`${isActive} ${selectSeat}`);
  }

  function renderSeat({ item, index }: { item: SeatType; index: number }) {
    return (
      <View key={item.id}>
        <Text style={{ margin: 12, fontSize: 14, color: "grey" }}>
          {item.name} Rs {item.cost}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {renderSeats(item.seatTotal, item.cost, item.name)}
        </View>
      </View>
    );
  }

  function renderSeats(totalSeat: any, seatCost: any, seatName: any) {
    const seatsArray = [];
    for (let i = 1; i <= totalSeat; i++) {
      seatsArray.push(
        <TouchableOpacity
          key={i}
          style={isActive === i ? styles.activeSeat : styles.seat}
          onPress={() => handleClick(i, seatCost, seatName)}
        >
          <Text style={{ fontSize: 10 }}>{i}</Text>
        </TouchableOpacity>
      );
    }
    return seatsArray;
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Header />
        <View style={{ backgroundColor: isDarkMode ? Colors.black : Colors.white }}>
          <FlatList
            data={seats}
            renderItem={renderSeat}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  seat: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    margin: 5,
  },
  activeSeat: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    margin: 5,
  },
});

export default App;

import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const isDarkMode = false;
const backgroundStyle = {
  backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
};

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      sortedIndex: [],
      switchingIndex: [],
      max: 0,
    };
  }

  componentDidMount() {
    // Fill data
    let dataFill = [];
    for (let i = 0; i < 50; i++) {
      let num = Math.floor(Math.random() * 100 + 1);
      dataFill = [...dataFill, num];
    }
    // Cari data max
    let max = Math.max(...dataFill);
    // console.warn(dataFill, max)
    this.setState({data: dataFill, max});
  }

  timer = ms => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  };

  urutkan = async () => {
    let {data} = this.state;
    let len = data.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (data[j] > data[j + 1]) {
          await this.timer(0.1);
          let temp = data[j];
          data[j] = data[j + 1];
          data[j + 1] = temp;

          // Set ke switching index
          this.setState({data, switchingIndex: [j, j + 1]});
        }
      }
      // Tambah ke sorted Index
      this.setState(s => ({sortedIndex: [...s.sortedIndex, len - i - 1]}));
    }
    this.setState(s => ({sortedIndex: [...s.sortedIndex, 0]}));
  };

  render() {
    const {data, max} = this.state;
    return (
      <View style={{flexDirection: 'row', backgroundColor: 'white', flex: 1}}>
        {data.map((num, i) => {
          let heightRatio = num / max;
          let isSorted = this.state.sortedIndex.includes(i);
          let isSwitching = this.state.switchingIndex.includes(i);

          let backgroundColor = '#fff';
          if (isSorted) backgroundColor = 'green';
          else if (isSwitching) backgroundColor = 'red';

          return (
            <View key={i} style={{flexDirection: 'column-reverse', flex: 1}}>
              <View
                style={{
                  paddingHorizontal: 2,
                  backgroundColor,
                  borderColor: 'black',
                  borderWidth: 1,
                  flex: heightRatio,
                }}></View>
            </View>
          );
        })}

        {/* Absolute Button */}
        <TouchableNativeFeedback onPress={this.urutkan}>
          <View
            style={{backgroundColor: 'gray', position: 'absolute', padding: 8}}>
            <Text>Urutkan</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

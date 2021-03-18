import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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
      max: 0,
    };
  }

  componentDidMount() {
    // Fill data
    let dataFill = [];
    for (let i = 0; i < 100; i++) {
      let num = Math.floor(Math.random() * 100 + 1);
      dataFill = [...dataFill, num];
    }
    // Cari data max
    let max = Math.max(...dataFill);
    // console.warn(dataFill, max)
    this.setState({data: dataFill, max});
  }

  render() {
    const {data, max} = this.state;
    return (
      <View style={{flexDirection: 'row', backgroundColor: 'green', flex: 1}}>
        {data.map((num, i) => {
          let heightRatio = num / max;
          return (
            <View key={i} style={{flexDirection: 'column-reverse', flex: 1}}>
              <View
                style={{
                  paddingHorizontal: 2,
                  backgroundColor: 'red',
                  borderColor: 'black',
                  borderWidth: 1,
                  flex: heightRatio,
                }}></View>
            </View>
          );
        })}
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

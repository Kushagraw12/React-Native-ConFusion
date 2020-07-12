import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text, Picker, StyleSheet, Switch, Button } from "react-native";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      smoking: false,
      date: "",
    };
  }

  static navigationOptions = {
    title: "Reserve Table",
  };

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.setState({
      guests: 1,
      smoking: false,
      date: "",
    });
  }
  render() {
    return (
      <ScrollView>
        <View style={Styles.formRow}>
          <Text style={Styles.formLabel}>Number of Guests</Text>
          <Picker
            style={Styles.formItem}
            selectedValue={this.state.guests}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ guests: itemValue })
            }
          >
            <Picker.Item label="l" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
          </Picker>
        </View>

        <View style={Styles.formRow}>
          <Text style={Styles.formLabel}>Smoking / Non-Smoking?</Text>
          <Switch
            style={Styles.formItem}
            value={this.state.smoking}
            trackColor="#512DA8"
            onValueChange={(value) => this.setState({ smoking: value })}
          ></Switch>
        </View>

        <View style={Styles.formRow}>
          <Text style={StyleSheet.formLabel}>Date and Time</Text>
          <DatePicker
            style={{ flex: 2, marginRight: 20 }}
            date={this.state.date}
            format=""
            mode="datetime"
            placeholder="Select Date and Time"
            minDate="2020-07-12"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              this.setState({ date: date });
            }}
          />
        </View>

        <View style={Styles.formRow}>
          <Button
            title="Reserve"
            color="#512DA8"
            orPress={() => this.handleReservation()}
            accessibilityLabel="Noice"
          />
        </View>
      </ScrollView>
    );
  }
}

const Styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
});

export default Reservation;

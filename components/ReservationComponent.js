import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  Modal,
  Alert,
  PanResponder,
} from "react-native";
import { Card } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import * as Animatable from "react-native-animatable";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import * as Calendar from "expo-calendar";

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      smoking: false,
      date: "",
      showModal: false,
    };
  }
  static navigationOptions = {
    title: "Reserve Table",
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
    this.presentLocalNotification(this.state.date);
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
    this.addReservationToCalendar(this.state.date);
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: "",
    });
  }

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== "granted") {
        Alert.alert("Permission not granted to show notifications");
      }
    }
    return permission;
  }

  async obtainCalendarPermission() {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === "granted") {
      const calendars = await Calendar.getCalendarsAsync();
    }
  }

  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.presentNotificationAsync({
      title: "Your Reservation",
      body: "Reservation for " + date + "requested",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        vibrate: true,
        color: "#512DA8",
      },
    });
  }

  async addReservationToCalendar(date) {
    this.obtainCalendarPermission();
    const newCalendarID = await Calendar.createEventAsync({
      title: "Con Fusion Table Reservation",
      startDate: new Date(Date.Parse(date)),
      endDate: new Date(Date.Parse(date) + 2 * 3600 * 1000),
      timeZone: "Asia/Hong_Kong",
      location:
        "121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong",
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  }

  confirmationAlert() {
    Alert.alert(
      "Your Reservation OK?",
      "\nNumber of Guests: " +
        this.state.guests +
        "\nSmoking? " +
        this.state.smoking +
        "\nDate and Time: " +
        this.state.date,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            this.toggleModal();
            this.resetForm();
            this.addReservationToCalendar(this.state.date);
          },
        },
      ],
      { cancelable: false }
    );
  }

  handleViewRef = (ref) => (this.view = ref);

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
  });

  render() {
    return (
      <Animatable.View
        animation="zoomIn"
        duration={2000}
        ref={this.handleViewRef}
        {...this.panResponder.panHandlers}
      >
        <ScrollView>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guest</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ guest: itemValue })
              }
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/Non-Smoking</Text>
            <Switch
              style={styles.formItem}
              value={this.state.smoking}
              trackColor="#512DA8"
              onValueChange={(value) => this.setState({ smoking: value })}
            ></Switch>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <DatePicker
              style={{ flex: 2, marginRight: 20 }}
              date={this.state.date}
              format=""
              mode="datetime"
              placeholder="select date and time"
              minDate="2019-01-01"
              maxDate="2021-01-01"
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
              onDateChange={(date) => this.setState({ date: date })}
            />
          </View>
          <View style={styles.formRow}>
            <Button
              title="Reserve"
              color="#512DA8"
              onPress={() => this.confirmationAlert()}
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <Modal
            animation={"slide"}
            transparent={false}
            visible={this.state.showModal}
            onDismiss={() => this.toggleModal()}
            onRequestClose={() => this.toggleModal}
          >
            <View style={styles.modal}>
              <Text style={styles.modalTitle}> Your Reservation</Text>
              <Text style={styles.modalText}>
                Number of Guests: {this.state.guests}
              </Text>
              <Text style={styles.modalText}>
                Smoking?: {this.state.smoking ? "Yes" : "No"}
              </Text>
              <Text style={styles.modalText}>
                Date and Time: {this.state.date}
              </Text>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="#512DA8"
                title="close"
              />
            </View>
          </Modal>
        </ScrollView>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
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
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default Reservation;

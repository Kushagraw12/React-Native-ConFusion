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
} from "react-native";
import { Card } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import * as Animatable from "react-native-animatable";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

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
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
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
    } else {
      if (Platform.OS === "android") {
        Notifications.createChannelAndroidAsync("notify", {
          name: "notify",

          sound: true,

          vibrate: true,
        });
      }
    }

    return permission;
  }

  async presentLocalNotif(date) {
    await this.obtainNotificationPermission();

    Notifications.presentLocalNotificationAsync({
      title: "Your Reservation",

      body: "Reservation for " + date + " requested",

      ios: {
        sound: true,
      },

      android: {
        channelId: "reservation",

        color: "#512DA8",
      },
    });
    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("reservation", {
        name: "Confusion",

        sound: true,

        vibrate: [0, 250, 250, 250],

        priority: "max",
      });
    }
  }

  render() {
    return (
      <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
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
              placeholder="select date and Time"
              minDate="2017-01-01"
              maxDate="2050-01-01"
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
              onPress={() => {
                Alert.alert(
                  "Confirm your Reservation:",
                  "Number of Guests: " +
                    this.state.guests +
                    "\nSmoking Status: " +
                    this.state.smoking +
                    "\nDate: " +
                    this.state.date,
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Table Not Reserved"),
                      style: "cancel",
                    },
                    {
                      text: "Confirm",
                      onPress: () => {
                        this.handleReservation();
                        this.presentLocalNotif(this.state.date);
                      },
                      style: "default",
                    },
                  ]
                );
              }}
              accessibilityLabel="Noice"
            />
          </View>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.showModal}
            onDismiss={() => {
              this.toggleModal();
              this.resetForm();
            }}
            onRequestClose={() => {
              this.toggleModal();
              this.resetForm();
            }}
          >
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Your Reservation</Text>
              <Text style={styles.modalText}>
                Number of Guests: {this.state.guests}
              </Text>
              <Text style={styles.modalText}>
                Smoking Table? {this.state.smoking ? "Yes" : "No"}
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
                title="Close"
              />
            </View>
          </Modal>
        </ScrollView>
      </Animatable.View>
    );
  }
}

const styles = {
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
    testAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
};

export default Reservation;

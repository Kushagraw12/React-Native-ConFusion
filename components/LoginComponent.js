import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { Input, CheckBox, Button, Icon } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { baseUrl } from "../shared/baseUrl";

class LoginTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      remember: false,
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync("userinfo").then((userdata) => {
      let userinfo = JSON.parse(userdata);
      if (userinfo) {
        this.setState({ username: userinfo.username });
        this.setState({ password: userinfo.password });
        this.setState({ remember: true });
      }
    });
  }

  static navigationOptions = {
    title: "Login",
    tabBarIcon: ({ tintcolor }) => (
      <Icon
        name="sign-in"
        type="font-awesome"
        sixe={24}
        iconstyle={{ color: tintcolor }}
      />
    ),
  };

  handleLogin() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember)
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
    else
      SecureStore.deleteItemAsync("userinfo").catch((error) =>
        console.log("Could not delete user info", error)
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "key" }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={styles.formInput}
        />
        <CheckBox
          title="Remember Me"
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={() => this.handleLogin()}
            title="Login"
            icon={
              <Icon
                name="sign-in"
                type="font-awesome"
                color="white"
                size={24}
              />
            }
            buttonStyle={{ backgroundColor: "#512DA8" }}
          />
        </View>
        <View style={styles.formButton}>
          <Button
            onPress={() => this.props.navigation.navigate("Register")}
            title="Register"
            clear
            icon={
              <Icon
                name="user-plus"
                type="font-awesome"
                color="blue"
                size={24}
              />
            }
            titleStye={{ color: "blue" }}
          />
        </View>
      </View>
    );
  }
}

class RegisterTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      remember: false,
      imageUrl: baseUrl + "images/logo.png",
    };
  }

  static navigationOptions = {
    title: "Register",
    tabBarIcon: ({ tintcolor }) => (
      <Icon
        name="user-plus"
        type="font-awesome"
        sixe={24}
        iconstyle={{ color: tintcolor }}
      />
    ),
  };

  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    if (
      cameraPermission.status === "granted" &&
      cameraRollPermission.status === "granted"
    ) {
      let capturedImage = ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (!capturedImage.cancelled) {
        //this.setState({ imageUrl: capturedImage.uri });
        this.processImage(capturedImage.uri);
      }
    }
  };

  getImageFromGallery = async () => {
    const galleryPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (galleryPermission.status === "granted") {
      let pickedImage = ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!pickedImage.cancelled) {
        //this.setState({ imageUrl: capturedImage.uri });
        this.processImage(pickedImage.uri);
      }
    }
  };

  processImage = async (imageuri) => {
    const processedImage = await ImageManipulator.manipulateAsync(
      imageuri,
      [{ resize: { width: 400 } }],
      { format: ImageManipulator.SaveFormat.PNG }
    );
    //console.log(processedImage);
    this.setState({ imageUrl: processedImage.uri });
  };

  handleRegister() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember)
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          // firstname: this.state.firstname,
          //lastname: this.state.lastname
        })
      ).catch((error) => console.log("Could not save user info", error));
    else
      SecureStore.deleteItemAsync("userinfo").catch((error) =>
        console.log("Could not delete user info", error)
      );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: this.state.imageUrl }}
              loadingIndicatorSource={require("./images/logo.png")}
              style={styles.image}
            />
            <Button
              title="Camera"
              onPress={this.getImageFromCamera}
              style={styles.ImageBtn}
            />

            <Button
              title="Gallery"
              onPress={this.getImageFromGallery}
              style={styles.galbtn}
            />
          </View>
          <Input
            placeholder="Username"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: "font-awesome", name: "key" }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="First name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(firstname) => this.setState({ firstname })}
            value={this.state.firstname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Last name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(lastname) => this.setState({ lastname })}
            value={this.state.lastname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="E-mail"
            leftIcon={{ type: "font-awesome", name: "envelope-o" }}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            containerStyle={styles.formInput}
          />
          <CheckBox
            title="Remember Me"
            center
            checked={this.state.remember}
            onPress={() => this.setState({ remember: !this.state.remember })}
            containerStyle={styles.formCheckbox}
          />
          <View style={styles.formButton}>
            <Button
              onPress={() => this.handleRegister()}
              title="Register"
              icon={
                <Icon
                  name="user-plus"
                  type="font-awesome"
                  color="white"
                  size={24}
                />
              }
              buttonStyle={{ backgroundColor: "#512DA8" }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const tabNavigator = createBottomTabNavigator();

function Login() {
  return (
    <NavigationContainer independent={true}>
      <tabNavigator.Navigator
        initialRouteName="Login"
        tabBarOptions={{
          activeBackgroundColor: "#9575CD",
          inactiveBackgroundColor: "#D1C4E9",
          activeTintColor: "#ffffff",
          inactiveTintColor: "gray",
        }}
      >
        <tabNavigator.Screen
          name="Login"
          component={LoginTab}
          options={{
            title: "Login",
            tabBarIcon: ({ tintColor }) => (
              <Icon
                name="sign-in"
                type="font-awesome"
                size={24}
                iconStyle={{ color: tintColor }}
              />
            ),
          }}
        />
        <tabNavigator.Screen
          name="Register"
          component={RegisterTab}
          options={{
            title: "Register",
            tabBarIcon: ({ tintColor }) => (
              <Icon
                name="user-plus"
                type="font-awesome"
                size={24}
                iconStyle={{ color: tintColor }}
              />
            ),
          }}
        />
      </tabNavigator.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 15,
    marginLeft: 10,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  image: {
    margin: 20,
    width: 80,
    height: 60,
  },
  ImageBtn: {
    margin: 20,
    paddingRight: 10,
  },
  formInput: {
    margin: 20,
  },
  formCheckbox: {
    margin: 20,
    backgroundColor: null,
  },
  galbtn: {
    marginLeft: 10,
    marginRight: 0,
  },
  formButton: {
    margin: 60,
    padding: 20,
  },
});

export default Login;

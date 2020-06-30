import React, { Component } from "react";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Address from "./ContactComponent";
import { View, Platform, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./HomeComponent";
import About from "./AboutComponent";

const MenuNavigator = createStackNavigator();
function MenuNavigatorScreen() {
  return (
    <MenuNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#512DA8" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <MenuNavigator.Screen
        name="Menu"
        component={Menu}
        options={{ title: "Menu" }}
      />
      <MenuNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ title: "Dish Details" }}
      />
    </MenuNavigator.Navigator>
  );
}

const HomeNavigator = createStackNavigator();
function HomeNavigatorScreen() {
  return (
    <HomeNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#512DA8" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <HomeNavigator.Screen
        name="Home"
        component={Home}
        options={{ title: "Home" }}
      />
    </HomeNavigator.Navigator>
  );
}

const ContactNavigator = createStackNavigator();
function ContactNavigatorScreen() {
  return (
    <ContactNavigator.Navigator
      initialRouteName="Contact Us"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#512DA8" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <ContactNavigator.Screen
        name="Contact Us"
        component={Address}
        options={{ title: "Contact Us" }}
      />
    </ContactNavigator.Navigator>
  );
}

const AboutNavigator = createStackNavigator();
function AboutNavigatorScreen() {
  return (
    <AboutNavigator.Navigator
      initialRouteName="About Us"
      screenOptions={{
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#512DA8" },
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <AboutNavigator.Screen
        name="About Us"
        component={About}
        options={{ title: "About Us" }}
      />
    </AboutNavigator.Navigator>
  );
}

const MainNavigator = createDrawerNavigator();
function MainNavigatorDrawer() {
  return (
    <MainNavigator.Navigator
      drawerContentOptions={{
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 5 },
      }}
    >
      <MainNavigator.Screen
        name="Home"
        options={{ drawerLabel: "Home" }}
        component={HomeNavigatorScreen}
      />

      <MainNavigator.Screen
        name="About Us"
        options={{ drawerLabel: "About Us" }}
        component={AboutNavigatorScreen}
      />

      <MainNavigator.Screen
        name="Menu"
        options={{ drawerLabel: "Menu" }}
        component={MenuNavigatorScreen}
      />

      <MainNavigator.Screen
        name="Contact Us"
        options={{ drawerLabel: "Contact Us" }}
        component={ContactNavigatorScreen}
      />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        }}
      >
        <NavigationContainer>
          <MainNavigatorDrawer />
        </NavigationContainer>
      </View>
    );
  }
}
export default Main;

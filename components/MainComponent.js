import React, { Component } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NetInfo from "@react-native-community/netinfo";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Icon } from "react-native-elements";

import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Reservation from "./ReservationComponent";
import Favorites from "./FavoriteComponent";
import Contact from "./ContactComponent";
import Login from "./LoginComponent";
import About from "./AboutComponent";
import { connect } from "react-redux";
import {
  fetchDishes,
  fetchLeaders,
  fetchComments,
  fetchPromos,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const HeaderStyle = {
  headerStyle: {
    backgroundColor: "#512DA8",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    color: "#fff",
  },
};

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <View style={styles.drawerHeader}>
      <View style={{ flex: 1 }}>
        <Image
          source={require("./images/logo.png")}
          style={styles.drawerImage}
        />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
      </View>
    </View>
    <DrawerItemList {...props} />
  </ScrollView>
);

const MenuNavigator = createStackNavigator();
function MenuNavigatorScreen() {
  return (
    <MenuNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={HeaderStyle}
    >
      <MenuNavigator.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <MenuNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{ headerTitle: "Dish Detail" }}
      />
    </MenuNavigator.Navigator>
  );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen() {
  return (
    <HomeNavigator.Navigator
      initialRouteName="Home"
      screenOptions={HeaderStyle}
    >
      <HomeNavigator.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </HomeNavigator.Navigator>
  );
}

const ContactNavigator = createStackNavigator();

function ContactNavigatorScreen() {
  return (
    <ContactNavigator.Navigator
      initialRouteName="Contact Us"
      screenOptions={HeaderStyle}
    >
      <ContactNavigator.Screen
        name="Contact Us"
        component={Contact}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </ContactNavigator.Navigator>
  );
}

const AboutUsNavigator = createStackNavigator();

const MenuIcon = (props) => {
  return (
    <Icon
      name="menu"
      size={24}
      color="white"
      onPress={() => props.navigation.toggleDrawer()}
    />
  );
};

function AboutUsNavigatorScreen() {
  return (
    <AboutUsNavigator.Navigator
      initialRouteName="About Us"
      screenOptions={HeaderStyle}
    >
      <AboutUsNavigator.Screen
        name="About Us"
        component={About}
        options={({ navigation }) => ({
          headerLeft: () => <MenuIcon navigation={navigation} />,
        })}
      />
    </AboutUsNavigator.Navigator>
  );
}

const ReservationNavigator = createStackNavigator();

function ReservationNavigatorScreen() {
  return (
    <ReservationNavigator.Navigator
      initialRouteName="Reservation"
      screenOptions={HeaderStyle}
    >
      <ReservationNavigator.Screen
        name="Reservation"
        component={Reservation}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </ReservationNavigator.Navigator>
  );
}

const FavoritesNavigator = createStackNavigator();

function FavoritesNavigatorScreen() {
  return (
    <FavoritesNavigator.Navigator
      initialRouteName="Favorites"
      screenOptions={HeaderStyle}
    >
      <FavoritesNavigator.Screen
        name="My Favorites"
        component={Favorites}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </FavoritesNavigator.Navigator>
  );
}

const LoginNavigator = createStackNavigator();

function LoginNavigatorScreen() {
  return (
    <LoginNavigator.Navigator
      initialRouteName="Login"
      screenOptions={HeaderStyle}
    >
      <LoginNavigator.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </LoginNavigator.Navigator>
  );
}

const MainNavigator = createDrawerNavigator();

function MainNavigatorDrawer() {
  return (
    <MainNavigator.Navigator
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: "#D1C4E9",
      }}
      drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
    >
      <MainNavigator.Screen
        name="Login"
        component={LoginNavigatorScreen}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="user" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Home"
        component={HomeNavigatorScreen}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="home" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="About Us"
        component={AboutUsNavigatorScreen}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="info-circle"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Menu"
        component={MenuNavigatorScreen}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="list" type="font-awesome" size={24} color={tintColor} />
          ),
        }}
      />

      <MainNavigator.Screen
        name="Contact Us"
        component={ContactNavigatorScreen}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={22}
              color={tintColor}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name="My Favorites"
        component={FavoritesNavigatorScreen}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="heart"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Reservation"
        component={ReservationNavigatorScreen}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon
              name="cutlery"
              type="font-awesome"
              size={24}
              color={tintColor}
            />
          ),
        }}
      />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    NetInfo.fetch().then((connectionInfo) => {
      ToastAndroid.show(
        "Initial Network Connectivity Type: " +
          connectionInfo.type +
          ", Effective Network Connectivity: " +
          connectionInfo.effectiveType,
        ToastAndroid.LONG
      );
    });

    NetInfo.addEventListener((connectionChange) =>
      this.handleConnectivityChange(connectionChange)
    );
  }

  componentWillUnmount() {
    NetInfo.removeEventListener((connectionChange) =>
      this.handleConnectivityChange(connectionChange)
    );
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case "none":
        ToastAndroid.show("You are now OFFLINE!", ToastAndroid.LONG);
        break;
      case "wifi":
        ToastAndroid.show("You are now on WIFI!", ToastAndroid.LONG);
        break;
      case "cellular":
        ToastAndroid.show("You are now on CELLULAR!", ToastAndroid.LONG);
      case "unknown":
        ToastAndroid.show(
          "You now have an UNKNOWN CONNECTION!",
          ToastAndroid.LONG
        );
      default:
    }
  };

  render() {
    return (
      <NavigationContainer>
        <MainNavigatorDrawer />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

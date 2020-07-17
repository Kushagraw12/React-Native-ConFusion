import React, { Component } from "react";
import { Text, View, Animated, Easing } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

function RenderItem(props) {
  const item = props.item;

  if (props.isLoading) {
    return <Loading />;
  } else if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  } else {
    if (item != null) {
      return (
        <Card
          featuredTitle={item.name}
          featuredSubtitle={item.designation}
          image={{ uri: baseUrl + item.image }}
        >
          <Text style={{ margin: 10 }}>{item.description}</Text>
        </Card>
      );
    } else {
      return <View></View>;
    }
  }
}
class Home extends Component {
  constructor(props) {
    super(props);
    this.animatedvalue = new Animated.Value(0);
  }

  static navigationOptions = {
    title: "Home",
  };

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedvalue.setValue(0);
    Animated.timing(this.animatedvalue, {
      toValue: 8,
      duration: 8000,
      easing: Easing.linear,
    }).start(() => this.animate());
  }

  render() {
    const xpos1 = this.animatedvalue.interpolate({
      inputRange: [0, 1, 3, 5, 8], //trial-error
      outputRange: [1200, 600, 0, -600, -1200],
    });

    const xpos2 = this.animatedvalue.interpolate({
      inputRange: [0, 2, 4, 6, 8], //trial-error
      outputRange: [1200, 600, 0, -600, -1200],
    });

    const xpos3 = this.animatedvalue.interpolate({
      inputRange: [0, 3, 5, 7, 8], //trial-error
      outputRange: [1200, 600, 0, -600, -1200],
    });

    return (
      <View style={{ flex: 2, flexDirection: "row", justifyContent: "center" }}>
        <View>
          <Animated.View
            style={{ width: "100%", transform: [{ translateX: xpos1 }] }}
          >
            <RenderItem
              item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errMess}
            />
          </Animated.View>
        </View>
        <View>
          <Animated.View
            style={{ width: "100%", transform: [{ translateY: xpos2 }] }}
          >
            <RenderItem
              item={
                this.props.promotions.promotions.filter(
                  (promo) => promo.featured
                )[0]
              }
              isLoading={this.props.promotions.isLoading}
              errMess={this.props.promotions.errMess}
            />
          </Animated.View>
        </View>
        <View>
          <Animated.View
            style={{ width: "100%", transform: [{ translateX: xpos3 }] }}
          >
            <RenderItem
              item={
                this.props.leaders.leaders.filter(
                  (leader) => leader.featured
                )[0]
              }
              isLoading={this.props.leaders.isLoading}
              errMess={this.props.leaders.errMess}
            />
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Home);

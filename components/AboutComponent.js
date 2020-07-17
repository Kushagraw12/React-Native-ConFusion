import React, { Component } from "react";
import { ScrollView, Text, View, FlatList, Image } from "react-native";
import { Card } from "react-native-elements";
import { ABOUT } from "../shared/about";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  };
};

function RenderHistory(props) {
  const item = props.item;
  if (item != null) {
    return (
      <Card title={item.title}>
        <Text style={{ margin: 10 }}>{item.description1}</Text>
        <Text style={{ margin: 10 }}>{item.description2}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}

function RenderLeader({ item, index }) {
  if (item != null) {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        leftAvatar={{ source: { uri: baseUrl + item.image } }}
      />
    );
  } else {
    return <View></View>;
  }
}

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abt: ABOUT,
    };
  }
  render() {
    if (this.props.leaders.isLoading) {
      return (
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={100}>
            <Card title="Corporate Leadership">
              <Loading />
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    } else if (this.props.leaders.errMess) {
      return (
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card title="Corporate Leadership">
              <Text>{this.props.leaders.errMess}</Text>
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <RenderHistory
            item={this.state.abt.filter((about) => about.featured)[0]}
          />
          <Card title="Corporate Leadership">
            <FlatList
              data={this.props.leaders.leaders}
              renderItem={RenderLeader}
              keyExtractor={(item) => item.id.toString()}
            />
          </Card>
        </ScrollView>
      );
    }
  }
}

export default connect(mapStateToProps)(About);

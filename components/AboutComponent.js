import React, { Component } from "react";
import { ScrollView, Text, View, FlatList, Image } from "react-native";
import { Card } from "react-native-elements";
import { ABOUT } from "../shared/about";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

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
          <Card title="Corporate Leadership">
            <Loading />
          </Card>
        </ScrollView>
      );
    } else if (this.props.leaders.errMess) {
      return (
        <ScrollView>
          <Card title="Corporate Leadership">
            <Text>{this.props.leaders.errMess}</Text>
          </Card>
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

import React, { Component } from "react";
import { ScrollView, Text, View, FlatList, Image } from "react-native";
import { Card } from "react-native-elements";
import { ABOUT } from "../shared/about";
import { LEADERS } from "../shared/leaders";
import { ListItem } from "react-native-elements";

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
        leftAvatar={{ source: require("./images/alberto.png") }}
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
      leaders: LEADERS,
    };
  }
  render() {
    return (
      <ScrollView>
        <RenderHistory
          item={this.state.abt.filter((about) => about.featured)[0]}
        />
        <Card title="Corporate Leadership">
          <FlatList
            data={this.state.leaders}
            renderItem={RenderLeader}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </ScrollView>
    );
  }
}

export default About;

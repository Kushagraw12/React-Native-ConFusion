import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { Card } from "react-native-elements";
import { ADDRESS } from "../shared/address";

function RenderItem(props) {
  const item = props.item;
  if (item != null) {
    return (
      <Card
        featuredTitle={item.title}
        featuredSubtitle={item.designation}
        title={item.title}
      >
        <Text style={{ margin: 10 }}>{item.line1}</Text>
        <Text style={{ margin: 10 }}>{item.line2}</Text>
        <Text style={{ margin: 10 }}>{item.line3}</Text>
        <Text style={{ margin: 10 }}>{item.tel}</Text>
        <Text style={{ margin: 10 }}>{item.fax}</Text>
        <Text style={{ margin: 10 }}>{item.email}</Text>
      </Card>
    );
  } else {
    return <View></View>;
  }
}
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ADDRESS,
    };
  }
  render() {
    return (
      <ScrollView>
        <RenderItem
          item={this.state.address.filter((adr) => adr.featured)[0]}
        />
      </ScrollView>
    );
  }
}

export default Address;

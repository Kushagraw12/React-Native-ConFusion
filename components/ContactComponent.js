import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { ADDRESS } from "../shared/address";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";

function RenderItem(props) {
  const item = props.item;

  if (item != null) {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
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
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
}
class Address extends Component {
  sendMail() {
    MailComposer.composeAsync({
      recipients: ["kush12092001@gmail.com"],
      subject: "Enquiry",
      body: "To whom is may concern:",
    });
  }

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
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <Button
            title="Contact us via Email"
            buttonStyle={styles.emailbtn}
            icon={<Icon name="envelope-o" type="font-awesome" color="white" />}
            onPress={this.sendMail}
          />
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  emailbtn: {
    backgroundColor: "#512DA8",
    width: "50%",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
});
export default Address;

import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  StyleSheet,
  Button,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComments } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComments: (dishId, rating, author, comment) =>
    dispatch(postComments(dishId, rating, author, comment)),
});

function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Icon
            raised
            reverse
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={() =>
              props.favorite ? console.log("Already favorite") : props.onPress()
            }
          />
          <Icon
            raised
            reverse
            name={"pencil"}
            type="font-awesome"
            color="#512DA8"
            onPress={() => {
              props.openModal();
            }}
          />
        </View>
      </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComments(props) {
  const comments = props.comment;
  const renderComments = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating}</Text>
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + " " + item.date}
        </Text>
      </View>
    );
  };
  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderComments}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 5,
      author: "",
      comment: "",
      showModal: false,
    };
  }
  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  static navigationOptions = {
    title: "Dish Details",
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(dishId) {
    console.log(JSON.stringify(this.state) + dishId);
    this.props.postComments(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );
    this.toggleModal();
    this.resetForm();
  }

  resetForm() {
    this.setState({
      rating: 5,
      author: "",
      comment: "",
      showModal: false,
    });
  }

  render() {
    const dishId = this.props.route.params.dishId;

    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some((el) => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          openModal={() => this.toggleModal()}
        />
        <RenderComments
          comment={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
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
            <View style={{ marginTop: 50, marginBottom: 10 }}>
              <Rating
                type="star"
                ratingCount={5}
                fractions={1}
                startingValue={5}
                imageSize={20}
                onFinishRating={(rating) => {
                  this.setState({ rating: rating });
                }}
                showRating
                style={{ paddingVertical: 10 }}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Input
                placeholder="Author"
                leftIcon={{ type: "font-awesome", name: "user-o" }}
                size={24}
                onChangeText={(text) => {
                  this.setState({ author: text });
                }}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Input
                placeholder="Comment"
                leftIcon={{ type: "font-awesome", name: "comment-o" }}
                onChangeText={(text) => {
                  this.setState({ comment: text });
                }}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.handleComment(
                    dishId,
                    this.state.author,
                    this.state.rating,
                    this.state.comment
                  );
                  this.resetForm();
                }}
                color="#512DA8"
                title="SUBMIT"
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="#333"
                title="CANCEL"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

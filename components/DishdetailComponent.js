import React, { Component, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Modal,
  StyleSheet,
  Button,
  PanResponder,
  Alert,
  Share,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComments } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

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
  addComment: (dishId, rating, comment, author) =>
    dispatch(addComment(dishId, rating, comment, author)),
});

function RenderDish(props) {
  const dish = props.dish;

  //handleViewRef = (ref) => (this.view = ref);
  const viewRef = useRef(null);

  const recogonizeDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -150) return true;
    else return false;
  };

  const recognizeComment = ({ moveX, moveY, dx, dy }) => {
    if (dx > -150) return true;
    else return false;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },

    onPanResponderGrant: () => {
      viewRef.current
        .rubberBand(1000)
        .then((endState) =>
          console.log(endState.finished ? "Finished" : "Cancelled")
        );
    },

    onPanResponderEnd: (e, gestureState) => {
      if (recogonizeDrag(gestureState))
        Alert.alert(
          "Add to Favorite?",
          "Are you sure you want to add " + dish.name + " to your favorites?",
          [
            {
              text: "Cancel",
              onPress: () => console.log(" Operation Cancelled"),
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () =>
                props.favorite
                  ? console.log("Already favorite")
                  : props.onPress(),
            },
          ],
          { cancelable: false }
        );
      else if (recognizeComment(gestureState)) props.openModal();
      return true;
    },
  });

  const shareDish = (title, message, url) => {
    Share.share(
      {
        title: title,
        message: "\n" + title + ": " + message + " " + url,
        url: url,
      },
      {
        dialogTitle: "Share " + title,
      }
    );
  };

  if (dish != null) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        ref={viewRef}
        {...panResponder.panHandlers}
      >
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
                props.favorite
                  ? console.log("Already favorite")
                  : props.onPress()
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
            <Icon
              raised
              reverse
              name="share"
              type="ffont-awesome"
              color="#51D2A8"
              onPress={() =>
                shareDish(dish.name, dish.description, baseUrl + dish.image)
              }
            />
          </View>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View />;
  }
}
function RenderComments({ comments }) {
  const renderCommentItem = ({ item, index }) => (
    <View key={index} style={{ margin: 10 }}>
      <Text style={{ fontSize: 14 }}>{item.comment}</Text>
      <Rating readonly startingValue={item.rating} imageSize={15} />
      {/*  <Text style={{ fontSize: 12 }}>{`${item.rating} Stars`}</Text>*/}
      <Text style={{ fontSize: 12 }}>{`--${item.author}, ${item.date}`}</Text>
    </View>
  );

  if (comments != null) {
    return (
      <Animatable.View animation="fadeInUp" duration={2000}>
        <Card title="Comments">
          <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </Animatable.View>
    );
  }

  return <View />;
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

  handleComment(dishId, rating, author, comment) {
    this.props.postComments(dishId, rating, author, comment);
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
          comments={this.props.comments.comments.filter(
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
            <Rating
              type="star"
              ratingCount={5}
              fractions={0}
              startingValue={5}
              imageSize={40}
              onFinishRating={(rating) => {
                this.setState({ rating: rating });
              }}
              showRating
              style={{ paddingVertical: 10 }}
            />
            <Input
              placeholder="Author"
              leftIcon={{ type: "font-awesome", name: "user-o" }}
              onChangeText={(text) => this.setState({ author: text })}
            />
            <Input
              placeholder="Comment"
              leftIcon={{ type: "font-awesome", name: "comment-o" }}
              onChangeText={(text) => this.setState({ comment: text })}
            />
            <Button
              onPress={() => {
                this.handleComment(
                  dishId,
                  this.state.rating,
                  this.state.author,
                  this.state.comment
                );
                this.resetForm();
              }}
              color="#512DA8"
              title="SUBMIT"
            />
            <Button
              onPress={() => {
                this.toggleModal();
                this.resetForm();
              }}
              color="#333"
              title="CANCEL"
            />
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

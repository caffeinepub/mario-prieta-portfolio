actor {
  public query ({ caller }) func greet(name : Text) : async Text {
    "Welcome to my portfolio, " # name # "!";
  };
};

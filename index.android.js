const WEBVIEW_REF = "WEBVIEW_REF";
import React, {Component} from "react";
import {AppRegistry,StyleSheet, Text, View, TouchableOpacity, WebView, Dimensions,BackHandler,Image,StatusBar} from "react-native";
var {height, width} = Dimensions.get('window');
var obj;


BackHandler.addEventListener('hardwareBackPress', function () {
 
    if (obj.state.canGoBack) {
        onBack();
        return true;
    }
    //return false;
});

var onBack=function() {
    obj.refs[WEBVIEW_REF].goBack();
}


export default class retail extends Component {
    constructor(props) {
        super(props);
        obj=this;
        this.state = {canGoBack: false,splash:true};
    }
    componentDidMount(){
        StatusBar.setBackgroundColor('#ec7104');
    }

    splashCall() {
      obj.setState({splash:false});
        
    }

    render() {
        return (
            <View style={styles.container}>
            
                <WebView
                    ref={WEBVIEW_REF}
                    style={{flex: 1}}
                    onLoadEnd={() => obj.splashCall()}
                    onNavigationStateChange=
                        {this.onNavigationStateChange.bind(this)}
                    source={{uri: 'https://soundredux.io/#/'}}
                />
                 {obj.state.splash && (
                   <View>
                     <Image style={styles.image} resizeMode={'contain'} source={require('./assets/hnrretail-splash.jpg')} />
                  </View>
                 )}
            </View>
        );
    }

    onBack() {
        this.refs[WEBVIEW_REF].goBack();
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    topbar: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topbarTextDisabled: {
        color: 'gray'
    },
    image:{
      height:height,
      width:width
    }
});

AppRegistry.registerComponent('retail', () => retail);

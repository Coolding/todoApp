/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
 
//显示长期计划下的类目

var w=Dimensions.get('window').width;
var h=Dimensions.get('window').height;  //获得屏幕的宽高



export default class ShowPlan extends Component {

 constructor(props) {  
    super(props); 
     this.state = {
        CategoryName:'',
        PlanItem:[]
    }; 
  }  

 static navigationOptions = {
     header:null
  };

componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({CategoryName:params.Category})
    let url="http://todoapp.applinzi.com/kdkibmyluifvjk/getPlans/";
    let formData=new FormData();        
    formData.append("Category",params.Category);  
    formData.append("PlanType",params.PlanType);      
    fetch(url,{method:"POST",headers:{},body:formData}).then(response => response.json())
          .then(data =>{ 
             this.setState({PlanItem:data})
            })
    
  }
 

 gotoShowChildPlans=(ParentPlanID)=>{
   const { params } = this.props.navigation.state;
   if(params.PlanType=='远期计划') 
            this.props.navigation.navigate('ShowChildPlan',{ParentPlanID:ParentPlanID})
   else if(params.PlanType=='年度计划') 
            this.props.navigation.navigate('ShowYearChildPlan',{ParentPlanID:ParentPlanID})


 }


  render() {
    return (
       <View  style={styles.container}>  
            <View style={styles.header}>  
                  <Text style={styles.headtitle}>{this.state.CategoryName}</Text> 
            </View>  
            <ScrollView>
             {
                this.state.PlanItem.map(
                      (Item,index)=>{ 
                          return(
                                <View key={index} style={{backgroundColor:'white',flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center',  width:0.88*w,height:60,marginLeft:0.06*w,marginBottom:0.06*w,borderTopRightRadius:5,borderBottomRightRadius:5,}}>
                                    <View style={{backgroundColor:'#BEB3F7',borderTopLeftRadius:5,borderBottomLeftRadius:5,width:10,height:60}}></View>
                                    <TouchableOpacity 
                                        style={{flexDirection: 'row',justifyContent: 'flex-start',alignItems:'center',width:0.85*w,height:60}}
                                         onPress={()=>this.gotoShowChildPlans(Item['ID'])}>
                                        <Text>   {Item['Plan']}</Text>
                                    </TouchableOpacity>
                                </View>  
                          )
                      }
                )
            }
            </ScrollView>
       </View>   
     
    );
  }
}


const styles = StyleSheet.create({
   container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f4f6f6',
    //marginBottom: 100,
  },
    header: { 
    flexDirection: 'row',
    height: 40, 
    backgroundColor: '#12B7F5', 
    justifyContent: 'center', 
    width:w,
    marginBottom:w*0.06,
}, 
 
headtitle: { 
    textAlign:'center',
    alignSelf: 'center', 
    fontSize: 20, 
    color: '#FFFFFF', 
}, 
});


// static navigationOptions = {
//   drawerLabel: 'Dashboard',
//   drawerIcon: ({ }) => (
//     <Image source={require('../assets/icon/dashboard.png')} />
//   ),
// };
// <Header
//       backgroundColor={colors.white}
//       leftComponent={{ icon: 'menu', color: colors.primaryDark }}
//       centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
//       rightComponent={{ icon: 'home', color: '#fff' }}
//     />

// create user response
//{ "user": { "uid": "HH5YuwmHnfUG3GYP8vdgQ1eXmPf2", "displayName": null, "photoURL": null, "email": "xnndehdj@ddf.ccc", "emailVerified": false, "phoneNumber": null, "isAnonymous": false, "tenantId": null, "providerData": [{ "uid": "xnndehdj@ddf.ccc", "displayName": null, "photoURL": null, "email": "xnndehdj@ddf.ccc", "phoneNumber": null, "providerId": "password" }], "apiKey": "AIzaSyBACLpvymneTmxW216e5LSPP63yf1sLn5w", "appName": "[DEFAULT]", "authDomain": "propertyhub-820e2.firebaseapp.com", "stsTokenManager": { "apiKey": "AIzaSyBACLpvymneTmxW216e5LSPP63yf1sLn5w", "refreshToken": "AEu4IL3EOuzAe6OtOzY1vuEeSOYCF1WWLAQ2fiVrkKaI5bYoUpKRMyrKc3hf2zFA9uXxP8QQyYsWiAldSIogm6WaozvVthoOoNffEBny7_1HEaUcE9Xw54Ci8awN23ZauZ_gL1wKc7go3ApdgUDavCQxM13oM7DCnD05wxFP-q1coZelr0k1PGBA1nys-RNOCYkfPH-Vi9kEuHXN8tNlg_Pf0DFp9K-YEQ", "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjRhOWEzMGI5ZThkYTMxNjY2YTY3NTRkZWZlZDQxNzQzZjJlN2FlZWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcHJvcGVydHlodWItODIwZTIiLCJhdWQiOiJwcm9wZXJ0eWh1Yi04MjBlMiIsImF1dGhfdGltZSI6MTU3NTE4MDYwMiwidXNlcl9pZCI6IkhINVl1d21IbmZVRzNHWVA4dmRnUTFlWG1QZjIiLCJzdWIiOiJISDVZdXdtSG5mVUczR1lQOHZkZ1ExZVhtUGYyIiwiaWF0IjoxNTc1MTgwNjAyLCJleHAiOjE1NzUxODQyMDIsImVtYWlsIjoieG5uZGVoZGpAZGRmLmNjYyIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ4bm5kZWhkakBkZGYuY2NjIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.J5TuzJe_28TjC6hg-9SqBC7NzJc0XSUJAKjGqO6FeeQE7xprvqwjebmMhKxLQWWE-itxDCL97VZtvWGwkYMMbyC85xj9dAGPo_Wf28zmUFfGoiW_3ghLoCtGaoqs7jIDm-zd9xqBmmVyuk_kGIcxbUKxlPaBxZPVjwx6RouXvmrAVMDdCW-pa9PEnRHSsOl4pnCbUfW4rR2SzqKKTjQNOH0AL-VrwYm6yzyaxHecbrP-WSsmKPFZXhdmq_OrfdX4GVjY6wNVSzZ_eyJqvfxTU2XeyXWX7HWEZFyw0HSWGEOymNZ01FEPHuS4TR93rCMFeHFS1I793SdIDuGOEX5Sqw", "expirationTime": 1575184202538 }, "redirectEventId": null, "lastLoginAt": "1575180602291", "createdAt": "1575180602291" }, "credential": null, "additionalUserInfo": { "providerId": "password", "isNewUser": true }, "operationType": "signIn" }

// {
//     step === AddPropertyStep.ENTERADDRESS ?
//                 <Container>

//                     <TextInput name="destination" style={styles.searchBox} placeholder="Enter Address" value={destination} onChangeText={destination => this.onChangeDestination(destination)} ></TextInput>
//                     {suggestionView}
//                 </Container> :
//                 step === AddPropertyStep.STATUS ?
//                     <Container style={{ flex: 1 }}>
//                         <Text style={{ color: colors.primaryDark, textAlign: 'right', fontSize: 25, marginTop: 20 }}>More About Your Property</Text>
//                         {content ?
//                             <Item>

//                                 <CheckBox checked={check} onPress={this.handleCheckEvent} />
//                                 <Body >
//                                     <Text style={{ color: colors.green, padding: 20 }}>{destination}</Text>

//                                 </Body>
//                             </Item>
//                             : null}
//                         <Button title="Hide Text Component" onPress={this.componentHideAndShow} />
//                         <Text style={{ color: colors.black, padding: 20 }}>Is this a Flat/Unit?</Text>
//                         <Item style={{ flexDirection: 'row' }}>

//                             <TextInput
//                                 style={styles.unitInputBox}
//                                 value={unitNumber}
//                                 onChangeText={(unitNumber) => setunitNumber(unitNumber)}
//                                 placeholder='Flat/Unit Number'
//                                 autoCapitalize='none'
//                             />
//                             <TouchableOpacity
//                                 style={styles.unitButton}

//                             >
//                                 <Text style={styles.buttonText}>update premise </Text>
//                             </TouchableOpacity>
//                         </Item>
//                         <TouchableOpacity style={styles.buttonNext}  >
//                             <Text style={styles.buttonText}>Next</Text>
//                             <Icon name='chevron-right' type='evilicon' color={colors.white} />
//                         </TouchableOpacity>

//                     </Container> : step === AddPropertyStep.UNITNUMBER ?
//                         <Container style={{ flex: 1, backgroundColor: '#00aC38' }}>
//                             <Text>Asd</Text>
//                             <Button style={styles.unitButton}></Button>
//                         </Container> : ''
//             } 

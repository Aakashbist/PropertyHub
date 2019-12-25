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

//for diferent view
{/* <Container style={{ borderColor: colors.darkWhite1, height: 200, margin: 20, padding: 20, width: '80%', backgroundColor: colors.white, borderWidth: 1 }}>
<Item style={styles.containerFlex}>
    <CheckBox checked={false} style={{ borderRadius: 8, color: colors.green }} />
    <Text style={{ fontSize: 15, padding: 12 }}>Self Manage</Text>
</Item>
<Text >we will notify you tenant via email and ask them to get in touch with us for further information</Text>
</Container>
<Container style={{ height: 200, borderColor: colors.darkWhite1, margin: 40, padding: 20, width: '80%', backgroundColor: colors.white, borderWidth: 1 }}>
</Container> */}

//server code
// import * as admin from 'firebase-admin';
// import * as functions from 'firebase-functions';
// admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// export const setClaimsOnTenant = functions.database.ref('/tenants/{tenantId}').onCreate((snapshots, context) => {
//     console.log('tenant claims');
//     const tenantId = context.params.tenantId;
//     return admin.auth().setCustomUserClaims(tenantId, { isTenant: true });
// });

// export const setClaimsOnOwner = functions.database.ref('/owners/{ownerId}').onCreate((snapshots, context) => {
//     console.log('owner claims');
//     const ownerId = context.params.ownerId;
//     return admin.auth().setCustomUserClaims(ownerId, { isOwner: true });
// });
///
// for postal code in loadcordinate of addpropertyscreen
// getPostalcode(json)
// setLatitude(json.result.geometry.location.lat);
// setLongitude(json.result.geometry.location.lng);
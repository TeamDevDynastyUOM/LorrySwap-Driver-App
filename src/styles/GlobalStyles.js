import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#132939',
    },
    header:{
        flexDirection: 'row',
        margin: 10,
        marginTop: '10%',
        paddingRight: 10,
    },
    whiteContainerForm: {
        marginTop: 20,
        backgroundColor:'#ffffff',
        padding: 30,
        borderRadius:25,
        width: '100%',
        height: '100%',
    },
    whiteContainer: {
        marginTop: 70,
        backgroundColor:'#ffffff',
        padding: 30,
        borderRadius:25,
        width: '100%',
        height: '100%',
    },
    whiteContainer2: {
        padding: 5,
        borderRadius:25,
        marginTop: 40,
        backgroundColor:'#ffffff',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: '100%',
        height: '100%',
    },
    whiteContainerProfile: {
        marginTop: 55,
        backgroundColor:'#fff',
        paddingHorizontal: 30,
        borderRadius:25,
        width: '100%',
        minHeight: 600,
    },
    
    whiteContainerWithSearchBar: {
        marginTop: 20,
        backgroundColor:'#ffffff',
        padding: 20,
        borderRadius:25,
        width: '100%',
        height: '100%',
    },
    iconHeader:{
        top:4,
    },
    pageTitle: {
        color: '#fff',
        // fontfamily:'Source Sans Pro',
        fontSize: 20,
        fontWeight: '700',
        paddingLeft: 10,
        paddingRight: 10,
    },
    submitBtn01: {
        backgroundColor:'#132939',
        padding:12,
        borderRadius:25,
        justifyContent:'center', 
        top:60,
        width:'65%',
        alignSelf:'center',
    },
    submitBtn01Txt: {
        color: '#ffffff',
        textAlign:'center',
        fontSize: 18,
        fontWeight: '700',
    },
    continueContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    continueButton: {
        marginHorizontal: 2,
        fontSize: 17,
        color: '#004344',
    },
    confirmContainer:{
        padding: 8,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#132939',
        borderRadius: 20,        
        borderColor: '#004344',
    },
    confirmButton: {
        marginHorizontal: 2,
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold'
    },
    noResults: {
        flex: 1, 
        alignItems:'center',
        justifyContent:'center',
    },
    textNoResult: {
        fontSize: 17,
        color: '#004344',
        fontWeight: 'bold',
    },
    textNoResult01: {
        fontSize: 14,
        color: '#004344'
    },
    waitingButton:{
        padding: 5,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#004344',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20
    },
    bottomBg: {
        marginBottom: 20,
        alignItems: 'center',
    },    
    goButton1:{
        margin: -30,
        width: 95,
        height: 95,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: 2,
        color: '#fff',
    },
    goButton:{
        margin: -30,
        width: 80,
        height: 80,
        backgroundColor: '#132939',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        color: '#fff',
    },
    go:{
        color: '#fff',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 30,
    },
    ViewLocationBtn:{
        padding: 5,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#004344',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20
    },
    viewLocationBtnText:{
        color:"#132939", 
        fontSize:10
    },
    smallConfirmContainer:{
        marginTop: 5,
        padding: 5,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#132939',
        borderRadius: 20,        
        borderColor: '#004344',
    },
    smallConfirmButton: {
        fontSize: 10,
        color: '#fff',
        fontWeight: 'bold'
    },
    loading:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 17,
        color: '#004344',
        fontWeight: 'bold',
        marginTop: 20
    },
    suggestedButtonText:{
        fontSize: 15,
        color: '#004344',
    },
    wait:{
        marginTop: 10,
        color: '#004344',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },    
    text4: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default GlobalStyles;
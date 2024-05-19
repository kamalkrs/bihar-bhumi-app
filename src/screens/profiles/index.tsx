import { Text, StyleSheet, ScrollView, Alert, Image, View } from 'react-native'
import React from 'react'
import { Box, Flex, Paper, Row } from '../../components/Elements'
import { Badge, Button, Divider, Icon, IconButton, List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Auth from '../../utils/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../../stores/userSlices'
import { RootState } from '../../stores/stores'
import { Appconfig } from '../../config/appconfig'
import ListBox, { ListItem } from '../../components/ListBox'

const Profile = () => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();

    const login = useSelector((state: RootState) => state.login)
    console.log(login.image);


    const handleLogout = () => {
        Alert.alert('Are you sure?', 'Do you want to logout?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: () => {
                    Auth.logout();
                    dispatch(setLogin({ id: 0 }));
                }
            }])
    }

    return (
        <Flex>
            <ScrollView>
                <Paper style={{ backgroundColor: '#0aa699', width: '100%', padding: 15 }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                        <Image source={{ uri: login.image }} style={{ width: 60, height: 60, borderRadius: 60, resizeMode: 'cover' }} />
                        <Box style={{ flex: 1 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>{login.first_name + ' ' + login.last_name}</Text>
                            <Row style={{ alignItems: 'center', columnGap: 5 }}>
                                <Text style={{ color: '#ddd', fontSize: 16 }}>{login.mobile_number}</Text>
                            </Row>
                        </Box>
                        <IconButton
                            onPress={() => navigation.navigate('edit-profile')}
                            icon={'pencil'} size={24} iconColor='#fff' />
                    </Row>
                </Paper>
                <Row style={{ gap: 10, marginBottom: 10, paddingHorizontal: 12 }}>
                    <Button
                        mode='contained'
                        style={{ backgroundColor: '#7ed957', flex: 1 }}
                        icon={'account-outline'}>Personal</Button>
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate('business-signup' as never)}
                        style={{ flex: 1 }}
                        icon={'domain'}>Business</Button>
                </Row>
                <Box style={{ paddingHorizontal: 10 }}>
                    <Box style={{ backgroundColor: '#fff', borderRadius: 10, marginBottom: 4 }}>
                        <ListBox>
                            <ListItem
                                title="Leads/Enquiries"
                                onPress={() => navigation.navigate('leads' as never)}
                                description='View your leads'
                                iconLeft={<Icon source={'folder-outline'} size={20} color='#0aa699' />}
                                iconRight={<Icon source={'chevron-right'} size={20} />}
                            />
                            <ListItem
                                title="Sell Property"
                                onPress={() => navigation.navigate('post-property' as never)}
                                description='Add/Edit all your properties'
                                iconLeft={<Icon source={'file-document-outline'} size={20} color='#0aa699' />}
                                iconRight={<Icon source={'chevron-right'} size={20} />}
                            />
                            <ListItem
                                title="Service Catalog"
                                onPress={() => navigation.navigate('my-services' as never)}
                                description='Manage your services,edit or delete'
                                iconLeft={<Icon source={'cube-outline'} size={20} color='#0aa699' />}
                                iconRight={<Icon source={'chevron-right'} size={20} />}
                            />
                            <ListItem
                                title="Mutation Applications"
                                description='Apply for mutation or download'
                                onPress={() => navigation.navigate('apply-mutations')}
                                iconLeft={<Icon source={'cube-outline'} size={20} color='#0aa699' />}
                                iconRight={<Icon source={'chevron-right'} size={20} />}
                                badge={<Badge style={{ backgroundColor: 'green', borderRadius: 3, paddingHorizontal: 10 }}>New</Badge>}
                            />
                            <ListItem
                                onPress={() => navigation.navigate('bhumi-login')}
                                title="Bhumi Locker"
                                description='Saved and share your property papers'
                                iconLeft={<Icon source={'bookmark-outline'} size={20} color='#0aa699' />}
                                iconRight={<Icon source={'chevron-right'} size={20} />}
                                badge={<Badge style={{ backgroundColor: 'green', borderRadius: 3, paddingHorizontal: 10 }}>New</Badge>}
                            />
                            <ListItem
                                title="Bihar Labour Member Register"
                                onPress={() => navigation.navigate('bihar-labour-member-signup')}
                                iconLeft={<Icon source={'card-account-details-outline'} size={20} color='#0aa699' />}
                                badge={<Badge style={{ backgroundColor: 'green', borderRadius: 3, paddingHorizontal: 10 }}>New</Badge>}
                            />
                            <ListItem
                                title="Wishlist"
                                onPress={() => navigation.navigate('wishlist')}
                                description='Saved your liked property'
                                iconLeft={<Icon source={'bookmark-outline'} size={20} color='#0aa699' />}
                                iconRight={<Icon source={'chevron-right'} size={20} />}
                            />
                            <ListItem
                                title="Notifications"
                                onPress={() => navigation.navigate('notifications')}
                                description='See your notifications'
                                iconLeft={<Icon source={'bell-outline'} size={20} color='#0aa699' />}
                                iconRight={<Icon source={'chevron-right'} size={20} />}
                            />
                            {/* <ListItem
                                title="Help & Support"
                                onPress={() => navigation.navigate('help-support')}
                                iconLeft={<Icon source={'help-circle-outline'} size={20} color='#0aa699' />}
                                iconRight={<Icon source={'chevron-right'} size={20} />}
                            /> */}


                            <ListItem
                                title="Logout"
                                onPress={() => handleLogout()}
                                iconLeft={<Icon source={'logout'} size={20} color='#d00' />}
                                hideBorder={true}
                            />
                        </ListBox>
                    </Box>
                    <Box style={{ backgroundColor: '#fff', borderRadius: 10, marginBottom: 4 }}>
                        <ListItem
                            title="Terms & Conditions"
                            onPress={() => navigation.navigate('webpage' as never, { title: 'Terms & Condtions', url: Appconfig.Url_Terms_Conditions })}
                            iconRight={<Icon source={'chevron-right'} size={20} />}
                        />
                        <ListItem
                            title="Privacy Policy"
                            onPress={() => navigation.navigate('webpage', { title: 'Privacy Policy', url: Appconfig.Url_Privacy_Policy })}
                            iconRight={<Icon source={'chevron-right'} size={20} />}
                        />
                        <ListItem
                            title="Help & Support"
                            onPress={() => navigation.navigate('webpage', { title: 'Help & Support', url: Appconfig.Url_Contact_Us })}
                            iconRight={<Icon source={'chevron-right'} size={20} />}
                            hideBorder={true}
                        />
                    </Box>
                </Box>
            </ScrollView >
        </Flex >
    )
}

const Style = StyleSheet.create({
    description: {
        fontSize: 12, color: '#888'
    }
})

export default Profile
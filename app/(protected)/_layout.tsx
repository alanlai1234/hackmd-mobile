import { useAuth } from '@/components/authProvider';
import { Redirect, Slot } from 'expo-router';

export default function Layout() {
    const { loggedIn } = useAuth();
    if(!loggedIn){
        return (<Redirect href="/login"/>);
    }
    return (
        <Slot/>
    );
}
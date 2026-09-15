import { AuthProvider } from '@/components/authProvider';
import { Slot } from 'expo-router';

export default function Layout() {
    return (
        <AuthProvider>
            <Slot/>
        </AuthProvider>
    );
}

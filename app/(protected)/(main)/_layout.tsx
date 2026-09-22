import { AppProvider } from '@/components/viewProvider';
import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <AppProvider>
            <Stack/>
        </AppProvider>
    );
}

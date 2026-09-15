import { ViewProvider } from '@/components/viewProvider';
import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <ViewProvider>
            <Stack/>
        </ViewProvider>
    );
}

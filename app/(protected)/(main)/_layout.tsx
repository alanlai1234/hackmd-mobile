import { AppProvider } from '@/components/viewProvider';
import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <AppProvider>
            <Stack>
				<Stack.Screen
					name="(bottomSheet)/addSheet"
					options={{
						presentation: "formSheet",
						sheetAllowedDetents: "fitToContents",
						headerShown: false
					}}
				/>
				<Stack.Screen
					name="(bottomSheet)/teamsSheet"
					options={{
						presentation: "formSheet",
						sheetAllowedDetents: "fitToContents",
						headerShown: false
					}}
				/>
				<Stack.Screen
					name="(bottomSheet)/itemSheet"
					options={{
						presentation: "formSheet",
						sheetAllowedDetents: "fitToContents",
						headerShown: false
					}}
				/>
				<Stack.Screen
					name="(bottomSheet)/tagSheet"
					options={{
						presentation: "formSheet",
						sheetAllowedDetents: [0.4 ,0.8],
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="(bottomSheet)/colorschemeSheet"
					options={{
						presentation: "formSheet",
						sheetAllowedDetents: "fitToContents",
						headerShown: false,
					}}
				/>
			</Stack>
        </AppProvider>
    );
}
